<script setup lang="ts">
import type { Address } from "@/types/restaurant";

interface Props {
    address: Address|undefined
}
const address = defineProps<Props>()
</script>
<template>
  <VRow>
    <VCol cols="12" md="2">
        <VTextField
            :model-value="address?.address?.cep"
            label="CEP"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="2">
        <VTextField
            :model-value="address?.number"
            label="Numero"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="8">
        <VTextField
            :model-value="address?.address_name"
            label="Endereço"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="6">
        <VTextField
            :model-value="address?.complement"
            label="Complemento"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="6">
        <VTextField
            :model-value="address?.neighborhood"
            label="Bairro"
            variant="outlined"
        />
    </VCol>
  </VRow>
</template>
