import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Grid,Box } from '@mui/material'
import CardEventHome from "./components/CardEventHome/CardEventHome"
import CardsBD from './components/CardEventHome/CardsBD.ts'
import CardProps from './components/CardEventHome/props/CardProps.ts'

function App() {
  return (
    <>
      <Box>
        <Navbar />
      </Box>
      {CardsBD.map((card : CardProps, index: number) => <CardEventHome key={index} card={card} />)}
    </>
    
  )
}

export default App
