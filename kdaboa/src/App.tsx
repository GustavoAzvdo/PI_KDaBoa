import './App.css'
import { EnderecoProvider } from './context/EnderecoContext'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#e0e0e0 !important',
            color: '#9e9e9e !important',
            opacity: 1,
          }
        }
      }
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <EnderecoProvider>
          <AppRoutes />
        </EnderecoProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
