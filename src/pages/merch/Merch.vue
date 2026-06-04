<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// --- LOGICA DEL ELEMENTO EXTRAÍDO (LIGHTBOX + GRID) ---
const isLightboxOpen = ref(false)
const selectedIndex = ref(0)

// Catálogo de Merchandising del Festival
const productos = ref([
  { id: 1, url: '/images/PUESTOS/locolindon.jpg', nombre: 'Camiseta Oficial Esclat 2026', precio: 25 },
  { id: 2, url: '/images/PUESTOS/dalmau.jpg', nombre: 'Sudadera Heavy Oversize', precio: 45 },
  { id: 3, url: '/images/PUESTOS/ivanco.jpg', nombre: 'Póster Edición Limitada', precio: 12 },
  { id: 4, url: '/images/PUESTOS/caballero.jpg', nombre: 'Gorra Trucker Festival', precio: 18 },
  { id: 5, url: '/images/PUESTOS/enric.jpg', nombre: 'Tote Bag Lienzo Crudo', precio: 15 },
  { id: 6, url: '/images/PUESTOS/jawiki.jpg', nombre: 'Pack de Pegatinas + Parches', precio: 8 },
])

const openImage = (index: number) => {
  selectedIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}

const prevImage = () => {
  selectedIndex.value = (selectedIndex.value - 1 + productos.value.length) % productos.value.length
}

