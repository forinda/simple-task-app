import { TaskPriorityType } from "./Taskpriority.interface";

export interface TaskInterface {
    priority: TaskPriorityType
    title: string
    dueDate: Date
    description: string
    group: string
}
// export type TaskType={}