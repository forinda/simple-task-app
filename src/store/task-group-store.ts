import {reactive} from "vue";
import {TaskGroupInterface} from "@/models/task-groups";

type TaskGroupStoreType = {
    data: TaskGroupInterface[]
    active_group: null | string
}

const defaultState: TaskGroupStoreType = {
    data: [
        {name: 'work', is_active: false},
        {name: "study", is_active: false},
        {name: "fun", is_active: false},
        {name: "hobby", is_active: false},
        {name: "other",is_active: false
    }],
    active_group: null,
}
const taskGroupStore = reactive<TaskGroupStoreType>(defaultState)

const actions = {
    async activateGroup(group: TaskGroupInterface) {
        taskGroupStore.active_group = group.name
        taskGroupStore.data = taskGroupStore.data.map((g) => ({...g, isActive: g.name === group.name}))
    }
}

const getters = {
    get data(): TaskGroupInterface[] {
        return taskGroupStore.data
    },
    get active_group(): string | null {
        return taskGroupStore.active_group
    }
}

export function useTaskGroups() {
    return {
        ...getters,
        ...actions
    }
}