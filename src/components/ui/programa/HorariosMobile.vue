<script lang="ts" setup>
import { ref } from "vue"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  escenarios, 
  esConcierto, 
  esSkip,
  type FranjaHoraria, 
  type EscenarioKey,
  type Concierto
} from "@/data/horariosData"

const props = defineProps<{
  horarioDia: FranjaHoraria[]
}>()

const escenarioSeleccionadoMovil = ref<EscenarioKey>(escenarios[0].key)
const eventoSeleccionado = ref<Concierto | null>(null)

// Función para buscar el evento real hacia atrás cuando el usuario hace clic en una celda de extensión 'skip'
const buscarYSeleccionarEvento = (franjaActual: FranjaHoraria, indexActual: number) => {
  const celdaActual = franjaActual[escenarioSeleccionadoMovil.value]
  
  if (esConcierto(celdaActual)) {
    eventoSeleccionado.value = celdaActual
    return
  }

  if (esSkip(celdaActual)) {
    for (let i = indexActual; i >= 0; i--) {
      const franjaPrevia = props.horarioDia[i]
      if (!franjaPrevia) continue

      const celdaPrevia = franjaPrevia[escenarioSeleccionadoMovil.value]
      if (esConcierto(celdaPrevia)) {
        eventoSeleccionado.value = celdaPrevia
        break
      }
    }
  }
}
</script>

<template>
  <div class="block xl:hidden w-full space-y-4 contenedor-movil">
    <div class="flex flex-col gap-2">
      <label class="text-xs font-black tracking-wider text-[#ef5da2]">Selecciona Escenario:</label>
      <Select v-model="escenarioSeleccionadoMovil">
        <SelectTrigger class="w-full p-3 bg-transparent text-[#ef5da2] font-bold rounded-none border border-[#ef5da2] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Selecciona escenario" />
        </SelectTrigger>
        <SelectContent class="bg-[#ef5da2] border-none rounded-none p-0 min-w-(--radix-select-trigger-width)">
          <SelectItem 
            v-for="escenario in escenarios" 
            :key="'opt-' + escenario.key" 
            :value="escenario.key"
            class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#ef5da2] focus:bg-[#371e58] focus:text-[#ef5da2]"
          >
            {{ escenario.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Drawer>
      <Table class="programa-table-movil w-full border-separate border-spacing-y-0 bg-transparent">
        <TableBody class="bg-transparent">
          <TableRow 
            v-for="(franja, idx) in horarioDia" 
            :key="'movil-row-' + idx"
            class="border-none fila-movil"
          >
            <TableCell class="w-1/3 p-2 py-3 text-xs font-black align-middle text-[#ef5da2] whitespace-nowrap bg-transparent">
              {{ franja.hora }}
            </TableCell>

            <TableCell class="p-0 py-1 align-middle bg-transparent">
              <DrawerTrigger 
                v-if="esConcierto(franja[escenarioSeleccionadoMovil])" 
                as-child
                @click="buscarYSeleccionarEvento(franja, idx)"
              >
                <div class="group p-3 bg-[#ef5da2] text-[#371e58] flex flex-col justify-center rounded-none min-h-16 box-border cursor-pointer">
                  <div class="font-bold text-xs inline-block transition-transform duration-200 group-hover:scale-[1.02] origin-center">
                    {{ (franja[escenarioSeleccionadoMovil] as Concierto).artista }}
                  </div>
                </div>
              </DrawerTrigger>

              <DrawerTrigger 
                v-else-if="esSkip(franja[escenarioSeleccionadoMovil])" 
                as-child
                @click="buscarYSeleccionarEvento(franja, idx)"
              >
                <div class="p-3 bg-[#ef5da2] text-[#371e58] min-h-16 box-border -mt-2 cursor-pointer"></div>
              </DrawerTrigger>

              <div 
                v-else
                class="p-3 bg-[#ef5da2]/20 min-h-16 flex items-center justify-center rounded-none"
              ></div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <DrawerContent class="bg-[#371e58] border-t-2 border-[#ef5da2] text-[#ffffff] rounded-t-none">
        <div class="mx-auto w-full max-w-sm uppercase text-center p-6">
          <DrawerHeader class="p-0 mb-6">
            <p class="text-xs font-bold text-[#ef5da2] tracking-widest mb-1">{{ eventoSeleccionado?.genero }}</p>
            <DrawerTitle class="text-2xl font-black text-[#ffffff] leading-none tracking-tight">
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
.contenedor-movil :deep(tr),
.contenedor-movil :deep(tr:hover),
.contenedor-movil :deep(td) {
  background-color: transparent !important;
  background: transparent !important;
  border: 0 !important;
}
</style>