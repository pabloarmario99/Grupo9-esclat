<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { Menu, Ticket } from 'lucide-vue-next'

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
    class="bg-[#371e58] w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-4"
  >
    <RouterLink to="/" class=" hover:scale-105 transition-all flex items-center justify-center text-white">

      <img
        src="/images/logo white.svg"
        class="w-30 h-auto"
      >
    </RouterLink>

    <nav class="hidden md:flex items-center gap-8 text-white text-sm font-semibold tracking-wide uppercase">
      <RouterLink to="/esclat" class="hover:text-[#bcd432] transition-colors">
        INFORMACIÓN
      </RouterLink>

      <RouterLink to="/programa" class="hover:text-[#bcd432] transition-colors">
        PROGRAMACIÓN
      </RouterLink>

      <RouterLink to="/artistas" class="hover:text-[#bcd432] transition-colors">
        ARTISTAS
      </RouterLink>

      <RouterLink to="/entradas-acceso" class="hover:text-[#bcd432] transition-colors">
        ENTRADAS
      </RouterLink>
    </nav>

    <button
      class="text-white hover:scale-110 transition-all md:hidden"
      @click="toggleSidebar"
    >
      <Menu />
    </button>
  </header>

  <div
        class="bg-[#eb378d] w-full h-21 fixed top-0 left-0 z-40 flex items-center justify-between px-6"
  />

  <div>
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 md:hidden"
      @click="isSidebarOpen = false"
    />

    <div
      class="bg-[#371e58]/90 flex flex-col z-40 fixed top-20 right-0 w-50 h-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden"
      :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex flex-col gap-10 p-5">
        <RouterLink to="/esclat" class="text-white font-medium hover:text-[#bcd432] transition-all">
          INFORMACIÓN
        </RouterLink>

        <RouterLink to="/programa" class="text-white font-medium hover:text-[#bcd432] transition-all">
          PROGRAMACIÓN
        </RouterLink>

        <RouterLink to="/artistas" class="text-white font-medium hover:text-[#bcd432] transition-all">
          ARTISTAS
        </RouterLink>

        <RouterLink to="/entradas-acceso" class="text-white font-medium hover:text-[#bcd432] transition-all">
          ENTRADAS
        </RouterLink>
      </div>
    </div>
  </div>

 <button
  v-if="route.path !== '/entradas-acceso'"
  class="fixed bottom-4 right-4 z-50 bg-[#bcd432] text-white font-semibold p-4 md:px-8 md:py-4 mb-5 shadow-lg hover:bg-white hover:text-[#eb378d] uppercase"
>
  <RouterLink to="/entradas-acceso" aria-label="Comprar entradas">
    <Ticket class="size-6 md:hidden" />
    <span class="hidden md:inline">Comprar entradas</span>
  </RouterLink>
</button>

  <main>
    <RouterView />
  </main>

  <footer class="bg-[#371e58] text-white mt-">
    <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

      <div class="flex flex-col gap-10 md:flex-row md:items-center sm:justify-center">
      <!-- ORGANIZADORES -->
      <div class="flex items-center">
        <h3 class="pr-3">Organiza:</h3>

        <div class="flex items-center">
          <img
            src="/images/valenciaNaves.png"
            alt="Organizador 1"
            class=" object-contain w-45 h-auto mr-1 invert"
          />

          
          <img
            src="/images/logo white.png"
            alt="Organizador 2"
            class="w-17 h-auto object-contain"
          />
        </div>
      </div>

      <!-- COLABORADORES -->
      <div class="flex items-center">
        <h3 class="pr-5">Colabora:</h3>

        <div class="flex items-center gap-6">
          <img
            src="/images/diputacion.svg"
            alt="Colaborador 3"
            class="w-18 h-auto object-contain"
          />
          <img
            src="/images/IVAJ.svg"
            alt="Colaborador 3"
            class="w-15 h-auto object-contain"
          />
          <img
            src="/images/turia.svg"
            alt="Colaborador 1"
            class="w-12 h-auto object-contain"
          />

          <img
            src="/images/coke.svg"
            alt="Colaborador 2"
            class="w-12 h-auto object-contain"
          />
        </div>
      </div>
      </div>

      <!-- REDES SOCIALES -->
      <div class="flex flex-col md:items-center md:justify-between gap-6 border-t border-white/20 pt-6">

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
