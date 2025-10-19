<template>
  <transition name="slide">
    <!-- Overlay para mobile -->
    <div
      v-if="open"
      class="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
      @click="$emit('update:open', false)"
    ></div>
  </transition>

  <transition name="slide">
    <aside
      v-if="open || isDesktop"
      :class="[
        'fixed sm:static inset-y-0 left-0 bg-gray-900 text-gray-200 flex flex-col z-50 h-full',
        isDesktop ? 'w-64' : 'w-full'
      ]"
    >
      <button
        class="sm:hidden absolute top-3 right-3 text-gray-300 hover:text-white"
        @click="$emit('update:open', false)"
      >
        ✕
      </button>

      <div class="text-center py-6 font-bold text-xl border-b border-gray-800">
        Paper Dashboard
      </div>

      <nav class="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        <SidebarItem icon="📊" title="Dashboard" to="/app" @click="handleNavigate" />
        <SidebarItem icon="👤" title="User Profile" to="/app/user" @click="handleNavigate" />
        <SidebarItem icon="📋" title="Tables" to="/app" @click="handleNavigate" />

        <SidebarItem icon="⚙️" title="Settings">
          <template #submenu>
            <SidebarItem title="General" to="/settings/general" @click="handleNavigate" />
            <SidebarItem title="Security" to="/settings/security" @click="handleNavigate" />
          </template>
        </SidebarItem>
      </nav>
    </aside>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
  open: Boolean
})

const handleNavigate = () => {
  if (!isDesktop.value) {
    emit('update:open', false)
  }
}

const isDesktop = ref(window.innerWidth >= 640)

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 640
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

const emit = defineEmits(['update:open'])

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
/* Fade para overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
