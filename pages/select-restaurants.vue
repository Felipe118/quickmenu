<script setup lang="ts">
import type { Restaurant } from "@/types/restaurant";
import { onMounted } from "vue";
import { useToast } from '~/composables/useToast';

definePageMeta({
  middleware: ['auth']
}) 

const toast = useToast()

const isDialogVisible = ref(false) 

interface Pagination {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}


const restaurantStore = useRestaurantStore()

const restaurants = ref<Restaurant[]>([])
const restaurant = ref<null | Restaurant>(null)

const getRestaurants = async () => {
  await restaurantStore.fetchRestaurants()
  console.log(restaurantStore.restaurants?.data)
  restaurants.value = restaurantStore.restaurants?.data ?? []
}

onMounted(() => {
  getRestaurants()
})

const pagination = ref(<Pagination>{
  currentPage: 1,
  lastPage: 1,
  perPage: 5,
  total: 1,
})

const search = ref('')
const itemsPerPage = ref(5)
const page = ref(1)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'E-mail', key: 'email', sortable: true },
  { title: 'Telefone', key: 'phone', sortable: false },
  { title: 'Horário', key: 'open_time', sortable: true },
  { title: 'Ativo', key: 'active', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false },
]

const filteredRestaurants = computed(() => {
  if (!search.value) return restaurants.value

  const term = search.value.toLowerCase()
  return restaurants.value.filter(r =>
    r.name.toLowerCase().includes(term) ||
    r.email.toLowerCase().includes(term) ||
    r.phone.includes(term)
  )
})

function editar(item: Restaurant) {
  openDialog()
  restaurant.value = item
  console.log('Editar', item)
}

function excluir(item: Restaurant) {
  console.log('Excluir', item)
}

function openDialog() {
  console.log('openDialog', isDialogVisible.value)
  isDialogVisible.value = true
}

function closeDialog() {
  console.log('openDialog', isDialogVisible.value)
  isDialogVisible.value = false
}

async function toggleStatus(item: Restaurant) {
  item.active = !item.active
  await restaurantStore.changeStatus(item.id)
  .then((res) => {
    toast.success(res?.data?.value?.message ?? 'Restaurante desativado com sucesso!')
  })
}

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Restaurantes">
        <VCardText>
          <VTextField
            v-model="search"
            prepend-inner-icon="tabler-search"
            label="Pesquisar restaurante..."
            clearable
            density="compact"
            class="mb-4"
          />
        </VCardText>

        <!-- Tabela -->
        <VDataTable
          :headers="headers"
          v-model:page="pagination.currentPage"
          :items="filteredRestaurants"
          :search="search"
          :items-per-page="itemsPerPage"
          class="text-no-wrap"
          hide-default-footer
        >
            <template #item.active="{ item }">
              <VSwitch
                :model-value="item.active"
                color="success"
                hide-details
                density="compact"
                @click="toggleStatus(item)"
              />
            </template>

            <template #item.open_time="{ item }">
                {{ item.open_time }} - {{ item.close_time }}
            </template>

            <template #item.actions="{ item }">
                <IconBtn @click="editar(item)">
                  <VIcon icon="tabler-pencil" />
                </IconBtn>
                <IconBtn @click="excluir(item)">
                  <VIcon icon="tabler-trash" color="error" />
                </IconBtn>
            </template>

            <template #no-data>
              <div class="text-center pa-6">
                <VIcon icon="tabler-database-off" size="48" color="disabled" />
                <p class="mt-2 text-disabled">Nenhum restaurante encontrado</p>
              </div>
            </template>
        </VDataTable>
        <div class="text-center pt-2 mb-4">
          <AppPagination 
            v-model:page="pagination.currentPage"
            :last-page="pagination.lastPage"
            :per-page="pagination.perPage"
            :total="pagination.total"
          />
        </div>

        <EditRestaurant
          v-if="restaurant"
          :is-dialog-visible="isDialogVisible"
          :restaurant="restaurant"
          @update:isDialogVisible="closeDialog"
        />
      </VCard>
    </VCol>
  </VRow>
</template>
