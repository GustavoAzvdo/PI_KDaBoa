import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Grid,Box } from '@mui/material'
import CardEventHome from "./components/CardEventHome/CardEventHome"
function App() {

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <CardEventHome />
    </>
    
  )
}

export default App
