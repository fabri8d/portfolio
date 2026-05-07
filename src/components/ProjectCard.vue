<template>
  <v-card
    class="dark-card project-card d-flex flex-column"
    :to="href"
    style="text-decoration: none; transition: transform 0.2s, border-color 0.2s;"
  >
    <div class="card-image-area">
      <img v-if="image" :src="image" :alt="title" class="card-img" :class="{ 'card-img--contain': imageContain }" />
      <div v-else class="card-placeholder">
        <div class="card-icon">
          <span style="color: var(--accent); font-size: 1.5rem; font-weight: 700;">{{ title[0] }}</span>
        </div>
      </div>
    </div>

    <v-card-text class="d-flex flex-column ga-4 flex-grow-1 pa-6">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-desc flex-grow-1">{{ description }}</p>
      <div class="d-flex flex-wrap ga-2">
        <TechBadge
          v-for="tag in tags"
          :key="tag.label"
          :label="tag.label"
          :category="tag.category"
        />
      </div>
      <div class="card-link">
        Ver proyecto <ArrowRight :size="16" class="ml-1" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'

defineProps({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  href:        { type: String, required: true },
  image:        { type: String,  default: null },
  imageContain: { type: Boolean, default: false },
  tags:         { type: Array,   default: () => [] },
})
</script>

<style scoped>
.project-card:hover {
  transform: scale(1.02);
  border-color: rgba(0, 180, 216, 0.4) !important;
}
.card-image-area {
  height: 192px;
  background: var(--navy-dark);
  flex-shrink: 0;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  position: relative;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.card-img--contain {
  object-fit: contain;
  padding: 1.5rem;
}
.project-card:hover .card-img { opacity: 1; }
.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(0,180,216,0.1);
  border: 1px solid rgba(0,180,216,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
  transition: color 0.2s;
}
.project-card:hover .card-title { color: var(--accent); }
.card-desc {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.6;
}
.card-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
}
.project-card:hover .card-link { color: var(--accent-light); }
</style>
