<script setup lang="ts">
import { ref, computed } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RouterLink } from 'vue-router'

// Definir días del evento
const diasEvento = ['viernes', 'sabado', 'domingo'] as const
type DiaEvento = typeof diasEvento[number]

// Definir interfaces
interface EntradaDia {
  tipo: 'ninguno' | 'basica' | 'merch'
  precio: number
}

type EntradasType = Record<DiaEvento, EntradaDia>

interface DatosUsuario {
  nombre: string
  apellidos: string
  email: string
  telefono: string
}

// Datos del evento
const aforoMaximo = 500
const entradasVendidas = ref<number>(0)

// Estado del formulario
const datosUsuario = ref<DatosUsuario>({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: ''
})

// Selección de entradas
const entradas = ref<EntradasType>({
  viernes: { tipo: 'ninguno', precio: 0 },
  sabado: { tipo: 'ninguno', precio: 0 },
  domingo: { tipo: 'ninguno', precio: 0 }
})

const incluyeVip = ref<boolean>(false)

// Precios actualizados
const precios = {
  basica: 0,
  merch: 5,
  vip: 10
}

// Calcular precio total dinámicamente
const precioTotal = computed<number>(() => {
  let total = 0
  let tieneAlgunaEntrada = false
  
  // Calcular precio acumulado de los días seleccionados
  diasEvento.forEach(dia => {
    if (entradas.value[dia].tipo === 'basica') {
      total += precios.basica
      tieneAlgunaEntrada = true
    } else if (entradas.value[dia].tipo === 'merch') {
      total += precios.merch
      tieneAlgunaEntrada = true
    }
  })
  
  // Añadir suplemento VIP si está seleccionado y tiene al menos una entrada elegida
  if (incluyeVip.value && tieneAlgunaEntrada) {
    total += precios.vip
  }
  
  return total
})

// Aforo disponible
const aforoDisponible = computed<number>(() => aforoMaximo - entradasVendidas.value)

// Actualizar precio cuando cambia tipo de entrada en los Selects
const actualizarPrecio = (dia: DiaEvento, tipo: string) => {
  entradas.value[dia].tipo = tipo as 'ninguno' | 'basica' | 'merch'
  
  if (tipo === 'basica') {
    entradas.value[dia].precio = precios.basica
  } else if (tipo === 'merch') {
    entradas.value[dia].precio = precios.merch
  } else {
    entradas.value[dia].precio = 0
  }
}

// Enviar formulario
const enviarCompra = async (): Promise<void> => {
  // Validar campos obligatorios
  if (!datosUsuario.value.nombre || !datosUsuario.value.apellidos || 
      !datosUsuario.value.email || !datosUsuario.value.telefono) {
    alert('Por favor, completa todos tus datos')
    return
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(datosUsuario.value.email)) {
    alert('Por favor, introduce un email válido')
    return
  }
  
  // Validar que haya seleccionado al menos una entrada
  let tieneEntrada = false
  diasEvento.forEach(dia => {
    if (entradas.value[dia].tipo !== 'ninguno') {
      tieneEntrada = true
    }
  })
  
  if (!tieneEntrada) {
    alert('Por favor, selecciona al menos una entrada')
    return
  }
  
  // Validar aforo
  if (entradasVendidas.value + 1 > aforoMaximo) {
    alert('Lo sentimos, el evento está completo')
    return
  }
  
  // Simular envío
  const confirmacion = {
    usuario: datosUsuario.value,
    entradas: entradas.value,
    total: precioTotal.value,
    vip: incluyeVip.value,
    fecha: new Date().toLocaleString()
  }
  
  console.log('Compra realizada:', confirmacion)
  
  alert(`¡Compra confirmada!\n\nSe ha enviado un correo a ${datosUsuario.value.email}\nTotal: ${precioTotal.value}€\n\n¡Gracias por tu compra!`)
  
  // Actualizar aforo
  entradasVendidas.value++
}
</script>

