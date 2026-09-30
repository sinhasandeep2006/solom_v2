/* Tailwind CDN config, shared by every v2 page. Same tokens as index-nav-a.html. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'cream-bg': '#FFFDF7',
        'cream-warm': '#FFF9EE',
        'cream-surface': '#F7F3E8',
        'cream-card': '#FFFFFF',
        'navy-brand': '#111A78',
        'navy-muted': '#2F3875',
        'orange-brand': '#FF5A0A',
        'orange-deep': '#E84E00',
        'orange-light': '#FFF0EB',
        'blue-brand': '#087FE5',
        'blue-light': '#EBF5FF',
        'slate-body': '#4E5365',
        'sand-border': '#EBE5D8',
        'sand-line': '#ECE5D4'
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fredoka', 'Nunito', 'sans-serif']
      },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem', '4xl': '2.25rem' },
      scale: { '102': '1.02' },
      boxShadow: { 'xs': '0 1px 2px 0 rgb(17 26 120 / 0.06)' },
      backdropBlur: { 'xs': '2px' }
    }
  }
};
