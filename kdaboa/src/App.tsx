import './App.css'
import { EnderecoProvider } from './context/EnderecoContext'

import AppRoutes from './routes/AppRoutes'



function App() {
 

  return (
   
        <EnderecoProvider>
          <AppRoutes />
        </EnderecoProvider>
      
   
  )
}

export default App
