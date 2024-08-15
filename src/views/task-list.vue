<script lang="ts" setup>
import {useTaskStore} from "@/store/task-store.ts";
import {TaskPriorityType} from "@/models/tasks";
import moment from "moment";

const t = useTaskStore()
const getBadgeColor = (priority: TaskPriorityType) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500 text-white border-red-700';
    case 'medium':
      return 'bg-yellow-500 text-white border-yellow-700';
    case 'low':
      return 'bg-green-500 text-white border-green-700';
    default:
      return 'bg-gray-500 text-white border-gray-700'; // Fallback for undefined priorities
  }
}
</script>

<template>
  <div>
    <div v-if="t.getters.loading" class="">
      Loading...
    </div>
    <div v-else class="fle flex-col gap-2">
      <table v-if="
      t.getters.data.length>0" class="bg-white min-w-full text-sm table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">#</th>
          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Title</th>
          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Priority</th>

          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Due Date</th>
          <!--          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Description</th>-->
          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Group</th>
          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Status</th>
          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task,index) in t.getters.data" :key="task.id">
          <td class="px-4 py-2 border border-gray-300">{{index+1 }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ task.title }}</td>
          <td class="px-4 py-2 border border-gray-300">
            <span :class="[getBadgeColor(task.priority)]"
                  class="text-xs px-2 rounded-full h-fit">
               {{ task.priority }}
            </span>

          </td>

          <td class="px-4 py-2 border border-gray-300">{{ moment(task.due_date,'yyyy-MM-DD').fromNow() }}</td>
          <!--          <td class="px-4 py-2 border border-gray-300">{{ task.description }}</td>-->
          <td class="px-4 py-2 border border-gray-300">{{ task.group }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ task.status }}</td>
          <td class="px-4 py-2 border border-gray-300">
            <!-- Add your action buttons here -->
<!--            <button class="text-blue-600 hover:text-blue-800">-->

<!--            </button>-->
            <button @click="t.actions.deleteTask(task.id)"

                class="text-red-600 hover:text-red-800 border px-4 text-xs rounded-full">
              &cross; Del
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-else class="w-full p-8 font-medium uppercase text-center bg-white text-red-600">
        No tasks available
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>