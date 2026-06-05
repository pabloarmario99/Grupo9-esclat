<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Ajustado a un punto medio ideal (mt-12) -->
  <div class="w-full mt-12 overflow-x-hidden bg-[#371e58]">
    
    <!-- Pizca más de aire vertical (pt-14 pb-20) para que respire sin irse al extremo -->
    <section class="relative bg-[#371e58] px-6 pt-14 pb-20 md:px-10 md:pt-18 md:pb-24 lg:px-14 lg:pt-20 lg:pb-28 flex flex-col items-center justify-center text-center min-h-[65vh]">
      <!-- Estampado de fondo oficial con el mix-blend característico -->
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />

      <!-- Contenedor del Título Principal -->
      <div class="relative z-10 mx-auto max-w-7xl w-full mb-12">
        <h1 class="text-4xl font-medium uppercase tracking-tighter text-[#bdd434] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] leading-none select-none">
          ¡Conoce a nuestros<br>personajes!
        </h1>
      </div>

      <!-- Contenedor de Botones distribuidos uniformemente en horizontal -->
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-stretch">
          
          <RouterLink 
            to="/esclat/characters/1" 
            class="festival-btn"
          >
            Clau Cassett
          </RouterLink>

          <RouterLink 
            to="/esclat/characters/2" 
            class="festival-btn"
          >
            Pablo Tomo
          </RouterLink>

          <RouterLink 
            to="/esclat/characters/3" 
            class="festival-btn"
          >
            Capitán Marianas
          </RouterLink>

          <RouterLink 
            to="/esclat/characters/4" 
            class="festival-btn"
          >
            Martini Beat
          </RouterLink>

        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.festival-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #bdd434;
  color: #371e58;
  border: 1px solid #bdd434;
  padding: 1.75rem 2rem; 
  font-size: 1rem;
  font-weight: 900; 
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.festival-btn:hover {
  transform: scale(1.05);
}
</style>