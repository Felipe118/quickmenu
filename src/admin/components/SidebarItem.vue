<template>
  <div>
    <button
      @click="toggle"
      class="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition"
    >
      <div class="flex items-center space-x-2">
        <span v-if="icon">{{ icon }}</span>
        <router-link v-if="to" :to="to" class="hover:text-white">
          {{ title }}
        </router-link>
        <span v-else>{{ title }}</span>
      </div>
      <span v-if="$slots.submenu">▼</span>
    </button>

    <div v-if="open && $slots.submenu" class="pl-6 mt-1 space-y-1">
      <slot name="submenu" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  to: String,
  icon: String
})

const open = ref(false)
const toggle = () => {
  if (!hasSlot()) return
  open.value = !open.value
}

const hasSlot = () => !!useSlots().submenu
</script>
