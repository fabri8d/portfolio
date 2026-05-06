import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../components/HeroSection.vue'

describe('HeroSection', () => {
  it('muestra el nombre completo', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('Fabrizio Biondi')
  })

  it('muestra el título profesional', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('Analista de sistemas')
  })

  it('muestra la descripción bio', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('IUA Córdoba')
  })

  it('tiene el indicador scroll apuntando a #sobre-mi', () => {
    const wrapper = mount(HeroSection)
    const hint = wrapper.find('.scroll-hint')
    expect(hint.exists()).toBe(true)
    expect(hint.attributes('href')).toBe('#sobre-mi')
  })

  it('el contenedor de la foto existe con el rol y aria-label correctos', () => {
    const wrapper = mount(HeroSection)
    const ring = wrapper.find('.profile-ring')
    expect(ring.exists()).toBe(true)
    expect(ring.attributes('role')).toBe('img')
    expect(ring.attributes('aria-label')).toBe('Fabrizio Biondi')
  })
})
