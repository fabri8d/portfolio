<template>
  <section id="experiencia" class="section-pad">
    <v-container style="max-width: 1024px;">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <p class="section-label">Experiencia</p>
        <h2 class="section-title">Laboral</h2>

        <div class="exp-card">
          <div class="exp-header">
            <div class="exp-icon-wrap">
              <Briefcase :size="22" class="exp-icon" />
            </div>
            <div class="exp-meta">
              <div class="exp-top-row">
                <div>
                  <p class="exp-role">Pasante IT</p>
                  <p class="exp-company">Dayco Belts Argentina · Córdoba, Argentina</p>
                </div>
                <span class="exp-date">Mayo 2024 – Mayo 2025</span>
              </div>
            </div>
          </div>

          <ul class="exp-bullets">
            <li v-for="item in bullets" :key="item">{{ item }}</li>
          </ul>

          <div class="d-flex flex-wrap ga-2 mt-4">
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
import { Briefcase } from 'lucide-vue-next'
import TechBadge from './TechBadge.vue'

const bullets = [
  'Administración de servidores Linux y Windows Server',
  'Gestión de +30 usuarios con Active Directory',
  'Scripts Bash para automatización de mantenimiento',
  'Soporte de hardware y software industrial',
  'Comunicación técnica en inglés con proveedores internacionales',
]

const tags = [
  { label: 'Linux',           category: 'devops'   },
  { label: 'Windows Server',  category: 'devops'   },
  { label: 'Active Directory',category: 'devops'   },
  { label: 'Bash',            category: 'devops'   },
  { label: 'Docker',          category: 'devops'   },
  { label: 'Redes',           category: 'devops'   },
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

.exp-card {
  margin-top: 2.5rem;
  padding: 2rem;
  background: var(--navy-light);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: border-color 0.2s;
}
.exp-card:hover {
  border-color: rgba(0, 180, 216, 0.35);
}

.exp-header {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}
.exp-icon-wrap {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 10px;
  background: rgba(0, 180, 216, 0.1);
  border: 1px solid rgba(0, 180, 216, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.exp-icon { color: var(--accent); }

.exp-meta { flex: 1; min-width: 0; }
.exp-top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.exp-role {
  color: #f1f5f9;
  font-weight: 600;
  font-size: 1.05rem;
  margin: 0 0 0.25rem;
}
.exp-company {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}
.exp-date {
  color: var(--accent);
  font-size: 0.8rem;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
  padding-top: 0.15rem;
}

.exp-bullets {
  margin: 1.5rem 0 0 0;
  padding: 0 0 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.exp-bullets li {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
