import { TaskPriorityType } from "./Taskpriority.interface";
import {TaskStatusType} from "@/models/tasks/TaskStatus.model.ts";

export interface TaskInterface {
    priority: TaskPriorityType
    title: string
    due_date: Date
    description: string
    group: string
    status:TaskStatusType
    id:string
}
// export type TaskType={}