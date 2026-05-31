export interface Concierto {
  artista: string;
  hora: string;
  genero: string;
  span?: number; 
}

export type CeldaEscenario = Concierto | { skip: true } | null;

export interface FranjaHoraria {
  hora: string;
  laPolivalent: CeldaEscenario;
  factoria: CeldaEscenario;
  patio2: CeldaEscenario;
  laMutant: CeldaEscenario;
  salaExposiciones: CeldaEscenario;
}

export const escenarios = [
  { key: "laPolivalent", label: "01. La Polivalent" },
  { key: "factoria", label: "02. Factoria" },
  { key: "patio2", label: "03. Patio 2" },
  { key: "laMutant", label: "04. La Mutant" },
  { key: "salaExposiciones", label: "05. Sala de Exposiciones" },
] as const;

export type EscenarioKey = (typeof escenarios)[number]["key"];

const clonarCell = (celda: CeldaEscenario): CeldaEscenario => {
  if (celda === null) return null;
  if ("skip" in celda) return { skip: true };
  return { ...celda };
};

const clonarHorario = (horario: FranjaHoraria[]): FranjaHoraria[] => {
  return horario.map((franja) => ({
    hora: franja.hora,
    laPolivalent: clonarCell(franja.laPolivalent),
    factoria: clonarCell(franja.factoria),
    patio2: clonarCell(franja.patio2),
    laMutant: clonarCell(franja.laMutant),
    salaExposiciones: clonarCell(franja.salaExposiciones),
  }));
};

export const horarioViernes: FranjaHoraria[] = [
  {
    hora: "10:00 - 11:00",
    laPolivalent: { artista: "APERTURA", hora: "10:00", genero: "Actividad", span: 1 },
    factoria: null, patio2: null, laMutant: null, salaExposiciones: null
  },
  {
    hora: "11:00 - 12:00",
    laPolivalent: { artista: "CHARLA DE APERTURA", hora: "11:00", genero: "Charla", span: 1 },
    factoria: null, patio2: null, laMutant: null, salaExposiciones: null
  },
  {
    hora: "12:00 - 13:00",
    laPolivalent: { artista: "TALLER DE FOTOGRAFIA", hora: "12:00", genero: "Taller", span: 2 },
    factoria: { artista: "TORNEO DE VIDEOJUEGOS", hora: "12:00", genero: "Actividad", span: 2 },
    patio2: null, laMutant: null,
    salaExposiciones: { artista: "EXPOSICION DE FANZINES", hora: "12:00", genero: "Exposicion", span: 2 }
  },
  {
    hora: "13:00 - 14:00",
    laPolivalent: { skip: true }, factoria: { skip: true }, patio2: null,
    laMutant: { artista: "PLATZ", hora: "13:00", genero: "Concierto", span: 1 },
    salaExposiciones: { skip: true }
  },
  { hora: "14:00 - 15:00", laPolivalent: null, factoria: null, patio2: null, laMutant: null, salaExposiciones: null },
  { hora: "15:00 - 16:00", laPolivalent: null, factoria: null, patio2: null, laMutant: null, salaExposiciones: null },
  {
    hora: "16:00 - 17:00",
    laPolivalent: { artista: "MESA REDONDA DE MUSICA", hora: "16:00", genero: "Mesa redonda", span: 1 },
    factoria: { artista: "SESION DE CINE", hora: "16:00", genero: "Cine", span: 5 },
    patio2: { artista: "DJ SET + COMIDA Y BEBIDA", hora: "16:00", genero: "Actividad", span: 5 },
    laMutant: null,
    salaExposiciones: { artista: "PUESTOS ARTISTICOS", hora: "16:00", genero: "Exposicion", span: 3 }
  },
  { hora: "17:00 - 18:00", laPolivalent: null, factoria: { skip: true }, patio2: { skip: true }, laMutant: { artista: "KADIRA", hora: "17:00", genero: "Concierto", span: 1 }, salaExposiciones: { skip: true } },
  { hora: "18:00 - 19:00", laPolivalent: null, factoria: { skip: true }, patio2: { skip: true }, laMutant: { artista: "BOLETUS", hora: "18:00", genero: "Concierto", span: 1 }, salaExposiciones: { skip: true } },
  { hora: "19:00 - 20:00", laPolivalent: null, factoria: { skip: true }, patio2: { skip: true }, laMutant: { artista: "GARBÍ", hora: "19:00", genero: "Concierto", span: 1 }, salaExposiciones: null },
  { hora: "20:00 - 21:00", laPolivalent: null, factoria: { skip: true }, patio2: { skip: true }, laMutant: { artista: "LAS PETUNIAS", hora: "20:00", genero: "Concierto", span: 1 }, salaExposiciones: null }
];

