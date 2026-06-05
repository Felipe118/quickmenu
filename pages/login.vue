<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import type { LoginCredentials } from '@/types/auth'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const toast = useToast()

definePageMeta({
  layout: 'blank',
  public: true,
})

const auth = useAuthStore()

const formRef = ref<InstanceType<typeof import('vuetify/components').VForm>>()

const form = ref<LoginCredentials>({
  email: '',
  password: '',
  identity: '',
})

const handleLogin = async () => {

  const { valid } = await formRef.value!.validate()
  if (!valid)
    return

  const result = await auth.login(form.value);

  if (result?.error) {
    toast.success(handleError(result.error), 'error')
    
    return
  }

  console.log(result);

  navigateTo('/')
  
}

const isPasswordVisible = ref(false)

</script>

<template>
  <a href="javascript:void(0)">
    <div class="auth-logo d-flex align-center gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />
      <h1 class="auth-title">
        {{ themeConfig.app.title }}
      </h1>
    </div>
  </a>

  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative bg-background w-100 me-0">
        <div
          class="d-flex align-center justify-center w-100 h-100"
          style="padding-inline: 6.25rem;"
        >
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-6"
      >
        <VCardText>
          <h4 class="text-h4 mb-1">
            Bem vindo ao QuickMenu! 👋🏻
          </h4>
          <p class="mb-0">
            Faça login na sua conta e comece a usar!
          </p>
        </VCardText>
        <VCardText>
          <VForm 
            @submit.prevent="handleLogin"
            ref="formRef"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  :disabled="auth.loading"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  label="Senha"
                  placeholder="············"
                  :disabled="auth.loading"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between my-6">
                  <NuxtLink
                    to="/esqueci-senha"
                    class="text-body-2 text-primary"
                  >
                    Esqueceu a senha ?
                  </NuxtLink>
                </div>

                <VBtn
                  block
                  type="submit"
                  :loading="auth.loading"
                >
                  Entrar
                </VBtn>
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
