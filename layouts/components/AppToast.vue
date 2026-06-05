<script setup>
import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref('success')

function open(msg, type = 'success') {
  message.value = msg
  color.value = type === 'error' ? 'red' : 'green'
  show.value = true
}

defineExpose({ open })
</script>
