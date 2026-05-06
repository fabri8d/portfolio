<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background: var(--navy);">
    <TheNavbar />
    <v-main>
      <ProjectHeader
        title="App Accesibilidad"
        tagline="Prototipo Android para ayudar a personas con baja visión a identificar y tomar colectivos de forma autónoma."
        :tags="tags"
      />

      <v-container style="max-width: 1024px; padding: 4rem 1.5rem;" class="d-flex flex-column ga-16">

        <section>
          <v-row align="center" class="ga-0">
            <v-col cols="12" md="6" class="d-flex flex-column ga-4">
              <h2 class="section-h2">El problema</h2>
              <p class="body-text">
                Las personas con discapacidad visual severa enfrentan grandes
                dificultades para usar el transporte público de forma
                independiente. Identificar qué colectivo se acerca es un
                desafío diario que limita su autonomía.
              </p>
              <p class="body-text">
                Esta app prototipo busca resolver ese problema usando la cámara
                del celular y síntesis de voz para guiar al usuario en tiempo real.
              </p>
              <p style="font-size: 0.75rem; color: #334155; font-style: italic;">
                Prototipo — no publicado en tienda
              </p>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <PhoneMockup>
                <div style="display: flex; align-items: center; justify-content: center; height: 350px; color: #475569; font-size: 0.875rem;">
                  [ Screenshot ]
                </div>
              </PhoneMockup>
            </v-col>
          </v-row>
        </section>

        <section class="d-flex flex-column ga-8">
          <h2 class="section-h2">Flujo de uso</h2>
          <v-row>
            <v-col
              v-for="step in steps"
              :key="step.step"
              cols="12"
              sm="6"
            >
              <div class="dark-card step-card">
                <div class="step-number">{{ step.step }}</div>
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-desc">{{ step.description }}</p>
              </div>
            </v-col>
          </v-row>
        </section>

        <section class="d-flex flex-column ga-4">
          <h2 class="section-h2">Tecnología</h2>
          <div class="d-flex flex-wrap ga-2">
            <TechBadge v-for="tag in tags" :key="tag.label" :label="tag.label" :category="tag.category" />
          </div>
        </section>

      </v-container>
    </v-main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from '../../components/TheNavbar.vue'
import TheFooter from '../../components/TheFooter.vue'
import ProjectHeader from '../../components/ProjectHeader.vue'
import PhoneMockup from '../../components/PhoneMockup.vue'
import TechBadge from '../../components/TechBadge.vue'

const tags = [
  { label: 'Kotlin',          category: 'mobile' },
  { label: 'Jetpack Compose', category: 'mobile' },
  { label: 'Android',         category: 'mobile' },
]

const steps = [
  {
    step: '1',
    title: 'Escanear entorno',
    description: 'La app usa la cámara para detectar líneas de colectivo en tiempo real.',
  },
  {
    step: '2',
    title: 'Identificar línea',
    description: 'Reconocimiento de números y destinos del colectivo que se aproxima.',
  },
  {
    step: '3',
    title: 'Notificación de voz',
    description: 'La app anuncia por audio el número de línea y destino.',
  },
  {
    step: '4',
    title: 'Confirmación',
    description: 'El usuario confirma si es el colectivo deseado antes de hacer señas.',
  },
]
</script>

<style scoped>
.section-h2 { font-size: 1.5rem; font-weight: 600; color: #f1f5f9; }
.body-text  { color: #94a3b8; line-height: 1.8; }
.step-card  { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.step-number {
  width: 2rem; height: 2rem;
  border-radius: 50%;
  background: rgba(0,180,216,0.15);
  border: 1px solid rgba(0,180,216,0.3);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-weight: 700; font-size: 0.875rem;
}
.step-title { color: #f1f5f9; font-weight: 500; margin: 0; }
.step-desc  { color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin: 0; }
</style>
