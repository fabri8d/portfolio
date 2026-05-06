import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'portfolio',
    themes: {
      portfolio: {
        dark: true,
        colors: {
          background: '#0d1b2a',
          surface: '#112236',
          primary: '#00b4d8',
          'primary-lighten-1': '#48cae4',
          'primary-darken-1': '#0096c7',
          secondary: '#48cae4',
        },
      },
    },
  },
})
