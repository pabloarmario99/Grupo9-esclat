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
  <div class="w-full mt-20">
    <section class="bg-white text-[#371e58] flex flex-col relative">

  <!-- CLAIM OVERLAY -->
  <div class="absolute inset-0 z-10 flex items-center pt-40 px-6 pointer-events-none">
    <h1 class="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
      Festival de música y artistas emergentes.
    </h1>
  </div>

  <!-- HERO CAROUSEL -->
  <Carousel
    :plugins="[Autoplay({ delay: 3500 })]"
    :opts="{ align: 'start', loop: true }"
  >
    <CarouselContent>
      <CarouselItem v-for="n in 6" :key="n" class="p-0 basis-full">
        <div class="w-screen h-[80vh]">
          <img
            :src="`/images/grupo${n}.jpg`"
            class="w-full h-100 object-cover"
          />
        </div>
      </CarouselItem>
    </CarouselContent>
  </Carousel>

</section>

    <section class="px-6  pt-5 pb-28 bg-white text-[#371e58]">

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 class="text-5xl font-bold mb-6">Filosofía</h2>

          <p class="text-lg leading-relaxed mb-4">
            Esclat es un espacio donde conviven distintas formas de creación contemporánea.
          </p>

          <p class="text-lg leading-relaxed">
            Música, performance y arte visual dentro de un mismo entorno abierto.
          </p>
        </div>

        <div class="h-[60vh] overflow-hidden">
          <img src="/images/grupo4.jpg" class="w-full h-full object-cover" />
        </div>

      </div>
    </section>


    <!-- ARTISTAS + TALLERES (MORADO) -->
    <section class="py-32 px-6 bg-[#371e58] text-white">

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div class="h-[70vh] overflow-hidden">
          <img src="/images/grupo2.jpg" class="w-full h-full object-cover" />
        </div>

        <div>
          <h2 class="text-5xl font-bold mb-6">Artistas y talleres</h2>

          <p class="text-lg leading-relaxed mb-6">
            Proyectos musicales, talleres creativos y encuentros que forman parte del festival.
          </p>
		  <div class="flex flex-col w-fit gap-8">
			<RouterLink
            to="/artistas"
            class="inline-block px-6 py-3 bg-white text-[#371e58] font-medium rounded-xl hover:bg-[#ef5da2] hover:text-white transition"
          >
            Ver artistas
          </RouterLink>
			<RouterLink
        to="/programa"
        class="inline-block px-6 py-3 bg-white text-[#371e58] font-medium rounded-xl hover:bg-[#ef5da2] hover:text-white transition"
      >
        Ver programación completa
      </RouterLink>
		  </div>
        </div>
      </div>

    </section>

    <!-- LAS NAVES (BLANCO) -->
    <section class="py-32 px-6 bg-white text-[#371e58]">

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 class="text-5xl font-bold mb-6">Las Naves</h2>

          <p class="text-lg leading-relaxed mb-4">
            Un antiguo espacio industrial convertido en centro cultural en Valencia.
          </p>

          <p class="text-lg leading-relaxed">
            Patio con DJ, comida local y actividades durante todo el día.
          </p>

        </div>

        <!-- CAROUSEL NAVES -->
        <Carousel
          :plugins="[Autoplay({ delay: 3000 })]"
          :opts="{ align: 'start', loop: true }"
        >
          <CarouselContent>
            <CarouselItem v-for="n in 6" :key="n" class="p-0 basis-full">
              <div class="w-full h-[70vh]">
                <img
                  :src="`/images/grupo${n}.jpg`"
                  class="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

      </div>

    </section>

  </div>
</template>