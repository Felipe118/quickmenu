<script setup lang="ts">
interface Props {
  page: number
  lastPage: number
  perPage: number
  total: any
} 

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()
</script>

<template>
  <VContainer>
    <VPagination
      :model-value="props.page"
      :length="props.total"
      prev-icon="tabler-chevron-left"
      next-icon="tabler-chevron-right"
      @update:model-value="emit('update:page', $event)"
    >
        
    </VPagination>
  </VContainer>
</template>
