import Navbar from './components/Navbar/Navbar'
import './App.css'
import {Box } from '@mui/material'
import Search from './components/Search/Search'
import Carrousel from './components/CarroselEventHome/CarroselEventHome'
function App() {
  return (
    <Box>
    <Navbar />
    <Search />
    <Carrousel />
</Box>
)
}

export default App
