import './App.css'
import { EnderecoProvider } from './context/EnderecoContext'
import { EventosProvider } from './context/EventoContext'
import AppRoutes from './routes/AppRoutes'
import './index.css'
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import NavbarLogged from './components/Navbar/NavbarLogged';


 


function App() {

 const { isAuthenticated } = useAuth();
 
      {isAuthenticated ? <NavbarLogged /> : <Navbar />}
    
  return (

    <EventosProvider>
      <EnderecoProvider>
        <AppRoutes />
      </EnderecoProvider>
    </EventosProvider>

  )
}

export default App
