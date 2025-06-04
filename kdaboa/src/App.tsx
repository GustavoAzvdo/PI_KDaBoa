import './App.css'
import { EnderecoProvider } from './context/EnderecoContext'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
function App() {
  return (
    <BrowserRouter>
      <EnderecoProvider>
        <AppRoutes />
      </EnderecoProvider>
    </BrowserRouter>
  )
}

export default App
