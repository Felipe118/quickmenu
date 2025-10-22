<template>
  <div v-if="loading">
    <BemVindo />
  </div>
  <!-- <router-link v-else></router-link> -->
   <div v-else>
     Vai para pagina de restaurante
   </div>
</template>

<script setup>
import { UserIcon, DollarSignIcon, FileTextIcon, EyeIcon } from 'lucide-vue-next'
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import BemVindo from './BemVindo.vue'

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

const router = useRouter();
const loading = ref(true) 

// onMounted(async() => {
//   const response = await api.get('/verify')

//   if(response.data.has_restaurant){
//      loading.value = false
//     console.log('Tem restaurante')
//   }else{
//     console.log('Nao tem restaurante')
//   }
  
  
  
//   console.log(response.data)
// })


</script>