const horarioSabado: FranjaHoraria[] = clonarHorario(horarioViernes);
const horarioDomingo: FranjaHoraria[] = clonarHorario(horarioViernes);

const obtenerFranja = (horario: FranjaHoraria[], hora: string): FranjaHoraria => {
  const franja = horario.find((item) => item.hora === hora);
  if (!franja) throw new Error(`No existe la franja horaria ${hora}`);
  return franja;
};

// Configuración Sábado
obtenerFranja(horarioSabado, "10:00 - 11:00").laPolivalent = { artista: "APERTURA", hora: "10:00", genero: "Actividad", span: 1 };
obtenerFranja(horarioSabado, "11:00 - 12:00").laPolivalent = { artista: "CHARLA SOBRE ILUSTRACION", hora: "11:00", genero: "Charla", span: 1 };
obtenerFranja(horarioSabado, "12:00 - 13:00").laPolivalent = { artista: "TALLER DE CERAMICA", hora: "12:00", genero: "Taller", span: 2 };
obtenerFranja(horarioSabado, "13:00 - 14:00").laPolivalent = { skip: true };
obtenerFranja(horarioSabado, "14:00 - 15:00").laPolivalent = null;
obtenerFranja(horarioSabado, "15:00 - 16:00").laPolivalent = null;
obtenerFranja(horarioSabado, "16:00 - 17:00").laPolivalent = { artista: "MESA REDONDA DE LITERATURA", hora: "16:00", genero: "Mesa redonda", span: 2 };
obtenerFranja(horarioSabado, "17:00 - 18:00").laPolivalent = { skip: true };
obtenerFranja(horarioSabado, "18:00 - 19:00").laPolivalent = { artista: "BATALLA DE BAILE", hora: "18:00", genero: "Actividad", span: 2 };
obtenerFranja(horarioSabado, "19:00 - 20:00").laPolivalent = { skip: true };
obtenerFranja(horarioSabado, "20:00 - 21:00").laPolivalent = null;

obtenerFranja(horarioSabado, "10:00 - 11:00").factoria = null;
obtenerFranja(horarioSabado, "11:00 - 12:00").factoria = null;
obtenerFranja(horarioSabado, "12:00 - 13:00").factoria = null;
obtenerFranja(horarioSabado, "13:00 - 14:00").factoria = null;
obtenerFranja(horarioSabado, "14:00 - 15:00").factoria = null;
obtenerFranja(horarioSabado, "15:00 - 16:00").factoria = null;
obtenerFranja(horarioSabado, "16:00 - 17:00").factoria = { artista: "SESION DE CINE", hora: "16:00", genero: "Cine", span: 5 };
obtenerFranja(horarioSabado, "17:00 - 18:00").factoria = { skip: true };
obtenerFranja(horarioSabado, "18:00 - 19:00").factoria = { skip: true };
obtenerFranja(horarioSabado, "19:00 - 20:00").factoria = { skip: true };
obtenerFranja(horarioSabado, "20:00 - 21:00").factoria = { skip: true };

