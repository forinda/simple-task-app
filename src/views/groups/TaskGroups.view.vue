<script setup lang="ts">
import { TaskGroupInterface } from '@/models/task-groups';
import TaskGroupComponent from '@/components/groups/TaskGroup.component.vue';
import { reactive, ref } from 'vue';
let groups = reactive<TaskGroupInterface[]>([{ name: 'Home tasks', is_active: false }, { name: "Work tasks", is_active: false }, { name: "School tasks", is_active: false }])
const activeGroup = ref<string>('')
const setActiveGroup = (group: TaskGroupInterface) => {
    activeGroup.value = group.name
    groups = groups.map((g) => ({ ...g, isActive: g.name === group.name }))
}
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <task-group-component :active-group="activeGroup" :tasks_groups="groups"
            @activate:group="setActiveGroup"></task-group-component>

    </div>
</template>


<style scoped></style>