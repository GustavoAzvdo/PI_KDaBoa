import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Grid,Box } from '@mui/material'
import CarroselEventHome from './components/CarroselEventHome/CarroselEventHome'

function App() {
  return (
    <>
      <Box>
        <Navbar />
      </Box>

      <CarroselEventHome />
    </>
    
  )
}

export default App
