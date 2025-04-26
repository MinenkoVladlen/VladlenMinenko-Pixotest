import { ThemeProvider, CssBaseline, IconButton } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useState, useEffect } from 'react'
import { darkTheme, lightTheme } from './theme/theme'
import Cookies from 'js-cookie'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Box } from '@mui/system'

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(
    (Cookies.get('theme') as 'light' | 'dark') || 'light'
  )

  useEffect(() => {
    Cookies.set('theme', mode, { expires: 7 })
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }
  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ position: 'fixed', top: 8, right: 8, zIndex: 999 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
