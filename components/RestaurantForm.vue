<script setup lang="ts">
import { restaurantSchema, type RestaurantFormData } from "@/schemas/restaurant";
import type { Restaurant } from "@/types/restaurant";
import { ref, watch } from 'vue';

interface Props {
  restaurant: Restaurant
  loading?: boolean
}

interface Emit {
  (e: 'submit', formData: RestaurantFormData): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emit>()

const toast = useToast()

const form = ref<RestaurantFormData>({
  name: '',
  slug: '',
  email: '',
  phone: '',
  close_time: '',
  perfil_img: undefined,
  capa_img: undefined,
  open_time: '',
  address: {
    cep: '',
    address_name: '',
    id: 0,
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
})


const errors = ref<Record<string, string>>({})

const fillForm = (restaurant: Restaurant) => {
  form.value = {
    name: restaurant.name ?? '',
    slug: restaurant.slug ?? '',
    email: restaurant.email ?? '',
    phone: restaurant.phone ?? '',
    close_time: restaurant.close_time ?? '',
    open_time: restaurant.open_time ?? '',
    perfil_img: undefined,
    capa_img: undefined,
    address: {
      cep: restaurant.address?.cep ?? '',
      address_name: restaurant.address?.address_name ?? '',
      number: restaurant.address?.number ?? '',
      complement: restaurant.address?.complement ?? '',
      neighborhood: restaurant.address?.neighborhood ?? '',
      id: restaurant.address?.id ?? 0,
      city: restaurant.address?.city ?? '',
      state: restaurant.address?.state ?? '',
    },
  }
}

watch(
  () => props.restaurant,
  (restaurant) => {
    if (restaurant)
      fillForm(restaurant)
  },
  { immediate: true },
)

const onSubmit = () => {
  const result = restaurantSchema.safeParse(form.value)

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string>
    toast.error('Verifique os campos do formulário')

    return
  }


  errors.value = {}
  emit('submit', result.data)
}
</script>

<template>
  <VForm @submit.prevent="onSubmit">
    <VRow>
      <!-- Nome -->
        <VCol cols="12" md="6">
            <VTextField
                v-model="form.name"
                label="Nome do Restaurante"
                variant="outlined"
                :error="!!errors.name"
                :error-messages="errors.name"
            />
        </VCol>

        <!-- E-mail -->
        <VCol cols="12" md="6">
            <VTextField
                v-model="form.email"
                label="E-mail"
                variant="outlined"
                :error="!!errors.email"
                :error-messages="errors.email"
            />
        </VCol>

        <!-- Telefone -->
        <VCol cols="12" md="6">
            <VTextField
                v-model="form.phone"
                label="Telefone"
                variant="outlined"
                :error="!!errors.phone"
                :error-messages="errors.phone"
            />
        </VCol>
        <VCol cols="12" md="6">
            <VTextField
                v-model="form.slug"
                label="Slug"
                variant="outlined"
                :error="!!errors.slug"
                :error-messages="errors.slug"
            />
        </VCol>

        <VCol cols="12" md="6">
            <VTextField
                v-model="form.open_time"
                label="Abertura"
                type="time"
                variant="outlined"
                :error="!!errors.open_time"
                :error-messages="errors.open_time"
            />
        </VCol>

        <VCol cols="12" md="6">
            <VTextField
                v-model="form.close_time"
                label="Fechamento"
                type="time"
                variant="outlined"
                :error="!!errors.close_time"
                :error-messages="errors.close_time"
            />
        </VCol>

        <VCol cols="12" md="6">
            <VFileInput 
                v-model="form.perfil_img"
                label="Imagem de Perfil"
                variant="outlined"
                :error="!!errors.perfil_img"
                :error-messages="errors.perfil_img"
            />
        </VCol>

        <VCol cols="12" md="6">
            <VFileInput 
                v-model="form.capa_img"
                label="Imagem de Capa"
                type="file"
                variant="outlined"
                :error="!!errors.capa_img"
                :error-messages="errors.capa_img"
            />
        </VCol>

        <VCol cols="12">
            <VDivider class="my-2" />
            <h3 class="text-h6 mb-4">
            Endereço
            </h3>
        </VCol>

      <!-- CEP -->
      <VCol cols="12" md="2">
        <VTextField
          v-model="form.address.cep"
          label="CEP"
          variant="outlined"
          :error="!!errors['address.cep']"
          :error-messages="errors['address.cep']"
        />
      </VCol>

      <!-- Número -->
      <VCol cols="12" md="2">
        <VTextField
          v-model="form.address.number"
          label="Número"
          variant="outlined"
          :error="!!errors['address.number']"
          :error-messages="errors['address.number']"
        />
      </VCol>

      <!-- Rua -->
      <VCol cols="12" md="8">
        <VTextField
          v-model="form.address.address_name"
          label="Endereço"
          variant="outlined"
          :error="!!errors['address.address_name']"
          :error-messages="errors['address.address_name']"
        />
      </VCol>

      <!-- Complemento -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.address.complement"
          label="Complemento"
          variant="outlined"
          :error="!!errors['address.complement']"
          :error-messages="errors['address.complement']"
        />
      </VCol>

      <!-- Bairro -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.address.neighborhood"
          label="Bairro"
          variant="outlined"
          :error="!!errors['address.neighborhood']"
          :error-messages="errors['address.neighborhood']"
        />
      </VCol>

      <!-- Cidade -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.address.city"
          label="Cidade"
          variant="outlined"
          :error="!!errors['address.city']"
          :error-messages="errors['address.city']"
        />
      </VCol>

      <!-- Estado -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.address.state"
          label="UF"
          variant="outlined"
          maxlength="2"
          :error="!!errors['address.state']"
          :error-messages="errors['address.state']"
        />
      </VCol>

      <!-- Ações -->
      <VCol cols="12" class="d-flex justify-end gap-2 mt-2">
        <VBtn
          type="submit"
          color="primary"
          :loading="loading"
          @click.prevent="onSubmit"
        >
          Salvar alterações
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
