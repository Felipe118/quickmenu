<template>
  <div class="flex flex-col items-center justify-center h-[80vh] text-center px-6">
    <!-- Título -->
    <h1 class="text-5xl font-semibold text-gray-800 mb-3">
      Bem-vindo ao <span class="text-blue-600">QuickMenu!</span>
    </h1>

    <!-- Subtítulo -->
    <p class="text-gray-600 text-xl max-w-md mb-8">
      Parece que você ainda não cadastrou seu restaurante.  
      Vamos criar o seu primeiro para começar a usar o sistema!
    </p>

    <!-- Botão -->
    <button
      @click="goToCreate"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
    >
      🍽️ Criar Restaurante
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCreate = () => {
  router.push('/app/restaurante/cadastro')
}
</script>
