import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneMockup from '../components/PhoneMockup.vue'

describe('PhoneMockup', () => {
  it('renderiza sin errores', () => {
    const wrapper = mount(PhoneMockup, {
      slots: { default: '<div/>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza el contenido del slot', () => {
    const wrapper = mount(PhoneMockup, {
      slots: { default: '<p class="slot-content">Screenshot aquí</p>' },
    })
    expect(wrapper.text()).toContain('Screenshot aquí')
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })

  it('incluye el notch y la pantalla', () => {
    const wrapper = mount(PhoneMockup, {
      slots: { default: '<div/>' },
    })
    expect(wrapper.find('.phone-notch').exists()).toBe(true)
    expect(wrapper.find('.phone-screen').exists()).toBe(true)
  })
})
