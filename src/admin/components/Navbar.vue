<template>

  <header class=" bg-white shadow p-4 flex justify-between items-center">
    <Menu @click="$emit('toggle-sidebar')" class="sm:hidden " />
    <h1 class="font-semibold text-gray-700 text-lg">QuickMenu Admin</h1>
    <div class="flex items-center max-w-6xl gap-3">
      <button class="text-gray-600 hover:text-gray-800 ">🔔</button>
      <button class=" bg-white hover:bg-gray-100 text-gray-800 flex font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        <LogOut class="color-red" /> Sair
      </button>
    </div>
  </header>
</template>

<script setup>
import { LogOut } from 'lucide-vue-next'
import { Menu } from 'lucide-vue-next';
</script>
