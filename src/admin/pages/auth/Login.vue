<template>
  
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo ou título da aplicação -->
      <div class="flex justify-center">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Painel QuickMenu</h2>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <h2 class="text-center text-2xl font-bold text-gray-900">Login</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Entre com seu e-mail e senha 
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6 relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <!-- Formulário de login -->
          <form class="mt-6 space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">E-mail <span class="text-red-500">*</span></label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Senha <span class="text-red-500">*</span></label>
              <div class="mt-1 relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10 sm:text-sm"
                  placeholder="Enter your password"
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
            <span v-if="errorMessage" class="text-red-500 text-sm text-center block">
              {{ errorMessage }}
            </span>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="keepLogged"
                  name="keepLogged"
                  type="checkbox"
                  v-model="form.rememberMe"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="keepLogged" class="ml-2 block text-sm text-gray-900">Continuar logado</label>
              </div>

              <div class="text-sm">
                <button
                  @click="showForgotPassword = true"
                  type="button"
                  class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Sign In
              </button>
            </div>
          </form>

          <!-- Link para cadastro -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Não possui uma conta ?
              <button
                @click="Test()"
                class="font-medium text-blue-600 hover:text-blue-500 ml-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

  <!-- Modal Forgot Password (exemplo) -->
  <div v-if="showForgotPassword" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <!-- Modal content aqui -->
  </div>

  <!-- Modal Sign Up (exemplo) -->
  <div v-if="showSignUp" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <!-- Modal content aqui -->
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Eye,EyeOff  } from 'lucide-vue-next';
import authService from '@/services/authService';
import addresApi from '@/services/address/addresApi';

// Reactive form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const loading = ref(false)
const showForgotPassword = ref(false)
const showSignUp = ref(false)
const errorMessage = ref('')

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const signInWithGoogle = () => {
  // Implementar login com Google
  console.log('Sign in with Google')
}

const signInWithX = () => {
  // Implementar login com X (Twitter)
  console.log('Sign in with X')
}

const handleLogin = async () => {
    

     const token = await authService.login(form, { withCredentials: true }).then((response) => {
         return response.headers['x-xsrf-token']
     })
     .catch((error) => {
         errorMessage.value = error.response?.data.message
      })

    console.log('CSRF Cookie obtido:', token)

}

const Test = async () => {
  const address = await addresApi.getAddress(1, { withCredentials: true, withXSRFToken: true });
  console.log(address)
}
</script>