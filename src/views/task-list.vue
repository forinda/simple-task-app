<script lang="ts" setup>
import {useTaskStore} from "@/store/task-store.ts";
import {TrashIcon,CheckIcon,ArrowsUpDownIcon} from "@heroicons/vue/24/outline"
import moment from "moment";
import {getBadgeColor} from "@/utils/get-status-badge-color.ts";

const t = useTaskStore()

</script>

<template>
  <div>
    <div v-if="t.getters.loading" class="">
      Loading...
    </div>
    <div v-else class="fle flex-col gap-2">
      <table v-if="
      t.getters.data.length>0" class="bg-white min-w-full text-xs table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border border-gray-300 text-left  font-medium text-gray-700">#</th>
          <th class="px-4 py-2 border border-gray-300 text-left  font-medium text-gray-700">Title</th>
          <th class="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
            <div class="flex items-center flex-nowrap whitespace-nowrap uppercase gap-1 font-bold">
              Priority <arrows-up-down-icon @click="t.actions.sort('priority')" class="sort-icon"></arrows-up-down-icon>
            </div>
          </th>

          <th class="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
            <div class="flex items-center flex-nowrap whitespace-nowrap uppercase gap-1 font-bold">
              Due Date <arrows-up-down-icon @click="t.actions.sort('due_date')" class="sort-icon"></arrows-up-down-icon>
            </div>
            </th>
          <!--          <th class="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Description</th>-->
          <th class="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
            <div class="flex items-center flex-nowrap whitespace-nowrap uppercase gap-1 font-bold">
              Group <arrows-up-down-icon @click="t.actions.sort('group')" class="sort-icon"></arrows-up-down-icon>
            </div>

            </th>
          <th class="px-4 py-2 border border-gray-300 text-left  font-medium text-gray-700">
            <div class="flex items-center flex-nowrap whitespace-nowrap uppercase gap-1 font-bold">
              Status <arrows-up-down-icon @click="t.actions.sort('status')" class="sort-icon"></arrows-up-down-icon>
            </div>
            </th>
          <th class="px-4 py-2 border border-gray-300 text-left  font-medium text-gray-700">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task,index) in t.getters.data" :key="task.id"
            class="transition-all ease-in duration-300"
        :class="{'line-through':task.status==='done'}"
        >
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
          <td class="px-4 py-2 border border-gray-300"><span :class="[getBadgeColor(task.status)]"
                                                             class="text-xs px-2 rounded-full h-fit">
               {{ task.status }}
            </span></td>
          <td class="px-4 py-2 border border-gray-300">
            <div class="flex gap-2">


            <button @click="t.actions.deleteTask(task.id)"

                class="text-red-600 hover:text-red-800 border  text-xs rounded-full">
           <trash-icon class="h-4 w-4"></trash-icon>
            </button>
            <button @click="()=>task.status==='pending' ?t.actions.changeTaskStatus(task.id,'done'):t.actions.changeTaskStatus(task.id,'pending')"

                    class="text-green-600 hover:text-green-800 border border-green-500  text-xs rounded-full">
              <check-icon class="h-4 w-4"></check-icon>
            </button>       </div>
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
.sort-icon{
  @apply h-4 w-4 cursor-pointer;
}
</style>