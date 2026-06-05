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
  <div class="w-full relative overflow-x-hidden">
    
    <section class="relative flex flex-col bg-[#eb378d]">

  <img
    src="/images/estampado_esclat.png"
    alt=""
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
  />

  <section class="w-full mt-10 sm:mt-10 md:mt-12 lg:mt-0 mb-2 sm:mb-3 md:mb-4 lg:mb-6 lg:relative z-10">
    <h1 class="relative z-10 pl-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-medium text-left text-[#ffffff] pt-20 sm:pt-20 md:pt-20 lg:pt-24 xl:pt-28 mb-3">
      INFORMACIÓN
    </h1>
   <p class="programa-intro-text px-6">
  Descubre qué es Esclat y la visión que impulsa el festival. Explora su filosofía, conoce el papel de los artistas y talleres que forman parte de la programación y adéntrate en Las Naves, el espacio que acoge este encuentro creativo. Una guía para entender el proyecto, su comunidad y todo lo que sucede detrás de cada edición.
</p>
  </section>

  

</section>

    <section class="relative bg-[#371e58]">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />
      
      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-[#bdd434] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 uppercase">Filosofía</h2>
          <p class="text-white/90 text-base leading-relaxed font-medium">
            Esclat nace como una plataforma cercana, interactiva y diversa para artistas emergentes. Un lugar donde la escritura, las artes visuales, la música y el pensamiento se encuentran para celebrar el trabajo creativo, abrir conversación e inspirar nuevas formas de mirar.
          </p>
        </div>
        <div class="h-[60vh]">
          <img src="/images/las petunias.jpg" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

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
            El festival ensalza las initiatives colectivas y la colaboración como motor de ideas más vivas. Por eso el público también forma parte del proceso: talleres, debates, conciertos, concursos y encuentros pensados para activar una comunidad creativa.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink
              to="/artistas"
              class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-8 py-4 hover:bg-white hover:text-[#eb378d] transition-all duration-200"
            >
              Ver artistas
            </RouterLink>
            <RouterLink
              to="/programa"
              class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-8 py-4 hover:bg-white hover:text-[#eb378d] transition-all duration-200"
            >
              Ver programación
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="relative bg-[#371e58]">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />

      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-[#bdd434] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 uppercase">Las Naves</h2>
          <p class="text-white/90 text-base leading-relaxed font-medium mb-8">
            En Las Naves, Esclat convierte el encuentro en una oportunidad efímera para dialogar, explorar y disfrutar. Durante el festival, cada espacio se abre a la mezcla entre disciplinas, personas y proyectos que solo pueden aparecer cuando se crea en común.
          </p>
        </div>

        <Carousel
          :plugins="[Autoplay({ delay: 3000 })]"
          :opts="{ align: 'start', loop: true }"
        >
          <CarouselContent>
            <CarouselItem v-for="n in 3" :key="n" class="basis-full">
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

    <!-- ÚLTIMA SECCIÓN MODIFICADA -->
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
    <RouterLink
      to="/esclat/characters"
      class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#bdd434] hover:text-[#371e58] hover:scale-105 transition-all duration-200"
    >
      Personajes
    </RouterLink>

    <a
      href="https://media.upv.es/player/?id=e82f8410-611d-11f1-9113-9f2411f7738e"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#bdd434] hover:text-[#371e58] hover:scale-105 transition-all duration-200"
    >
      Spot
    </a>
  </div>
</div>

  </div>
</template>

<style scoped>
.programa-intro-text {
  margin: 1rem 0 1.5rem;
  font-size: clamp(0.9rem, 2.35vw, 1.08rem);
  font-weight: 500;
  line-height: 1.45;
  color: #ffffff;
}

@media (min-width: 1024px) {
  .programa-intro-text {
    margin-top: 2rem;
    font-size: clamp(0.95rem, 1.45vw, 1.06rem);
  }
}
</style>