<template>
  <section id="sobre-mi" class="section-pad">
    <v-container style="max-width: 1024px;">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <p class="section-label">Acerca de</p>
        <h2 class="section-title">Sobre mí</h2>

        <v-row class="mt-8 ga-0" align="start">
          <v-col cols="12" md="6">
            <p style="color: #94a3b8; line-height: 1.8; font-size: 1.05rem;">
              Estudiante en el último año de Ingeniería Informática en el Instituto Universitario Aeronáutico en Córdoba.
              Con experiencia como pasante IT en Dayco Belts. 
              Me interesa el desarrollo web/movil, el analisis de datos 
              y las tecnologías de infraestructura y despliegue.
              Hablo ingles de forma fluida y alcance la certificicacion B2 FCE.
            </p>
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex flex-column ga-3">
              <div
                v-for="group in skills"
                :key="group.category"
                class="d-flex flex-wrap ga-2"
              >
                <TechBadge
                  v-for="item in group.items"
                  :key="item"
                  :label="item"
                  :category="group.category"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import TechBadge from './TechBadge.vue'

const skills = [
  { category: 'backend',  items: ['Java', 'Spring Boot', 'Node.js', 'Python'] },
  { category: 'frontend', items: ['Vue 3', 'JavaScript', 'HTML/CSS'] },
  { category: 'mobile',   items: ['Kotlin', 'Jetpack Compose', 'Android'] },
  { category: 'database', items: ['MySQL', 'PostgreSQL', 'Apache Kafka'] },
  { category: 'iot',      items: ['Mosquitto', 'Grafana', 'n8n', 'Telegram Bots'] },
  { category: 'devops',   items: ['Docker', 'Linux', 'Nginx', 'Git', 'Bash'] },
]
</script>

<style scoped>
.section-pad { padding: 6rem 1.5rem; }
@media (max-width: 600px) {
  .section-pad { padding: 3.5rem 1rem; }
}
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: #f1f5f9;
}
</style>
