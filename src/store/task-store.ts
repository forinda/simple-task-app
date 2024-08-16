import {computed, ref} from "vue";
import {TaskInterface} from "@/models/tasks";
import {storage} from "@/store/store-api.ts";

const taskKey = 'tasks';

type TaskStoreType = {
    data: TaskInterface[]
    sort_field:keyof TaskInterface|''
    sort:{
        [k:string]:1| -1
    }
    is_loading: boolean
}

const deserializedState = storage.deserialize<TaskStoreType>(taskKey, {data: [], is_loading: false,sort:{},sort_field:''});
const defaultState: TaskStoreType = deserializedState
    ? {
        ...deserializedState,
        sort:{},
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
const sortedTasks = computed(()=>taskStore.value.data.toSorted((a:TaskInterface,b:TaskInterface)=>{
    const field = taskStore.value.sort_field;
    const sortOrder = taskStore.value.sort[field] || 1; // Default to 1 if the field is not in the sort object

    if (!field) {
        return 0; // No sorting if the field is not specified
    }

    if (a[field] < b[field]) return -1 * sortOrder;
    if (a[field] > b[field]) return 1 * sortOrder;
    return 0; // Equal values
}))
const actions = {
    async sync() {
        // const {is_loading: _, ...rest} =
        storage.serialize(taskKey, {...taskStore.value,is_loading:false})
    },
    async sort(key:keyof TaskInterface){

        if(key in taskStore.value.sort){
            // console.log(`IN- ${taskStore.value.sort[key]}`)
            taskStore.value.sort[key]=taskStore.value.sort[key]===1?-1:1
        }else {
            // console.log(`NOT IN- ${taskStore.value.sort[key]}`)
            taskStore.value.sort[key]=-1
        }
        taskStore.value.sort_field=key
        await  this.sync()
    },
    async addTask(task: Omit<TaskInterface, 'id' | 'status'>) {
        taskStore.value.is_loading = true
        const generateId = () => Math.random().toString(36).slice(2)//.toUpperCase();
        const newTask: TaskInterface = {
            ...task,
            id: generateId(),
            status: 'pending'
        }
        // console.log({taskStore})
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
        // return taskStore.value.data
        return  sortedTasks.value

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
    },
    get sort(){
        return taskStore.value.sort
    }
}

export function useTaskStore() {
    return {
        getters,
        actions
    }
}