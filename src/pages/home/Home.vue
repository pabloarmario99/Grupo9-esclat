<script lang="ts" setup>
import { ref, computed } from 'vue'

// Estado para controlar qué botón tiene el hover activo
const hoveredButton = ref<string | null>(null)

// LAS IMÁGENES DINÁMICAS: Cambia las rutas por las tuyas
const imagenesFondo: Record<string, string> = {
  esclat: '/images/diablo.jpg',
  programa: '/images/grupo4.jpg',
  artistas: '/images/tronkas.jpg',
  entradas: '/images/entradas.png',
}

// Calculamos cuál es la imagen activa en cada momento
const imagenActiva = computed(() => {
  return hoveredButton.value ? imagenesFondo[hoveredButton.value] : null
})
</script>

<template>
  <div class="home-container relative overflow-x-hidden">
    <!-- CAPA 1: El patrón texturizado original en multiplicar (Fondo base) -->
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85 scale-100 sm:scale-100 md:scale-100 translate-x-0 sm:translate-x-0 md:translate-x-0"
    />

    <!-- CAPA 2 (NUEVA): Caja visual responsiva por ENCIMA del estampado pero por DEBAJO de los textos (z-5) -->
    <div class="home-preview-window">
      <transition
        enter-active-class="transition-all duration-700 ease-in-out absolute inset-0"
        enter-from-class="opacity-0 scale-105 blur-[2px]"
        enter-to-class="opacity-100 scale-100 blur-0"
        leave-active-class="transition-all duration-700 ease-in-out absolute inset-0"
        leave-from-class="opacity-100 scale-100 blur-0"
        leave-to-class="opacity-0 scale-95 blur-[2px]"
      >
        <img
          v-if="imagenActiva"
          :key="imagenActiva" 
          :src="imagenActiva" 
          alt="Vista previa" 
          class="preview-image absolute inset-0"
        />
      </transition>
    </div>

    <!-- CAPA 3: Contenido principal (Logos y Menú) flotando por encima de todo (z-10) -->
    <div class="relative z-10 w-full flex flex-col items-center">
      
      <!-- Bloque de Logos -->
      <div class="home-heading">
        <img
          class="home-logo home-logo-mobile"
          src="/images/logo white.svg"
          alt="Esclat"
        />
        <img
          class="home-logo home-logo-mid"
          src="/images/logov white.svg"
          alt="Esclat"
        />
        <img
          class="home-logo home-logo-desktop"
          src="/images/logoh white.svg"
          alt="Esclat"
        />
      </div>

      <!-- Menú de Botones interactivos -->
      <nav class="home-menu">
        <router-link to="/esclat">
          <button 
            class="home-button text-white font-medium"
            @mouseenter="hoveredButton = 'esclat'"
            @mouseleave="hoveredButton = null"
          >
            ESCLAT
          </button>
        </router-link>
        
        <router-link to="/programa">
          <button 
            class="home-button text-white font-medium"
            @mouseenter="hoveredButton = 'programa'"
            @mouseleave="hoveredButton = null"
          >
            PROGRAMACIÓN
          </button>
        </router-link>
        
        <router-link to="/artistas">
          <button 
            class="home-button text-white font-medium"
            @mouseenter="hoveredButton = 'artistas'"
            @mouseleave="hoveredButton = null"
          >
            ARTISTAS
          </button>
        </router-link>
        
        <router-link to="/entradas-acceso">
          <button 
            class="home-button text-white font-medium"
            @mouseenter="hoveredButton = 'entradas'"
            @mouseleave="hoveredButton = null"
          >
            ENTRADAS
          </button>
        </router-link>
      </nav>

    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eb378d; /* Tu fondo rosa plano original */
  text-align: center;
  padding: 2rem;
  isolation: isolate; /* Clave para que los z-index respeten las capas */
}

.texture-multiply {
  mix-blend-mode: multiply;
}

/* LA "VENTANA" DINÁMICA ABSOLUTA */
.home-preview-window {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 5;
  pointer-events: none;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* RESTO DE ESTILOS ORIGINALES */
.live-debug-badge {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  background: #ffffff;
  color: #eb378d;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.home-logo {
  width: clamp(80rem, 120vw, 100rem);
  height: auto;
  transform: translateY(-0.6rem);
  transition: transform 0.2s ease;
}



.home-logo-mobile,
.home-logo-mid {
  display: none;
}

.home-logo-desktop {
  display: block;
}

@media (max-width: 1023px) {
  .home-logo-desktop {
    display: none;
  }

  .home-logo-mid {
    display: block;
  }
}

@media (max-width: 767px) {
  .home-logo-mid {
    display: none;
  }

  .home-logo-mobile {
    display: block;
  }
}

.home-heading {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.home-subtitle {
  margin: 0;
  font-size: 1.8rem;
  font-family: "Mona Sans Var", ui-sans-serif, system-ui, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
}

.home-menu {
  width: min(1200px, 100%);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.1rem auto 2rem;
}

@media (max-width: 767px) {
  .home-menu {
    width: min(560px, 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .home-menu > a {
    width: 100%;
  }

  .home-menu .home-button {
    font-size: 1.25rem;
  }
}

.home-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: "Mona Sans Var", ui-sans-serif, system-ui, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: transform 0.2s ease;
}

.home-button:hover {
  transform: scale(1.03);
}

@media (min-width: 1024px) {
  .home-button {
    font-size: 1.8rem;
  }
}
</style>