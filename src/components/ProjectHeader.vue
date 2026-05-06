<template>
  <section style="padding-top: 7rem; padding-bottom: 3rem; padding-inline: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
    <v-container style="max-width: 1024px;">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="d-flex flex-column ga-6"
      >
        <router-link to="/#proyectos" class="back-link">
          <ArrowLeft :size="16" />
          Volver a proyectos
        </router-link>
        <h1 class="project-title">{{ title }}</h1>
        <p class="project-tagline">{{ tagline }}</p>
        <div v-if="tags.length" class="d-flex flex-column ga-3">
          <p class="stack-label">Stack tecnológico</p>
          <div class="d-flex flex-wrap ga-2">
            <TechBadge
              v-for="tag in tags"
              :key="tag.label"
              :label="tag.label"
              :category="tag.category"
            />
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'

defineProps({
  title:   { type: String, required: true },
  tagline: { type: String, required: true },
  tags:    { type: Array,  default: () => [] },
})
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--accent); }
.project-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #f1f5f9;
}
.stack-label {
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: ui-monospace, monospace;
  margin: 0;
}
.project-tagline {
  font-size: 1.15rem;
  color: #94a3b8;
  max-width: 40rem;
  line-height: 1.7;
}
</style>
