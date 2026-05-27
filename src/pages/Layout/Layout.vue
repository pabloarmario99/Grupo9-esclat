<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <!-- Barra -->
    <header class="bg-[#bcd432] w-full h-20 fixed top-0 left-0 z-50 flex items-center px-6">
      <div class="flex justify-between w-full">
  <RouterLink to="/" class="text-white text-lg font-semibold transition">
    Home
  </RouterLink>
  <RouterLink to="/esclat" class="text-white text-lg font-light transition">
    Esclat
  </RouterLink>
  <RouterLink to="/programa" class="text-[#ef5da2] text-lg font-light transition">
    Programa
  </RouterLink>
  <RouterLink to="/artistas" class="text-[#ef5da2] text-lg font-light  transition">
    Artistas
  </RouterLink>
  <RouterLink to="/entradas-acceso" class="text-[#ef5da2] text-lg font-light  transition">
    Entradas
  </RouterLink>
</div>
       
     
    </header>

    <!-- Contenido -->
    <main class="pt-10">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>