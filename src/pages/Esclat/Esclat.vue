<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import { RouterLink } from "vue-router"
</script>

<template>
  <div class="w-full mt-20 relative overflow-x-hidden">
    
    <!-- HERO SECTION - ROSA -->
    <section class="relative flex flex-col bg-[#eb378d]">
      
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />

      <div class="absolute inset-0 z-10 flex items-center px-6 md:px-10 lg:px-14 pointer-events-none">
        <h1 class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none max-w-4xl uppercase">
          Festival de creación<br>emergente y comunidad
        </h1>
      </div>

      <Carousel
        class="relative z-10"
        :plugins="[Autoplay({ delay: 3500 })]"
        :opts="{ align: 'start', loop: true }"
      >
        <CarouselContent>
          <CarouselItem v-for="n in 4" :key="n" class="basis-full">
            <div class="w-screen h-[50vh]">
              <img
                :src="`/images/naves${n}.jpg`"
                class="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

    </section>

    <!-- FILOSOFÍA - MORADO -->
    <section class="relative bg-[#371e58]">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />
      
      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-[#eb378d] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 uppercase">Filosofía</h2>
          <p class="text-white/90 text-base leading-relaxed font-medium">
            Esclat nace como una plataforma cercana, interactiva y diversa para artistas emergentes. Un lugar donde la escritura, las artes visuales, la música y el pensamiento se encuentran para celebrar el trabajo creativo, abrir conversación e inspirar nuevas formas de mirar.
          </p>
        </div>
        <div class="h-[60vh]">
          <img src="/images/las petunias.jpg" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- ARTISTAS + TALLERES - ROSA -->
    <section class="relative bg-[#eb378d]">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />

      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div class="h-[70vh] order-2 md:order-1">
          <img src="/images/amigasadios2.webp" class="w-full h-full object-cover" />
        </div>

        <div class="order-1 md:order-2">
          <h2 class="text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 uppercase">Artistas y talleres</h2>
          <p class="text-white/90 text-base leading-relaxed font-medium mb-8">
            El festival ensalza las iniciativas colectivas y la colaboración como motor de ideas más vivas. Por eso el público también forma parte del proceso: talleres, debates, conciertos, concursos y encuentros pensados para activar una comunidad creativa.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink
              to="/artistas"
              class="inline-block bg-white text-[#eb378d] uppercase font-bold tracking-widest text-base px-8 py-4 hover:bg-[#371e58] hover:text-white hover:scale-105 transition-all duration-200"
            >
              Ver artistas
            </RouterLink>
            <RouterLink
              to="/programa"
              class="inline-block bg-white text-[#eb378d] uppercase font-bold tracking-widest text-base px-8 py-4 hover:bg-[#371e58] hover:text-white hover:scale-105 transition-all duration-200"
            >
              Ver programación
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- LAS NAVES - MORADO -->
    <section class="relative bg-[#371e58]">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />

      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-[#eb378d] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 uppercase">Las Naves</h2>
          <p class="text-white/90 text-base leading-relaxed font-medium mb-8">
            En Las Naves, Esclat convierte el encuentro en una oportunidad efímera para dialogar, explorar y disfrutar. Durante el festival, cada espacio se abre a la mezcla entre disciplinas, personas y proyectos que solo pueden aparecer cuando se crea en común.
          </p>
        </div>

        <Carousel
          :plugins="[Autoplay({ delay: 3000 })]"
          :opts="{ align: 'start', loop: true }"
        >
          <CarouselContent>
            <CarouselItem v-for="n in 4" :key="n" class="basis-full">
              <div class="h-[70vh]">
                <img
                  :src="`/images/naves${n}.jpg`"
                  class="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>

    <!-- NAVEGACIÓN FINAL - ROSA -->
    <div class="relative flex flex-col items-center text-center bg-[#eb378d] px-6 md:px-10 lg:px-14 py-32">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />
      
      <p class="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight uppercase mb-20">
        Sigue explorando Esclat
      </p>
      <div class="relative z-10 flex flex-wrap justify-center gap-8">
        <RouterLink to="/" class="inline-block bg-white text-[#eb378d] uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#371e58] hover:text-white hover:scale-105 transition-all duration-200">Home</RouterLink>
        <RouterLink to="/esclat" class="inline-block bg-white text-[#eb378d] uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#371e58] hover:text-white hover:scale-105 transition-all duration-200">Esclat</RouterLink>
        <RouterLink to="/artistas" class="inline-block bg-white text-[#eb378d] uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#371e58] hover:text-white hover:scale-105 transition-all duration-200">Artistas</RouterLink>
        <RouterLink to="/programa" class="inline-block bg-white text-[#eb378d] uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#371e58] hover:text-white hover:scale-105 transition-all duration-200">Programa</RouterLink>
      </div>
    </div>

  </div>
</template>
