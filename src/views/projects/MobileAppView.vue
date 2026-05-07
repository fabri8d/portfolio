<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background: var(--navy);">
    <TheNavbar />
    <v-main>
      <ProjectHeader
        title="Lazabus"
        tagline="App Android para asistir a personas con discapacidad visual a encontrar su ruta de colectivo mediante voz, GPS y cálculo de distancias."
        :tags="tags"
      />

      <v-container style="max-width: 1024px; padding: 4rem 1.5rem;" class="d-flex flex-column ga-16">

        <!-- El proyecto -->
        <section>
          <v-row align="center" class="ga-0">
            <v-col cols="12" md="6" class="d-flex flex-column ga-4">
              <p class="section-label">El proyecto</p>
              <h2 class="section-h2">Accesibilidad en el transporte público</h2>
              <p class="body-text">
                Las personas con discapacidad visual enfrentan un desafío diario al usar el
                transporte público de forma independiente: saber qué colectivo tomar y
                cuál es la mejor ruta hacia su destino.
              </p>
              <p class="body-text">
                <strong class="hl">Lazabus</strong> resuelve este problema de forma completamente
                guiada por voz: el usuario dice su destino, la app detecta su ubicación actual,
                el backend calcula la ruta óptima evaluando paradas cercanas con la fórmula
                Haversine, y el resultado se anuncia por audio y se grafica en el mapa.
              </p>
              <p style="font-size: 0.75rem; color: #475569; font-style: italic;">
                Prototipo — no publicado en tienda
              </p>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-center ga-3">
              <PhoneMockup>
                <v-window v-model="currentSlide" style="height: 510px; width: 100%;">
                  <v-window-item v-for="(shot, i) in screenshots" :key="i" :value="i">
                    <img :src="shot.src" :alt="shot.alt" class="screenshot-img" />
                  </v-window-item>
                </v-window>
              </PhoneMockup>
              <div class="slide-dots">
                <button
                  v-for="(_, i) in screenshots"
                  :key="i"
                  class="slide-dot"
                  :class="{ active: currentSlide === i }"
                  @click="currentSlide = i"
                />
              </div>
            </v-col>
          </v-row>
        </section>

        <!-- Flujo de uso -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Flujo de uso</p>
          <h2 class="section-h2">Cómo funciona</h2>
          <v-row>
            <v-col v-for="step in steps" :key="step.step" cols="12" sm="6">
              <div class="dark-card step-card">
                <div class="step-number">{{ step.step }}</div>
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-desc">{{ step.description }}</p>
              </div>
            </v-col>
          </v-row>
        </section>

        <!-- Demo -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Demo</p>
          <h2 class="section-h2">La app en acción</h2>
          <video
            src="/projects/mobile-app/demo.mp4"
            controls
            class="demo-video"
          />
        </section>

        <!-- Tecnología -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Tecnología</p>
          <h2 class="section-h2">Stack utilizado</h2>
          <div class="tech-groups">
            <div class="tech-group">
              <p class="tech-group-label">Frontend (Android)</p>
              <div class="d-flex flex-wrap ga-2">
                <TechBadge v-for="tag in mobileTags" :key="tag.label" :label="tag.label" :category="tag.category" />
              </div>
              <ul class="api-list">
                <li>Speech-to-Text — captura del destino por voz</li>
                <li>Text-to-Speech — notificaciones auditivas accesibles</li>
                <li>Location API — geolocalización del usuario</li>
                <li>Geocoder API — conversión de direcciones a coordenadas</li>
                <li>OpenStreetMap — visualización del mapa y ruta</li>
                <li>Room — almacenamiento local del historial de viajes</li>
                <li>SharedPreferences — configuración de idioma (ES/EN) y velocidad del TTS</li>
              </ul>
            </div>
            <div class="tech-group">
              <p class="tech-group-label">Backend &amp; Base de datos</p>
              <div class="d-flex flex-wrap ga-2">
                <TechBadge v-for="tag in backendTags" :key="tag.label" :label="tag.label" :category="tag.category" />
              </div>
              <ul class="api-list">
                <li>Node.js + Express — API REST de rutas y paradas</li>
                <li>Fórmula Haversine — distancias geográficas entre coordenadas</li>
                <li>PostgreSQL en Docker — modelo relacional de rutas y paradas</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Equipo y contexto -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Equipo y contexto</p>
          <h2 class="section-h2">El proyecto y el proceso</h2>
          <div class="context-grid">
            <div class="dark-card context-card">
              <p class="context-card-title">Equipo</p>
              <div class="team-grid">
                <div v-for="member in team" :key="member.name" class="team-member">
                  <p class="team-name">{{ member.name }}</p>
                  <p class="team-role">{{ member.role }}</p>
                </div>
              </div>
            </div>
            <div class="dark-card context-card">
              <p class="context-card-title">Contexto académico</p>
              <p class="body-text" style="font-size: 0.875rem;">
                Desarrollado en el <strong class="hl">Instituto Universitario Aeronáutico (IUA)</strong>
                bajo una metodología <strong class="hl">PMI reducida</strong>, supervisado por
                Julio Gutiérrez como profesor y stakeholder.
              </p>
              <p class="body-text" style="font-size: 0.875rem; margin-top: 0.5rem;">
                El proyecto simuló un contexto laboral real: gestión de costos y riesgos,
                trabajo en cronograma y evaluación de entregables.
              </p>
            </div>
          </div>
        </section>

        <!-- Repositorios -->
        <section class="d-flex flex-column ga-6">
          <p class="section-label">Código fuente</p>
          <h2 class="section-h2">Repositorios</h2>
          <div class="repos-grid">
            <a
              v-for="repo in repos"
              :key="repo.url"
              :href="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="dark-card repo-card"
            >
              <GithubIcon :size="22" class="repo-icon" />
              <div>
                <p class="repo-name">{{ repo.name }}</p>
                <p class="repo-desc">{{ repo.desc }}</p>
              </div>
            </a>
          </div>
        </section>

      </v-container>
    </v-main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheNavbar from '../../components/TheNavbar.vue'
