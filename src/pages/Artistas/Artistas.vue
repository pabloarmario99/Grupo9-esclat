<script setup lang="ts">
import { RouterLink } from "vue-router"
import { artistas } from "@/data/artistas"
</script>

<template>
  <div class="flex flex-wrap gap-4 p-4">
    <RouterLink 
      v-for="artista in artistas" 
      :key="artista.id"
      :to="`/artistas/${artista.id}`"
      class="bg-[#ef5da2] p-4 w-50"
    >
      <!-- Espacio para imagen -->
      <div class="bg-white h-39 mb-2"></div>
      
      <!-- Nombre -->
      <div class="text-center text-white font-semibold">
        {{ artista.nombre }}
      </div>
    </RouterLink>
  </div>
</template>