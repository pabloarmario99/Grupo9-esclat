<template>
  <div
    v-if="enabled"
    ref="cursorRef"
    class="custom-cursor"
    :class="{ 'is-hidden': isHoveringClickable }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, toRef } from 'vue'

// Propiedad para activar/desactivar el cursor (opcional)
const props = withDefaults(defineProps<{
  enabled?: boolean
}>(), {
  enabled: true,
})

const enabled = toRef(props, 'enabled')

const cursorRef = ref<HTMLElement | null>(null)
const isHoveringClickable = ref(false)

let mouseX = 0
let mouseY = 0
let rafId: number | null = null

// Función que actualiza la posición del cursor en cada frame
const updateCursorPosition = () => {
  if (!cursorRef.value) return
  cursorRef.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
  rafId = requestAnimationFrame(updateCursorPosition)
}

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  // Detecta si el ratón está sobre un elemento clickable (botones, enlaces, etc.)
  const target = e.target as HTMLElement
  const isClickable = target.closest('button, a, [role="button"], input, .clickable')
  isHoveringClickable.value = !!isClickable
}

// Oculta el cursor nativo cuando el personalizado está activo
const disableNativeCursor = () => {
  const style = document.createElement('style')
  style.id = 'custom-cursor-global'
  style.textContent = `
    * {
      cursor: none !important;
    }
    .custom-cursor {
      cursor: none;
    }
  `
  document.head.appendChild(style)
}

const enableNativeCursor = () => {
  const style = document.getElementById('custom-cursor-global')
  if (style) style.remove()
}

onMounted(() => {
  if (!enabled.value) return
  disableNativeCursor()
  window.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(updateCursorPosition)
})

onUnmounted(() => {
  if (!enabled.value) return
  enableNativeCursor()
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(156, 39, 176, 0.6); /* morado con transparencia */
  backdrop-filter: blur(2px); /* opcional: efecto de desenfoque detrás */
  pointer-events: none;       /* para que no interfiera con clicks */
  z-index: 9999;
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  will-change: transform;
  /* pequeño retraso para que sea más suave */
  transition: transform 0.08s linear;
}

/* Cuando el ratón pasa sobre un elemento clickable, se hace más pequeño o cambia de color */
.custom-cursor.is-hidden {
  width: 20px;
  height: 20px;
  background-color: rgba(156, 39, 176, 0.9);
}
</style>