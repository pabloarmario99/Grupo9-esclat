import { createRouter, createWebHashHistory } from "vue-router";

// páginas
import Home from "@/pages/home/Home.vue";
import Esclat from "@/pages/Esclat/Esclat.vue";
import Programa from "@/pages/Programa/Programa.vue";
import Artistas from "@/pages/Artistas/Artistas.vue";
import ArtistaDetail from "@/pages/Artistas/ArtistaDetail.vue";
import EntradasAcceso from "@/pages/EntradasAcceso/EntradasAcceso.vue";

// layout
import Layout from "@/pages/Layout/Layout.vue";
import TallerDetail from "@/pages/Artistas/TallerDetail.vue";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // Home SIN layout
    {
      path: "/",
      name: "home",
      component: Home
    },

    // Todas estas CON layout
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
  path: "/",
  component: Layout,
  children: [
    {
      path: "artistas",
      children: [
        {
          path: "",
          name: "artistas",
          component: Artistas
        },
        {
          path: ":id",
          name: "artista-detail",
          component: ArtistaDetail
        },
        {
          path: ":id",
          name: "taller-detail",
          component: TallerDetail
        },
      ]
    }
  ]
},
        {
          path: "entradas-acceso",
          name: "entradas-acceso",
          component: EntradasAcceso
        }
      ]
    },

    { path: "/:pathMatch(.*)*", redirect: "/" }
  ]
});