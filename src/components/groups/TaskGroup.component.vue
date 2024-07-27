<script setup lang="ts">
import { TaskgroupInterface } from '@/models/task-groups';
defineProps < {
    tasks_groups: TaskgroupInterface[]
    activeGroup: string
} > ()

const emit = defineEmits < {
    (e: 'activate:group', group: TaskgroupInterface): void
} > ()

const setGroup = (group: TaskgroupInterface) => {
    emit('activate:group', group)
}
</script>

<template>
    <main>
    
        <div class="flex gap-4 p-4">
            <button :disabled="group.isActive" :key="group.name" v-for="group of tasks_groups" @click="setGroup(group)" class="px-4 py-2 border rounded-md disabled:cursor-not-allowed" :class="{ 'border border-blue-500': group.isActive }">
                    {{ group.name }}
                </button>
        </div>
        <div class="p-4">
            <div v-if="activeGroup !== ''">
    
                <router-view></router-view>
    
            </div>
            <div v-else>
                <h1>No task group selected yet...</h1>
            </div>
        </div>
    </main>
</template>


<style scoped>

</style>