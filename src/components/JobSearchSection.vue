<template>
  <section id="busqueda" class="section-pad">
    <v-container style="max-width: 1024px;">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <p class="section-label">Trabajo</p>
        <h2 class="section-title">Búsqueda laboral</h2>

        <div class="otw-badge mt-4">
          <span class="otw-dot" />
          Open to Work
        </div>

        <!-- Roles -->
        <p class="subsection-label">Roles de interés</p>
        <div class="roles-grid">
          <div v-for="role in roles" :key="role.title" class="role-card">
            <span class="role-icon">{{ role.icon }}</span>
            <div>
              <p class="role-title">{{ role.title }}</p>
              <p class="role-level">{{ role.level }}</p>
            </div>
          </div>
        </div>

        <!-- Modalidad -->
        <p class="subsection-label mt-6">Modalidad</p>
        <div class="d-flex flex-wrap ga-2">
          <div v-for="m in modalities" :key="m.label" class="modality-chip">
            <span class="modality-icon">{{ m.icon }}</span>
            {{ m.label }}
          </div>
        </div>

        <!-- Disponibilidad -->
        <p class="subsection-label mt-6">Disponibilidad horaria</p>
        <p class="availability-text">
          Flexible — sin restricción horaria por facultad.
          Disponible para incorporación inmediata.
        </p>

        <!-- CTA -->
        <div class="mt-8">
          <a href="#contacto" class="cta-btn">
            Contactame
            <ArrowRight :size="16" />
          </a>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

const roles = [
  { icon: '💻', title: 'Full-Stack Developer',      level: 'Trainee / Jr' },
  { icon: '📱', title: 'Mobile Developer — Android', level: 'Trainee / Jr' },
  { icon: '⚙️', title: 'DevOps / Infra',             level: 'Jr'           },
  { icon: '📊', title: 'Data Analyst',               level: 'Jr'           },
]

const modalities = [
  { icon: '🌐', label: 'Remoto'              },
  { icon: '🏢', label: 'Híbrido'             },
  { icon: '📍', label: 'Presencial Córdoba'  },
  { icon: '⏰', label: 'Medio tiempo'        },
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

/* Open to Work badge */
.otw-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #4ade80;
  font-size: 0.8rem;
  font-weight: 500;
}
.otw-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-green 2s infinite;
}
@keyframes pulse-green {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.subsection-label {
  color: #475569;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-family: ui-monospace, monospace;
  margin: 1.5rem 0 0.875rem;
}

/* Roles */
.roles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
}
@media (max-width: 600px) {
  .roles-grid { grid-template-columns: 1fr; }
}
.role-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--navy-light);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: border-color 0.2s;
}
.role-card:hover {
  border-color: rgba(0, 180, 216, 0.35);
}
.role-icon { font-size: 1.5rem; flex-shrink: 0; }
.role-title {
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.2rem;
}
.role-level {
  color: var(--accent);
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  margin: 0;
}

/* Modality chips */
.modality-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.875rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: #94a3b8;
  font-size: 0.825rem;
}
.modality-icon { font-size: 0.9rem; }

/* Availability */
.availability-text {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0;
}

/* CTA */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  background: var(--accent);
  color: #0d1b2a;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.cta-btn:hover {
  background: var(--accent-light);
  transform: translateY(-1px);
}
</style>
