import { createTheme } from '@mui/material'

export const stylesAddItemForm = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '& .Mui-focused fieldset': {
            border: 'none',
            outline: 'none',
          },
          '&:active fieldset': {
            border: 'none',
            outline: 'none',
          },
          '&:focus fieldset': {
            outline: 'none',
          },
          '&:focus-visible fieldset': {
            outline: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
            outline: 'none',
          },
        },
        root: {
          '&.Mui-error fieldset': {
            border: '2px solid var(--color-danger-500)',
            borderColor: 'var(--color-danger-500) !important',
          },
          '&.Mui-error input': {
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            border: 'none',
            outline: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:focus fieldset': {
            outline: 'none',
          },
          '&:focus-visible fieldset': {
            outline: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
            outline: 'none',
          },
          border: '2px solid var(--color-accent-700)',
          borderRadius: '4px',
          boxSizing: 'border-box',
          height: '36px',
          padding: '3px 3px 3px 10px',
        },
        root: {
          '& .Mui-focused fieldset': {
            border: 'none',
            outline: 'none',
          },
          '&:active fieldset': {
            borderColor: 'transparent',
            outline: 'none',
          },
          '&:focus fieldset': {
            outline: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
            outline: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .Mui-focused fieldset': {
            border: 'none',
            outline: 'none',
          },
          '& fieldset': {
            borderColor: 'var(--color-accent-700)',
          },
          '&:active fieldset': {
            border: 'none',
            outline: 'none',
          },
          '&:focus fieldset': {
            border: '1px solid var(--color-accent-500)',
            outline: 'none',
          },
          '&:hover fieldset': {
            borderColor: 'red',
          },
          border: 'none',
          height: '36px',
          width: '100%',
        },
      },
    },
  },
})
