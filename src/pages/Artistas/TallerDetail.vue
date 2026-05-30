<script setup lang="ts">
import { useRoute } from "vue-router"
import { talleres } from "@/data/talleres"

const route = useRoute()

const taller = talleres.find(
  a => a.id === Number(route.params.id)
)
</script>

<template>
  <div v-if="taller" class="flex flex-col ml-10 my-50">
    <h1
    class="font-bold text-2xl"
    >{{ taller.nombre }}</h1>
    <p>{{ taller.descripcion }}</p>
    <p>Horario: {{ taller.horario }}</p>
    <RouterLink to="/artistas" class=" text-[#ef5da2] hover:font-medium transition-all">
          Volver
    </RouterLink>
  </div>
</template>