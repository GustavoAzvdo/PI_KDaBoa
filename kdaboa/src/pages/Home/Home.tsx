import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Search from '../../components/Search/Search'
import Carrousel from '../../components/CarroselEventHome/CarroselEventHome'
import BoxInfo from '../../components/BoxInfo/BoxInfo'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
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