import { createRouter, createWebHashHistory } from "vue-router";

// Páginas del Festival ESCLAT
import Home from "@/pages/home/Home.vue";
import Esclat from "@/pages/Esclat/Esclat.vue";
import Programa from "@/pages/Programa/Programa.vue";
import Artistas from "@/pages/Artistas/Artistas.vue";
import EntradasAcceso from "@/pages/EntradasAcceso/EntradasAcceso.vue";

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/esclat",
            name: "esclat",
            component: Esclat
        },
        {
            path: "/programa",
            name: "programa",
            component: Programa
        },
        {
            path: "/artistas",
            name: "artistas",
            component: Artistas
        },
        {
            path: "/entradas-acceso",
            name: "entradas-acceso",
            component: EntradasAcceso
        },
        // Redirección por si el usuario escribe una ruta que no existe
        { path: "/:pathMatch(.*)*", redirect: "/" }
    ]
});