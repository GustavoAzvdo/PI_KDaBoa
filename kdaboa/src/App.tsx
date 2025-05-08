import Navbar from './components/Navbar/Navbar'
import './App.css'
import { Box } from '@mui/material'
import Search from './components/Search/Search'
import Carrousel from './components/CarroselEventHome/CarroselEventHome'
import BoxInfo from './components/BoxInfo/BoxInfo'
import Footer from './components/Footer/Footer'
import Login from './components/Forms/Login/Login'
import Title from './components/Title/Title'
import Signin from './components/Forms/Signin/Signin'

function App() {
  return (
    <>
     {/* <Box>
        <Navbar />
        <Title />
        <Search />
        <Carrousel />
        <BoxInfo />
      </Box>
      <Footer />    */}
        <Login />  
       {/* <Signin /> */}
    </>
  )
}

export default App
