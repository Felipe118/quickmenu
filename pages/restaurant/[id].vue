<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const toast = useToast()

definePageMeta({
  middleware: ['auth']
})

const restaurantStore = useRestaurantStore()

const handleRestaurant = async (restaurantId:number) => {
    try{
        await restaurantStore.fetchRestaurant(restaurantId);
    }catch(error){
        console.log(error)
        toast.error('Não foi possível carregar o restaurante')
    }
}

handleRestaurant(1)
</script>
<template>
    <VCard>
        <VImg
            :src="restaurantStore.restaurant?.capa_img"
            height="250"
            cover
        />
        <VCardText class="text-center">
            <VAvatar
            size="120"
            class="mb-4"
            >
            <VImg :src="restaurantStore.restaurant?.perfil_img" />
            </VAvatar>

            <h3>{{ restaurantStore.restaurant?.name }}</h3>

            <div>{{ restaurantStore.restaurant?.phone }}</div>
            <div>{{ restaurantStore.restaurant?.email }}</div>

            <VBtn
            color="primary"
            class="mt-4"
            >
                Editar Restaurante
            </VBtn>
        </VCardText>
    </VCard>
</template>
