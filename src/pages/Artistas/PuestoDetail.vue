<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { puestos } from "@/data/puestos"
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const puestosOrdenados = [...puestos].sort((a, b) => a.id - b.id)

const currentId = computed(() => Number(route.params.id))
const puesto = computed(() => puestos.find(a => a.id === currentId.value))
const puestoIndex = computed(() => puestosOrdenados.findIndex(a => a.id === currentId.value))

const puestoAnterior = computed(() =>
  puestoIndex.value > 0 ? puestosOrdenados[puestoIndex.value - 1] : null,
)

const puestoSiguiente = computed(() =>
  puestoIndex.value >= 0 && puestoIndex.value < puestosOrdenados.length - 1
    ? puestosOrdenados[puestoIndex.value + 1]
    : null,
)

const imageSrc = computed(() => {
  if (!puesto.value)
    return ""

  return puesto.value.imagen.startsWith('/')
    ? puesto.value.imagen
    : `/images/${puesto.value.imagen}`
})

// Mapeo dinámico corregido con las direcciones correctas en móvil
const imagenClaseMobile = computed(() => {
  if (!puesto.value) return ''

  const id = puesto.value.id

  // 1. Fran Ferriz (5) se mantiene intacto con su 8% original
  if (id === 5) {
    return 'puesto-image-mobile-up-more'
  }

  // 2. BAJAR SIGNIFICATIVAMENTE: Xulia Vicente (13)
  if (id === 13) {
    return 'puesto-mobile-down-strong'
  }

  // 3. NO SE TOCAN (Posición normal): Carles Dalmau(3), Enric Oliver(4), Javier Beltrán(9), Lorena Álvarez(11) y Marta Beltrán(12)
  if ([3, 4, 9, 11, 12].includes(id)) {
    return ''
  }

  // 4. SUBIR SIGNIFICATIVAMENTE: Todas las demás cartas (Alba BG, Toni Caballero, Gorchart, IntheGrass, Ivanco, Locolindon)
  return 'puesto-mobile-up-strong'
})
</script>

<template>
  <div class="detail-page relative overflow-x-hidden">
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85"
    >

    <section v-if="puesto" class="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-col gap-6 px-6 pl-10 pt-18 pb-14 font-medium sm:mt-16 sm:max-w-7xl sm:px-8 sm:pt-20 sm:pb-12 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 sm:gap-y-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-12 lg:w-fit lg:max-w-none lg:grid-cols-[18rem_40rem] lg:items-start lg:gap-x-14 lg:px-0 lg:py-24">
      <h1 class="order-1 text-[clamp(2.1rem,9vw,2.9rem)] font-medium uppercase tracking-wide text-white sm:hidden">
        {{ puesto.nombre }}
      </h1>

      <div class="order-2 w-[78vw] max-w-105 min-w-44 self-start sm:order-1 sm:w-44 sm:max-w-none sm:self-auto md:w-52 lg:w-72">
        <div class="relative block aspect-5/3 h-full overflow-hidden border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.18)] sm:aspect-3/4">
          <img
            :src="imageSrc"
            :alt="puesto.nombre"
            :class="[
              'absolute inset-0 h-full w-full object-cover',
              imagenClaseMobile
            ]"
          >
        </div>
      </div>

      <div class="order-3 flex min-w-0 flex-col gap-4 text-left text-white sm:order-2 sm:max-w-3xl sm:self-stretch lg:-mt-1 lg:h-96 lg:self-start">
        <h1 class="hidden text-[clamp(2.4rem,4.7vw,3.75rem)] font-medium uppercase tracking-wide sm:block">
          {{ puesto.nombre }}
        </h1>
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          {{ puesto.descripcion }}
        </p>
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          Horario: {{ puesto.actuacion }}
        </p>

        <div class="mt-4 flex w-fit items-center gap-3 lg:mt-auto">
          <RouterLink
            v-if="puestoAnterior"
            :to="`/artistas/puesto/${puestoAnterior.id}`"
            class="inline-flex items-center justify-center text-[#371e58] p-0 hover:text-white hover:scale-110 transition-all duration-200"
          >
            <ChevronLeft class="size-8" />
          </RouterLink>
          <span
            v-else
            class="inline-flex items-center justify-center text-[#371e58]/40 cursor-not-allowed"
          >
            <ChevronLeft class="size-8" />
          </span>

          <RouterLink
            to="/artistas"
            class="inline-flex w-fit items-center bg-[#371e58] text-white uppercase font-medium tracking-widest text-sm px-4 py-2 hover:bg-white hover:text-[#eb378d] hover:scale-105 transition-all duration-200 lg:px-5 lg:py-3 lg:text-base"
          >
            VER MAS PUESTOS
          </RouterLink>

          <RouterLink
            v-if="puestoSiguiente"
            :to="`/artistas/puesto/${puestoSiguiente.id}`"
            class="inline-flex items-center justify-center text-[#371e58] p-0 hover:text-white hover:scale-110 transition-all duration-200"
          >
            <ChevronRight class="size-8" />
          </RouterLink>
          <span
            v-else
            class="inline-flex items-center justify-center text-[#371e58]/40 cursor-not-allowed"
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
  background-color: #eb378d;
  isolation: isolate;
}

.texture-multiply {
  mix-blend-mode: multiply;
}

/* Ajustes de reencuadre significativos en formato móvil (< 640px) */
@media (max-width: 639px) {
  
  /* Clase original de Fran Ferriz */
  .puesto-image-mobile-up-more {
    object-position: center 8%;
  }

  /* Subida fuerte para las imágenes que lo requerían */
  .puesto-mobile-up-strong {
    object-position: center 15%;
  }

  /* Bajada fuerte únicamente para Xulia Vicente */
  .puesto-mobile-down-strong {
    object-position: center 85%;
  }
}
</style>