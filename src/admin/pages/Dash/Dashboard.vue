<template>
  <div>
    <!-- Cabeçalho -->
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h2>

    <!-- Cards de estatísticas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="card in stats"
        :key="card.title"
        class="bg-white shadow rounded-xl p-5 flex items-center justify-between"
      >
        <div>
          <p class="text-sm text-gray-500">{{ card.title }}</p>
          <h3 class="text-xl font-bold text-gray-700">{{ card.value }}</h3>
        </div>
        <div
          class="p-3 rounded-full"
          :class="card.color"
        >
          <component :is="card.icon" class="w-5 h-5 text-white" />
        </div>
      </div>
    </div>

    <!-- Gráfico (simulado / placeholder) -->
    <div class="bg-white shadow rounded-xl p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Visitas Mensais</h3>
      <div class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        [ Gráfico aqui — pode integrar com Chart.js ou Recharts ]
      </div>
    </div>

    <!-- Tabela Resumo -->
    <div class="bg-white shadow rounded-xl p-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Últimas Atividades</h3>
      <table class="min-w-full border-t border-gray-100">
        <thead>
          <tr class="text-gray-500 text-sm">
            <th class="text-left py-2">Usuário</th>
            <th class="text-left py-2">Ação</th>
            <th class="text-left py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in activities"
            :key="index"
            class="border-t border-gray-100 text-gray-700 text-sm"
          >
            <td class="py-2">{{ item.user }}</td>
            <td class="py-2">{{ item.action }}</td>
            <td class="py-2 text-gray-500">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { UserIcon, DollarSignIcon, FileTextIcon, EyeIcon } from 'lucide-vue-next'

const stats = [
  { title: 'Usuários', value: '1.024', icon: UserIcon, color: 'bg-sky-500' },
  { title: 'Vendas', value: 'R$ 12.340', icon: DollarSignIcon, color: 'bg-green-500' },
  { title: 'Arquivos', value: '132', icon: FileTextIcon, color: 'bg-amber-500' },
  { title: 'Visualizações', value: '8.912', icon: EyeIcon, color: 'bg-purple-500' },
]

const activities = [
  { user: 'Chet Faker', action: 'Atualizou o perfil', date: 'Hoje, 10:23' },
  { user: 'DJ Khaled', action: 'Adicionou novo cliente', date: 'Ontem, 17:40' },
  { user: 'Flume', action: 'Gerou relatório mensal', date: 'Ontem, 09:12' },
  { user: 'Creative Tim', action: 'Fez upload de documento', date: '12/10, 15:55' },
]
</script>
