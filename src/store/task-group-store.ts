import {reactive} from "vue";
import {TaskgroupInterface} from "@/models/task-groups";

type TaskGroupStoreType = {
    data: TaskgroupInterface[]
    active_group: null | string
}

const defaultState: TaskGroupStoreType = {
    data: [{name: 'Home tasks', isActive: false}, {name: "Work tasks", isActive: false}, {
        name: "School tasks",
        isActive: false
    }],
    active_group: null,
}
const taskGroupStore = reactive<TaskGroupStoreType>(defaultState)

const actions = {
    async activateGroup(group: TaskgroupInterface) {
        taskGroupStore.active_group = group.name
        taskGroupStore.data = taskGroupStore.data.map((g) => ({...g, isActive: g.name === group.name}))
    }
}

const getters = {
    get data(): TaskgroupInterface[] {
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