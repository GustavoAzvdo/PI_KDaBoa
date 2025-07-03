import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import ticket from "../../assets/ticket.png"
import InfoEvent from "../../components/InfoEvent/InfoEvent"
import Footer from "../../components/Footer/Footer"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"


const ViewEvent = () => {
  const { id } = useLocation().state;

  useEffect (() => {
    document.title = "Evento"
  })
  
  return (
    <>
        <NavbarEvent />
        <Title>
            Evento <img src={ticket} style={{ width: 80, height:80, margin: 0 }} alt="" />
        </Title>
        
        <InfoEvent id={id} />
        <Footer />
    </>
  )
}

export default ViewEvent