<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { artistinfo, type Artistinfo } from './data';


const route = useRoute()

const router = useRouter()

const artist = ref<Artistinfo | undefined>(
  artistinfo.find(char => char.id === Number(route.params.id))
)

</script>

<template>
    <div>
        <section v-if="artist" class="flex flex-col-reverse justify-center gap-10 pl-15 pr-10 pt-10 sm:pl-10 md:flex-row md:pl-0 md:pt-15 md:gap-3 md:text-[15px] lg:pl-10 lg:gap-2 lg:text-base transition-all">
            <div class="relative group inline-block leading-none w-fit h-fit shrink-0 self-center md:self-auto">
                <img 
                :src="`/images//${artist.image}`"
                class="block h-120 w-auto object-contain transition-all duration-200 ease-out hover:scale-102 hover:opacity-70"
                @click="router.push({ path: '/visitor/character', query: { page: String(route.query.page ?? 1) } })"
                />
            </div>
            
            <div class="flex flex-col gap-3 lg:gap-5">
            <h1 class="font-bold text-3xl" > 
                {{ artist.name }}
            </h1>
            <p class="text-justify">
                {{ artist.description }}                               
            </p >
            </div>
    </section>
    </div>
    
    
</template>

<style scoped>

</style>
