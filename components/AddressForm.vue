<script setup lang="ts">

interface Address {
    cep: string,
    number: string,
    address_name: string,
    complement: string,
    neighborhood: string
}

const address = defineModel<Address>()

</script>
<template>
  <VRow>
    <VCol cols="12" md="2">
        <VTextField
            v-model="address?.cep"
            label="CEP"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="2">
        <VTextField
            v-model="address?.number"
            label="Numero"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="8">
        <VTextField
            v-model="address?.address_name"
            label="Endereço"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="6">
        <VTextField
            v-model="address?.complement"
            label="Complemento"
            variant="outlined"
        />
    </VCol>
    <VCol cols="12" md="6">
        <VTextField
            v-model="address?.neighborhood"
            label="Bairro"
            variant="outlined"
        />
    </VCol>
  </VRow>
</template>
