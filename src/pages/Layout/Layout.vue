<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col">
    <!-- Barra -->
    <header class="bg-[#371e58] w-full h-15 fixed top-0 left-0 z-50 flex items-center px-6">
      <div class="flex justify-between w-full">
  <RouterLink to="/" class="text-white text-lg font-semibold transition">
    Home
  </RouterLink>
  <RouterLink to="/esclat" class="text-white text-lg font-light transition">
    Esclat
  </RouterLink>
  <RouterLink to="/programa" class="text-white text-lg font-light transition">
    Programa
  </RouterLink>
  <RouterLink to="/artistas" class="text-white text-lg font-light  transition">
    Artistas
  </RouterLink>
  <RouterLink to="/entradas-acceso" class="text-white text-lg font-light  transition">
    Entradas
  </RouterLink>
</div>
    </header>

    <!-- Contenido -->
    <main>
      <RouterView />
    </main>
    <footer>
      hola
    </footer>
  </div>
</template>

<style scoped>

</style>