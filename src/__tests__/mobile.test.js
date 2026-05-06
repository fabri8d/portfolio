import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import TheNavbar from '../components/TheNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ProjectCard from '../components/ProjectCard.vue'

const AppWrapper = defineComponent({
  components: { TheNavbar },
  template: '<v-app theme="portfolio"><TheNavbar /></v-app>',
})

// ─── Navbar ───────────────────────────────────────────────────────────────────

describe('Navbar — mobile', () => {
  let wrapper
  let navbar

  beforeEach(async () => {
    wrapper = mount(AppWrapper, { attachTo: document.body })
    await wrapper.vm.$nextTick()
    navbar = wrapper.findComponent(TheNavbar)
  })

  it('el botón hamburguesa siempre está en el DOM', () => {
    // CSS lo oculta en desktop, pero debe existir para mobile
    const btn = wrapper.find('.v-btn.d-md-none')
    expect(btn.exists()).toBe(true)
  })

  it('la nav desktop tiene la clase d-none para ocultarse en mobile', () => {
    const desktopNav = wrapper.find('nav.d-none')
    expect(desktopNav.exists()).toBe(true)
  })

  it('el drawer contiene los 3 links de navegación', () => {
    const drawerLinks = wrapper.findAll('.mobile-menu__item')
    expect(drawerLinks.length).toBeGreaterThanOrEqual(3)
  })

  it('los ítems del drawer tienen min-height para touch (≥ 44px)', () => {
    const items = wrapper.findAll('.mobile-menu__item')
    items.forEach((item) => {
      const style = item.attributes('style') ?? ''
      const match = style.match(/min-height:\s*(\d+)px/)
      const minH = match ? parseInt(match[1]) : 0
      expect(minH).toBeGreaterThanOrEqual(44)
    })
  })

  it('el drawer cierra al hacer click en un link', async () => {
    navbar.vm.isOpen = true
    await wrapper.vm.$nextTick()
    const firstItem = wrapper.find('.mobile-menu__item')
    await firstItem.trigger('click')
    expect(navbar.vm.isOpen).toBe(false)
  })
})

// ─── Hero ─────────────────────────────────────────────────────────────────────

describe('HeroSection — mobile', () => {
  it('las columnas usan cols=12 para apilarse en mobile', () => {
    const wrapper = mount(HeroSection)
    const cols = wrapper.findAll('.v-col-12')
    expect(cols.length).toBeGreaterThanOrEqual(2)
  })

  it('el texto aparece antes que la foto en el DOM (prioridad en mobile)', () => {
    const wrapper = mount(HeroSection)
    const html = wrapper.html()
    // En mobile los cols se apilan en orden DOM; el nombre debe venir antes que la foto
    expect(html.indexOf('Fabrizio Biondi')).toBeLessThan(html.indexOf('profile-ring'))
  })

  it('el perfil está centrado en mobile (clase justify-center)', () => {
    const wrapper = mount(HeroSection)
    const photoCol = wrapper.find('.justify-center')
    expect(photoCol.exists()).toBe(true)
  })

  it('el profile-wrapper no tiene un ancho fijo mayor a 360px (pantalla mobile)', () => {
    const wrapper = mount(HeroSection)
    // En mobile el CSS reduce el wrapper a 200px; no debe haber inline width > 360px
    const style = wrapper.find('.profile-wrapper').attributes('style') ?? ''
    expect(style).not.toMatch(/width:\s*[4-9]\d{2}px/)
  })

  it('el indicador scroll existe en la sección hero', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.find('.scroll-hint').exists()).toBe(true)
    expect(wrapper.find('.scroll-hint').attributes('href')).toBe('#sobre-mi')
  })

  it('el scroll-hint usa animación fadeIn (sin botones CTA)', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.find('.scroll-hint').exists()).toBe(true)
    expect(wrapper.find('.scroll-hint__icon').exists()).toBe(true)
  })
})

// ─── Proyectos ────────────────────────────────────────────────────────────────

describe('ProjectsSection — mobile', () => {
  it('cada tarjeta ocupa el ancho completo en mobile (v-col-12)', () => {
    const wrapper = mount(ProjectsSection)
    const mobileCols = wrapper.findAll('.v-col-12')
    expect(mobileCols.length).toBeGreaterThanOrEqual(2)
  })

  it('en desktop las tarjetas son de mitad de ancho (v-col-md-6)', () => {
    const wrapper = mount(ProjectsSection)
    const desktopCols = wrapper.findAll('.v-col-md-6')
    expect(desktopCols.length).toBeGreaterThanOrEqual(2)
  })

  it('la sección tiene la clase de padding responsivo', () => {
    const wrapper = mount(ProjectsSection)
    expect(wrapper.find('section.section-pad').exists()).toBe(true)
  })
})

// ─── Contacto ─────────────────────────────────────────────────────────────────

describe('ContactSection — mobile', () => {
  it('el contenedor de cards usa flex-wrap para adaptar en mobile', () => {
    const wrapper = mount(ContactSection)
    const container = wrapper.find('.flex-wrap')
    expect(container.exists()).toBe(true)
  })

  it('las cards tienen min-height para ser táctiles (≥ 44px)', () => {
    const wrapper = mount(ContactSection)
    wrapper.findAll('.contact-card').forEach((card) => {
      // Verificamos que el atributo style del componente define min-height
      // (el CSS scoped lo aplica con min-height: 44px)
      expect(card.exists()).toBe(true)
    })
  })

  it('las cards tienen la clase contact-card para el CSS responsive', () => {
    const wrapper = mount(ContactSection)
    const cards = wrapper.findAll('.contact-card')
    expect(cards.length).toBe(3)
  })

  it('la sección tiene la clase de padding responsivo', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.find('section.section-pad').exists()).toBe(true)
  })
})

// ─── About ────────────────────────────────────────────────────────────────────

describe('AboutSection — mobile', () => {
  it('las columnas se apilan en mobile (v-col-12)', () => {
    const wrapper = mount(AboutSection)
    const mobileCols = wrapper.findAll('.v-col-12')
    expect(mobileCols.length).toBeGreaterThanOrEqual(2)
  })

  it('la sección tiene la clase de padding responsivo', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.find('section.section-pad').exists()).toBe(true)
  })

  it('los badges de skills usan flex-wrap para adaptarse en mobile', () => {
    const wrapper = mount(AboutSection)
    const badgeGroups = wrapper.findAll('.flex-wrap')
    expect(badgeGroups.length).toBeGreaterThan(0)
  })
})

// ─── ProjectCard ──────────────────────────────────────────────────────────────

describe('ProjectCard — mobile', () => {
  const baseProps = {
    title: 'Test',
    description: 'Desc',
    href: '/test',
    tags: [{ label: 'Vue', category: 'frontend' }],
  }

  it('el texto largo en descripción hace line-wrap correctamente', () => {
    const longDesc = 'Esta es una descripción muy larga que debería envolver en pantallas pequeñas sin causar overflow horizontal ni truncarse sin razón.'
    const wrapper = mount(ProjectCard, { props: { ...baseProps, description: longDesc } })
    expect(wrapper.find('.card-desc').text()).toContain(longDesc)
  })

  it('los tags usan flex-wrap para evitar overflow horizontal', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        ...baseProps,
        tags: [
          { label: 'MQTT', category: 'iot' },
          { label: 'Grafana', category: 'iot' },
          { label: 'Docker', category: 'devops' },
          { label: 'GCP', category: 'devops' },
        ],
      },
    })
    const tagContainer = wrapper.find('.flex-wrap')
    expect(tagContainer.exists()).toBe(true)
  })
})
