import React from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Carrousel from '../CarroselEventHome/CarroselEventHome'
import BoxInfo from '../BoxInfo/BoxInfo'
import Title from '../Title/Title'
import Footer from '../Footer/Footer'
import hangloose from '../../assets/hangloose.png'
const Home = () => {
  return (
    <>
      <Navbar />
      <Title>
        Qual a boa de hoje? <img width="70" height="70" src={hangloose} alt="hang-ten" />
      </Title>
      <Search />
      <Carrousel />
      <BoxInfo />
      <Footer />
    </>
  )
}

export default Home