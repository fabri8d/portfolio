import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectsSection from '../components/ProjectsSection.vue'

describe('ProjectsSection', () => {
  it('muestra el heading "Proyectos"', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.text()).toContain('Proyectos')
  })

  it('muestra el label de sección', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.text()).toContain('Trabajo')
  })

  it('renderiza los dos proyectos', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.text()).toContain('IoT Robot + Data Pipeline')
    expect(wrapper.text()).toContain('App Accesibilidad')
  })

  it('muestra las descripciones de los proyectos', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.text()).toContain('Mosquitto')
    expect(wrapper.text()).toContain('baja visión')
  })

  it('muestra los tags de tecnologías', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.text()).toContain('MQTT')
    expect(wrapper.text()).toContain('Kotlin')
    expect(wrapper.text()).toContain('Docker')
  })

  it('tiene el id "proyectos" para navegación', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.find('#proyectos').exists()).toBe(true)
  })
})
