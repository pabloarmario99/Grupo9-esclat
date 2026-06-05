<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { personajes } from "@/data/personajes"
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
// Ordenamos los personajes numéricamente por su ID para garantizar la navegación secuencial
const personajesOrdenados = [...personajes].sort((a, b) => a.id - b.id)

const currentId = computed(() => Number(route.params.id))
const personaje = computed(() => personajes.find(p => p.id === currentId.value))
const personajeIndex = computed(() => personajesOrdenados.findIndex(p => p.id === currentId.value))

const personajeAnterior = computed(() =>
  personajeIndex.value > 0 ? personajesOrdenados[personajeIndex.value - 1] : null
)

const personajeSiguiente = computed(() =>
  personajeIndex.value >= 0 && personajeIndex.value < personajesOrdenados.length - 1
    ? personajesOrdenados[personajeIndex.value + 1]
    : null
)

// CORREGIDO: Ahora busca dentro de /images/characters/ automáticamente
const imageSrc = computed(() => (personaje.value ? `/images/characters/${personaje.value.imagen}` : ""))
</script>

<template>
  <div class="detail-page relative overflow-x-hidden">
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-25"
    >

    <section v-if="personaje" class="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-col gap-6 px-6 pl-10 pt-18 pb-14 font-medium sm:mt-16 sm:max-w-7xl sm:px-8 sm:pt-20 sm:pb-12 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 sm:gap-y-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-12 lg:w-fit lg:max-w-none lg:grid-cols-[18rem_40rem] lg:items-start lg:gap-x-14 lg:px-0 lg:py-24">
      
      <!-- Título móvil -->
      <h1 class="order-1 font-medium uppercase tracking-wide text-white sm:hidden text-[clamp(2.1rem,9vw,2.9rem)]">
        {{ personaje.nombre }}
      </h1>

      <!-- Contenedor de la imagen (Limpiado bordes y cortes rígidos que afectaban al PNG) -->
      <div class="order-2 w-[78vw] max-w-105 min-w-44 self-start sm:order-1 sm:w-44 sm:max-w-none sm:self-auto md:w-52 lg:w-72">
        <div class="relative block justyfy-center aspect-3/4 h-100 sm:aspect-3/4 sm:h-full">
          <img
            :src="imageSrc"
            :alt="personaje.nombre"
            class="absolute inset-0 h-full w-full object-cover object-center filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)]"
          >
        </div>
      </div>

      <!-- Textos y Paginación -->
      <div class="order-3 flex min-w-0 flex-col gap-4 text-left text-white sm:order-2 sm:max-w-3xl sm:self-stretch lg:-mt-1 lg:h-96 lg:self-start">
        <h1 class="hidden text-[clamp(2.4rem,4.7vw,3.75rem)] font-medium uppercase tracking-wide sm:block">
          {{ personaje.nombre }}
        </h1>
        
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          {{ personaje.descripcion }}
        </p>

        <!-- Botones de Navegación del Slider -->
        <div class="mt-4 flex w-fit items-center gap-3 lg:mt-auto">
          <RouterLink
            v-if="personajeAnterior"
            :to="`/esclat/characters/${personajeAnterior.id}`"
            class="inline-flex items-center justify-center text-[#bdd434] p-0 hover:text-white hover:scale-110 transition-all duration-200"
          >
            <ChevronLeft class="size-8" />
          </RouterLink>
          <span
            v-else
            class="inline-flex items-center justify-center text-[#bdd434]/40 cursor-not-allowed"
          >
            <ChevronLeft class="size-8" />
          </span>

          <RouterLink
            to="/esclat/characters"
            class="inline-flex w-fit items-center bg-[#bdd434] text-[#371e58] uppercase font-black tracking-widest text-sm px-4 py-2 hover:scale-105 transition-all duration-200 lg:px-5 lg:py-3 lg:text-base"
          >
            VER MÁS PERSONAJES
          </RouterLink>

          <RouterLink
            v-if="personajeSiguiente"
            :to="`/esclat/characters/${personajeSiguiente.id}`"
            class="inline-flex items-center justify-center text-[#bdd434] p-0 hover:text-white hover:scale-110 transition-all duration-200"
          >
            <ChevronRight class="size-8" />
          </RouterLink>
          <span
            v-else
            class="inline-flex items-center justify-center text-[#bdd434]/40 cursor-not-allowed"
          >
            <ChevronRight class="size-8" />
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail-page {
  background-color: #371e58;
  isolation: isolate;
}

.texture-multiply {
  mix-blend-mode: multiply;
}
</style>