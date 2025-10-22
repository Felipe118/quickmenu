<template>
  <div>
    <button
      v-if="!to"
      @click="toggle"
      class="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition"
    >
      <div class="flex items-center space-x-2 w-full text-left">
        <span v-if="icon" class="text-gray-400">{{ icon }}</span>
        <span>{{ title }}</span>
      </div>
      <span v-if="$slots.submenu">▼</span>
    </button>

    <router-link
      v-else
      :to="to"
      class="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800 transition text-left"
    >
      <div class="flex items-center space-x-2 w-full">
        <span v-if="icon" class="text-gray-400">{{ icon }}</span>
        <span>{{ title }}</span>
      </div>
      <span v-if="$slots.submenu">▼</span>
    </router-link>


    <div v-if="open && $slots.submenu" class="pl-6 mt-1 space-y-1">
      <slot name="submenu" />
    </div>
  </div>
</template>

<script setup>
import { ref, useSlots } from 'vue'

const props = defineProps({
  title: String,
  to: String,
  icon: String
})

const open = ref(false)
const slots = useSlots() // pegue os slots uma vez

const hasSlot = () => !!slots.submenu // true se existir

const toggle = () => {
  if (!hasSlot()) return
  open.value = !open.value
}
</script>
