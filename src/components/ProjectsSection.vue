<template>
  <section id="proyectos" class="section-pad">
    <v-container style="max-width: 1024px;">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-12"
      >
        <p class="section-label">Trabajo</p>
        <h2 class="section-title">Proyectos</h2>
      </div>

      <v-row
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
      >
        <v-col
          v-for="project in projects"
          :key="project.href"
          cols="12"
          md="6"
        >
          <ProjectCard v-bind="project" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

const projects = [
  {
    title: 'Pepe — Robot IoT & Data Pipeline',
    description:
      'Robot físico 2WD con ESP32 y FreeRTOS que monitorea calidad de aire en tiempo real: pipeline MQTT → n8n → PostgreSQL, alertas y reportes automáticos por Telegram, y dashboards Grafana públicos en GCP.',
    href: '/projects/iot-robot',
    image: '/projects/iot-robot/robot.jpeg',
    tags: [
      { label: 'ESP32 / FreeRTOS', category: 'iot' },
      { label: 'MQTT',             category: 'iot' },
      { label: 'n8n',              category: 'backend' },
      { label: 'Grafana',          category: 'iot' },
      { label: 'GCP',              category: 'devops' },
    ],
  },
  {
    title: 'Lazabus — App de Accesibilidad',
    description:
      'App Android para asistir a personas con discapacidad visual a encontrar su ruta de colectivo. El usuario dice su destino por voz, la app calcula la ruta óptima con Haversine y la anuncia por audio sobre el mapa.',
    href: '/projects/mobile-app',
    image: '/projects/mobile-app/logo.png',
    imageContain: true,
    tags: [
      { label: 'Kotlin',          category: 'mobile' },
      { label: 'Jetpack Compose', category: 'mobile' },
      { label: 'Node.js',         category: 'backend' },
      { label: 'PostgreSQL',      category: 'database' },
      { label: 'OpenStreetMap',   category: 'iot' },
    ],
  },
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
