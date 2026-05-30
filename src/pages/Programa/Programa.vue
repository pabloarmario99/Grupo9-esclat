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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// NUEVOS IMPORTS: Traemos el Select personalizado de tus componentes ui para poder estilizar el hover
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  },
  {
    hora: "19:00 - 20:00",
    laPolivalent: null,
    factoria: null,
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

      const siguienteCell = siguienteFranja[escenario];
      if (siguienteCell !== null) break;

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

const escenarioSeleccionadoMovil = ref<EscenarioKey>(escenarios[0].key);
</script>

<template>
  <section class="page uppercase text-[#371e58]">
    <div class="w-full max-w-none">
      <div class="w-full mb-20 lg:relative">
        <h1 class="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-black text-center text-[#ffffff] pt-20 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 mb-10">
          PROGRAMACIÓN
        </h1>

        <div class="w-screen relative left-1/2 -translate-x-1/2 bg-[#ef5da2] lg:h-104 lg:overflow-hidden">
          <img
            src="/images/tronkas.jpg"
            alt="Fondo Festival"
            class="block w-full h-auto object-contain lg:h-128 lg:object-cover lg:object-center"
          />
        </div>
      </div>

      <div class="mx-6 pt-2 mb-24 sm:pt-4 sm:mb-32 md:pt-6 md:mx-10 lg:pt-8 lg:mb-40 lg:mx-14">
      <Tabs default-value="viernes" class="w-full">
        <TabsList class="flex justify-start items-center gap-8 mb-8 bg-transparent text-[#371e58] h-auto p-0 rounded-none w-full">
            <TabsTrigger 
              value="viernes" 
              class="p-0 text-8xl font-black text-[#371e58]/40 data-[state=active]:text-[#371e58] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-all duration-200"
            >
              26
            </TabsTrigger>
            <TabsTrigger 
              value="sabado" 
              class="p-0 text-8xl font-black text-[#371e58]/40 data-[state=active]:text-[#371e58] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-all duration-200"
            >
              27
            </TabsTrigger>
            <TabsTrigger 
              value="domingo" 
              class="p-0 text-8xl font-black text-[#371e58]/40 data-[state=active]:text-[#371e58] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none transition-all duration-200"
            >
              28
            </TabsTrigger>
          </TabsList>

        <TabsContent value="viernes">
          <Table class="programa-table rounded-none bg-transparent border-0 border-none w-max min-w-full hidden md:table">
            <TableHeader class="bg-transparent">
              <TableRow class="!hover:bg-transparent border-none transition-none">
                <TableHead class="w-30 text-xs md:text-xs font-extrabold text-[#371e58] border-0 align-middle whitespace-nowrap">Escenario</TableHead>
                <TableHead
                  v-for="(hora, index) in horas"
                  :key="`hora-${index}`"
                  :style="{ minWidth: 'var(--col-size)', width: 'var(--col-size)' }"
                  class="text-xs md:text-xs font-extrabold text-[#371e58] border-0 align-middle whitespace-nowrap"
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
                <TableCell class="p-1 text-xs md:text-xs font-extrabold text-[#371e58] align-middle border-0 whitespace-nowrap">
                  {{ escenario.label }}
                </TableCell>

                <template v-for="(item, index) in generarCeldasEscenario(escenario.key)" :key="`${escenario.key}-${index}`">
                  <TableCell :colspan="item.span" class="align-top p-0 border-0">
                    <div
                      v-if="esConcierto(item.celda)"
                      :style="estiloConciertoHorizontal(item.span)"
                      class="programa-card p-1 rounded-none bg-[#371e58] flex flex-col justify-center h-full w-full"
                    >
                      <div>
                        <div class="font-medium text-xs md:text-xs text-white">{{ item.celda.artista }}</div>
                      </div>
                    </div>
                    <div
                      v-else
                      :style="estiloConciertoHorizontal(item.span)"
                      class="programa-card p-1 rounded-none bg-[#371e58]/35 h-full w-full"
                    ></div>
                  </TableCell>
                </template>
              </TableRow>
            </TableBody>
          </Table>

          <div class="block md:hidden w-full space-y-4">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-black tracking-wider text-[#371e58]">Selecciona Escenario:</label>
              
              <Select v-model="escenarioSeleccionadoMovil">
                <SelectTrigger class="w-full p-3 bg-[#371e58] text-white font-bold rounded-none border-none outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Selecciona escenario" />
                </SelectTrigger>
                <SelectContent class="bg-[#371e58] border-none rounded-none p-0 min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem 
                    v-for="escenario in escenarios" 
                    :key="'opt-' + escenario.key" 
                    :value="escenario.key"
                    class="text-white font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-[highlighted]:bg-white data-[highlighted]:text-[#371e58] focus:bg-white focus:text-[#371e58]"
                  >
                    {{ escenario.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table class="programa-table-movil w-full border-separate border-spacing-y-2">
              <TableHeader class="hidden">
                <TableRow><TableHead>Hora</TableHead><TableHead>Evento</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                <TableRow 
                  v-for="(franja, idx) in horarioViernes" 
                  :key="'movil-row-' + idx"
                  class="border-none !hover:bg-transparent"
                >
                  <TableCell class="w-1/3 p-2 text-xs font-black align-middle text-[#371e58] whitespace-nowrap bg-transparent">
                    {{ franja.hora }}
                  </TableCell>

                  <TableCell class="p-0 align-middle">
                    <div 
                      v-if="esConcierto(franja[escenarioSeleccionadoMovil])"
                      class="p-3 bg-[#371e58] text-white min-h-12.5 flex flex-col justify-center rounded-none"
                    >
                      <div class="font-bold text-xs">
                        {{ (franja[escenarioSeleccionadoMovil] as Concierto).artista }}
                      </div>
                    </div>
                    <div 
                      v-else
                      class="p-3 bg-[#371e58]/20 min-h-12.5 flex items-center justify-center rounded-none"
                    >
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="sabado"></TabsContent>
        <TabsContent value="domingo"></TabsContent>
      </Tabs>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* [Tu CSS previo se conserva idéntico y sin alteraciones] */
.page {
  --col-size: clamp(78px, 8.2vw, 100px);
  --col-gap: clamp(3px, 0.55vw, 5px);
  --row-gap: calc(var(--col-gap) * 1.8);
  --card-min-height: clamp(30px, 3.2vw, 38px);
  min-height: 100vh;
  padding: 2rem 0;
  background: #ef5da2;
}

@media (min-width: 1024px) {
  .page {
    --col-size: clamp(56px, 5.1vw, 70px);
    --col-gap: clamp(1px, 0.3vw, 3px);
    --row-gap: calc(var(--col-gap) * 1.6);
    --card-min-height: clamp(22px, 2.4vw, 28px);
    padding: 1rem 0;
  }
}

.seccion-calendario {
  view-timeline-name: --revelarSeccion;
  view-timeline-axis: block;
  animation-name: aparecerSuave;
  animation-fill-mode: both;
  animation-timeline: --revelarSeccion;
  animation-range: entry 0% entry 40%;
}

@keyframes aparecerSuave {
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.page :deep(.programa-table) {
  border-collapse: separate;
  border-spacing: var(--col-gap) var(--row-gap);
}

.page :deep(.programa-card) {
  min-height: var(--card-min-height);
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