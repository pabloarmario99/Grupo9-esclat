<script lang="ts" setup>
import { computed, ref } from "vue"
import { RouterLink } from "vue-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { artistas } from "@/data/artistas"
import { talleres } from "@/data/talleres"
import { puestos } from "@/data/puestos"
import { 
  horas, 
  escenarios, 
  generarCeldasEscenario, 
  esConcierto,
  type FranjaHoraria,
  type Concierto 
} from "@/data/horariosData"

defineProps<{
  horarioDia: FranjaHoraria[]
}>()

// Estado para almacenar el artista clickeado y pasárselo al único Drawer
const eventoSeleccionado = ref<Concierto | null>(null)

const seleccionarEvento = (evento: any) => {
  if (esConcierto(evento)) {
    eventoSeleccionado.value = evento
  }
}

const normalizarNombre = (valor: string) => {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()
}

const aliasArtistas = new Map<string, number>([
  ["eddsh", 10],
])

const aliasTalleres = new Map<string, number>([
  ["tallerdefotografia", 1],
  ["mesaredondademusica", 2],
  ["sesiondecine", 3],
  ["torneodevideojuegos", 4],
  ["charlasobreilustracion", 8],
  ["tallerdeceramica", 9],
  ["batalladebaile", 10],
  ["mesaredondaartesgraficas", 6],
  ["tallerconcursodecomic", 7],
  ["mesaredondadeliteratura", 11],
])

const aliasPuestos = new Map<string, number>([])

const mapaArtistas = computed(() => {
  const mapa = new Map<string, number>()
  artistas.forEach((artista) => {
    mapa.set(normalizarNombre(artista.nombre), artista.id)
  })
  return mapa
})

const mapaTalleres = computed(() => {
  const mapa = new Map<string, number>()
  talleres.forEach((taller) => {
    mapa.set(normalizarNombre(taller.nombre), taller.id)
  })
  return mapa
})

const mapaPuestos = computed(() => {
  const mapa = new Map<string, number>()
  puestos.forEach((puesto) => {
    mapa.set(normalizarNombre(puesto.nombre), puesto.id)
  })
  return mapa
})

const detalleLink = computed(() => {
  const nombre = eventoSeleccionado.value?.artista
  if (!nombre) return null

  const clave = normalizarNombre(nombre)
  const evento = eventoSeleccionado.value

  if (evento?.genero === "Taller") {
    const tallerId = aliasTalleres.get(clave) ?? mapaTalleres.value.get(clave)
    return tallerId
      ? { path: `/artistas/taller/${tallerId}`, label: "Ver detalles del taller" }
      : { path: "/artistas", label: "Ver talleres" }
  }

  if (clave.includes("puesto") || clave.includes("puestos")) {
    return { path: "/artistas", label: "Ver puestos" }
  }

  const puestoId = aliasPuestos.get(clave) ?? mapaPuestos.value.get(clave)
  if (puestoId) {
    return { path: `/artistas/puesto/${puestoId}`, label: "Ver detalles del puesto" }
  }

  const artistaId = aliasArtistas.get(clave) ?? mapaArtistas.value.get(clave)
  return artistaId
    ? { path: `/artistas/${artistaId}`, label: "Ver detalles del artista" }
    : { path: "/artistas", label: "Ver artistas" }
})
</script>

