<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col">
    <!-- Barra -->
    <header class="bg-[#bcd432] w-full h-15 fixed top-0 left-0 z-50 flex items-center px-6">
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

     <section class="fixed whitespace-nowrap bg-gray-800 mt-15 z-60">
    <div class="inline-block animate-marquee py-1">
      <span class="text-white text-sm mx-8">
        esclat FESTIVAL DE MÚSICA, PENSAMENT I CREATIVITAT 
        PRÓXIMO 23, 24 y 25 de octubre LAS NAVES Valencia
      </span>
      <span class="text-white text-sm mx-8">
        esclat FESTIVAL DE MÚSICA, PENSAMENT I CREATIVITAT 
        PRÓXIMO 23, 24 y 25 de octubre LAS NAVES Valencia
      </span>
    </div>
  </section>

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
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 15s linear infinite;
}

</style>