import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectHeader from '../components/ProjectHeader.vue'

const baseProps = {
  title: 'IoT Robot + Data Pipeline',
  tagline: 'Pipeline de datos en tiempo real.',
  tags: [],
}

describe('ProjectHeader', () => {
  it('muestra el título', () => {
    const wrapper = mount(ProjectHeader, { props: baseProps })
    expect(wrapper.text()).toContain('IoT Robot + Data Pipeline')
  })

  it('muestra el tagline', () => {
    const wrapper = mount(ProjectHeader, { props: baseProps })
    expect(wrapper.text()).toContain('Pipeline de datos en tiempo real.')
  })

  it('tiene el link de volver a proyectos', () => {
    const wrapper = mount(ProjectHeader, { props: baseProps })
    const link = wrapper.find('.back-link')
    expect(link.exists()).toBe(true)
    expect(link.text()).toContain('Volver a proyectos')
  })

  it('renderiza los tags', () => {
    const wrapper = mount(ProjectHeader, {
      props: {
        ...baseProps,
        tags: [
          { label: 'MQTT', category: 'iot' },
          { label: 'Grafana', category: 'iot' },
        ],
      },
    })
    expect(wrapper.text()).toContain('MQTT')
    expect(wrapper.text()).toContain('Grafana')
  })

  it('renderiza sin tags sin errores', () => {
    const wrapper = mount(ProjectHeader, { props: baseProps })
    expect(wrapper.exists()).toBe(true)
  })
})
