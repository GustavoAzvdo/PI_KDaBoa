import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SearchProvider } from './context/SearchContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '.Mui-disabled .MuiTypography-root': {
            backgroundColor: 'red !important',
            color: 'white !important',
            opacity: 1,
          }
        }
      }
    }
  }
})
createRoot(document.getElementById('root')!).render(

  <ThemeProvider theme={theme}>
    <StrictMode>
      <SearchProvider>
        <BrowserRouter>

          <App />

        </BrowserRouter>
      </SearchProvider>
    </StrictMode>
  </ThemeProvider>

)
