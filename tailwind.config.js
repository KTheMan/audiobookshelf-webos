const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue', 'mixins/**/*.js', 'plugins/**/*.js'],
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 500px)' }
      },
      colors: {
        bg: 'rgba(var(--color-bg), <alpha-value>)',
        'bg-hover': 'rgba(var(--color-bg-hover), <alpha-value>)',
        fg: 'rgba(var(--color-fg), <alpha-value>)',
        'fg-muted': 'rgba(var(--color-fg-muted), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary), <alpha-value>)',
        primary: 'rgba(var(--color-primary), <alpha-value>)',
        border: 'rgba(var(--color-border), <alpha-value>)',
        'bg-toggle': 'rgba(var(--color-bg-toggle), <alpha-value>)',
        'bg-toggle-selected': 'rgba(var(--color-bg-toggle-selected), <alpha-value>)',
        'track-cursor': 'rgba(var(--color-track-cursor), <alpha-value>)',
        track: 'rgba(var(--color-track), <alpha-value>)',
        'track-buffered': 'rgba(var(--color-track-buffered), <alpha-value>)',
        accent: '#1ad691',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        successDark: '#3b8a3e',
        warning: '#FB8C00'
      },
      cursor: {
        none: 'none'
      },
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        mono: ['Ubuntu Mono', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        '1.5xl': '1.375rem',
        xxs: '0.625rem'
      },
      spacing: {
        18: '4.5rem'
      },
      height: {
        18: '4.5rem'
      },
      maxWidth: {
        24: '6rem'
      },
      minWidth: {
        4: '1rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem'
      },
      minHeight: {
        12: '3rem'
      }
    }
  },
  plugins: []
}