<template>
  <div class="w-full mt-20 overflow-x-hidden bg-[#eb378d] text-white">
    <section class="relative bg-[#eb378d] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />

      <div class="relative z-10 mx-auto max-w-6xl">
        <p class="mb-3 text-base font-medium uppercase text-white/90">
          Entradas y acceso
        </p>
        <h1 class="max-w-4xl text-3xl font-semibold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Reserva tu lugar en Esclat
        </h1>
        <p class="mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/90">
          Elige tus días, añade el pase VIP si quieres exprimir al máximo la experiencia y recibe tus pases directamente por correo.
        </p>
      </div>
    </section>

    <section class="relative bg-[#371e58] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />

      <div class="relative z-10 mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
        <h2 class="text-4xl font-semibold uppercase tracking-tight text-[#eb378d] sm:text-5xl md:text-6xl">
          Aforo disponible
        </h2>

        <div class="border-2 border-[#bcd432] px-6 py-8 text-center md:px-10">
          <p class="text-3xl font-semibold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {{ aforoDisponible }} / {{ aforoMaximo }}
          </p>
          <p class="mt-4 text-base font-medium uppercase leading-relaxed text-[#bcd432]">
            Últimas entradas disponibles
          </p>
        </div>
      </div>
    </section>

    <section class="relative bg-[#eb378d] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />

      <div class="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-28">
        <div class="w-full lg:mx-auto lg:max-w-md">
          <h2 class="mb-4 text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
            Tipos de entrada
          </h2>

          <div class="space-y-3">
            <div class="flex items-center justify-between gap-6 py-3">
              <span class="text-base font-medium uppercase leading-relaxed text-white/90">Entrada Básica</span>
              <span class="text-3xl font-semibold text-white">Gratis</span>
            </div>
            <div class="flex items-center justify-between gap-6 py-3">
              <span class="text-base font-medium uppercase leading-relaxed text-white/90">Entrada + Merch</span>
              <span class="text-3xl font-semibold text-white">5€</span>
            </div>
            <div class="flex items-center justify-between gap-6 py-3">
              <span class="text-base font-medium uppercase leading-relaxed text-white/90">Pase VIP</span>
              <span class="text-3xl font-semibold text-white">+10€</span>
            </div>
          </div>
        </div>

        <div class="w-full lg:mx-auto lg:max-w-md">
          <h2 class="mb-4 text-4xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
            Horarios
          </h2>

          <div class="space-y-3">
            <div class="py-3">
              <p class="text-xl font-semibold uppercase tracking-tight text-white">Viernes 20</p>
              <p class="mt-2 text-base font-medium text-white/85">Apertura de puertas y eventos: 10:00 - 21:00</p>
            </div>
            <div class="py-3">
              <p class="text-xl font-semibold uppercase tracking-tight text-white">Sábado 21</p>
              <p class="mt-2 text-base font-medium text-white/85">Apertura de puertas y eventos: 10:00 - 21:00</p>
            </div>
            <div class="py-3">
              <p class="text-xl font-semibold uppercase tracking-tight text-white">Domingo 22</p>
              <p class="mt-2 text-base font-medium text-white/85">Apertura de puertas y eventos: 10:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <form @submit.prevent="enviarCompra">
      <section class="relative bg-[#371e58] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        <img
          src="/images/estampado_esclat.png"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
        />

        <div class="relative z-10 mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p class="mb-4 text-base font-medium uppercase leading-relaxed text-white/90">
              Compra
            </p>

            <h2 class="text-4xl font-semibold uppercase tracking-tight text-[#eb378d] sm:text-5xl md:text-6xl">
              Tus datos y entradas
            </h2>

            <p class="mt-6 max-w-md text-base font-medium leading-relaxed text-white/90">
              Completa la información necesaria para recibir tu confirmación de acceso.
            </p>

            <!-- BOTÓN ACTUALIZADO (VERDE CONSTANTE, TEXTO MORADO, HOVER SÓLO DE TAMAÑO) -->
            <RouterLink
              to="/entradas-acceso/merch"
              class="mt-8 inline-flex items-center bg-[#bcd432] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#371e58] transition-transform duration-200 hover:scale-105"
            >
              Ver más merchandising
            </RouterLink>
          </div>

          <div class="space-y-14">
            <div>
              <h3 class="mb-6 text-2xl font-semibold uppercase tracking-tight text-white">
                Datos personales
              </h3>
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label class="festival-label">Nombre</Label>
                  <Input v-model="datosUsuario.nombre" required class="festival-input" />
                </div>
                <div>
                  <Label class="festival-label">Apellidos</Label>
                  <Input v-model="datosUsuario.apellidos" required class="festival-input" />
                </div>
                <div>
                  <Label class="festival-label">Correo electrónico</Label>
                  <Input type="email" v-model="datosUsuario.email" required class="festival-input" />
                </div>
                <div>
                  <Label class="festival-label">Teléfono</Label>
                  <Input type="tel" v-model="datosUsuario.telefono" required class="festival-input" />
                </div>
              </div>
            </div>

            <div>
              <h3 class="mb-6 text-2xl font-semibold uppercase tracking-tight text-white">
                Selecciona tus entradas
              </h3>
              <div class="grid gap-5 sm:grid-cols-3">
                <div>
                  <Label class="festival-label">Viernes</Label>
                  <Select @update:model-value="(val: any) => actualizarPrecio('viernes', val)">
                    <SelectTrigger class="w-full p-3 bg-transparent text-[#eb378d] font-bold rounded-none border border-[#eb378d] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Seleccionar entrada" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#eb378d] border-none rounded-none p-0 min-w-(--radix-select-trigger-width)">
                      <SelectItem value="ninguno" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Sin entrada</SelectItem>
                      <SelectItem value="basica" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Entrada Básica - Gratis</SelectItem>
                      <SelectItem value="merch" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Entrada + Merch - 5€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label class="festival-label">Sábado</Label>
                  <Select @update:model-value="(val: any) => actualizarPrecio('sabado', val)">
                    <SelectTrigger class="w-full p-3 bg-transparent text-[#eb378d] font-bold rounded-none border border-[#eb378d] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Seleccionar entrada" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#eb378d] border-none rounded-none p-0 min-w-(--radix-select-trigger-width)">
                      <SelectItem value="ninguno" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Sin entrada</SelectItem>
                      <SelectItem value="basica" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Entrada Básica - Gratis</SelectItem>
                      <SelectItem value="merch" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Entrada + Merch - 5€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label class="festival-label">Domingo</Label>
                  <Select @update:model-value="(val: any) => actualizarPrecio('domingo', val)">
                    <SelectTrigger class="w-full p-3 bg-transparent text-[#eb378d] font-bold rounded-none border border-[#eb378d] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Seleccionar entrada" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#eb378d] border-none rounded-none p-0 min-w-(--radix-select-trigger-width)">
                      <SelectItem value="ninguno" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Sin entrada</SelectItem>
                      <SelectItem value="basica" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Entrada Básica - Gratis</SelectItem>
                      <SelectItem value="merch" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#eb378d] focus:bg-[#371e58] focus:text-[#eb378d]">Entrada + Merch - 5€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div class="py-2">
              <label class="flex cursor-pointer items-center justify-between gap-8">
                <div>
                  <span class="text-base font-semibold uppercase tracking-tight text-white">Pase VIP</span>
                  <p class="mt-1 text-sm font-medium text-white/70">Acceso exclusivo a zonas de descanso + oportunidad de conocer a los grupos (+10€)</p>
                </div>
                <input
                  type="checkbox"
                  v-model="incluyeVip"
                  class="h-6 w-6 accent-[#bcd432]"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="relative bg-[#eb378d] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        <img
          src="/images/estampado_esclat.png"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
        />

        <div class="relative z-10 mx-auto max-w-6xl">
          <div class="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p class="mb-4 text-base font-medium uppercase text-white/90">
                Resumen
              </p>
              <div class="flex flex-wrap items-end gap-x-8 gap-y-3">
                <span class="text-3xl font-semibold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Total a pagar
                </span>
                <span class="text-3xl font-semibold leading-none text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {{ precioTotal }}€
                </span>
              </div>
              <p class="mt-5 text-base font-medium uppercase leading-relaxed text-white/90">
                El precio incluye todos los impuestos
              </p>
            </div>

            <div class="w-full lg:w-80">
              <button
                type="submit"
                class="w-full bg-[#371e58] px-8 py-7 text-base font-black uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-[#eb378d]"
              >
                Confirmar compra
              </button>

              <p class="mt-5 text-center text-sm font-medium text-white/80">
                Al confirmar, recibirás las entradas en tu correo electrónico
              </p>
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<style scoped>
.festival-label {
  margin-bottom: 0.5rem;
  display: block;
  color: #eb378d;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.festival-input {
  min-height: 3.25rem;
  border-color: #eb378d;
  background-color: transparent;
  color: #eb378d;
  border-radius: 0;
  font-weight: 700;
}

.festival-input:focus {
  border-color: #eb378d;
  box-shadow: 0 0 0 3px rgba(235, 55, 141, 0.24);
}

.festival-input::placeholder {
  color: rgba(235, 55, 141, 0.65);
}
</style>