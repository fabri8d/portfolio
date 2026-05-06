import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutSection from '../components/AboutSection.vue'

describe('AboutSection', () => {
  it('muestra el heading "Sobre mí"', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Sobre mí')
  })

  it('muestra el label de sección', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Acerca de')
  })

  it('muestra el texto biográfico', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('IUA')
    expect(wrapper.text()).toContain('Córdoba')
    expect(wrapper.text()).toContain('Dayco')
  })

  it('muestra los skills de backend', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Java')
    expect(wrapper.text()).toContain('Spring Boot')
  })

  it('muestra los skills de frontend', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Vue 3')
    expect(wrapper.text()).toContain('JavaScript')
  })

  it('muestra los skills de mobile', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Kotlin')
    expect(wrapper.text()).toContain('Jetpack Compose')
  })

  it('muestra los skills de base de datos', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('MySQL')
    expect(wrapper.text()).toContain('PostgreSQL')
  })

  it('muestra los skills de IoT/automatización', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Grafana')
    expect(wrapper.text()).toContain('n8n')
    expect(wrapper.text()).toContain('Telegram Bots')
  })

  it('muestra los skills de devops', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.text()).toContain('Docker')
    expect(wrapper.text()).toContain('Linux')
  })

  it('tiene el id "sobre-mi" para navegación', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.find('#sobre-mi').exists()).toBe(true)
  })
})
