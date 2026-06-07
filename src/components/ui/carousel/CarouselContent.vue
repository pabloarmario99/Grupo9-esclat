<script setup lang="ts">
import type { ComponentPublicInstance } from "vue"
import type { WithClassAsProps } from "./interface"
import { cn } from "@/lib/utils"
import { useCarousel } from "./useCarousel"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

const carouselState = useCarousel()
const orientation = carouselState.orientation

function setCarouselRef(el: Element | ComponentPublicInstance | null) {
  carouselState.carouselRef.value = el as HTMLElement | undefined
}
</script>

<template>
  <div
    :ref="setCarouselRef"
    data-slot="carousel-content"
    class="overflow-hidden"
  >
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
