import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import ticket from "../../assets/ticket.png"
import InfoEvent from "../../components/InfoEvent/InfoEvent"
import Footer from "../../components/Footer/Footer"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Box } from "@mui/material"


const ViewEvent = () => {
  const { id } = useLocation().state;

  useEffect(() => {
    document.title = "Evento"
    window.scrollTo(0, 0);
  }, [id])

  return (
    <>
      <NavbarEvent />
      <Title>
        Evento <Box component='img' src={ticket} sx={{
          width: { xs: 60, sm: 60, md: 80 }, // muda conforme a tela
          height: "auto", // mantém a proporção
        }} />
      </Title>

      <InfoEvent id={id} />
      <Footer />
    </>
  )
}

export default ViewEvent