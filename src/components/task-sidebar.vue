<script lang="ts" setup>
import {reactive, ref} from "vue";
import {TaskgroupInterface} from "@/models/task-groups";
import TaskForm from "@/components/task-form.vue";

let groups = reactive<TaskgroupInterface[]>([{name: 'Home tasks', isActive: false}, {
  name: "Work tasks",
  isActive: false
}, {name: "School tasks", isActive: false}])
const activeGroup = ref<string>('')
const setActiveGroup = (group: TaskgroupInterface) => {
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