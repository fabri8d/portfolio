<template>
  <div v-if="!url" class="dark-card placeholder-box">
    <div class="placeholder-icon">📊</div>
    <p style="color: #cbd5e1; font-weight: 500; margin: 0;">Dashboard en vivo</p>
    <p style="color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0;">
      Grafana Public Dashboard — próximamente
    </p>
  </div>
  <div v-else class="iframe-wrapper">
    <iframe
      :src="url"
      :title="title"
      :style="`width: 100%; height: ${height}; border: none; display: block;`"
      allowfullscreen
      loading="lazy"
    />
  </div>
</template>

<script setup>
defineProps({
  url:    { type: String, default: null },
  title:  { type: String, default: 'Dashboard IoT' },
  height: { type: String, default: '900px' },
})
</script>

<style scoped>
.placeholder-box {
  padding: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.placeholder-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(0,180,216,0.1);
  border: 1px solid rgba(0,180,216,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.iframe-wrapper {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
}
</style>
