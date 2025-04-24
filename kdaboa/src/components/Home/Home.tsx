import React from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Carrousel from '../CarroselEventHome/CarroselEventHome'
import BoxInfo from '../BoxInfo/BoxInfo'
import Title from '../Title/Title'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Title>
        Qual a boa de hoje?
      </Title>
      <Search />
      <Carrousel />
      <BoxInfo />
      <Footer />
    </>
  )
}

export default Home