<script lang="ts" setup>
import {TaskInterface} from "@/models/tasks";
import {onMounted, reactive, ref} from "vue";
import {useTaskGroups} from "@/store/task-group-store.ts";
import  moment from "moment";
import {useTaskStore} from "@/store/task-store.ts";

const {data: task_groups} = useTaskGroups()
const taskStore = useTaskStore()
const form_data = reactive<Omit<TaskInterface,'status'|'id'>>({
  title: '',
  description: '',
  due_date: moment(new Date()).format('yyyy-MM-DD') as unknown as Date,
  group: '',
  priority: 'medium'
})

const formRef = ref<HTMLFormElement>()

const submitTask = async() => {
  await taskStore.addTask(form_data)
  formRef.value?.reset()
}

onMounted(()=>{

})


</script>

<template>
  <div class="flex flex-col gap-2">
    <h1 class="text-center">Add a task</h1>

    <form
        ref="formRef"
        @submit.prevent.stop="submitTask"
        class="border p-4 bg-white rounded-md">
      <!-- Priority -->
      <div>
        <label for="priority">Priority</label>
        <select id="priority"  name="priority" v-model="form_data.priority">
          <option disabled value="">Select priority</option>
          <option v-for="priority in ['high','medium','low']" :key="priority" :value="priority">{{ priority }}</option>
        </select>
      </div>

      <!-- Title -->
      <div>
        <label for="title">Title</label>
        <input id="title" placeholder="Title..." autocomplete="tel-extension"  name="title" v-model="form_data.title" type="text"/>
      </div>

      <!-- Due Date -->
      <div>
        <label for="due_date">Due Date</label>
        <input id="due_date" name="due_date"  v-model="form_data.due_date" type="date"/>
      </div>

      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <textarea id="description" name="description" v-model="form_data.description"></textarea>
      </div>

      <!-- Group -->
      <div>
        <label for="group">Group</label>
        <select id="group" name="group"  v-model="form_data.group">
          <option disabled value="">Select group</option>
          <option v-for="group in task_groups" :key="group.name" :value="group.name">{{ group.name }}</option>
        </select>
      </div>

      <button type="submit" value="Submit" class="my-2 bg-orange-300 px-4 rounded">Save</button>

    </form>
  </div>
</template>

<style scoped>
form div {
  @apply flex flex-col gap-2;
}

form div input,
form div textarea,
form div select {
  @apply focus:outline-none p-1 rounded border;
}


</style>