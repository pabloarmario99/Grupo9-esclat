<script setup lang="ts">
import { useRoute } from "vue-router"
import { artistas } from "@/data/artistas"

const route = useRoute()

const artista = artistas.find(
  a => a.id === Number(route.params.id)
)
</script>

<template>
  <div v-if="artista" class="flex flex-col ml-10 my-50 ">
    <h1>{{ artista.nombre }}</h1>
    <p>{{ artista.descripcion }}</p>
    <RouterLink to="/artistas" class="hover:font-medium transition-all">
          Volver
    </RouterLink>
  </div>
  
</template>