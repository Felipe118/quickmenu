<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isDialogVisible: boolean
}

const unsubscribed = ref(false)
const cancelled = ref(false)
const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const updateModelValue = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
}

</script>

<template>
  <VDialog
    max-width="500"
    :model-value="props.isDialogVisible"
    @update:model-value="updateModelValue"
  >
    <VCard class="text-center px-10 py-6">
      <VCardText>
        <VBtn
          icon
          variant="outlined"
          color="warning"
          class="my-4"
          style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
        >
          <span class="text-5xl">!</span>
        </VBtn>
      </VCardText>

      <VCardText class="d-flex align-center justify-center gap-2">
        <VBtn
          variant="elevated"
          @click=""
        >
          Confirm
        </VBtn>

        <VBtn
          color="secondary"
          variant="tonal"
          @click=""
        >
          Cancel
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Unsubscribed -->
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

  <!-- Cancelled -->
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
