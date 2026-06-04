<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { artistas } from "@/data/artistas"
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const artistasOrdenados = [...artistas].sort((a, b) => a.id - b.id)

const currentId = computed(() => Number(route.params.id))
const artista = computed(() => artistas.find(a => a.id === currentId.value))
const artistaIndex = computed(() => artistasOrdenados.findIndex(a => a.id === currentId.value))

const artistaAnterior = computed(() =>
  artistaIndex.value > 0 ? artistasOrdenados[artistaIndex.value - 1] : null
)

const artistaSiguiente = computed(() =>
  artistaIndex.value >= 0 && artistaIndex.value < artistasOrdenados.length - 1
    ? artistasOrdenados[artistaIndex.value + 1]
    : null
)

const imageSrc = computed(() => (artista.value ? `/images/${artista.value.imagen}` : ""))
</script>

<template>
  <div class="detail-page relative overflow-x-hidden">
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85"
    >

    <section v-if="artista" class="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-col gap-6 px-6 pl-10 pt-18 pb-14 font-medium sm:mt-16 sm:max-w-7xl sm:px-8 sm:pt-20 sm:pb-12 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 sm:gap-y-0 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-12 lg:w-fit lg:max-w-none lg:grid-cols-[18rem_40rem] lg:items-start lg:gap-x-14 lg:px-0 lg:py-24">
      <h1
        :class="[
          'order-1 font-medium uppercase tracking-wide text-white sm:hidden',
          artista.id === 7 || artista.id === 9 || artista.id === 10
            ? 'text-[clamp(1.45rem,6.2vw,2.05rem)]'
            : 'text-[clamp(2.1rem,9vw,2.9rem)]',
        ]"
      >
        {{ artista.nombre }}
      </h1>

      <div class="order-2 w-[78vw] max-w-105 min-w-44 self-start sm:order-1 sm:w-44 sm:max-w-none sm:self-auto md:w-52 lg:w-72">
        <div class="relative block aspect-5/3 h-full overflow-hidden border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.18)] sm:aspect-3/4">
          <img
            :src="imageSrc"
            :alt="artista.nombre"
            :class="[
              'absolute inset-0 h-full w-full object-cover',
              artista.id === 1 ? 'object-[50%_18%] sm:object-center' : '',
              artista.id === 2 ? 'object-[50%_12%] sm:object-center' : '',
              artista.id === 4 ? 'scale-125 object-[50%_34%] sm:scale-100 sm:object-center lg:scale-125' : '',
              artista.id === 5 ? 'tronkas-detail-image' : '',
              artista.id === 6 ? 'object-[50%_12%] sm:object-center' : '',
              artista.id === 7 ? 'object-[50%_22%] sm:object-center' : '',
              artista.id === 8 ? 'object-[50%_24%] sm:object-center' : '',
              artista.id === 12 ? 'object-[50%_12%] sm:object-center' : '',
              artista.id === 14 ? 'object-contain object-[50%_18%] sm:object-center' : '',
            ]"
          >
        </div>
      </div>

      <div class="order-3 flex min-w-0 flex-col gap-4 text-left text-white sm:order-2 sm:max-w-3xl sm:self-stretch lg:-mt-1 lg:h-96 lg:self-start">
        <h1
          :class="[
            'hidden text-[clamp(2.4rem,4.7vw,3.75rem)] font-medium uppercase tracking-wide sm:block',
            artista.id === 9 || artista.id === 10 ? 'lg:text-[clamp(2rem,3.7vw,3rem)]' : '',
          ]"
        >
          {{ artista.nombre }}
        </h1>
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          {{ artista.descripcion }}
        </p>
        <p class="w-[78vw] max-w-105 min-w-44 text-left text-[clamp(0.9rem,2.35vw,1.08rem)] leading-[1.35] sm:w-auto sm:max-w-[54ch] lg:text-[clamp(0.95rem,1.45vw,1.06rem)] lg:leading-[1.35]">
          Horario: {{ artista.actuacion }}
        </p>
        <div class="mt-4 flex w-fit items-center gap-3 lg:mt-auto">
          <RouterLink
            v-if="artistaAnterior"
            :to="`/artistas/${artistaAnterior.id}`"
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
            VER MAS ARTISTAS
          </RouterLink>

          <RouterLink
            v-if="artistaSiguiente"
            :to="`/artistas/${artistaSiguiente.id}`"
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

.tronkas-detail-image {
  object-position: 16% 0%;
  transform: translateY(-2rem) scale(1.25);
}

@media (min-width: 640px) and (max-width: 1023px) {
  .tronkas-detail-image {
    object-position: 42% center;
    transform: translateY(0) scale(1);
  }
}

@media (min-width: 1024px) {
  .tronkas-detail-image {
    object-position: 42% 12%;
    transform: translateY(0) scale(1.05);
  }
}
</style>
