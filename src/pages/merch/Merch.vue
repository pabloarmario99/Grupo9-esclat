<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
const varianteSeleccionadaIndex = ref(0)

// Catálogo de Merchandising del Festival con VARIANTES integradas según tu nueva estructura
const productos = ref([
  // --- LAS 4 PRIMERAS: Tienen 3 variaciones cada una ---
  { 
    id: 1, 
    url: '/images/sudaderas/sudaderarb.jpg', 
    nombre: 'Sudadera Barco Esclat 2026', 
    precio: 25,
    variantes: [
      { color: 'Negro (Principal)', url: '/images/sudaderas/sudaderarb.jpg' },
      { color: 'Blanco', url: '/images/sudaderas/sudaderamb.jpg' }, 
      { color: 'Verde Festival', url: '/images/sudaderas/sudaderavb.jpg' }
    ]
  },
  { 
    id: 2, 
    url: '/images/sudaderas/sudaderarl.jpg', 
    nombre: 'Sudadera Libro Esclat 2026', 
    precio: 25,
    variantes: [
      { color: 'Gris Carbón', url: '/images/sudaderas/sudaderarl.jpg' },
      { color: 'Rosa Esclat', url: '/images/sudaderas/sudaderaml.jpg' },
      { color: 'Crema', url: '/images/sudaderas/sudaderavl.jpg' }
    ]
  },
  { 
    id: 3, 
    url: '/images/sudaderas/sudaderarc.jpg', 
    nombre: 'Sudadera Cassette Esclat 2026', 
    precio: 25,
    variantes: [
      { color: 'Azul Eléctrico', url: '/images/sudaderas/sudaderarc.jpg' },
      { color: 'Negro Mate', url: '/images/sudaderas/sudaderamc.jpg' },
      { color: 'Naranja Fluor', url: '/images/sudaderas/sudaderavc.jpg' }
    ]
  },
  { 
    id: 4, 
    url: '/images/sudaderas/sudaderarr.jpg', 
    nombre: 'Sudadera Ratón Esclat 2026', 
    precio: 25,
    variantes: [
      { color: 'Gris Mezcla', url: '/images/sudaderas/sudaderarr.jpg' },
      { color: 'Negro Deep', url: '/images/sudaderas/sudaderamr.jpg' },
      { color: 'Verde Olivo', url: '/images/sudaderas/sudaderavr.jpg' }
    ]
  },

  // --- LAS 4 SIGUIENTES: No tienen ninguna variación ---
  { id: 5, url: '/images/camisetas/cam1.jpg', nombre: 'Camiseta Esclat 1', precio: 10 },
  { id: 6, url: '/images/camisetas/cami2.jpg', nombre: 'Camiseta Esclat 2', precio: 10 },
  { id: 7, url: '/images/camisetas/cami3.jpg', nombre: 'Camiseta Esclat 3', precio: 10 },
  { id: 8, url: '/images/camisetas/cami5.jpg', nombre: 'Camiseta Esclat 4', precio: 10 },

  // --- LA SIGUIENTE (IMAGEN 9): Tiene 3 variaciones ---
  { 
    id: 9, 
    url: '/images/gorras/mkcap.jpg', 
    nombre: 'Gorra Esclat 2026', 
    precio: 10,
    variantes: [
      { color: 'Camo/Verde', url: '/images/gorras/mkcap.jpg' },
      { color: 'Full Black', url: '/images/gorras/mkcapm.jpg' },
      { color: 'Rojo Retro', url: '/images/gorras/mkcapv.jpg' }
    ]
  },

  // --- LAS SIGUIENTES 4: Tienen 2 variaciones cada una ---
  { 
    id: 10, 
    url: '/images/tote/toteb.jpg', 
    nombre: 'Tote Bag Barco Esclat 2026', 
    precio: 5,
    variantes: [
      { color: 'Negro Tech', url: '/images/tote/toteb.jpg' },
      { color: 'Amarillo Ácido', url: '/images/tote/rtoteb.jpg' }
    ]
  },
  { 
    id: 11, 
    url: '/images/tote/totel.jpg', 
    nombre: 'Tote Bag Libro Esclat 2026', 
    precio: 5,
    variantes: [
      { color: 'Blanco Crudo', url: '/images/tote/totel.jpg' },
      { color: 'Negro Wash', url: '/images/tote/rtotel.jpg' }
    ]
  },
  { 
    id: 12, 
    url: '/images/tote/totec.jpg', 
    nombre: 'Tote Bag Cassette Esclat 2026', 
    precio: 5,
    variantes: [
      { color: 'Líneas Rosas', url: '/images/tote/totec.jpg' },
      { color: 'Líneas Verdes', url: '/images/tote/rtotec.jpg' }
    ]
  },
  { 
    id: 13, 
    url: '/images/tote/toter.jpg', 
    nombre: 'Tote Bag Ratón Esclat 2026', 
    precio: 5,
    variantes: [
      { color: 'Gris Carbón', url: '/images/tote/toter.jpg' },
      { color: 'Blanco Óptico', url: '/images/tote/rtoter.jpg' }
    ]
  },

  // --- LAS ÚLTIMAS 5: No tienen ninguna variación ---
  { id: 14, url: '/images/tote/totef.jpg', nombre: 'Tote Bag Estampado Esclat 2026', precio: 5 },
  { id: 15, url: '/images/llaveros/llavero1.png', nombre: 'LLavero Cassette', precio: 5 },
  { id: 16, url: '/images/llaveros/llavero2.png', nombre: 'LLavero Ratón', precio: 5 },
  { id: 17, url: '/images/llaveros/llavero3.png', nombre: 'LLavero Libro', precio: 5 },
  { id: 18, url: '/images/llaveros/llavero4.png', nombre: 'LLavero Barco', precio: 5 }
])

