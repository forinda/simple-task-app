<script setup lang="ts">

</script>

<template>
    <section id="banner-section"
        class="bg-center bg-cover bg-fixed h-screen overflow-hidden bg-gray-800 bg-blend-overlay grid place-items-center">
        <div
            class="min-h-[20rem] p-10 flex flex-col gap-4  min-w-[60vw] bg-opacity-10 text-white text-center justify-center items-center">
            <h1 class="text-6xl font-bold text-center font-ibm-mono">
                Manage your tasks with ease
            </h1>
            <p class="text-xl">
                Being able to group and prioritize tasks will help you save a lot of time
            </p>
            <router-link :to="{ name: 'task',params:{id:6} }"
                class="bg-blue-600 w-fit justify-self-center px-4 py-2 rounded-md text-xl font-medium uppercase">Get
                started</router-link>
        </div>
    </section>
</template>

<style scoped>
#banner-section {
    background-image: url('https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
</style>