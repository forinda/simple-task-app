import { TaskPriorityType } from "./Taskpriority.interface";

export interface TaskInterface {
    priority: TaskPriorityType
    title: string
    due_date: Date
    description: string
    group: string
    status:'pending'|'done'
    id:string
}
// export type TaskType={}