import {TaskPriorityType} from "@/models/tasks";
import {TaskStatusType} from "@/models/tasks/TaskStatus.model.ts";

export const getBadgeColor = (priority: TaskPriorityType|TaskStatusType) => {
    switch (priority) {
        case 'high':
            return 'bg-red-500 text-white border-red-700';
        case 'medium':
        case 'pending':
            return 'bg-yellow-500 text-white border-yellow-700';
        case 'low':
        case 'done':
            return 'bg-green-500 text-white border-green-700';
        default:
            return 'bg-gray-500 text-white border-gray-700'; // Fallback for undefined priorities
    }
}