import TheFooter from '../../components/TheFooter.vue'
import ProjectHeader from '../../components/ProjectHeader.vue'
import PhoneMockup from '../../components/PhoneMockup.vue'
import TechBadge from '../../components/TechBadge.vue'
import GithubIcon from '../../components/icons/GithubIcon.vue'

const currentSlide = ref(0)
const screenshots = [
  { src: '/projects/mobile-app/ruta.png',            alt: 'Pantalla de ruta' },
  { src: '/projects/mobile-app/configuraciones.png', alt: 'Configuraciones' },
  { src: '/projects/mobile-app/historial.png',       alt: 'Historial de viajes' },
]

const tags = [
  { label: 'Kotlin',          category: 'mobile' },
  { label: 'Jetpack Compose', category: 'mobile' },
  { label: 'Android',         category: 'mobile' },
  { label: 'Node.js',         category: 'backend' },
  { label: 'PostgreSQL',      category: 'database' },
  { label: 'OpenStreetMap',   category: 'iot' },
]

const mobileTags = [
  { label: 'Kotlin',             category: 'mobile' },
  { label: 'Jetpack Compose',    category: 'mobile' },
  { label: 'Android',            category: 'mobile' },
  { label: 'Room',               category: 'database' },
  { label: 'SharedPreferences',  category: 'mobile' },
  { label: 'OpenStreetMap',      category: 'iot' },
]

const backendTags = [
  { label: 'Node.js',    category: 'backend' },
  { label: 'Express',    category: 'backend' },
  { label: 'PostgreSQL', category: 'database' },
  { label: 'Docker',     category: 'devops' },
]

