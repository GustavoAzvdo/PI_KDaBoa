import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SearchProvider } from './context/SearchContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const theme = createTheme({
  palette: {
    primary: {
      main: '#6c15d5'
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            
           
            "&:hover fieldset": {
              borderColor: "#6c15d5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6c15d5",
            },
          },
        },
      },
    },
  
  }
})
createRoot(document.getElementById('root')!).render(

  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StrictMode>
      <SearchProvider>
        <BrowserRouter>

          <App />

        </BrowserRouter>
      </SearchProvider>
    </StrictMode>
  </ThemeProvider>

)
