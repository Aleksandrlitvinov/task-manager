import { createTheme } from '@mui/material'
export const stylesTodos = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        container: {
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: '0 10px',
        },
      },
    },
  },
})