const nextImage = () => {
  selectedIndex.value = (selectedIndex.value + 1) % productos.value.length
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

// --- LÓGICA DEL FORMULARIO DE COMPRA DE MERCH ---
interface DatosEnvio {
  nombre: string
  apellidos: string
  email: string
  direccion: string
}

const datosEnvio = ref<DatosEnvio>({
  nombre: '',
  apellidos: '',
  email: '',
  direccion: ''
})

const productoSeleccionado = ref<number | null>(null)
const tallaSeleccionada = ref<string>('m')

const precioTotal = computed(() => {
  if (productoSeleccionado.value === null) return 0
  const prod = productos.value.find(p => p.id === productoSeleccionado.value)
  return prod ? prod.precio : 0
})

const enviarPedido = async (): Promise<void> => {
  if (!datosEnvio.value.nombre || !datosEnvio.value.email || !datosEnvio.value.direccion || productoSeleccionado.value === null) {
    alert('Por favor, rellena tus datos y selecciona al menos un artículo.')
    return
  }

  const producto = productos.value.find(p => p.id === productoSeleccionado.value)
  
  console.log('Pedido procesado:', {
    usuario: datosEnvio.value,
    articulo: producto?.nombre,
    talla: tallaSeleccionada.value,
    total: precioTotal.value
  })

  alert(`¡Reserva de Merch Confirmada!\n\nHemos guardado tu ${producto?.nombre} (Talla ${tallaSeleccionada.value.toUpperCase()}).\nRecibirás un correo en ${datosEnvio.value.email} para finalizar el pago.`)
}
</script>

<template>
  <div class="w-full mt-20 overflow-x-hidden bg-[#371e58]">
    
    <!-- SECCIÓN 1: HERO -->
    <section class="relative bg-[#371e58] px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36 flex items-center justify-center text-center">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
      />

      <div class="relative z-10 mx-auto max-w-7xl w-full">
        <h1 class="text-5xl font-medium uppercase tracking-tighter text-[#bdd434] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-none select-none">
          MERCHANDISING
        </h1>
      </div>
    </section>

    <!-- SECCIÓN 2: LOOKBOOK -->
    <section class="relative bg-[#eb378d] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />

      <div class="relative z-10 mx-auto max-w-6xl">
        <h2 class="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl md:text-6xl mb-12">
          Lookbook 2026
        </h2>

        <div class="gallery-grid">
          <div 
            v-for="(item, index) in productos" 
            :key="item.id" 
            class="thumbnail group relative"
            @click="openImage(index)"
          >
            <img :src="item.url" :alt="item.nombre" />
            <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
              <p class="text-[#bdd434] text-xs font-black uppercase tracking-widest">Esclat Gear</p>
              <p class="text-white font-bold uppercase text-lg leading-tight mt-1">{{ item.nombre }}</p>
              <p class="text-[#bdd434] font-black text-xl mt-2">{{ item.precio }}€</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 3: COMPRA / RESERVA -->
    <form @submit.prevent="enviarPedido">
      <section class="relative bg-[#371e58] border-t border-[#eb378d]/20 px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        <img
          src="/images/estampado_esclat.png"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
        />

        <div class="relative z-10 mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <!-- TEXTO CORREGIDO A BLANCO -->
            <p class="mb-4 text-base font-medium uppercase leading-relaxed text-white">
              Tienda Oficial
            </p>
            <h2 class="text-4xl font-semibold uppercase tracking-tight text-[#bdd434] sm:text-5xl md:text-6xl">
              Asegura tus prendas
            </h2>
            <!-- TEXTO CORREGIDO A BLANCO -->
            <p class="mt-6 max-w-md text-base font-medium leading-relaxed text-white/90">
              Elige tu producto del catálogo superior, selecciona los detalles correspondientes y te lo guardaremos para envío o recogida en el recinto.
            </p>
          </div>

          <div class="space-y-14">
            <!-- Datos de envío -->
            <div>
              <!-- TEXTO CORREGIDO A BLANCO -->
              <h3 class="mb-6 text-2xl font-semibold uppercase tracking-tight text-white">
                Información del comprador
              </h3>
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label class="festival-label">Nombre</Label>
                  <Input v-model="datosEnvio.nombre" required class="festival-input" />
                </div>
                <div>
                  <Label class="festival-label">Apellidos</Label>
                  <Input v-model="datosEnvio.apellidos" required class="festival-input" />
                </div>
                <div class="sm:col-span-2">
                  <Label class="festival-label">Dirección Postal Completa</Label>
                  <Input v-model="datosEnvio.direccion" required class="festival-input" />
                </div>
                <div class="sm:col-span-2">
                  <Label class="festival-label">Correo electrónico</Label>
                  <Input type="email" v-model="datosEnvio.email" required class="festival-input" />
                </div>
              </div>
            </div>

            <!-- Selectores de Producto -->
            <div>
              <!-- TEXTO CORREGIDO A BLANCO -->
              <h3 class="mb-6 text-2xl font-semibold uppercase tracking-tight text-white">
                Tu elección
              </h3>
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label class="festival-label">Prenda / Artículo</Label>
                  <Select @update:model-value="(val: any) => productoSeleccionado = Number(val)">
                    <SelectTrigger class="w-full p-3 bg-transparent text-[#bdd434] font-bold rounded-none border border-[#bdd434] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Seleccionar artículo" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#bdd434] border border-[#bdd434]/30 rounded-none p-0 min-w-(--radix-select-trigger-width)">
                      <SelectItem 
                        v-for="prod in productos" 
                        :key="prod.id" 
                        :value="String(prod.id)"
                        class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]"
                      >
                        {{ prod.nombre }} — {{ prod.precio }}€
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label class="festival-label">Talla (Si aplica)</Label>
                  <Select @update:model-value="(val: any) => tallaSeleccionada = val" default-value="m">
                    <SelectTrigger class="w-full p-3 bg-transparent text-[#bdd434] font-bold rounded-none border border-[#bdd434] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Talla" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#bdd434] border border-[#bdd434]/30 rounded-none p-0 min-w-(--radix-select-trigger-width)">
                      <SelectItem value="s" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Talla S</SelectItem>
                      <SelectItem value="m" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Talla M</SelectItem>
                      <SelectItem value="l" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Talla L</SelectItem>
                      <SelectItem value="xl" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Talla XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN 4: RESUMEN Y CONFIRMACIÓN -->
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
              <div class="flex flex-wrap items-end gap-x-8 gap-y-3">
                <span class="text-3xl font-semibold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Importe Merch
                </span>
                <span class="text-3xl font-semibold leading-none text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {{ precioTotal }}€
                </span>
              </div>
              <p class="mt-5 text-base font-medium uppercase leading-relaxed text-white/90">
                Los beneficios van destinados íntegramente al mantenimiento del festival independiente
              </p>
            </div>

            <div class="w-full lg:w-80">
              <button
                type="submit"
                class="w-full bg-[#371e58] px-8 py-7 text-base font-black uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-[#eb378d]"
              >
                Reservar material
              </button>
              <p class="mt-5 text-center text-sm font-medium text-white/80">
                Unidades limitadas. No se garantiza stock en taquilla del festival.
              </p>
            </div>
          </div>
        </div>
      </section>
    </form>

    <!-- LIGHTBOX -->
    <Teleport to="body">
      <div 
        v-if="isLightboxOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md select-none transition-opacity duration-300"
        @click.self="closeLightbox"
      >
        <button 
          class="absolute top-6 right-6 z-50 text-white/70 hover:text-[#bdd434] text-4xl font-light p-4 transition-colors"
          @click="closeLightbox"
        >
          ✕
        </button>

        <button 
          class="absolute left-0 top-0 bottom-0 w-1/5 flex items-center justify-center text-white/30 hover:text-[#bdd434] text-5xl font-bold bg-gradient-to-r from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-200"
          @click="prevImage"
        >
          ‹
        </button>

        <div class="max-w-[80vw] max-h-[80vh] flex flex-col items-center justify-center" @click.stop>
          <img 
            :src="productos[selectedIndex]?.url" 
            alt="Detalle del producto" 
            class="max-w-full max-h-[80vh] object-contain border border-white/10 shadow-2xl rounded-sm"
          />
          <p class="text-white font-bold uppercase tracking-wider text-xl mt-4 bg-[#371e58] px-6 py-2 border-b-2 border-[#bdd434]">
            {{ productos[selectedIndex]?.nombre }} — {{ productos[selectedIndex]?.precio }}€
          </p>
        </div>

        <button 
          class="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-center text-white/30 hover:text-[#bdd434] text-5xl font-bold bg-gradient-to-l from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-200"
          @click="nextImage"
        >
          ›
        </button>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.thumbnail {
  cursor: zoom-in;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: rgba(17, 17, 17, 0.4);
  border: 1px solid rgba(189, 212, 52, 0.2);
  transition: all 0.3s ease;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.thumbnail:hover img {
  transform: scale(1.04);
}

.thumbnail:hover {
  border-color: #bdd434;
  box-shadow: 0 0 15px rgba(189, 212, 52, 0.3);
}

.festival-label {
  margin-bottom: 0.5rem;
  display: block;
  color: #bdd434;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.festival-input {
  min-height: 3.25rem;
  border-color: #bdd434;
  background-color: transparent;
  color: #bdd434;
  border-radius: 0;
  font-weight: 700;
}

.festival-input:focus {
  border-color: #bdd434;
  box-shadow: 0 0 0 3px rgba(189, 212, 52, 0.24);
}

.festival-input::placeholder {
  color: rgba(189, 212, 52, 0.4);
}
</style>