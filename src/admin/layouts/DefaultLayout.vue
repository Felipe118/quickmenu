<template>
  <div class="flex h-screen">
    <aside class="w-64 bg-gray-800 text-white p-4">Sidebar</aside>
    <div class="flex-1 p-4">
      <header class="mb-4">Header</header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>