obtenerFranja(horarioSabado, "10:00 - 11:00").laMutant = null;
obtenerFranja(horarioSabado, "11:00 - 12:00").laMutant = null;
obtenerFranja(horarioSabado, "12:00 - 13:00").laMutant = null;
obtenerFranja(horarioSabado, "13:00 - 14:00").laMutant = { artista: "LA PLATA", hora: "13:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioSabado, "14:00 - 15:00").laMutant = null;
obtenerFranja(horarioSabado, "15:00 - 16:00").laMutant = null;
obtenerFranja(horarioSabado, "16:00 - 17:00").laMutant = null;
obtenerFranja(horarioSabado, "17:00 - 18:00").laMutant = { artista: "LAS NOVIAS DE AARON", hora: "17:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioSabado, "18:00 - 19:00").laMutant = { artista: "LOS SALOS", hora: "18:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioSabado, "19:00 - 20:00").laMutant = { artista: "AMIGAS ADIÓS", hora: "19:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioSabado, "20:00 - 21:00").laMutant = { artista: "EDDSH", hora: "20:00", genero: "Concierto", span: 1 };

const copiarEscenario = (origen: FranjaHoraria[], destino: FranjaHoraria[], escenario: EscenarioKey) => {
  origen.forEach((franjaOrigen) => {
    const franjaDestino = obtenerFranja(destino, franjaOrigen.hora);
    franjaDestino[escenario] = clonarCell(franjaOrigen[escenario]);
  });
};

// Configuración Domingo
copiarEscenario(horarioSabado, horarioDomingo, "laPolivalent");
copiarEscenario(horarioSabado, horarioDomingo, "factoria");
copiarEscenario(horarioSabado, horarioDomingo, "patio2");
copiarEscenario(horarioSabado, horarioDomingo, "laMutant");
copiarEscenario(horarioSabado, horarioDomingo, "salaExposiciones");

obtenerFranja(horarioDomingo, "12:00 - 13:00").laPolivalent = { artista: "MESA REDONDA DE ARTES GRAFICAS", hora: "12:00", genero: "Mesa redonda", span: 2 };
obtenerFranja(horarioDomingo, "13:00 - 14:00").laPolivalent = { skip: true };
obtenerFranja(horarioDomingo, "16:00 - 17:00").laPolivalent = { artista: "TALLER + CONCURSO DE COMIC", hora: "16:00", genero: "Taller", span: 2 };
obtenerFranja(horarioDomingo, "17:00 - 18:00").laPolivalent = { skip: true };
obtenerFranja(horarioDomingo, "18:00 - 19:00").laPolivalent = { artista: "GALA PREMIOS", hora: "18:00", genero: "Gala", span: 1 };
obtenerFranja(horarioDomingo, "19:00 - 20:00").laPolivalent = null;

obtenerFranja(horarioDomingo, "14:00 - 15:00").patio2 = { artista: "PAELLAS", hora: "14:00", genero: "Actividad", span: 2 };
obtenerFranja(horarioDomingo, "15:00 - 16:00").patio2 = { skip: true };

obtenerFranja(horarioDomingo, "13:00 - 14:00").laMutant = { artista: "TRONKAS!", hora: "13:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioDomingo, "17:00 - 18:00").laMutant = { artista: "BERNAL", hora: "17:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioDomingo, "18:00 - 19:00").laMutant = { artista: "NUEVOS VICIOS", hora: "18:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioDomingo, "19:00 - 20:00").laMutant = { artista: "SAPIENS", hora: "19:00", genero: "Concierto", span: 1 };
obtenerFranja(horarioDomingo, "20:00 - 21:00").laMutant = { artista: "DIAMANTE NEGRO", hora: "20:00", genero: "Concierto", span: 1 };

export const horas = horarioViernes.map((franja) => franja.hora);

export const esConcierto = (celda: CeldaEscenario): celda is Concierto => {
  return celda !== null && !('skip' in celda);
};

export const esSkip = (celda: CeldaEscenario): boolean => {
  return celda !== null && 'skip' in celda;
};

export const generarCeldasEscenario = (horario: FranjaHoraria[], escenario: EscenarioKey) => {
  const celdas: Array<{ celda: CeldaEscenario; span: number }> = [];
  let index = 0;

  while (index < horario.length) {
    const franja = horario[index];
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

    while (siguienteIndex < horario.length) {
      const siguienteFranja = horario[siguienteIndex];
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
};

export const mapaHorarios = {
  viernes: horarioViernes,
  sabado: horarioSabado,
  domingo: horarioDomingo,
};