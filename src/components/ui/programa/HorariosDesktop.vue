<script lang="ts" setup>
import { ref } from "vue"
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
</script>

<template>
  <div class="contenedor-tabla-desktop hidden xl:block w-full overflow-x-hidden">
    <Drawer>
      <Table class="programa-table table-fixed rounded-none bg-transparent w-full">
        <TableHeader class="bg-transparent">
          <TableRow class="border-none bg-transparent header-row">
            <TableHead class="w-48 min-w-48 max-w-48 pr-4 text-xs md:text-sm font-extrabold text-[#ef5da2] border-0 align-top text-left whitespace-normal wrap-break-word leading-tight">
              Escenario
            </TableHead>
            <TableHead
              v-for="(hora, index) in horas"
              :key="`hora-${index}`"
              class="text-xs md:text-xs font-extrabold text-[#ef5da2] border-0 align-middle text-center whitespace-nowrap"
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
            <TableCell class="w-48 min-w-48 max-w-48 p-1 pr-4 text-xs md:text-sm font-extrabold text-[#ef5da2] align-top border-0 whitespace-normal wrap-break-word leading-tight bg-transparent">
              {{ escenario.label }}
            </TableCell>

            <template v-for="(item, index) in generarCeldasEscenario(horarioDia, escenario.key)" :key="`${escenario.key}-${index}`">
              <TableCell
                :colspan="item.span"
                :class="[
                  'align-top p-1 border-0 h-full celda-actividad overflow-hidden',
                  esConcierto(item.celda) ? 'bg-[#ef5da2] cursor-pointer' : 'bg-[#ef5da2]/20'
                ]"
                @click="seleccionarEvento(item.celda)"
              >
                <DrawerTrigger v-if="esConcierto(item.celda)" as-child>
                  <div class="programa-card group p-2 rounded-none flex flex-col justify-center h-full w-full box-border overflow-hidden">
                    <div class="font-black text-[clamp(9px,0.62vw,11px)] 2xl:text-xs text-[#371e58] whitespace-normal break-normal text-balance leading-tight inline-block transition-transform duration-200 group-hover:scale-[1.02] origin-center">
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

      <DrawerContent class="bg-[#371e58] border-t-2 border-[#ef5da2] text-[#ffffff] rounded-t-none">
        <div class="mx-auto w-full max-w-sm uppercase text-center p-6">
          <DrawerHeader class="p-0 mb-6">
            <p class="text-xs font-bold text-[#ef5da2] tracking-widest mb-1">{{ eventoSeleccionado?.genero }}</p>
            <DrawerTitle class="text-3xl font-black text-[#ffffff] leading-none tracking-tight">
              {{ eventoSeleccionado?.artista }}
            </DrawerTitle>
            <DrawerDescription class="text-xs font-bold text-[#ef5da2]/70 mt-2">
              HORARIO: {{ eventoSeleccionado?.hora }} H
            </DrawerDescription>
          </DrawerHeader>

          <div class="p-2">
            <Button class="w-full bg-[#ef5da2] text-[#371e58] hover:bg-[#ffffff] hover:text-[#ef5da2] font-black tracking-wider py-6 rounded-none uppercase transition-colors duration-200">
              Ver detalles del artista
            </Button>
          </div>

          <DrawerFooter class="p-0 mt-4">
            <DrawerClose as-child>
              <Button variant="outline" class="w-full bg-transparent border border-[#ef5da2] text-[#ef5da2] hover:bg-[#ef5da2]/10 font-bold rounded-none uppercase">
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