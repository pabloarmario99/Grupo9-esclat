<script setup lang="ts">
import { useRoute } from "vue-router"
import { artistas } from "@/data/artistas"

const route = useRoute()

const artista = artistas.find(
  a => a.id === Number(route.params.id)
)
</script>

<template>
  <div class="detail-page relative overflow-x-hidden">
    <img
      src="/images/estampado_esclat.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover texture-multiply opacity-85"
    >

    <div v-if="artista" class="relative z-10 flex flex-col ml-10 my-50">
      <h1
      class="font-bold text-2xl"
      >{{ artista.nombre }}</h1>
      <p>{{ artista.descripcion }}</p>
      <p>Horario: {{ artista.actuacion }}</p>
      <RouterLink to="/artistas" class="text-[#eb378d] hover:font-medium transition-all">
            Volver
      </RouterLink>
    </div>
  </div>
  
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  background-color: #eb378d;
  isolation: isolate;
}

.texture-multiply {
  mix-blend-mode: multiply;
}
</style>