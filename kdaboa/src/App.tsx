import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Box } from '@mui/material'
import Search from './components/Search/Search'
import Carrousel from './components/CarroselEventHome/CarroselEventHome'
import BoxInfo from './components/BoxInfo/BoxInfo'
import Footer from './components/Footer/Footer'
function App() {
  return (
    <>
      <Box>
        <Navbar />
        <Search />
        <Carrousel />
        <BoxInfo />
      </Box>
      <Footer />
    </>
  )
}

export default App
