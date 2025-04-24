import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Box } from '@mui/material'
import Search from './components/Search/Search'
import Carrousel from './components/CarroselEventHome/CarroselEventHome'
import BoxInfo from './components/BoxInfo/BoxInfo'
import Footer from './components/Footer/Footer'
import Login from './components/Forms/Login/Login'
import Title from './components/Title/Title'

function App() {
  return (
    <>
      <Box>
        <Navbar />
        <Title>
          Qual a boa de hoje?
         </Title>
        <Search />
        <Carrousel />
        <BoxInfo />
      </Box>
      <Footer />    
       {/* <Login />    */}
    </>
  )
}

export default App
