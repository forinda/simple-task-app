<script lang="ts" setup>
import {useTaskStore} from "@/store/task-store.ts";

const {data: tasks, loading: is_loading,deleteTask} = useTaskStore()
</script>

<template>
  <div>
    <div v-if="is_loading" class="">
      Loading...
    </div>
    <div v-else class="fle flex-col gap-2">
      <div :key="task.id" v-for="task in tasks" v-if="tasks.length>0" class="bg-white border p-2 rounded">
        <div class="flex justify-between ">
          <span
            >
            {{task.title}}
          </span>
          <span
            :class="{'bg-red-400':task.priority==='high'}"
            class="border rounded-full p-1]:"
        >
            {{task.priority}}
          </span>
          <div>
            <button
                @click="deleteTask(task.id)"
            >x</button>
          </div>
        </div>
      </div>
      <div v-else>
        No tasks available
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>