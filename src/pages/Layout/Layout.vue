<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <!-- Barra -->
    <header class="w-full h-20 bg-black fixed top-0 left-0 z-50 flex items-center px-6">
      <RouterLink 
        to="/"
        class="text-white text-lg font-semibold hover:text-gray-300 transition"
      >
        Volver
      </RouterLink>
    </header>

    <!-- Contenido -->
    <main class="pt-20">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>