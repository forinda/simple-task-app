<script lang="ts" setup>
import {useTaskStore} from "@/store/task-store.ts";
import {getBadgeColor} from "@/utils/get-status-badge-color.ts";

const store = useTaskStore()
</script>

<template>

  <main class="flex gap-2 flex-col ">
    <!--    <h1>Dashboard</h1>-->
    <div v-for="item of Object.keys(store.getters.stats)"
         class="flex flex-col items-center border p-2 bg-white rounded shadow"
    >
      <h1 class="capitalize text-left"> {{ item }} cards</h1>
      <div class=" w-full p-2 gap-4 grid grid-cols-3">


        <div v-for="[key,value] in Object.entries(store.getters.stats[item])"
             :class="getBadgeColor(key)"
             class="border  p-4 flex flex-col-reverse gap-2 text-center items-center w-full rounded shadow hover:scale-105 hover:cursor-pointer transition-all ease-in duration-300 flex-[1_1_20rem]"
        >
          <div class="">{{ key }}</div>
          <div class="font-extrabold text-4xl">{{ value }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>