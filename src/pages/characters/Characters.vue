<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full mt-20 overflow-x-hidden bg-[#371e58]">
    
    <!-- SECCIÓN PRINCIPAL: HERO + BOTONES HORIZONTALES -->
    <section class="relative bg-[#371e58] px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <!-- Estampado de fondo oficial con el mix-blend característico -->
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />

      <!-- Contenedor del Título Principal -->
      <div class="relative z-10 mx-auto max-w-7xl w-full mb-16">
        <h1 class="text-4xl font-medium uppercase tracking-tighter text-[#bdd434] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] leading-none select-none">
          ¡Conoce a nuestros<br>personajes!
        </h1>
      </div>

      <!-- Contenedor de Botones distribuidos uniformemente en horizontal -->
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-stretch">
          
          <!-- Cambiados los paths para que apunten al ID de la ficha de cada personaje -->
          <RouterLink 
            to="/esclat/characters/1" 
            class="festival-btn"
          >
            Capitán Esclat
          </RouterLink>

          <RouterLink 
            to="/esclat/characters/2" 
            class="festival-btn"
          >
            Sintetia
          </RouterLink>

          <RouterLink 
            to="/esclat/characters/3" 
            class="festival-btn"
          >
            Noise Boy
          </RouterLink>

          <RouterLink 
            to="/esclat/characters/4" 
            class="festival-btn"
          >
            Reverba
          </RouterLink>

        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Estilos extraídos con la línea estética exacta del festival */
.festival-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #371e58;
  border: 1px solid #bdd434;
  padding: 1.75rem 2rem; /* py-7 px-8 aproximado */
  font-size: 1rem;
  font-weight: 900; /* font-black */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

/* Efecto Hover extraído de la última sección que prefiere el fondo verde y tipografía morada */
.festival-btn:hover {
  background-color: #bdd434;
  color: #371e58;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(189, 212, 52, 0.3);
}
</style>