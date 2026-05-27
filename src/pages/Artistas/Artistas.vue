<script setup lang="ts">
import { RouterLink } from "vue-router"
import { artistas } from "@/data/artistas"
import { talleres } from "@/data/talleres"
</script>

<template>
  <div class="bg-[#633e93] text-white">
    <p>Grupos</p>
 <section class="flex flex-wrap gap-4 p-4">
  
    <RouterLink 
      v-for="artista in artistas" 
      :key="artista.id"
      :to="`/artistas/${artista.id}`"
      class="bg-[#8c61a6] p-4 w-60 h-90"
    >
    <!-- Nombre -->
      <div class="text-center text-white font-semibold">
        {{ artista.nombre }}
      </div>
      <!-- Espacio para imagen -->
      <div>
         <img
          :src="`/images/${artista.imagen}`"
          class="object-cover h-80"
          >
      </div>
      
      
    </RouterLink>
  </section>
<p>Talleres y charlas</p>
  <section class="flex flex-wrap gap-4 p-4">
    
    <RouterLink 
      v-for="taller in talleres" 
      :key="taller.id"
      :to="`/talleres/${taller.id}`"
      class="bg-[#ef5da2] p-4 w-50"
    >
      <!-- Espacio para imagen -->
      <div class="bg-white h-39 mb-2"></div>
      
      <!-- Nombre -->
      <div class="text-center text-white font-semibold">
        {{ taller.nombre }}
      </div>
    </RouterLink>
  </section>
  </div>
 
</template>