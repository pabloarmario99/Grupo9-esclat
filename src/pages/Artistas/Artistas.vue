<script setup lang="ts">
import { RouterLink } from "vue-router"
import { artistas } from "@/data/artistas"
import { talleres } from "@/data/talleres"
import { puestos } from "@/data/puestos"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <div class="artistas-page relative overflow-x-hidden text-white">
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85 scale-100 sm:scale-100 md:scale-100 translate-x-0 sm:translate-x-0 md:translate-x-0"
    >

    <div class="relative z-10 w-full max-w-none">
      <section class="w-full mt-10 sm:mt-10 md:mt-12 lg:mt-0 mb-2 sm:mb-3 md:mb-4 lg:mb-6 lg:relative">
        <h1 class="relative z-10 pl-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-medium text-left text-[#ffffff] pt-20 sm:pt-20 md:pt-20 lg:pt-24 xl:pt-28 mb-3">
          ARTISTAS
        </h1>
      </section>

      <div class="artistas-sections">
      <section class="artistas-section">
        <p class="artistas-section-title">Grupos</p>
        <Carousel
          :plugins="[Autoplay({ delay: 1800 })]"
          :opts="{
            align: 'start',
            loop: true,
            duration: 15,
          }"
        >
          <CarouselContent>
            <CarouselItem
              v-for="artista in artistas"
              :key="artista.id"
              class="basis-[41%] sm:basis-[31%] md:basis-[23%] lg:basis-[18%] pl-2"
            >
              <RouterLink
                :to="`/artistas/${artista.id}`"
                class="group relative block aspect-3/4 h-full overflow-hidden"
              >
                <img
                  :src="`/images/${artista.imagen}`"
                  :class="[
                    'absolute inset-0 h-full w-full object-cover transition-transform duration-300',
                    artista.id === 4 ? 'scale-[1.18] group-hover:scale-[1.22]' : 'group-hover:scale-105',
                    artista.id === 5 ? 'object-[40%_center]' : 'object-center',
                    artista.id === 11 ? 'scale-[1.08] group-hover:scale-[1.12]' : '',
                  ]"
                  alt=""
                >
                <div class="absolute inset-x-0 bottom-0 p-3">
                  <div class="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <p class="relative z-10 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 text-center font-medium uppercase text-white">
                    {{ artista.nombre }}
                  </p>
                </div>
              </RouterLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section class="artistas-section">
        <p class="artistas-section-title">Talleres y charlas</p>
        <Carousel
          :plugins="[Autoplay({ delay: 1800 })]"
          :opts="{
            align: 'start',
            loop: true,
            duration: 15,
          }"
        >
          <CarouselContent>
            <CarouselItem
              v-for="taller in talleres"
              :key="taller.id"
              class="basis-[41%] sm:basis-[31%] md:basis-[23%] lg:basis-[18%] pl-2"
            >
              <RouterLink
                :to="`/artistas/taller/${taller.id}`"
                class="group relative block aspect-3/4 h-full overflow-hidden rounded"
              >
                <img
                  :src="`/images/${taller.imagen}`"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt=""
                >
                <div class="absolute inset-x-0 bottom-0 p-3">
                  <div class="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <p class="relative z-10 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 text-center font-medium uppercase text-white">
                    {{ taller.nombre }}
                  </p>
                </div>
              </RouterLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section class="artistas-section">
        <p class="artistas-section-title">Puestos</p>
        <Carousel
          :plugins="[Autoplay({ delay: 1800 })]"
          :opts="{
            align: 'start',
            loop: true,
            duration: 15,
          }"
        >
          <CarouselContent>
            <CarouselItem
              v-for="puesto in puestos"
              :key="puesto.id"
              class="basis-[41%] sm:basis-[31%] md:basis-[23%] lg:basis-[18%] pl-2"
            >
              <RouterLink
                :to="`/artistas/puesto/${puesto.id}`"
                class="group relative block aspect-3/4 h-full overflow-hidden rounded"
              >
                <img
                  :src="`/images/${puesto.imagen}`"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt=""
                >
                <div class="absolute inset-x-0 bottom-0 p-3">
                  <div class="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <p class="relative z-10 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 text-center font-medium uppercase text-white">
                    {{ puesto.nombre }}
                  </p>
                </div>
              </RouterLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      </div>
    </div>


    <!-- ÚLTIMA SECCIÓN MODIFICADA -->
<div class="relative flex flex-col items-center text-center px-6 md:px-10 lg:px-14 py-18">
  

  <p class="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight uppercase mb-20">
    Sigue explorando Esclat
  </p>

  <div class="relative z-10 flex flex-wrap justify-center gap-8">
    <RouterLink
      to="/esclat/characters"
      class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#bdd434] hover:text-[#371e58] hover:scale-105 transition-all duration-200"
    >
      Personajes
    </RouterLink>

    <button
      type="button"
      class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#bdd434] hover:text-[#371e58] hover:scale-105 transition-all duration-200"
    >
      Spot
    </button>
  </div>
</div>


  </div>
</template>

<style scoped>
.artistas-page {
  min-height: 100vh;
  background-color: #eb378d;
  isolation: isolate;
}

.texture-multiply {
  mix-blend-mode: multiply;
}

.artistas-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 4rem;
}

.artistas-section {
  padding-block: 1.5rem;
}

.artistas-section-title {
  margin: 0 0 2.4rem;
  padding-left: 1.5rem;
  font-size: clamp(1.2rem, 3.4vw, 2.2rem);
  line-height: 0.95;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .artistas-sections {
    gap: 6.5rem;
    padding-bottom: 6rem;
  }

  .artistas-section-title {
    margin-bottom: 3rem;
    font-size: clamp(1.6rem, 3vw, 3rem);
  }
}
</style>