watch(selectedIndex, () => {
  varianteSeleccionadaIndex.value = 0
})

const openImage = (index: number) => {
  selectedIndex.value = index
  varianteSeleccionadaIndex.value = 0
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
const colorSeleccionado = ref<string>('') // Guarda la selección de color del usuario

// Detectamos de forma reactiva el objeto entero que se ha marcado en el desplegable
const objetoSeleccionadoFormulario = computed(() => {
  if (productoSeleccionado.value === null) return null
  return productos.value.find(p => p.id === productoSeleccionado.value) || null
})

// Lógica condicional: determina qué tipo de selector de color pintar
const mostrarSelectorColor = computed(() => {
  if (!objetoSeleccionadoFormulario.value) return null
  
  const nombreLower = objetoSeleccionadoFormulario.value.nombre.toLowerCase()
  
  // Condición 1: Si es una de las sudaderas o la gorra
  if (nombreLower.includes('sudadera') || nombreLower.includes('gorra')) {
    return 'sudadera_gorra' as const
  }
  
  // Condición 2: Si es una tote bag pero NO es la de estampado
  if (nombreLower.includes('tote') && !nombreLower.includes('estampado')) {
    return 'tote' as const
  }
  
  return null
})

// Si cambian de artículo en el Select, limpiamos el color anteriormente seleccionado
watch(productoSeleccionado, () => {
  colorSeleccionado.value = ''
})

const precioTotal = computed(() => {
  if (productoSeleccionado.value === null) return 0
  const prod = productos.value.find(p => p.id === productoSeleccionado.value)
  return prod ? prod.precio : 0
})

const productoActual = computed(() => {
  return productos.value[selectedIndex.value] || null
})

const enviarPedido = async (): Promise<void> => {
  if (!datosEnvio.value.nombre || !datosEnvio.value.email || !datosEnvio.value.direccion || productoSeleccionado.value === null) {
    alert('Por favor, rellena tus datos y selecciona al menos un artículo.')
    return
  }

  // Validación: Si el producto requiere color y no se ha marcado ninguno
  if (mostrarSelectorColor.value && !colorSeleccionado.value) {
    alert('Por favor, selecciona un color para el artículo elegido.')
    return
  }

  const producto = productos.value.find(p => p.id === productoSeleccionado.value)
  
  console.log('Pedido procesado:', {
    usuario: datosEnvio.value,
    articulo: producto?.nombre,
    talla: tallaSeleccionada.value,
    color: colorSeleccionado.value || 'Estándar',
    total: precioTotal.value
  })

  const detalleColor = colorSeleccionado.value ? ` (${colorSeleccionado.value.toUpperCase()})` : ''
  alert(`¡Reserva de Merch Confirmada!\n\nHemos guardado tu ${producto?.nombre}${detalleColor} (Talla ${tallaSeleccionada.value.toUpperCase()}).\nRecibirás un correo en ${datosEnvio.value.email} para finalizar el pago.`)
}
</script>

<template>
  <div class="w-full mt-10 overflow-x-hidden bg-[#371e58]">
    
    <section class="relative bg-[#eb378d] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
      <img
        src="/images/estampado_esclat.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-85 mix-blend-multiply"
      />
      <div class="relative z-10 mx-auto max-w-6xl">
        
        <h1 class="text-5xl font-medium uppercase tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-none select-none mb-6">
          MERCHANDISING
        </h1>

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
            <p class="mb-4 text-base font-medium uppercase leading-relaxed text-white">Tienda Oficial</p>
            <h2 class="text-4xl font-semibold uppercase tracking-tight text-[#bdd434] sm:text-5xl md:text-6xl">Asegura tus prendas</h2>
            <p class="mt-6 max-w-md text-base font-medium leading-relaxed text-white/90">
              Elige tu producto del catálogo superior, selecciona los detalles correspondientes y te lo guardaremos para envío o recogida en el recinto.
            </p>
          </div>

          <div class="space-y-14">
            <div>
              <h3 class="mb-6 text-2xl font-semibold uppercase tracking-tight text-white">Información del comprador</h3>
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

            <div>
              <h3 class="mb-6 text-2xl font-semibold uppercase tracking-tight text-white">Tu elección</h3>
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

                <div v-if="mostrarSelectorColor" class="sm:col-span-2 transition-all duration-300">
                  <Label class="festival-label">Color Personalizado</Label>
                  <Select @update:model-value="(val: any) => colorSeleccionado = val" :model-value="colorSeleccionado">
                    <SelectTrigger class="w-full p-3 bg-transparent text-[#bdd434] font-bold rounded-none border border-[#bdd434] outline-none text-sm tracking-wide h-auto focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Selecciona el color definitivo" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#bdd434] border border-[#bdd434]/30 rounded-none p-0 min-w-(--radix-select-trigger-width)">
                      
                      <template v-if="mostrarSelectorColor === 'sudadera_gorra'">
                        <SelectItem value="rosa" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Rosa</SelectItem>
                        <SelectItem value="morada" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Morada</SelectItem>
                        <SelectItem value="verde" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Verde</SelectItem>
                      </template>

                      <template v-if="mostrarSelectorColor === 'tote'">
                        <SelectItem value="morado" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Morado</SelectItem>
                        <SelectItem value="rojo" class="text-[#371e58] font-bold rounded-none p-3 text-sm tracking-wide cursor-pointer uppercase transition-colors data-highlighted:bg-[#371e58] data-highlighted:text-[#bdd434] focus:bg-[#371e58] focus:text-[#bdd434]">Rojo</SelectItem>
                      </template>

                    </SelectContent>
                  </Select>
                </div>

              </div>
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
              <div class="flex flex-wrap items-end gap-x-8 gap-y-3">
                <span class="text-3xl font-semibold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">Importe Merch</span>
                <span class="text-3xl font-semibold leading-none text-white sm:text-4xl md:text-5xl lg:text-6xl">{{ precioTotal }}€</span>
              </div>
              <p class="mt-5 text-base font-medium uppercase leading-relaxed text-white/90">
                Los beneficios van destinados íntegramente al mantenimiento del festival independiente
              </p>
            </div>
            <div class="w-full lg:w-80">
              <button type="submit" class="w-full bg-[#371e58] px-8 py-7 text-base font-black uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-[#eb378d]">
                Reservar material
              </button>
              <p class="mt-5 text-center text-sm font-medium text-white/80">Unidades limitadas. No se garantiza stock en taquilla del festival.</p>
            </div>
          </div>
        </div>
      </section>
    </form>

    <Teleport to="body">
      <div 
        v-if="isLightboxOpen"
        class="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md select-none transition-opacity duration-300"
        @click.self="closeLightbox"
      >
        <button class="absolute top-6 right-6 z-50 text-white/70 hover:text-[#bdd434] text-4xl font-light p-4 transition-colors" @click="closeLightbox">✕</button>

        <button class="absolute left-0 top-0 bottom-0 w-1/5 flex items-center justify-center text-white/30 hover:text-[#bdd434] text-5xl font-bold bg-linear-to-r from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-200" @click="prevImage">‹</button>

        <div class="max-w-[80vw] max-h-[90vh] flex flex-col items-center justify-center" @click.stop>
          <img 
            :src="productoActual?.variantes?.[varianteSeleccionadaIndex]?.url || productoActual?.url || ''" 
            alt="Detalle del producto" 
            class="max-w-full max-h-[65vh] object-contain border border-white/10 shadow-2xl rounded-sm transition-all duration-200"
          />

          <div 
            v-if="productoActual?.variantes && productoActual.variantes.length > 1" 
            class="flex gap-3 mt-4 justify-center items-center bg-black/40 p-2 rounded-md border border-white/5"
          >
            <button
              v-for="(variante, vIndex) in productoActual.variantes"
              :key="vIndex"
              @click="varianteSeleccionadaIndex = vIndex"
              class="w-14 h-14 rounded-sm overflow-hidden border-2 transition-all duration-200 focus:outline-none"
              :class="varianteSeleccionadaIndex === vIndex ? 'border-[#bdd434] scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'"
              :title="variante.color"
            >
              <img :src="variante.url" :alt="variante.color" class="w-full h-full object-cover" />
            </button>
          </div>

          <p class="text-white font-bold uppercase tracking-wider text-lg sm:text-xl mt-4 bg-[#371e58] px-6 py-2 border-b-2 border-[#bdd434] text-center">
            {{ productoActual?.nombre }} 
            <span class="text-xs block text-white/60 normal-case font-normal mt-0.5">
              Variante: {{ productoActual?.variantes?.[varianteSeleccionadaIndex]?.color || 'Estándar' }}
            </span>
            <span class="text-[#bdd434] font-black block sm:inline sm:ml-2">— {{ productoActual?.precio }}€</span>
          </p>
        </div>

        <button class="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-center text-white/30 hover:text-[#bdd434] text-5xl font-bold bg-linear-to-l from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-200" @click="nextImage">›</button>
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