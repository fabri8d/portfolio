import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../components/ProjectCard.vue'

const baseProps = {
  title: 'IoT Robot',
  description: 'Pipeline de datos en tiempo real.',
  href: '/projects/iot-robot',
  tags: [],
}

describe('ProjectCard', () => {
  it('muestra el título y la descripción', () => {
    const wrapper = mount(ProjectCard, { props: baseProps })
    expect(wrapper.text()).toContain('IoT Robot')
    expect(wrapper.text()).toContain('Pipeline de datos en tiempo real.')
  })

  it('muestra el placeholder cuando no hay imagen', () => {
    const wrapper = mount(ProjectCard, { props: baseProps })
    expect(wrapper.find('.card-placeholder').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('muestra la imagen cuando se pasa el prop', () => {
    const wrapper = mount(ProjectCard, {
      props: { ...baseProps, image: '/img/project.png' },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/img/project.png')
    expect(img.attributes('alt')).toBe('IoT Robot')
  })

  it('renderiza los tags como TechBadge', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        ...baseProps,
        tags: [
          { label: 'MQTT', category: 'iot' },
          { label: 'Docker', category: 'devops' },
        ],
      },
    })
    expect(wrapper.text()).toContain('MQTT')
    expect(wrapper.text()).toContain('Docker')
  })

  it('muestra el texto "Ver proyecto"', () => {
    const wrapper = mount(ProjectCard, { props: baseProps })
    expect(wrapper.text()).toContain('Ver proyecto')
  })

  it('la inicial del título aparece en el placeholder', () => {
    const wrapper = mount(ProjectCard, { props: baseProps })
    expect(wrapper.find('.card-icon').text()).toBe('I')
  })
})
