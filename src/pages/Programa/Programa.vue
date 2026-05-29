<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Estructura de los datos del festival
interface Concierto {
  artista: string;
  hora: string;
  genero: string;
  span?: number; 
}

type CeldaEscenario = Concierto | { skip: true } | null;

interface FranjaHoraria {
  hora: string;
  laPolivalent: CeldaEscenario;
  factoria: CeldaEscenario;
  patio2: CeldaEscenario;
  laMutant: CeldaEscenario;
  salaExposiciones: CeldaEscenario;
}

const horarioViernes: FranjaHoraria[] = [
  {
    hora: "10:00 - 11:00",
    laPolivalent: { artista: "The Chemical Brothers", hora: "18:00", genero: "Electronic", span: 2 },
    factoria: { artista: "Mac DeMarco", hora: "18:15", genero: "Indie Rock", span: 1 },
    patio2: null,
    laMutant: null,
    salaExposiciones: null
  },
  {
    hora: "11:00 - 12:00",
    laPolivalent: { skip: true }, 
    factoria: { artista: "Fontaines D.C.", hora: "20:00", genero: "Post-Punk", span: 1 },
    patio2: null,
    laMutant: { artista: "Idles", hora: "19:45", genero: "Punk", span: 2 },
    salaExposiciones: null
  },
  {
    hora: "12:00 - 13:00",
    laPolivalent: { artista: "Justice", hora: "21:30", genero: "French Touch", span: 1 },
    factoria: null,
    patio2: null,
    laMutant: { skip: true }, 
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

const escenarios = [
  { key: "laPolivalent", label: "01. La Polivalent" },
  { key: "factoria", label: "02. Factoria" },
  { key: "patio2", label: "03. Patio 2" },
  { key: "laMutant", label: "04. La Mutant" },
  { key: "salaExposiciones", label: "05. Sala de Exposiciones" },
] as const;

type EscenarioKey = (typeof escenarios)[number]["key"];

const horas = horarioViernes.map((franja) => franja.hora);

const esConcierto = (celda: CeldaEscenario): celda is Concierto => {
  return celda !== null && !('skip' in celda);
}

const generarCeldasEscenario = (escenario: EscenarioKey) => {
  const celdas: Array<{ celda: CeldaEscenario; span: number }> = [];
  let index = 0;

  while (index < horarioViernes.length) {
    const franja = horarioViernes[index];
    if (!franja) break;
    const celda = franja[escenario];

    if (celda !== null && 'skip' in celda) {
      index += 1;
      continue;
    }

    if (esConcierto(celda)) {
      const span = celda.span ?? 1;
      celdas.push({ celda, span });
      index += span;
      continue;
    }

    let spanVacio = 1;
    let siguienteIndex = index + 1;

    while (siguienteIndex < horarioViernes.length) {
      const siguienteFranja = horarioViernes[siguienteIndex];
      if (!siguienteFranja) break;

      const siguienteCelda = siguienteFranja[escenario];
      if (siguienteCelda !== null) break;

      spanVacio += 1;
      siguienteIndex += 1;
    }

    celdas.push({ celda: null, span: spanVacio });
    index += spanVacio;
  }

  return celdas;
}

const estiloConciertoHorizontal = (span: number) => {
  return {
    minWidth: `calc((var(--col-size) * ${span}) + (var(--col-gap) * ${Math.max(span - 1, 0)}))`,
  };
}
</script>

<template>
  <section class="page uppercase text-[#371e58]">
  
    <div class="p-6 max-w-400 mx-auto w-full">
      <h1 class="text-8xl font-black text-center mb-16 text-[#371e58]">PROGRAMACIÓN</h1>

      <Tabs default-value="viernes" class="w-full">
        <TabsList class="flex justify-start items-center gap-8 mb-8 bg-transparent text-[#371e58] h-auto p-0 rounded-none w-full">
          <TabsTrigger 
            value="viernes" 
            class="p-0 text-5xl font-black text-[#371e58]/40 data-[state=active]:text-[#371e58] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-all duration-200"
          >
            26
          </TabsTrigger>
          <TabsTrigger 
            value="sabado" 
            class="p-0 text-5xl font-black text-[#371e58]/40 data-[state=active]:text-[#371e58] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-all duration-200"
          >
            27
          </TabsTrigger>
          <TabsTrigger 
            value="domingo" 
            class="p-0 text-5xl font-black text-[#371e58]/40 data-[state=active]:text-[#371e58] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-all duration-200"
          >
            28
          </TabsTrigger>
        </TabsList>

        <TabsContent value="viernes">
          <Table class="programa-table rounded-none bg-transparent border-0 border-none w-max min-w-full">
            <TableHeader class="bg-transparent">
              <TableRow class="!hover:bg-transparent border-none transition-none">
                <TableHead class="w-34 text-xs font-black text-[#371e58] border-0 align-middle whitespace-nowrap">Escenario</TableHead>
                <TableHead
                  v-for="(hora, index) in horas"
                  :key="`hora-${index}`"
                  class="text-xs font-black text-[#371e58] border-0 align-middle whitespace-nowrap"
                >
                  {{ hora }}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow
                v-for="escenario in escenarios"
                :key="escenario.key"
                class="escenario-row !hover:bg-transparent border-none transition-none"
              >
                <TableCell class="text-xs font-extrabold text-[#371e58] align-middle border-0 whitespace-nowrap">
                  {{ escenario.label }}
                </TableCell>

                <template v-for="(item, index) in generarCeldasEscenario(escenario.key)" :key="`${escenario.key}-${index}`">
                  <TableCell :colspan="item.span" class="align-top p-0 border-0">
                    <div
                      v-if="esConcierto(item.celda)"
                      :style="estiloConciertoHorizontal(item.span)"
                      class="programa-card p-2 rounded-none bg-[#371e58] flex flex-col justify-center h-full w-full"
                    >
                      <div>
                        <div class="font-medium text-xs md:text-sm text-white">{{ item.celda.artista }}</div>
                      </div>
                    </div>
                    <div
                      v-else
                      :style="estiloConciertoHorizontal(item.span)"
                      class="programa-card p-2 rounded-none bg-[#371e58]/35 h-full w-full"
                    ></div>
                  </TableCell>
                </template>
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
  --col-size: clamp(84px, 9vw, 110px);
  --col-gap: clamp(4px, 0.7vw, 6px);
  --row-gap: calc(var(--col-gap) * 2);
  min-height: 100vh;
  padding: 7rem 2rem 2rem;
  background: #ef5da2;
}

.page :deep(.programa-table) {
  border-collapse: separate;
  border-spacing: var(--col-gap) var(--row-gap);
}

.page :deep(.programa-card) {
  min-height: clamp(34px, 4vw, 44px);
}

.page :deep(table),
.page :deep(th),
.page :deep(td),
.page :deep(tr) {
  border: 0 !important;
}

.page :deep([data-slot="table-row"]:hover) {
  background-color: transparent !important;
}

.page :deep([data-slot="table-row"][data-state="selected"]) {
  background-color: transparent !important;
}
</style>