<template>
  <div class="w-64 bg-gray-900 text-gray-200 flex flex-col">
    <div class="text-center py-6 font-bold text-xl border-b border-gray-800">
      Paper Dashboard
    </div>

    <nav class="flex-1 overflow-y-auto px-4 py-2 space-y-2">
      <SidebarItem icon="📊" title="Dashboard" to="/" />
      <SidebarItem icon="👤" title="User Profile" to="/user" />
      <SidebarItem icon="📋" title="Tables" to="/tables" />

      <SidebarItem icon="⚙️" title="Settings">
        <template #submenu>
          <SidebarItem title="General" to="/settings/general" />
          <SidebarItem title="Security" to="/settings/security" />
        </template>
      </SidebarItem>
    </nav>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
</script>
