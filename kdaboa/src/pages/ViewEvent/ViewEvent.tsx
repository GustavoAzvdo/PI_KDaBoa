import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import ticket from "../../assets/ticket.png"
import InfoEvent from "../../components/InfoEvent/InfoEvent"
import Footer from "../../components/Footer/Footer"
import { useEffect } from "react"


const ViewEvent = () => {
  
  useEffect (() => {
    document.title = "Evento"
  })
  
  return (
    <>
        <NavbarEvent />
        <Title>
            Evento <img src={ticket} style={{ width: 80, height:80, margin: 0 }} alt="" />
        </Title>
        
        <InfoEvent />
        <Footer />
    </>
  )
}

export default ViewEvent