import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactSection from '../components/ContactSection.vue'

describe('ContactSection', () => {
  it('muestra el heading "Hablemos"', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('Hablemos')
  })

  it('muestra el label de sección', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('Contacto')
  })

  it('muestra el texto de invitación', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('abierto a nuevas oportunidades')
  })

  it('tiene el link de email correcto', () => {
    const wrapper = mount(ContactSection)
    const emailLink = wrapper.find('a[href="mailto:lbiondi733@alumnos.iua.edu.ar"]')
    expect(emailLink.exists()).toBe(true)
    expect(emailLink.text()).toContain('lbiondi733@alumnos.iua.edu.ar')
  })

  it('tiene el link de GitHub con target _blank', () => {
    const wrapper = mount(ContactSection)
    const ghLink = wrapper.find('a[href="https://github.com/fabri8d"]')
    expect(ghLink.exists()).toBe(true)
    expect(ghLink.attributes('target')).toBe('_blank')
    expect(ghLink.attributes('rel')).toContain('noopener')
  })

  it('tiene el link de LinkedIn', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('LinkedIn')
    expect(wrapper.text()).toContain('Fabrizio Biondi')
  })

  it('muestra los 3 métodos de contacto', () => {
    const wrapper = mount(ContactSection)
    const cards = wrapper.findAll('.contact-card')
    expect(cards).toHaveLength(3)
  })

  it('tiene el id "contacto" para navegación', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.find('#contacto').exists()).toBe(true)
  })
})
