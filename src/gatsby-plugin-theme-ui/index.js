import prism from '@theme-ui/prism/presets/theme-ui'
import { deep, funk } from '@theme-ui/presets'
import { darken } from 'polished'

const colors = {
  ...funk.colors,
  'darker-background': darken('0.05', funk.colors.background),
  modes: {
    dark: {
      ...deep.colors,
      'darker-background': darken('0.05', deep.colors.background),
    },
  },
}

export default {
  useCustomProperties: true,
  initialColorMode: 'system',
  colors,
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  sizes: {
    container: 864,
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6, 7],
      letterSpacing: '-0.04em',
      mt: 3,
    },
  },
  styles: {
    header: {
      maxWidth: 'container',
      mb: [4, 5, 6],
    },
    postlist: {
      listStyleType: 'none',
      m: 0,
      p: 0,
    },
    postlink: {
      textDecoration: 'none',
      color: 'text',
    },
    postlistitem: {
      padding: '.5rem',
      margin: '0 -0.5rem',
      borderRadius: 5,
      ':hover': {
        backgroundColor: 'muted',
      },
    },
    navlink: {
      color: 'text',
      textDecoration: 'none',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontSize: [3, 3, 4],
      padding: [10, 10, 10, 0],
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      maxWidth: 'container',
      margin: 'auto',
    },
    h1: {
      variant: 'textStyles.display',
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5,
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4,
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3,
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2,
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1,
    },
    a: {
      color: 'primary',
      textDecorationColor: '#c0bfc0',
      '&:hover': {
        color: 'text',
        textDecorationColor: '#000',
      },
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      ...prism,
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid',
      },
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px',
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px',
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted',
    },
  },
  images: {
    tiny: {
      width: 25,
      height: 25,
      borderRadius: 99999,
    },
  },
}
