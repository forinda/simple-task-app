<script lang="ts" setup>

</script>

<template>

  <div class="grid gap-2 grid-rows-[4rem_1fr] grid-cols-12 w-full h-screen p-10 max-w-7xl mx-auto bg-cover bg-center ">
    <div class="row-start-1 row-end-2 col-start-1 col-end-[-1] border glassy">
      <slot name="header">
       <div class="flex items-center justify-center p-4">
         <h1 class="font-bold uppercase">Welcome to our Task App</h1>
       </div>
      </slot>
    </div>
    <div class="row-start-2 row-end-[-1] col-start-1 col-end-[-1] h-full flex gap-2">
      <div class="h-full overflow-y-auto glassy flex-[8] ">
        <router-view></router-view>
      </div>
      <div class="flex-[4] h-full border glassy">
        <slot name="sidebar">
          <h1>
            Sidebar
          </h1>
        </slot>
      </div>
    </div>

  </div>

</template>

<style scoped>
.glassy{
 @apply bg-white/50 rounded-md shadow p-4;
}
</style>