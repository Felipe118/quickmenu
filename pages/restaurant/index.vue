<script setup lang="ts">
import type { Restaurant } from "@/types/restaurant"

definePageMeta({
  middleware: ['auth']
})

const restaurants = ref<Restaurant[]>([
  {
    id: 1,
    name: 'Restaurante do Zé',
    perfil_img: '',
    capa_img: '',
    email: 'ze@email.com',
    open_time: '08:00',
    close_time: '22:00',
    phone: '(11) 99999-0001',
    active: true,
    address_id: 1,
    slug: 'restaurante-do-ze',
  },
  {
    id: 2,
    name: 'Pizza da Nonna',
    perfil_img: '',
    capa_img: '',
    email: 'nonna@email.com',
    open_time: '18:00',
    close_time: '23:59',
    phone: '(11) 99999-0002',
    active: true,
    address_id: 2,
    slug: 'pizza-da-nonna',
  },
  {
    id: 3,
    name: 'Sushi House',
    perfil_img: '',
    capa_img: '',
    email: 'sushi@email.com',
    open_time: '12:00',
    close_time: '23:00',
    phone: '(11) 99999-0003',
    active: false,
    address_id: 3,
    slug: 'sushi-house',
  },
])

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

// ─── Filtro customizado (já incluso no VDataTableServer) ────
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
  console.log('Editar', item)
}

function excluir(item: Restaurant) {
  console.log('Excluir', item)
}

function toggleStatus(item: Restaurant) {
  item.active = !item.active
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Restaurantes">
        <VCardText>
          <!-- Campo de busca -->
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
          :items="filteredRestaurants"
          :search="search"
          :items-per-page="itemsPerPage"
          :items-per-page-options="[5, 10, 25, 50]"
          :sort-by="sortBy"
          hover
          class="text-no-wrap"
        >
          <!-- Coluna: Ativo (slot customizado) -->
          <template #item.active="{ item }">
            <VSwitch
              :model-value="item.active"
              color="success"
              hide-details
              density="compact"
              @click="toggleStatus(item)"
            />
          </template>

          <!-- Coluna: Horário (slot customizado) -->
          <template #item.open_time="{ item }">
            {{ item.open_time }} - {{ item.close_time }}
          </template>

          <!-- Coluna: Ações -->
          <template #item.actions="{ item }">
            <IconBtn @click="editar(item)">
              <VIcon icon="tabler-pencil" />
            </IconBtn>
            <IconBtn @click="excluir(item)">
              <VIcon icon="tabler-trash" color="error" />
            </IconBtn>
          </template>

          <!-- Slot: quando não há dados -->
          <template #no-data>
            <div class="text-center pa-6">
              <VIcon icon="tabler-database-off" size="48" color="disabled" />
              <p class="mt-2 text-disabled">Nenhum restaurante encontrado</p>
            </div>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
