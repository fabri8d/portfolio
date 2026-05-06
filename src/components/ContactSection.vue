<template>
  <section id="contacto" class="section-pad">
    <v-container style="max-width: 1024px;">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center"
      >
        <p class="section-label">Contacto</p>
        <h2 class="section-title">Hablemos</h2>
        <p style="color: #94a3b8; margin-top: 1rem; max-width: 28rem; margin-inline: auto;">
          Estoy abierto a nuevas oportunidades. Podés contactarme por
          cualquiera de estos medios.
        </p>

        <div class="d-flex flex-wrap justify-center ga-4 mt-10">
          <a
            v-for="contact in contacts"
            :key="contact.label"
            :href="contact.href"
            :target="contact.href.startsWith('http') ? '_blank' : undefined"
            :rel="contact.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="contact-card"
          >
            <component :is="contact.Icon" :size="20" class="contact-icon" />
            <div class="text-left">
              <p class="contact-label">{{ contact.label }}</p>
              <p class="contact-display">{{ contact.display }}</p>
            </div>
          </a>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { Mail } from 'lucide-vue-next'
import GithubIcon from './icons/GithubIcon.vue'
import LinkedinIcon from './icons/LinkedinIcon.vue'

const contacts = [
  {
    Icon: Mail,
    label: 'Email',
    href: 'mailto:leandrobiondi12@gmail.com',
    display: 'leandrobiondi12@gmail.com',
  },
  {
    Icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/fabri8d',
    display: 'fabri8d',
  },
  {
    Icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/leandro-fabrizio-biondi/',
    display: 'Fabrizio Biondi',
  },
]
</script>

<style scoped>
.section-pad { padding: 6rem 1.5rem; }
@media (max-width: 600px) {
  .section-pad { padding: 3.5rem 1rem; }
  .contact-card { width: 100%; }
}
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: #f1f5f9;
}
.contact-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  min-height: 44px;
  background: var(--navy-light);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;
}
.contact-card:hover {
  border-color: rgba(0, 180, 216, 0.5);
  background: rgba(0, 180, 216, 0.05);
}
.contact-icon {
  color: var(--accent);
  flex-shrink: 0;
  transition: transform 0.2s;
}
.contact-card:hover .contact-icon { transform: scale(1.1); }
.contact-label {
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}
.contact-display {
  font-size: 0.875rem;
  color: #cbd5e1;
  margin: 0;
}
</style>
