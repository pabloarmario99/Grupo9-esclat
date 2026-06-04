<script lang="ts" setup>
import { RouterLink } from "vue-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Importar los nuevos componentes modulares con tus rutas correctas
import ProgramaHeader from "@/components/ui/programa/ProgramaHeader.vue"
import HorariosDesktop from "@/components/ui/programa/HorariosDesktop.vue"
import HorariosMobile from "@/components/ui/programa/HorariosMobile.vue"

// Importar los datos limpios desde tu ruta asignada
import { mapaHorarios } from "@/data/horariosData"
</script>

<template>
  <section class="page relative uppercase text-[#371e58] overflow-x-hidden">
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85 scale-100 sm:scale-100 md:scale-100 translate-x-0 sm:translate-x-0 md:translate-x-0"
    />

    <div class="relative z-10 w-full max-w-none">
      <ProgramaHeader />

      <div class="w-full mt-14 sm:mt-16 md:mt-20 bg-[#371e58] py-10 sm:py-12 md:py-14">
        <div class="mx-6 mb-16 sm:mb-24 md:mx-10 lg:mb-32 lg:mx-14">
          <p class="text-[#eb378d] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[0.2em] mt-3 sm:mt-4 md:mt-5 mb-12 sm:mb-16">
            HORARIOS
          </p>

          <Tabs default-value="viernes" class="w-full">
            <TabsList class="flex justify-start items-center gap-8 mb-3 bg-transparent text-[#eb378d] h-auto p-0 rounded-none w-full">
              <TabsTrigger value="viernes" class="tab-trigger-custom">26</TabsTrigger>
              <TabsTrigger value="sabado" class="tab-trigger-custom">27</TabsTrigger>
              <TabsTrigger value="domingo" class="tab-trigger-custom">28</TabsTrigger>
            </TabsList>

            <TabsContent v-for="(horarioDia, dia) in mapaHorarios" :key="dia" :value="dia" class="w-full">
              <HorariosDesktop :horario-dia="horarioDia" />

              <HorariosMobile :horario-dia="horarioDia" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>

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
      class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#bcd432] hover:text-[#371e58] hover:scale-105 transition-all duration-200"
    >
      Personajes
    </RouterLink>

    <button
      type="button"
      class="inline-block bg-[#371e58] text-white uppercase font-bold tracking-widest text-base px-10 py-5 hover:bg-[#bcd432] hover:text-[#371e58] hover:scale-105 transition-all duration-200"
    >
      Spot
    </button>
  </div>
</div>
  </section>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 0;
  background: #eb378d;
}

.texture-multiply {
  mix-blend-mode: multiply;
}

.tab-trigger-custom {
  padding: 0;
  font-size: 6rem;
  font-weight: 500;
  display: inline-block;
  color: rgba(235, 55, 141, 0.4);
  background-color: transparent;
  border-radius: 0;
  transition: color 0.2s ease, transform 0.2s ease;
  transform: scale(1);
}
@media (min-width: 640px) {
  .tab-trigger-custom { font-size: 8rem; }
}

.tab-trigger-custom[data-state="active"] {
  color: #eb378d !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.tab-trigger-custom:hover {
  transform: scale(1.03);
}

.nav-link-custom {
  display: inline-block;
  background-color: #ffffff;
  color: #eb378d;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 1.125rem;
  padding: 1.5rem 3.5rem;
  transition: color 0.2s, background-color 0.2s, transform 0.2s;
  transform: scale(1);
}

.nav-link-custom:hover {
  background-color: #371e58;
  color: #ffffff;
  transform: scale(1.03);
}
</style>