<script setup lang="ts">

</script>

<template>
  <nav class="flex justify-between">
    <div>
      <img src="/favicon-32x32.png" alt="Logo"
      class="border rounded-full border-double"
      >
    </div>
    <ul class="flex items-center gap-4">
      <li>
        <router-link
        :to="{name:'dashboard'}"
        >
          Dashboard
        </router-link>
      </li> <li>
      <router-link
          :to="{name:'tasks'}"
      >
        Tasks
      </router-link>
    </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>