import { createRouter, createWebHashHistory } from "vue-router"

// páginas
import Home from "@/pages/home/Home.vue"
import Esclat from "@/pages/Esclat/Esclat.vue"
import Programa from "@/pages/Programa/Programa.vue"
import Artistas from "@/pages/Artistas/Artistas.vue"
import ArtistaDetail from "@/pages/Artistas/ArtistaDetail.vue"
import TallerDetail from "@/pages/Artistas/TallerDetail.vue"
import PuestoDetail from "@/pages/Artistas/PuestoDetail.vue"
import EntradasAcceso from "@/pages/EntradasAcceso/EntradasAcceso.vue"
import Merch from "@/pages/merch/Merch.vue" // <-- nuevo import
import Characters from "@/pages/characters/Characters.vue" 
import CharactersDetail from "@/pages/characters/CharactersDetail.vue"  

// layout
import Layout from "@/pages/Layout/Layout.vue"

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    // HOME sin layout
    {
      path: "/",
      name: "home",
      component: Home
    },

    // TODO lo demás con layout
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "esclat",
          name: "esclat",
          component: Esclat
        },
        {
          path: "programa",
          name: "programa",
          component: Programa
        },

        {
  path: "esclat/characters",
  name: "characters",
  component: Characters
},

{
          path: "esclat/characters/:id",
          name: "character-detail",
          component: CharactersDetail
        },

{
  path: "entradas-acceso/merch",
  name: "merch",
  component: Merch
},

        // ARTISTAS
        {
          path: "artistas",
          name: "artistas",
          component: Artistas
        },
        {
          path: "artistas/:id",
          name: "artista-detail",
          component: ArtistaDetail
        },

        // TALLERES
        {
          path: "artistas/taller/:id",
          name: "taller-detail",
          component: TallerDetail
        },

        {
          path: "artistas/puesto/:id",
          name: "puesto-detail",
          component: PuestoDetail
        },

        {
          path: "entradas-acceso",
          name: "entradas-acceso",
          component: EntradasAcceso
        }
      ]
    },

    // fallback
    {
      path: "/:pathMatch(.*)*",
      redirect: "/"
    }
  ],

  // SCROLL AUTOMÁTICO ARRIBA
  scrollBehavior(_,__, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})