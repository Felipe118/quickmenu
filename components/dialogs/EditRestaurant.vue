<script setup lang="ts">
import type { Restaurant } from "@/types/restaurant";
import { ref } from 'vue';

interface Props {
  isDialogVisible: boolean,
  restaurant: Restaurant
}

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'update:restaurant',restaurant: Restaurant): void
}

const localRestaurant = ref<Restaurant | null>(null)

const unsubscribed = ref(false)
const cancelled = ref(false)
const props = defineProps<Props>()

  console.log('props', props.restaurant)
const emit = defineEmits<Emit>()

const updateModal = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

const updateModelValue = (res: Restaurant) => {
  emit('update:restaurant', res)
}


function onSubmit(){
  console.log('onSubmit', props.restaurant)
}

</script>

<template>
  <VDialog
    max-width="1280"
    min-height="800"
    :model-value="props.isDialogVisible"
    @update:model-value="updateModal"
  >
    <VCard class="text-left px-10 py-6">
      <h1 class="font-weight-bold pb-4">
        Editar restaurante
      </h1>
      <VDivider />
      <VRow>
        <VCol class="mt-4" cols="12" md="6" lg="6">
          <VTextField
            v-model="props.restaurant.name "
            label="Nome do Restaurante"
            variant="outlined"
          />
        </VCol>

        <VCol class="mt-4" cols="12" md="6">
          <VTextField
            v-model="props.restaurant.slug"
            label="Slug"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            label="E-mail"
            :model-value="props.restaurant?.email"
            type="email"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            :model-value="props.restaurant?.phone"
            label="Telefone"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            label="Imagem de Perfil"
            variant="outlined"
            type="file"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            label="Imagem de Capa"
            type="file"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            :model-value="props.restaurant?.open_time"
            label="Abre às"
            type="time"
            variant="outlined"
          />
        </VCol>

        <VCol cols="12" md="6">
          <VTextField
            :model-value="props.restaurant?.close_time"
            label="Fecha às"
            type="time"
            variant="outlined"
          />
        </VCol>
        <AddressForm 
          :address="props.restaurant?.address"
        />
        <!-- <VCol cols="12" md="2">
          <VTextField
            :model-value="props.restaurant?.address?.cep"
            label="CEP"
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="2">
          <VTextField
            :model-value="props.restaurant?.address?.number"
            label="Numero"
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="8">
          <VTextField
            :model-value="props.restaurant?.address?.address_name"
            label="Endereço"
            variant="outlined"
          />
        </VCol>
       <VCol cols="12" md="6">
          <VTextField
            :model-value="props.restaurant?.address?.complement"
            label="Complemento"
            variant="outlined"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            :model-value="props.restaurant?.address?.neighborhood"
            label="Bairro"
            variant="outlined"
          />
        </VCol> -->
      </VRow>
      <VCardText class="d-flex align-center justify-center gap-2">
        <VBtn
          variant="outlined"
          @click="onSubmit"
        >
          Editar
        </VBtn>

        <VBtn
          color="secondary"
          variant="tonal"
          @click="updateModal(false)"
        >
          Cancelar
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog
    v-model="unsubscribed"
    max-width="500"
  >
    <VCard>
      <VCardText class="text-center px-10 py-6">
        <VBtn
          icon
          variant="outlined"
          color="success"
          class="my-4"
          style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
        >
          <VIcon
            icon="tabler-check"
            size="38"
          />
        </VBtn>

        <h1 class="text-h4 mb-4">
          teste
        </h1>

        <p>teste</p>

        <VBtn
          color="success"
        >
          Ok
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog
    v-model="cancelled"
    max-width="500"
  >
    <VCard>
      <VCardText class="text-center px-10 py-6">
        <VBtn
          icon
          variant="outlined"
          color="error"
          class="my-4"
          style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
        >
          <span class="text-5xl font-weight-light">X</span>
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
