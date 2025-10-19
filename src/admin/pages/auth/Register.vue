<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg space-y-8">
      <h1 class="text-3xl font-bold text-center text-gray-900">Criar Conta</h1>

      <p v-if="error" class="text-red-500 text-center text-sm mt-4">{{ error }}</p>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="mt-2 w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-2 w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Digite seu email"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Senha</label>
          <div class="relative">
                <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="mt-2 w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Digite sua senha"
                />
                <button
                    type="button"
                    @click="togglePassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                    <Eye v-if="!showPassword" class="ml-1" />
                    <EyeOff v-if="showPassword" class="ml-1" />
                </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <div class="relative">
            <input
                v-model="form.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="mt-2 w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Confirme sua senha"
            />
             <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
                <Eye v-if="!showConfirmPassword" class="ml-1" />
                <EyeOff v-if="showConfirmPassword" class="ml-1" />
            </button>
          </div>
       
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg text-lg transition duration-200 disabled:opacity-50"
        >
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
        Já tem uma conta?
        <router-link to="/login" class="text-indigo-600 hover:underline font-medium">Entrar</router-link>
      </p>

     
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Eye,EyeOff  } from 'lucide-vue-next';
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const loading = ref(false)
const error = ref('')

const register = async () => {
  loading.value = true
  error.value = ''

  try {
    await authService.register(form.value)

    router.push('/login')

  } catch (err) {
    console.error(err)
    error.value =
      err.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>