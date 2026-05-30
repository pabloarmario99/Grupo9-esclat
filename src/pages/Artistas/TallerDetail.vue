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
    <h1>{{ taller.nombre }}</h1>
    <p>{{ taller.descripcion }}</p>
    <RouterLink to="/artistas" class="hover:font-medium transition-all">
          Volver
    </RouterLink>
  </div>
</template>