import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechBadge from '../components/TechBadge.vue'

describe('TechBadge', () => {
  it('muestra el label', () => {
    const wrapper = mount(TechBadge, { props: { label: 'Docker' } })
    expect(wrapper.text()).toContain('Docker')
  })

  it('usa la categoría backend por defecto', () => {
    const wrapper = mount(TechBadge, { props: { label: 'Node.js' } })
    const style = wrapper.find('.v-chip').attributes('style') ?? ''
    // Vue normaliza rgba(r,g,b) → rgba(r, g, b) con espacios
    expect(style).toMatch(/rgba\(88,\s*28,\s*135/)
  })

  it.each([
    ['frontend',  /rgba\(30,\s*58,\s*138/],
    ['mobile',    /rgba\(20,\s*83,\s*45/],
    ['devops',    /rgba\(124,\s*45,\s*18/],
    ['iot',       /rgba\(19,\s*78,\s*74/],
    ['backend',   /rgba\(88,\s*28,\s*135/],
    ['database',  /rgba\(12,\s*74,\s*110/],
  ])('categoría %s aplica el fondo correcto', (category, bgPattern) => {
    const wrapper = mount(TechBadge, { props: { label: 'X', category } })
    const style = wrapper.find('.v-chip').attributes('style') ?? ''
    expect(style).toMatch(bgPattern)
  })

  it('cada categoría produce un color diferente', () => {
    const categories = ['frontend', 'mobile', 'devops', 'iot', 'backend', 'database']
    const styles = categories.map((category) => {
      const w = mount(TechBadge, { props: { label: 'X', category } })
      return w.find('.v-chip').attributes('style') ?? ''
    })
    const unique = new Set(styles)
    expect(unique.size).toBe(6)
  })
})
