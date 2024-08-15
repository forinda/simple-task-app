<script lang="ts" setup>
import {TaskInterface, TaskPriorityType} from "@/models/tasks";
import {onMounted, ref} from "vue";
import {useTaskGroups} from "@/store/task-group-store.ts";
import moment from "moment";
import {useTaskStore} from "@/store/task-store.ts";
import {useVuelidate} from '@vuelidate/core'
import {helpers, minLength, required} from '@vuelidate/validators'

const {data: task_groups} = useTaskGroups()
const taskStore = useTaskStore()
type TaskFormType = Omit<TaskInterface, 'status' | 'id'>
const formDefault: TaskFormType = {
  title: '',
  description: '',
  due_date: moment(new Date()).format('yyyy-MM-DD') as unknown as Date,
  group: '',
  priority: 'medium'
}
const form_data = ref<TaskFormType>({
  ...formDefault
})

const formRef = ref<HTMLFormElement>()

const rules = {
  title: {
    required,
    minLength: helpers.withMessage('Title should be at least 5 characters ', minLength(5))
  },
  priority: {
    required,
    is_in: helpers.withMessage('Invalid priority', (value: TaskPriorityType) => (['high', 'medium', 'low'] as TaskPriorityType[]).includes(value))
  },
  due_date: {required},
  group: {required},
  description: {required, minLength: helpers.withMessage('Description should be at least 5 characters ', minLength(5))},

}

const $v = useVuelidate(rules, form_data)

const submitTask = async () => {
  await $v.value.$validate()
  if ($v.value.$invalid) {
    return
  }
  await taskStore.actions.addTask(form_data.value)
  // formRef.value?.reset()
  form_data.value = formDefault
  $v.value.$reset()
}

onMounted(() => {

})


</script>

<template>
  <div class="flex flex-col gap-2">
    <h1 class="text-center">Add a task</h1>
    <form
        ref="formRef"
        class="border p-4 bg-white rounded-md"
        @submit.prevent.stop="submitTask">
      <!-- Title -->
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="form_data.title" autocomplete="tel-extension" name="title" placeholder="Title..."
               type="text"/>
        <div v-if="$v.title.$errors.length>0" class="text-red-400 text-sm">
          <p v-for="error in $v.title.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <!-- Priority -->
      <div>
        <label for="priority">Priority</label>
        <select id="priority" v-model="form_data.priority" name="priority">
          <option disabled value="">Select priority</option>
          <option v-for="priority in ['high','medium','low']" :key="priority" :value="priority">{{ priority }}</option>
        </select>
        <div v-if="$v.priority.$errors.length>0" class="text-red-400 text-sm">
          <p v-for="error in $v.priority.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>

      </div>


      <!-- Due Date -->
      <div>
        <label for="due_date">Due Date</label>
        <input id="due_date" v-model="form_data.due_date" name="due_date" type="date"/>
        <div v-if="$v.due_date.$errors.length>0" class="text-red-400 text-sm">
          <p v-for="error in $v.due_date.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
      </div>


      <!-- Group -->
      <div>
        <label for="group">Group</label>
        <select id="group" v-model="form_data.group" name="group">
          <option disabled value="">Select group</option>
          <option v-for="group in task_groups" :key="group.name" :value="group.name">{{ group.name }}</option>
        </select>
        <div v-if="$v.group.$errors.length>0" class="text-red-400 text-sm">
          <p v-for="error in $v.group.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="form_data.description" name="description"></textarea>
        <div v-if="$v.description.$errors.length>0" class="text-red-400 text-sm">
          <p v-for="error in $v.description.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
      </div>

      <button class="my-2 bg-orange-300 px-4 rounded" type="submit" value="Submit">Save</button>

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