const steps = [
  {
    step: '1',
    title: 'Decí tu destino',
    description: 'Speech-to-Text captura el destino del usuario por voz, sin necesidad de escribir.',
  },
  {
    step: '2',
    title: 'Detección de origen',
    description: 'Location API obtiene la geolocalización actual. Geocoder API convierte la dirección a coordenadas.',
  },
  {
    step: '3',
    title: 'Cálculo de ruta',
    description: 'El backend evalúa las paradas más cercanas al origen y al destino usando la fórmula Haversine.',
  },
  {
    step: '4',
    title: 'Guía por audio',
    description: 'Text-to-Speech anuncia la parada de origen, la línea y la parada destino. El mapa grafica la ruta.',
  },
]

const team = [
  { name: 'Fabrizio Biondi',  role: 'Desarrollador' },
  { name: 'Benjamín Vargas',  role: 'Desarrollador' },
  { name: 'Antonella Badami', role: 'Desarrolladora' },
]

const repos = [
  {
    name: 'fabribiondi2002/LazabusBackend',
    desc: 'API Node.js + Express. Cálculo de rutas óptimas con fórmula Haversine.',
    url: 'https://github.com/fabribiondi2002/LazabusBackend',
  },
  {
    name: 'fabribiondi2002/LazaBusAppTecMov',
    desc: 'App Android en Kotlin + Jetpack Compose. Voz, GPS y mapa OSM.',
    url: 'https://github.com/fabribiondi2002/LazaBusAppTecMov',
  },
]
</script>

<style scoped>
.section-h2      { font-size: 1.5rem; font-weight: 600; color: #f1f5f9; }
.body-text       { color: #94a3b8; line-height: 1.8; margin: 0; }
.hl              { color: #e2e8f0; font-weight: 600; }

/* Pasos */
.step-card   { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.step-number {
  width: 2rem; height: 2rem;
  border-radius: 50%;
  background: rgba(0,180,216,0.15);
  border: 1px solid rgba(0,180,216,0.3);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-weight: 700; font-size: 0.875rem;
  flex-shrink: 0;
}
.step-title  { color: #f1f5f9; font-weight: 500; margin: 0; }
.step-desc   { color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin: 0; }

/* Slider capturas */
.screenshot-img {
  width: 100%;
  height: 510px;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.slide-dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
.slide-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(0,180,216,0.25);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}
.slide-dot.active { background: var(--accent); }

/* Video */
.demo-video {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  align-self: center;
  display: block;
  border: 1px solid rgba(255,255,255,0.08);
}

/* Stack tecnológico */
.tech-groups       { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
.tech-group        { display: flex; flex-direction: column; gap: 1rem; }
.tech-group-label  { color: #f1f5f9; font-weight: 600; font-size: 0.9rem; margin: 0; }
.api-list          { color: #64748b; font-size: 0.82rem; line-height: 1.8; margin: 0; padding-left: 1.25rem; }
.api-list li       { margin-bottom: 0.1rem; }

/* Equipo y contexto */
.context-grid      { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.context-card      { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.context-card-title { color: #f1f5f9; font-weight: 600; font-size: 0.9rem; margin: 0; }
.team-grid         { display: flex; flex-direction: column; gap: 0.75rem; }
.team-member       { display: flex; flex-direction: column; gap: 0.1rem; }
.team-name         { color: #e2e8f0; font-weight: 500; font-size: 0.875rem; margin: 0; }
.team-role         { color: #64748b; font-size: 0.8rem; margin: 0; }

/* Repositorios */
.repos-grid  { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
.repo-card   { display: flex; align-items: flex-start; gap: 1rem; padding: 1.25rem 1.5rem; text-decoration: none; transition: transform 0.15s; }
.repo-card:hover { transform: translateY(-2px); }
.repo-icon   { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.repo-name   { font-family: ui-monospace, monospace; font-size: 0.9rem; color: var(--accent); font-weight: 600; margin: 0 0 0.25rem; }
.repo-desc   { font-size: 0.82rem; color: #94a3b8; margin: 0; line-height: 1.5; }
</style>
