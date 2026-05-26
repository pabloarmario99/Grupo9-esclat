<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Definir días del evento
const diasEvento = ['viernes', 'sabado', 'domingo'] as const
type DiaEvento = typeof diasEvento[number]

// Definir interfaces
interface EntradaDia {
  tipo: 'ninguno' | 'medio' | 'completo'
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

const incluyeMerch = ref<boolean>(false)

// Precios
const precios = {
  medio: 3,
  completo: 5,
  pack3Dias: 12
}

// Calcular precio total
const precioTotal = computed<number>(() => {
  let total = 0
  let diasSeleccionados = 0
  let diasCompletos = 0
  
  // Contar días seleccionados
  diasEvento.forEach(dia => {
    if (entradas.value[dia].tipo !== 'ninguno') {
      diasSeleccionados++
      if (entradas.value[dia].tipo === 'completo') {
        diasCompletos++
      }
    }
  })
  
  // Si selecciona los 3 días completos, aplicamos pack
  if (diasSeleccionados === 3 && diasCompletos === 3) {
    total = precios.pack3Dias
  } else {
    // Calcular precio normal
    diasEvento.forEach(dia => {
      if (entradas.value[dia].tipo === 'medio') {
        total += precios.medio
      } else if (entradas.value[dia].tipo === 'completo') {
        total += precios.completo
      }
    })
  }
  
  // Añadir merch si está seleccionado
  if (incluyeMerch.value && total > 0) {
    total += 1
  }
  
  return total
})

// Aforo disponible
const aforoDisponible = computed<number>(() => aforoMaximo - entradasVendidas.value)

// Actualizar precio cuando cambia tipo de entrada
const actualizarPrecio = (dia: DiaEvento, tipo: string) => {
  entradas.value[dia].tipo = tipo as 'ninguno' | 'medio' | 'completo'
  
  if (tipo === 'medio') {
    entradas.value[dia].precio = precios.medio
  } else if (tipo === 'completo') {
    entradas.value[dia].precio = precios.completo
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
  
  // Simular envío de correo
  const confirmacion = {
    usuario: datosUsuario.value,
    entradas: entradas.value,
    total: precioTotal.value,
    merch: incluyeMerch.value,
    fecha: new Date().toLocaleString()
  }
  
  console.log('Compra realizada:', confirmacion)
  
  // Simular envío de email
  alert(`✅ ¡Compra confirmada!\n\nSe ha enviado un correo a ${datosUsuario.value.email}\nTotal: ${precioTotal.value}€\n\n¡Gracias por tu compra!`)
  
  // Actualizar aforo
  entradasVendidas.value++
}

// Resetear formulario (opcional)
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    
    <!-- INFORMACIÓN DE ENTRADAS -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-center mb-8">Entradas y Acceso</h1>
      
      <!-- Contador de aforo -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center">
        <p class="text-lg font-semibold text-blue-800">
          Aforo disponible: {{ aforoDisponible }} / {{ aforoMaximo }} entradas
        </p>
        <p class="text-sm text-blue-600 mt-1">
          ¡Últimas entradas! No te quedes sin la tuya
        </p>
      </div>
      
      <!-- Tabla de precios -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Tipos de entrada -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4"> Tipos de entrada</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center border-b pb-2">
              <span>Medio día (tarde)</span>
              <span class="font-bold text-[#ef5da2]">3€</span>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span>Día completo</span>
              <span class="font-bold text-[#ef5da2]">5€</span>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span>Pack especial 3 días completos</span>
              <span class="font-bold text-[#ef5da2]">12€</span>
            </div>
            <div class="flex justify-between items-center pt-2">
              <span>Merchandising oficial</span>
              <span class="font-bold text-purple-600">+1€</span>
            </div>
          </div>
        </div>
        
        <!-- Horarios -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Horarios</h2>
          <div class="space-y-3">
            <div>
              <p class="font-semibold">Viernes 20</p>
              <p class="text-sm text-gray-600">Tarde: 16:00 - 21:00 | Completo: 10:00 - 21:00</p>
            </div>
            <div>
              <p class="font-semibold">Sábado 21</p>
              <p class="text-sm text-gray-600">Tarde: 16:00 - 21:00 | Completo: 10:00 - 21:00</p>
            </div>
            <div>
              <p class="font-semibold">Domingo 22</p>
              <p class="text-sm text-gray-600">Tarde: 16:00 - 21:00 | Completo: 10:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- FORMULARIO DE COMPRA -->
    <div class="bg-gray-100 rounded-xl py-12 px-4">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Comprar entradas</h2>
        
        <form @submit.prevent="enviarCompra" class="space-y-6">
          <!-- Datos personales -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Datos personales</h3>
            <div class="space-y-4">
              <div>
                <Label>Nombre</Label>
                <Input v-model="datosUsuario.nombre" required />
              </div>
              <div>
                <Label>Apellidos</Label>
                <Input v-model="datosUsuario.apellidos" required />
              </div>
              <div>
                <Label>Correo electrónico</Label>
                <Input type="email" v-model="datosUsuario.email" required />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input type="tel" v-model="datosUsuario.telefono" required />
              </div>
            </div>
          </div>
          
          <!-- Selección de entradas por día -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Selecciona tus entradas</h3>
            <div class="space-y-4">
              <!-- Viernes -->
              <div>
                <Label class="font-semibold">Viernes</Label>
                <Select @update:model-value="(val: any) => actualizarPrecio('viernes', val)">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar entrada" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguno">Sin entrada</SelectItem>
                    <SelectItem value="medio">Medio día - 3€</SelectItem>
                    <SelectItem value="completo">Día completo - 5€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <!-- Sábado -->
              <div>
                <Label class="font-semibold">Sábado</Label>
                <Select @update:model-value="(val: any) => actualizarPrecio('sabado', val)">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar entrada" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguno">Sin entrada</SelectItem>
                    <SelectItem value="medio">Medio día - 3€</SelectItem>
                    <SelectItem value="completo">Día completo - 5€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <!-- Domingo -->
              <div>
                <Label class="font-semibold">Domingo</Label>
                <Select @update:model-value="(val: any) => actualizarPrecio('domingo', val)">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar entrada" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguno">Sin entrada</SelectItem>
                    <SelectItem value="medio">Medio día - 3€</SelectItem>
                    <SelectItem value="completo">Día completo - 5€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <!-- Merchandising -->
          <div class="bg-white p-6 rounded-lg shadow">
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <span class="font-semibold">Merchandising oficial</span>
                <p class="text-sm text-gray-600">Pulsera + pegatinas + llavero (1€)</p>
              </div>
              <input 
                type="checkbox" 
                v-model="incluyeMerch" 
                class="w-5 h-5 text-[#ef5da2]"
              />
            </label>
          </div>
          
          <!-- Resumen y precio total -->
          <div class="bg-[#ef5da2] p-6 rounded-lg shadow text-white">
            <div class="flex justify-between items-center text-xl font-bold">
              <span>Total a pagar:</span>
              <span>{{ precioTotal }}€</span>
            </div>
            <p class="text-sm mt-2 opacity-90">
              * El precio incluye todos los impuestos
            </p>
          </div>
          
          <!-- Botón de compra -->
          <Button 
            type="submit"
            class="w-full bg-black hover:bg-gray-800 text-white text-lg py-6"
          >
            Confirmar compra
          </Button>
          
          <p class="text-center text-sm text-gray-600 mt-4">
            Al confirmar, recibirás las entradas en tu correo electrónico
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>