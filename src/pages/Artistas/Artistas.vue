<script setup lang="ts">
import { RouterLink } from "vue-router"
import { artistas } from "@/data/artistas"
</script>

<template>
  <div>

    <div v-for="artista in artistas" :key="artista.id">
      <RouterLink :to="`/artistas/${artista.id}`">
        {{ artista.nombre }}
      </RouterLink>
    </div>
  </div>
</template>