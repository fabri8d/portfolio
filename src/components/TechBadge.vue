<template>
  <v-chip
    :style="chipStyle"
    size="small"
    variant="flat"
    class="font-weight-medium"
  >
    {{ label }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  category: { type: String, default: 'backend' },
})

const categoryStyles = {
  frontend:  { background: 'rgba(30,58,138,0.5)',  color: '#93c5fd', border: '1px solid rgba(59,130,246,0.4)' },
  backend:   { background: 'rgba(88,28,135,0.5)',  color: '#d8b4fe', border: '1px solid rgba(139,92,246,0.4)' },
  mobile:    { background: 'rgba(20,83,45,0.5)',   color: '#86efac', border: '1px solid rgba(34,197,94,0.4)' },
  devops:    { background: 'rgba(124,45,18,0.5)',  color: '#fdba74', border: '1px solid rgba(249,115,22,0.4)' },
  iot:       { background: 'rgba(19,78,74,0.5)',   color: '#5eead4', border: '1px solid rgba(20,184,166,0.4)' },
  database:  { background: 'rgba(12,74,110,0.5)',  color: '#7dd3fc', border: '1px solid rgba(14,165,233,0.4)' },
}

const chipStyle = computed(() => {
  const s = categoryStyles[props.category] ?? categoryStyles.backend
  return `background: ${s.background}; color: ${s.color}; border: ${s.border}; border-radius: 9999px;`
})
</script>
