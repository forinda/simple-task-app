<script setup lang="ts">
import { TaskgroupInterface } from '@/models/task-groups';
import TaskGroupComponent from '@/components/groups/TaskGroup.component.vue';
import { reactive, ref } from 'vue';
let groups = reactive<TaskgroupInterface[]>([{ name: 'Home tasks', isActive: false }, { name: "Work tasks", isActive: false }, { name: "School tasks", isActive: false }])
const activeGroup = ref<string>('')
const setActiveGroup = (group: TaskgroupInterface) => {
    activeGroup.value = group.name
    groups = groups.map((g) => ({ ...g, isActive: g.name === group.name ? true : false }))
}
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <task-group-component :active-group="activeGroup" :tasks_groups="groups"
            @activate:group="setActiveGroup"></task-group-component>

    </div>
</template>


<style scoped></style>