import { createTheme } from '@mui/material'
export const stylesBtnTask = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--color-accent-700)',
            color: 'var(--color-light-100)',
          },
          backgroundColor: 'var(--color-light-100)',
          border: '2px solid var(--color-accent-700)',
          color: 'var(--color-accent-700)',
          height: '36px',
          minWidth: '30px',
          padding: '5px',
        },
      },
    },
  },
})

export const stylesBtnTodo = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--color-accent-700)',
            color: 'var(--color-light-100)',
          },
          backgroundColor: 'var(--color-light-100)',
          border: '2px solid var(--color-accent-700)',
          color: 'var(--color-accent-700)',
          height: '36px',
          minWidth: '30px',
          padding: '5px',
        },
      },
    },
  },
})

export const stylesBtnFilter = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.active': {
            backgroundColor: 'var(--color-accent-700)',
            border: '1px solid var(--color-light-100)',
            borderRadius: '4px',
            color: 'var(--color-light-100)',
            padding: '0 10px',
          },
          '&.default': {
            border: '1px solid var(--color-accent-700)',
            borderRadius: '4px',
            fontSize: '14px',
            padding: '0 10px',
          },
          '&:hover': {
            backgroundColor: 'var(--color-accent-700)',
            border: '1px solid var(--color-light-100)',
            color: 'var(--color-light-100)',
          },
          color: 'var(--color-accent-700)',

          padding: '2px',
          textTransform: 'lowercase',
        },
      },
    },
  },
})
