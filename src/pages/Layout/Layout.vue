<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { Menu } from 'lucide-vue-next'

const isSidebarOpen = ref(false)
const route = useRoute()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false
  }
)
</script>

<template>
  <header
    class="bg-[#371e58] w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-6"
  >
    <RouterLink to="/" class="hover:scale-105 transition-all">
      <img
        src="/images/logo white.svg"
        class="w-40 h-auto"
      >
    </RouterLink>

    <button
      class="text-white hover:scale-110 transition-all"
      @click="toggleSidebar"
    >
      <Menu />
    </button>
  </header>

  <div>
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30"
      @click="isSidebarOpen = false"
    />

    <div
      class="bg-[#371e58]/90 rounded-bl flex flex-col z-40 fixed top-20 right-0 w-45 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex flex-col gap-2 p-5">
        <RouterLink to="/esclat" class="text-white font-light hover:font-medium transition-all">
          Qué es esclat
        </RouterLink>

        <RouterLink to="/programa" class="text-white font-light hover:font-medium transition-all">
          Programa
        </RouterLink>

        <RouterLink to="/artistas" class="text-white font-light hover:font-medium transition-all">
          Artistas y talleres
        </RouterLink>

        <RouterLink to="/entradas-acceso" class="text-white font-light hover:font-medium transition-all">
          Entradas
        </RouterLink>
      </div>
    </div>
  </div>

  <button class="fixed bottom-4 right-4 z-50 bg-[#371e58] text-white px-4 py-2 mb-5 rounded-lg shadow-lg">
  <RouterLink to="/entradas-acceso">
    Comprar entradas
  </RouterLink>
</button>

  <main>
    <RouterView />
  </main>

  <footer class="bg-[#371e58] text-white">
    <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

      <div class="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-center">
      <!-- ORGANIZADORES -->
      <div>
        <h3 class="mb-4">Organiza</h3>

        <div class="flex items-center gap-6">
          <img
            src="/images/valencia.svg"
            alt="Organizador 1"
            class=" object-contain w-20 h-auto"
          />

          <img
            src="/images/naves.svg"
            alt="Organizador 2"
            class="w-19 h-auto object-contain"
          />
        </div>
      </div>

      <!-- COLABORADORES -->
      <div>
        <h3 class="mb-4">Colaboradores</h3>

        <div class="flex items-center gap-6">
          <img
            src="/images/turia.svg"
            alt="Colaborador 1"
            class="w-14 h-auto object-contain"
          />

          <img
            src="/images/coke.svg"
            alt="Colaborador 2"
            class="w-15 h-auto object-contain"
          />

          <img
            src="/images/IVAJ.svg"
            alt="Colaborador 3"
            class="w-16 h-auto object-contain"
          />
        </div>
      </div>
      </div>

      <!-- REDES SOCIALES -->
      <div class="flex flex-col sm:items-center sm:justify-between gap-6 border-t border-white/20 pt-6">

        <p class="text-sm text-white/70">
          © {{ new Date().getFullYear() }} Evento. Todos los derechos reservados.
        </p>

        <div class="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            class="hover:opacity-80 transition"
          >
            Instagram
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>