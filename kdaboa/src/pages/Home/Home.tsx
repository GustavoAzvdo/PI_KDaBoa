import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Search from '../../components/Search/Search'
import Carrousel from '../../components/CarroselEventHome/CarroselEventHome'
import BoxInfo from '../../components/BoxInfo/BoxInfo'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
import hangloose from '../../assets/hangloose.png'
import { Box } from '@mui/material'
const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ 
        textAlign: { xs: 'center' }, 
        px: {xs: 2} }}>
        <Title>
          Qual a boa de hoje? <img width="70" height="70" src={hangloose} alt="hang-ten" />
        </Title>

      </Box>
      <Search />
      <Carrousel />
      <BoxInfo />
      <Footer />
    </>
  )
}

export default Home