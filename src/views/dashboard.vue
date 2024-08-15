<script lang="ts" setup>
import {useTaskStore} from "@/store/task-store.ts";

const store = useTaskStore()
</script>

<template>

  <main class="flex gap-2 flex-col ">
    <!--    <h1>Dashboard</h1>-->
    <div v-for="item of Object.keys(store.getters.stats)"
         class="flex flex-col items-center justify-between border p-2 bg-white rounded shadow"
    >
      <h1> {{ item }}</h1>
      <div class="flex w-full p-2">


        <div v-for="[key,value] in Object.entries(store.getters.stats[item])"
             class="border p-4 flex flex-col gap-2 text-center items-center w-full"
        >
          <h2>{{ key }}</h2>
          <p>{{ value }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>