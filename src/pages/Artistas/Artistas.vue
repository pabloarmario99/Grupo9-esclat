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
  <div class="bg-[#633e93] text-white pt-25">
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
        class="bg-[#8c61a6] hover:bg-[#67417e] p-4 block h-full text-white/0 hover:text-white transition-all"
      >
        <!-- Nombre -->
        <div class="text-center  font-semibold mb-2">
          {{ artista.nombre }}
        </div>
        <!-- Espacio para imagen -->
        <div class="overflow-hidden rounded">
          <img
            :src="`/images/${artista.imagen}`"
            class="object-cover w-full h-64"
            alt=""
          >
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
        class="bg-[#8c61a6] hover:bg-[#67417e] p-4 block h-full text-white/0 hover:text-white transition-all"
      >
        <!-- Nombre -->
        <div class="text-center  font-semibold mb-2">
          {{ taller.nombre }}
        </div>
        <!-- Espacio para imagen -->
        <div class="overflow-hidden rounded">
          <img
            :src="`/images/${taller.imagen}`"
            class="object-cover w-full h-64"
            alt=""
          >
        </div>
      </RouterLink>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  </div>
 
</template>