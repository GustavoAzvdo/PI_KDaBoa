import './App.css'
import { EnderecoProvider } from './context/EnderecoContext'
import { EventosProvider } from './context/EventoContext'
import AppRoutes from './routes/AppRoutes'
import './index.css'

 


function App() {

 

    
  return (

    <EventosProvider>
      <EnderecoProvider>
        <AppRoutes />
      </EnderecoProvider>
    </EventosProvider>

  )
}

export default App
