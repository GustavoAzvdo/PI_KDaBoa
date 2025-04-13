import Navbar from './components/Navbar/Navbar'
import './App.css'
import {Box } from '@mui/material'
import Search from './components/Search/Search'
import BoxInfo from './components/BoxInfo/BoxInfo'
function App() {

  return (
    <Box>
        <Navbar />
        <Search />
        <BoxInfo />
    </Box>
  )
}

export default App
