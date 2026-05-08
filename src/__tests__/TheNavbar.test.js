import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import TheNavbar from '../components/TheNavbar.vue'

// v-app-bar y v-navigation-drawer necesitan el contexto de layout
// que provee v-app, así que montamos siempre dentro de él.
const AppWrapper = defineComponent({
  components: { TheNavbar },
  template: '<v-app theme="portfolio"><TheNavbar /></v-app>',
})

describe('TheNavbar', () => {
  let wrapper
  let navbar

  beforeEach(async () => {
    wrapper = mount(AppWrapper, { attachTo: document.body })
    await wrapper.vm.$nextTick()
    navbar = wrapper.findComponent(TheNavbar)
  })

  it('muestra el nombre de marca', () => {
    expect(wrapper.text()).toContain('Fabrizio Biondi')
  })

  it('muestra los tres links de navegación', () => {
    expect(wrapper.text()).toContain('Sobre mí')
    expect(wrapper.text()).toContain('Proyectos')
    expect(wrapper.text()).toContain('Contacto')
  })

  it('los links tienen los hrefs correctos', () => {
    const links = wrapper.findAll('a[href*="#"]')
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('/#sobre-mi')
    expect(hrefs).toContain('/#proyectos')
    expect(hrefs).toContain('/#contacto')
  })

  it('el menú mobile empieza cerrado', () => {
    expect(navbar.vm.isOpen).toBe(false)
  })

  it('el botón hamburguesa abre el menú mobile', async () => {
    const btn = wrapper.find('.v-btn.d-md-none')
    await btn.trigger('click')
    expect(navbar.vm.isOpen).toBe(true)
  })

  it('el botón hamburguesa cierra el menú si ya está abierto', async () => {
    const btn = wrapper.find('.v-btn.d-md-none')
    await btn.trigger('click')
    expect(navbar.vm.isOpen).toBe(true)
    await btn.trigger('click')
    expect(navbar.vm.isOpen).toBe(false)
  })

  it('scrolled empieza en false', () => {
    expect(navbar.vm.scrolled).toBe(false)
  })

  it('scrolled cambia a true al hacer scroll', async () => {
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(navbar.vm.scrolled).toBe(true)
  })
})
