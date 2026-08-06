<script setup lang="ts">
import type { RestaurantFormData } from "@/schemas/restaurant";
import type { Restaurant } from "@/types/restaurant";
import { onMounted, ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const toast = useToast()

const loading = ref(true)

const restaurant = ref<null | Restaurant>(null)

const restaurantId = route.params.id

const restaurantStore = useRestaurantStore()

const fetchRestaurant = async () => {
  try {
    loading.value = true
    await restaurantStore.fetchRestaurant(restaurantId)
    restaurant.value = restaurantStore.restaurant ?? null
  }
  catch (error) {
    const message = handleError(error)
    toast.error(message || 'Erro ao buscar restaurante')
  }
  finally {
    loading.value = false
  }
}

const updateRestaurant = async (formData: RestaurantFormData) => {
  await restaurantStore.updateRestaurant(restaurantId, formData)
  navigateTo('/select-restaurants')
}

onMounted(() => {
  fetchRestaurant()
})
</script>

<template>
  <div>
    <!-- Breadcrumbs -->
    <VBreadcrumbs
      class="px-0"
      :items="[
        {
          title: 'Restaurantes',
          to: '/select-restaurants',
        },
        {
          title: 'Editar restaurante',
          disabled: true,
        },
      ]"
    />

    <!-- Loading -->
    <VCard v-if="loading">
      <VCardText>
        <VSkeletonLoader type="article" />
      </VCardText>
    </VCard>

    <!-- Conteúdo -->
    <template v-else>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardItem>
              <VCardTitle>
                Editar restaurante
              </VCardTitle>

              <VCardSubtitle>
                Atualize as informações do restaurante
              </VCardSubtitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <RestaurantForm
                v-if="restaurant"
                :restaurant="restaurant"
                :loading="loading"
                @submit="updateRestaurant"
              />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </div>
</template>