<template>
  <div class="contenedor-tabla-desktop hidden xl:block w-full overflow-x-hidden">
    <Drawer>
      <Table class="programa-table table-fixed rounded-none bg-transparent w-full">
        <TableHeader class="bg-transparent">
          <TableRow class="border-none bg-transparent header-row">
            <TableHead class="w-48 min-w-48 max-w-48 pr-4 text-xs md:text-sm font-extrabold text-[#eb378d] border-0 align-top text-left whitespace-normal wrap-break-word leading-tight">
              Escenario
            </TableHead>
            <TableHead
              v-for="(hora, index) in horas"
              :key="`hora-${index}`"
              class="text-xs md:text-xs font-extrabold text-[#eb378d] border-0 align-middle text-center whitespace-nowrap"
            >
              {{ hora }}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="escenario in escenarios"
            :key="escenario.key"
            class="escenario-row border-none bg-transparent"
          >
            <TableCell class="w-48 min-w-48 max-w-48 p-1 pr-4 text-xs md:text-sm font-extrabold text-[#eb378d] align-top border-0 whitespace-normal wrap-break-word leading-tight bg-transparent">
              {{ escenario.label }}
            </TableCell>

            <template v-for="(item, index) in generarCeldasEscenario(horarioDia, escenario.key)" :key="`${escenario.key}-${index}`">
              <TableCell
                :colspan="item.span"
                :class="[
                  'align-top p-1 border-0 h-full celda-actividad overflow-hidden',
                  esConcierto(item.celda) ? 'bg-[#eb378d] cursor-pointer' : 'bg-[#eb378d]/20'
                ]"
                @click="seleccionarEvento(item.celda)"
              >
                <DrawerTrigger v-if="esConcierto(item.celda)" as-child>
                  <div class="programa-card group p-2 rounded-none flex flex-col justify-center h-full w-full box-border overflow-hidden">
                    <div class="font-semibold text-[clamp(9px,0.62vw,11px)] 2xl:text-xs text-[#371e58] whitespace-normal break-normal text-balance leading-tight inline-block transition-transform duration-200 group-hover:text-white origin-center">
                      {{ item.celda.artista }}
                    </div>
                  </div>
                </DrawerTrigger>
                
                <div v-else class="programa-card p-2 rounded-none h-full w-full box-border"></div>
              </TableCell>
            </template>
          </TableRow>
        </TableBody>
      </Table>

      <DrawerContent class="bg-[#371e58] border-t-2 border-[#eb378d] text-[#ffffff] rounded-t-none">
        <div class="mx-auto w-full max-w-sm uppercase text-center p-6">
          <DrawerHeader class="p-0 mb-6">
            <p class="text-xs font-bold text-[#eb378d] tracking-widest mb-1">{{ eventoSeleccionado?.genero }}</p>
            <DrawerTitle class="text-3xl font-black text-[#ffffff] leading-none tracking-tight">
              {{ eventoSeleccionado?.artista }}
            </DrawerTitle>
            <DrawerDescription class="text-xs font-bold text-[#eb378d]/70 mt-2">
              HORARIO: {{ eventoSeleccionado?.hora }} H
            </DrawerDescription>
          </DrawerHeader>

          <div class="p-2">
            <RouterLink v-if="detalleLink" :to="detalleLink.path" class="block">
              <Button class="w-full bg-[#eb378d] text-[#371e58] hover:bg-[#ffffff] hover:text-[#eb378d] font-black tracking-wider py-6 rounded-none uppercase transition-colors duration-200">
                {{ detalleLink?.label }}
              </Button>
            </RouterLink>
            <Button v-else disabled class="w-full bg-[#eb378d]/50 text-[#371e58]/70 font-black tracking-wider py-6 rounded-none uppercase cursor-not-allowed">
              Ver detalles
            </Button>
          </div>

          <DrawerFooter class="p-0 mt-4">
            <DrawerClose as-child>
              <Button variant="outline" class="w-full bg-transparent border border-[#eb378d] text-[#eb378d] hover:bg-[#eb378d]/10 font-bold rounded-none uppercase">
                Cerrar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<style scoped>
.contenedor-tabla-desktop :deep(.programa-table) {
  border-collapse: separate !important;
  border-spacing: 4px 8px !important;
}

.programa-card {
  min-height: 54px;
}

.contenedor-tabla-desktop :deep(tr),
.contenedor-tabla-desktop :deep(tr:hover),
.contenedor-tabla-desktop :deep([data-slot="table-row"]:hover) {
  background-color: transparent !important;
  background: transparent !important;
  border: 0 !important;
}

.contenedor-tabla-desktop :deep(th),
.contenedor-tabla-desktop :deep(td) {
  border: 0 !important;
}
</style>