// composables/useToast.js
import { ref } from 'vue'

const toast = ref(null)

export function useToast() {
  return {
    setInstance: (instance:any) => (toast.value = instance),
    show: (msg:string, type:any) => toast.value?.open(msg, type)
  }
}
