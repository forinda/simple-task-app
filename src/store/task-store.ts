import {computed, ref} from "vue";
import {TaskInterface} from "@/models/tasks";
import {storage} from "@/store/store-api.ts";

const taskKey = 'tasks';

type TaskStoreType = {
    data: TaskInterface[]
    is_loading: boolean
}

const deserializedState = storage.deserialize<TaskStoreType>(taskKey, {data: [], is_loading: false});
const defaultState: TaskStoreType = deserializedState
    ? {
        ...deserializedState,
        is_loading: false,
    }
    : {data: [], is_loading: false};

// Create a reactive state object with default state
const taskStore = ref<TaskStoreType>(defaultState);

const groupBasedTaskStats  = computed(()=>{
    return taskStore.value.data.reduce<{[k:string]:number}>((accumulator, {group})=>{
        if(!(group in accumulator)){
            accumulator[group] = 1
        }else{
            accumulator[group] += 1
        }
        return accumulator
    },{})
})
const priorityBasedTaskStats  = computed(()=>{
    return taskStore.value.data.reduce<{[k:string]:number}>((accumulator, {priority},)=>{
        if(!(priority in accumulator)){
            accumulator[priority] = 1
        }else{
            accumulator[priority] += 1
        }
        return accumulator
    },{})
})
const statusBasedTaskStats  = computed(()=>{
    return taskStore.value.data.reduce<{[k:string]:number}>((accumulator, {status},)=>{
        if(!(status in accumulator)){
            accumulator[status] = 1
        }else{
            accumulator[status] += 1
        }
        return accumulator
    },{})
})
const actions = {
    async sync() {
        // const {is_loading: _, ...rest} =
        storage.serialize(taskKey, {...taskStore.value,is_loading:false})
    },
    async addTask(task: Omit<TaskInterface, 'id' | 'status'>) {
        taskStore.value.is_loading = true
        const generateId = () => Math.random().toString(36).slice(2)//.toUpperCase();
        const newTask: TaskInterface = {
            ...task,
            id: generateId(),
            status: 'pending'
        }
        console.log({taskStore})
        taskStore.value.data = [...taskStore.value.data, newTask]
        await this.sync()
        taskStore.value.is_loading = false
    },
    async changeTaskStatus(task_id: string, status: Pick<TaskInterface, 'status'>['status']) {
        taskStore.value.data = taskStore.value.data.map(task => task.id === task_id ? ({...task, status})
            : task)
        await this.sync()
    },
    async deleteTask(task_id: string) {
        taskStore.value.data = taskStore.value.data.filter(task => task.id !== task_id)
        await this.sync()
    }
}

const getters = {
    get data(): TaskInterface[] {
        return taskStore.value.data

    },
    get loading() {
        return taskStore.value.is_loading
    },
    get stats(){
        return {
            priority:priorityBasedTaskStats.value,
            groups:groupBasedTaskStats.value,
            status:statusBasedTaskStats.value,
        }
    }
}

export function useTaskStore() {
    return {
        getters,
        actions
    }
}