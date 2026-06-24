/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-satoshi)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-sora)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'ab-dark':   '#2F2614',
        'ab-blue':   '#253343',
        'ab-muted':  '#667085',
        'ab-orange': '#FD5A47',
        brand: {
          primary: '#FD5A47',
          secondary: '#253343',
          accent: '#FF8C00',
          cream: '#FFF9F5',
          'text-dark': '#2F2614',
          'text-mid': '#333333',
          'text-muted': '#667085',
          'border-light': '#E5E7EB',
          'border-mid': '#D9D9D9',
        },
      },
      borderRadius: {
        btn: '5px',
        card: '8px',
        section: '12px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        elevated: '0 8px 32px rgba(0,0,0,0.12)',
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
