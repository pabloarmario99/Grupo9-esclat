<script setup lang="ts">
import { RouterLink } from "vue-router"
import { artistas } from "@/data/artistas"
import { talleres } from "@/data/talleres"
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
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85"
    >

    <div class="relative z-10 pt-25">
    <p class="pl-6 pb-2 font-bold text-xl">Grupos</p>
    <Carousel
     :plugins="[Autoplay({
      delay: 3000,
    })]"
     :opts="{
      align: 'start',
      loop: true,
    }"
    >
  <CarouselContent>
    <CarouselItem 
      v-for="artista in artistas" 
      :key="artista.id"
      class="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2"
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
        <div class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-3">
          <p class="translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 text-center font-medium uppercase text-white">
            {{ artista.nombre }}
          </p>
        </div>
      </RouterLink>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
 
<p class="pl-6 py-2 font-bold text-xl">Talleres y charlas</p>
  <Carousel
     :plugins="[Autoplay({
      delay: 3000,
      
    })]"
     :opts="{
      align: 'start',
      loop: true,
    }"
    >
  <CarouselContent>
    <CarouselItem 
      v-for="taller in talleres" 
      :key="taller.id"
      class="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2"
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
        <div class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-3">
          <p class="translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 text-center font-medium uppercase text-white">
            {{ taller.nombre }}
          </p>
        </div>
      </RouterLink>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
    </div>
  </div>
 
</template>

<style scoped>
.artistas-page {
  min-height: 100vh;
  background-color: #633e93;
  isolation: isolate;
}

.texture-multiply {
  mix-blend-mode: multiply;
}
</style>