<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { talleres } from "@/data/talleres"
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const talleresOrdenados = [...talleres].sort((a, b) => a.id - b.id)

const currentId = computed(() => Number(route.params.id))
const taller = computed(() => talleres.find(a => a.id === currentId.value))
const tallerIndex = computed(() => talleresOrdenados.findIndex(a => a.id === currentId.value))

const tallerAnterior = computed(() =>
  tallerIndex.value > 0 ? talleresOrdenados[tallerIndex.value - 1] : null,
)

const tallerSiguiente = computed(() =>
  tallerIndex.value >= 0 && tallerIndex.value < talleresOrdenados.length - 1
    ? talleresOrdenados[tallerIndex.value + 1]
    : null,
)

const imageSrc = computed(() => {
  if (!taller.value)
    return ""

  return taller.value.imagen.startsWith('/')
    ? taller.value.imagen
    : `/images/${taller.value.imagen}`
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

    <section v-if="taller" class="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-col gap-6 px-6 pl-10 pt-18 pb-14 font-medium sm:mt-16 sm:max-w-7xl sm:px-8 sm:pt-20 sm:pb-12 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 sm:gap-y-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-12 lg:w-fit lg:max-w-none lg:grid-cols-[18rem_40rem] lg:items-start lg:gap-x-14 lg:px-0 lg:py-24">
      <h1 class="order-1 text-[clamp(2.1rem,9vw,2.9rem)] font-medium uppercase tracking-wide text-white sm:hidden">
        {{ taller.nombre }}
      </h1>

      <div class="order-2 w-[78vw] max-w-105 min-w-44 self-start sm:order-1 sm:w-44 sm:max-w-none sm:self-auto md:w-52 lg:w-72">
        <div class="relative block aspect-5/3 h-full overflow-hidden border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.18)] sm:aspect-3/4">
          <img
            :src="imageSrc"
            :alt="taller.nombre"
            :class="[
              'absolute inset-0 h-full w-full object-cover',
              taller.id === 1 ? 'taller-image-foto-mobile' : '',
              taller.id === 2 ? 'taller-image-musicos' : '',
              taller.id === 5 ? 'taller-image-up-more' : '',
              taller.id === 6 ? 'taller-image-down' : '',
              taller.id === 7 ? 'taller-image-up' : '',
              taller.id === 8 ? 'taller-image-up' : '',
              taller.id === 10 ? 'taller-image-up-more taller-image-baile-lg' : '',
              taller.id === 11 ? 'taller-image-literatura' : '',
            ]"
          >
        </div>
      </div>

      <div class="order-3 flex min-w-0 flex-col gap-4 text-left text-white sm:order-2 sm:max-w-3xl sm:self-stretch lg:-mt-1 lg:h-96 lg:self-start">
        <h1 class="hidden text-[clamp(2.4rem,4.7vw,3.75rem)] font-medium uppercase tracking-wide sm:block">
          {{ taller.nombre }}
        </h1>
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          {{ taller.descripcion }}
        </p>
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          Horario: {{ taller.horario }}
        </p>

        <div class="mt-6 flex w-fit items-center gap-3 lg:mt-auto">
          <RouterLink
            v-if="tallerAnterior"
            :to="`/artistas/taller/${tallerAnterior.id}`"
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
            VER MAS TALLERES
          </RouterLink>

          <RouterLink
            v-if="tallerSiguiente"
            :to="`/artistas/taller/${tallerSiguiente.id}`"
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

@media (max-width: 639px) {
  .taller-image-musicos {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    height: 124%;
    width: 124%;
    max-width: none;
    object-position: center;
    transform: translate(-50%, -50%) scale(0.88);
    transform-origin: center;
  }

  .taller-image-literatura {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    height: 124%;
    width: 124%;
    max-width: none;
    object-position: center;
    transform: translate(-50%, -50%) scale(0.88);
    transform-origin: center;
  }

  .taller-image-down {
    object-position: center 68%;
  }

  .taller-image-up {
    object-position: center 28%;
  }

  .taller-image-up-more {
    object-position: center 8%;
  }

  .taller-image-foto-mobile {
    object-position: center 36%;
  }
}

@media (min-width: 1024px) {
  .taller-image-baile-lg {
    object-position: center 18%;
  }
}
</style>
