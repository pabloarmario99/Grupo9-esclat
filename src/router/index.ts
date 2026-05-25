import { createRouter, createWebHashHistory } from "vue-router";

// páginas
import Home from "@/pages/home/Home.vue";
import Esclat from "@/pages/Esclat/Esclat.vue";
import Programa from "@/pages/Programa/Programa.vue";
import Artistas from "@/pages/Artistas/Artistas.vue";
import EntradasAcceso from "@/pages/EntradasAcceso/EntradasAcceso.vue";

// layout
import Layout from "@/pages/Layout/Layout.vue";

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
          path: "artistas",
          name: "artistas",
          component: Artistas
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