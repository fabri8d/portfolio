<template>
  <v-app-bar
    :elevation="scrolled ? 4 : 0"
    :style="scrolled ? 'background: rgba(17,34,54,0.92); backdrop-filter: blur(12px);' : 'background: transparent;'"
    style="transition: all 0.3s;"
  >
    <v-container class="d-flex align-center justify-space-between pa-0 px-4" style="max-width: 1024px;">
      <router-link to="/" class="text-decoration-none" style="color: var(--accent); font-weight: 600; font-size: 1.1rem; letter-spacing: -0.02em;">
        Fabrizio Biondi
      </router-link>

      <nav class="d-none d-md-flex align-center ga-8">
        <router-link
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-decoration-none nav-link"
        >
          {{ link.label }}
        </router-link>
        <a href="/cv.pdf" download class="cv-link">
          <Download :size="14" style="margin-right: 0.35rem;" />
          Descargar CV
        </a>
      </nav>

      <v-btn
        :icon="isOpen ? 'mdi-close' : 'mdi-menu'"
        variant="text"
        class="d-md-none"
        style="color: #cbd5e1;"
        @click="isOpen = !isOpen"
      />
    </v-container>
  </v-app-bar>

  <Transition name="slide-down">
    <div v-show="isOpen" class="mobile-menu d-md-none">
      <router-link
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="mobile-menu__item"
        style="min-height: 52px"
        @click="isOpen = false"
      >
        {{ link.label }}
      </router-link>
      <hr class="mobile-menu__divider" />
      <a
        href="/cv.pdf"
        download
        class="mobile-menu__item mobile-menu__cv"
        style="min-height: 52px"
        @click="isOpen = false"
      >
        <Download :size="16" class="mobile-menu__cv-icon" />
        Descargar CV
      </a>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Download } from 'lucide-vue-next'

const links = [
  { to: { path: '/', hash: '#sobre-mi'  }, label: 'Sobre mí'   },
  { to: { path: '/', hash: '#proyectos' }, label: 'Proyectos'  },
  { to: { path: '/', hash: '#contacto'  }, label: 'Contacto'   },
]

const isOpen = ref(false)
const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

defineExpose({ isOpen, scrolled })
</script>

<style scoped>
.nav-link {
  color: #cbd5e1;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover {
  color: var(--accent);
}
.cv-link {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--accent);
  border-radius: 6px;
  color: var(--accent);
  font-size: 0.875rem;
  text-decoration: none;
  transition: background 0.2s;
}
.cv-link:hover {
  background: rgba(0, 180, 216, 0.12);
}

/* Mobile dropdown */
.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 2000;
  background: rgba(17, 34, 54, 0.97);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.mobile-menu__item {
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  color: #cbd5e1;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}
.mobile-menu__item:hover {
  color: var(--accent);
}
.mobile-menu__divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0.25rem 0;
}
.mobile-menu__cv {
  color: var(--accent);
  gap: 0.5rem;
}

/* Slide transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
