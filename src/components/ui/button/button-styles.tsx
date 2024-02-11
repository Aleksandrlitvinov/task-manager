import { createTheme } from '@mui/material'
export const stylesBtnTask = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#72aee5',
            border: '2px solid var(--color-light-100)',
            color: 'var(--color-light-100)',
          },
          backgroundColor: 'var(--color-light-100)',
          border: '2px solid #72aee5',
          borderRadius: '50%',
          color: '#72aee5',
          height: '36px',
          minWidth: '30px',
          padding: '5px',
          width: '36px',
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
            backgroundColor: '#72aee5',
            color: 'var(--color-light-100)',
          },
          backgroundColor: 'var(--color-light-100)',
          border: '2px solid #72aee5',
          color: '#72aee5',
          height: '36px',
          minWidth: '30px',
          padding: '5px',
          width: '36px',
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
            backgroundColor: '#72aee5',
            border: '1px solid var(--color-light-100)',
            borderRadius: '4px',
            color: 'var(--color-light-100)',
            padding: '0 10px',
          },
          '&.default': {
            border: '1px solid #72aee5',
            borderRadius: '4px',
            fontSize: '14px',
            padding: '0 10px',
          },
          '&:hover': {
            backgroundColor: '#72aee5',
            border: '1px solid var(--color-light-100)',
            color: 'var(--color-light-100)',
          },
          //backgroundColor: 'var(--color-light-100)',
          border: '1px solid #72aee5',
          color: '#72aee5',

          padding: '2px',
          textTransform: 'lowercase',
        },
      },
    },
  },
})
