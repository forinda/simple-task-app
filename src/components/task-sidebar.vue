<script lang="ts" setup>
import {reactive, ref} from "vue";
import {TaskGroupInterface} from "@/models/task-groups";
import TaskForm from "@/components/task-form.vue";

let groups = reactive<TaskGroupInterface[]>([{name: 'Home tasks', isActive: false}, {
  name: "Work tasks",
  isActive: false
}, {name: "School tasks", isActive: false}])
const activeGroup = ref<string>('')
const setActiveGroup = (group: TaskGroupInterface) => {
  activeGroup.value = group.name
  groups = groups.map((g) => ({...g, isActive: g.name === group.name}))
}

</script>

<template>
  <div>

  </div>
  <div>
    <task-form ></task-form>
  </div>
</template>

<style scoped>

</style>