<script lang="ts" setup>
import { ref } from "vue"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const imagenesCarrusel = ref([
  { src: "/images/tronkas.jpg", alt: "Fondo Festival 1" },
  { src: "/images/taller comic.png",  alt: "Ambiente Festival 2" },
  { src: "/images/las petunias.jpg",  alt: "Concierto Festival 3" },
  { src: "/images/nuevos vicios.jpg",  alt: "Público Festival 4" },
  { src: "/images/taller1.jpg",  alt: "Taller Festival 5" }
])
</script>

<template>
  <div class="w-full px-6 md:px-10 lg:px-14 mt-10 sm:mt-10 md:mt-12 lg:mt-0 mb-2 sm:mb-3 md:mb-4 lg:mb-6 lg:relative">
    <h1 class="relative z-10 mt-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-medium text-left text-[#ffffff] pt-20 sm:pt-20 md:pt-20 lg:pt-24 xl:pt-28 mb-3">
      PROGRAMACIÓN
    </h1>
  </div>

  <section class="programa-intro mx-6 md:mx-10 lg:mx-14 mt-14 sm:mt-16 md:mt-20 lg:mt-24 mb-8 sm:mb-10 md:mb-12">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <div class="lg:w-[46%]">
        <h2 class="programa-intro-title">Tres dias para perder la nocion del tiempo</h2>
        <p class="programa-intro-text">
          Del primer beat al ultimo cierre, cada escenario tiene su propio pulso. Recorre LAS NAVES, mezcla estilos y vive el festival a tu manera.

Déjate llevar las Tronkas!, La Plata o Las Petunias y talleres de ilustración, fotografía y cómic. Explora exposiciones de fanzines, torneos de videojuegos, cine y mesas redondas. Una programación ininterrumpida para exprimir el arte, la música y los puestos artísticos a tu propio ritmo.
        </p>
        <p class="mt-6 max-w-[62ch] text-[clamp(0.9rem,2.35vw,1.08rem)] font-medium leading-[1.35] normal-case text-[#ffffff]">
          ¿Listo para comenzar tu ruta por Esclat?
        </p>
      </div>

      <div class="w-full lg:w-[50%] lg:shrink-0 translate-x-2 overflow-hidden">
        <Carousel
          :plugins="[Autoplay({ delay: 3500 })]"
          :opts="{ align: 'start', loop: true }"
          class="w-full"
        >
          <CarouselContent class="ml-0">
            <CarouselItem 
              v-for="(imagen, idx) in imagenesCarrusel" 
              :key="'slide-' + idx" 
              class="pl-0 basis-full"
            >
              <img
                :src="imagen.src"
                :alt="imagen.alt"
                class="block w-full h-auto lg:min-h-96 object-cover object-center"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<style scoped>
.programa-intro { padding: 0; }
.programa-intro-kicker { margin: 0; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.12em; color: #ffffff; }
.programa-intro-title { margin: 0.4rem 0 0; font-size: clamp(1.6rem, 5vw, 3rem); font-weight: 500; line-height: 0.95; color: #ffffff; }
.programa-intro-text { margin: 2.8rem 0 0; max-width: 62ch; font-size: clamp(0.9rem, 2.35vw, 1.08rem); font-weight: 500; line-height: 1.35; text-transform: none; color: #ffffff; }

@media (min-width: 1024px) {
  .programa-intro-title { margin-top: 0; font-size: clamp(2.2rem, 3.6vw, 3.1rem); line-height: 1; }
  .programa-intro-text { margin-top: 2rem; font-size: clamp(0.95rem, 1.45vw, 1.06rem); max-width: 54ch; }
}
</style>