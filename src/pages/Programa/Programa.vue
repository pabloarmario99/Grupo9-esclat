<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Estructura de los datos del festival
interface Concierto {
  artista: string;
  hora: string;
  genero: string;
  span?: number; // 👈 Opcional: Indica cuántas filas de alto va a ocupar
}

// Representa el estado de un escenario en una hora concreta
type CeldaEscenario = Concierto | { skip: true } | null;

// Un horario mapeado para tus 5 escenarios reales
interface FranjaHoraria {
  hora: string;
  laPolivalent: CeldaEscenario;
  factoria: CeldaEscenario;
  patio2: CeldaEscenario;
  laMutant: CeldaEscenario;
  salaExposiciones: CeldaEscenario;
}

// Datos de ejemplo para el "Viernes" con filas expandidas
const horarioViernes: FranjaHoraria[] = [
  {
    hora: "10:00 - 11:00",
    // Este concierto dura 2 franjas completas (3 horas)
    laPolivalent: { artista: "The Chemical Brothers", hora: "18:00", genero: "Electronic", span: 1 },
    factoria: { artista: "Mac DeMarco", hora: "18:15", genero: "Indie Rock", span: 1 },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "11:00 - 12:00",
    // 👈 IMPORTANTE: Aquí metemos skip: true porque Chemical Brothers sigue tocando en esta franja
    laPolivalent: { skip: true }, 
    factoria: { artista: "Fontaines D.C.", hora: "20:00", genero: "Post-Punk", span: 1 },
    patio2: null,
    laMutant: { artista: "Idles", hora: "19:45", genero: "Punk", span: 2 }, // Ocupará esta y la siguiente
    salaExposiciones: null
  },
  {
    hora: "12:00 - 13:00",
    laPolivalent: { artista: "Justice", hora: "21:30", genero: "French Touch", span: 1 },
    factoria: null,
    patio2: null,
    laMutant: { skip: true }, // 👈 Ocupado por Idles de la fila anterior
    salaExposiciones: null
  },
  // ... Duplicados que tenías en tu código adaptados a la estructura:
  {
    hora: "13:00 - 14:00",
    laPolivalent: null,
    factoria: { artista: "Moderat", hora: "23:15", genero: "Electronic", span: 1 },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "13:00 - 14:00",
    laPolivalent: null,
    factoria: { artista: "Moderat", hora: "23:15", genero: "Electronic", span: 1 },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "13:00 - 14:00",
    laPolivalent: null,
    factoria: { artista: "Moderat", hora: "23:15", genero: "Electronic", span: 1 },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "14:00 - 15:00",
    laPolivalent: null,
    factoria: null,
    patio2: { artista: "Paco de Lucía", hora: "14:00", genero: "Flamenco", span: 2 },
    laMutant: null,
    salaExposiciones: { artista: "Taller de Arte", hora: "14:00", genero: "Workshop", span: 1 }
  },
  {
    hora: "15:00 - 16:00",
    laPolivalent: { artista: "Bonobo", hora: "15:00", genero: "Electronic", span: 1 },
    factoria: null,
    patio2: { skip: true },
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "16:00 - 17:00",
    laPolivalent: null,
    factoria: { artista: "Cory Wong", hora: "16:00", genero: "Funk", span: 3 },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "17:00 - 18:00",
    laPolivalent: null,
    factoria: { skip: true },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "18:00 - 19:00",
    laPolivalent: null,
    factoria: { skip: true },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  }
];

// Helper en TypeScript para comprobar si la celda es un concierto válido en el template
const esConcierto = (celda: CeldaEscenario): celda is Concierto => {
  return celda !== null && !('skip' in celda);
}

// Helper para comprobar si debemos renderizar físicamente el <td>
const debeMostrarCelda = (celda: CeldaEscenario): boolean => {
  return celda === null || !('skip' in celda);
}

// Helper para saber si una fila tiene algún skip (para no poner borde)
const tieneSkip = (franja: FranjaHoraria): boolean => {
  return (
    ('skip' in (franja.laPolivalent || {})) ||
    ('skip' in (franja.factoria || {})) ||
    ('skip' in (franja.patio2 || {})) ||
    ('skip' in (franja.laMutant || {})) ||
    ('skip' in (franja.salaExposiciones || {}))
  );
}
</script>

