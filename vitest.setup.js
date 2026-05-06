import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createMemoryHistory } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'

// Browser APIs not available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = class IntersectionObserver {
  constructor(cb) { this.cb = cb }
  observe(el) { this.cb([{ isIntersecting: true, target: el }]) }
  unobserve() {}
  disconnect() {}
}

global.CSS = { supports: () => false }

const vuetify = createVuetify({ components, directives })

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div/>' } },
    { path: '/projects/iot-robot', component: { template: '<div/>' } },
    { path: '/projects/mobile-app', component: { template: '<div/>' } },
  ],
})

config.global.plugins = [vuetify, router, MotionPlugin]
