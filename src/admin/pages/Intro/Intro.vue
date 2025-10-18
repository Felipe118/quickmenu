<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
    <!-- Logo ou título -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Bem-vindo ao QuickMenu Admin</h1>
      <p class="text-gray-500 text-lg">
        Gerencie cardápios, pedidos e clientes de forma simples e eficiente.
      </p>
    </div>

    <!-- Ilustração / ícone -->
    <div class="mb-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-40 h-40 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 4h16v16H4z" />
        <path d="M4 9h16" />
        <path d="M9 9v11" />
      </svg>
    </div>

    <!-- Botões -->
    <div class="flex flex-col sm:flex-row gap-4">
      <button
        @click="goToLogin"
        class="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 rounded-md shadow"
      >
        Fazer Login
      </button>

      <button
        @click="openDocs"
        class="border border-sky-500 text-sky-600 hover:bg-sky-50 font-medium px-6 py-3 rounded-md"
      >
        Saiba mais
      </button>
    </div>

    <!-- Rodapé -->
    <footer class="mt-16 text-gray-400 text-sm">
      © {{ new Date().getFullYear() }} QuickMenu — Painel Gerencial
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToLogin = () => router.push('/login')
const openDocs = () => window.open('https://quickmenu.site', '_blank') // altere para o link real
</script>