<template>
  <section class="page">
    <h1>Programa</h1>
    <p>Contenido de la pagina Programa en construccion.</p>

    <div class="p-6 max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-black">Horario del Festival 2026</h1>

      <Tabs default-value="viernes" class="w-full">
        <TabsList class="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="viernes">Viernes 26</TabsTrigger>
          <TabsTrigger value="sabado">Sábado 27</TabsTrigger>
          <TabsTrigger value="domingo">Domingo 28</TabsTrigger>
        </TabsList>

        <TabsContent value="viernes">
          <Table class="border rounded-lg overflow-hidden bg-white/40 backdrop-blur-md">
            <TableHeader class="bg-black/10">
              <TableRow>
                <TableHead class="w-37.5 font-bold text-black">Hora</TableHead>
                <TableHead class="font-bold text-black">01. La Polivalent</TableHead>
                <TableHead class="font-bold text-black">02. Factoría</TableHead>
                <TableHead class="font-bold text-black">03. Patio 2</TableHead>
                <TableHead class="font-bold text-black">04. La Mutant</TableHead>
                <TableHead class="font-bold text-black">05. Sala de Exposiciones</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              <TableRow v-for="(franja, index) in horarioViernes" :key="index" :class="{ 'border-b border-black/10': !tieneSkip(franja), 'last:border-b-0': true }" style="height: 120px;">
                <TableCell class="font-medium text-black/70 align-middle">
                  {{ franja.hora }}
                </TableCell>

                <TableCell 
                  v-if="debeMostrarCelda(franja.laPolivalent)" 
                  :rowspan="esConcierto(franja.laPolivalent) ? franja.laPolivalent.span : 1"
                  class="align-middle p-0"
                >
                  <div v-if="esConcierto(franja.laPolivalent)" class="p-3 rounded-lg bg-black/15 backdrop-blur-sm border border-white/10 flex flex-col justify-center h-full">
                    <div>
                      <div class="font-bold text-base text-black">{{ franja.laPolivalent.artista }}</div>
                      <Badge variant="outline" class="mt-1 text-xs border-black/20 text-black bg-white/20">{{ franja.laPolivalent.genero }}</Badge>
                    </div>
                  </div>
                  <span v-else class="text-black/40 text-xs italic p-3 block">Descanso / Setup</span>
                </TableCell>

                <TableCell 
                  v-if="debeMostrarCelda(franja.factoria)" 
                  :rowspan="esConcierto(franja.factoria) ? franja.factoria.span : 1"
                  class="align-middle p-0"
                >
                  <div v-if="esConcierto(franja.factoria)" class="p-3 rounded-lg bg-black/15 backdrop-blur-sm border border-white/10 flex flex-col justify-center h-full">
                    <div>
                      <div class="font-bold text-base text-black">{{ franja.factoria.artista }}</div>
                      <Badge variant="outline" class="mt-1 text-xs border-black/20 text-black bg-white/20">{{ franja.factoria.genero }}</Badge>
                    </div>
                  </div>
                  <span v-else class="text-black/40 text-xs italic p-3 block">Descanso / Setup</span>
                </TableCell>

                <TableCell 
                  v-if="debeMostrarCelda(franja.patio2)" 
                  :rowspan="esConcierto(franja.patio2) ? franja.patio2.span : 1"
                  class="align-middle p-0"
                >
                  <div v-if="esConcierto(franja.patio2)" class="p-3 rounded-lg bg-black/15 backdrop-blur-sm border border-white/10 flex flex-col justify-center h-full">
                    <div>
                      <div class="font-bold text-base text-black">{{ franja.patio2.artista }}</div>
                      <Badge variant="outline" class="mt-1 text-xs border-black/20 text-black bg-white/20">{{ franja.patio2.genero }}</Badge>
                    </div>
                  </div>
                  <span v-else class="text-black/40 text-xs italic p-3 block">Descanso / Setup</span>
                </TableCell>

                <TableCell 
                  v-if="debeMostrarCelda(franja.laMutant)" 
                  :rowspan="esConcierto(franja.laMutant) ? franja.laMutant.span : 1"
                  class="align-middle p-0"
                >
                  <div v-if="esConcierto(franja.laMutant)" class="p-3 rounded-lg bg-black/15 backdrop-blur-sm border border-white/10 flex flex-col justify-center h-full">
                    <div>
                      <div class="font-bold text-base text-black">{{ franja.laMutant.artista }}</div>
                      <Badge variant="outline" class="mt-1 text-xs border-black/20 text-black bg-white/20">{{ franja.laMutant.genero }}</Badge>
                    </div>
                  </div>
                  <span v-else class="text-black/40 text-xs italic p-3 block">Descanso / Setup</span>
                </TableCell>

                <TableCell 
                  v-if="debeMostrarCelda(franja.salaExposiciones)" 
                  :rowspan="esConcierto(franja.salaExposiciones) ? franja.salaExposiciones.span : 1"
                  class="align-middle p-0"
                >
                  <div v-if="esConcierto(franja.salaExposiciones)" class="p-3 rounded-lg bg-black/15 backdrop-blur-sm border border-white/10 flex flex-col justify-center h-full">
                    <div>
                      <div class="font-bold text-base text-black">{{ franja.salaExposiciones.artista }}</div>
                      <Badge variant="outline" class="mt-1 text-xs border-black/20 text-black bg-white/20">{{ franja.salaExposiciones.genero }}</Badge>
                    </div>
                  </div>
                  <span v-else class="text-black/40 text-xs italic p-3 block">Descanso / Setup</span>
                </TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="sabado"></TabsContent>
        <TabsContent value="domingo"></TabsContent>
      </Tabs>
    </div>
  </section>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 7rem 2rem 2rem;
  background: #bcd432;
}
</style>