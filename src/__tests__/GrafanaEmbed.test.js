import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GrafanaEmbed from '../components/GrafanaEmbed.vue'

describe('GrafanaEmbed', () => {
  it('muestra el placeholder cuando no hay URL', () => {
    const wrapper = mount(GrafanaEmbed)
    expect(wrapper.text()).toContain('Dashboard en vivo')
    expect(wrapper.text()).toContain('Grafana Public Dashboard')
    expect(wrapper.find('iframe').exists()).toBe(false)
  })

  it('muestra el iframe cuando hay URL', () => {
    const wrapper = mount(GrafanaEmbed, {
      props: { url: 'https://grafana.example.com/d/abc' },
    })
    expect(wrapper.find('iframe').exists()).toBe(true)
    expect(wrapper.find('.placeholder-box').exists()).toBe(false)
  })

  it('el iframe usa la URL y el título correctos', () => {
    const wrapper = mount(GrafanaEmbed, {
      props: { url: 'https://grafana.example.com/d/abc', title: 'Mi Dashboard' },
    })
    const iframe = wrapper.find('iframe')
    expect(iframe.attributes('src')).toBe('https://grafana.example.com/d/abc')
    expect(iframe.attributes('title')).toBe('Mi Dashboard')
  })

  it('el iframe usa el título por defecto si no se pasa', () => {
    const wrapper = mount(GrafanaEmbed, {
      props: { url: 'https://grafana.example.com' },
    })
    expect(wrapper.find('iframe').attributes('title')).toBe('Dashboard IoT')
  })
})
