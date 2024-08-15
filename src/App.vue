<script setup lang="ts">
import BaseLayout from "@/layouts/base-layout.vue";
import TaskSidebar from "@/components/task-sidebar.vue";
import TaskHeader from "@/components/task-header.vue";
</script>

<template>
    <main class="canvas-container bg-center bg-cover bg-no-repeat">
      <div class="bg-gray-600/50">
        <base-layout>
          <template #header>
            <task-header></task-header>
          </template>
          <template #sidebar>
            <task-sidebar></task-sidebar>
          </template>
        </base-layout>
      </div>

    </main>
</template>

<style>
.canvas-container{
  background-image: url("https://images.unsplash.com/photo-1650735310411-19b29700012d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

}
</style>