import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import user from "../../assets/user.png"
import InfoProfile from "../../components/InfoProfile/InfoProfile"
import { Box, Container } from "@mui/material"
import Footer from "../../components/Footer/Footer"

import ViewCards from "../../components/ViewCards/ViewCards"
import ticket from "../../assets/ticket.png"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Profile = () => {
  const location = useLocation();
  const card = location.state?.card;


  useEffect (() => {
    document.title = "Perfil"
  })
  return (
    <Box>
      <NavbarEvent />
      <Title>
        Perfil <img src={user} style={{ width: 80, height: 80, margin: 0 }} alt="" />
      </Title>
      <InfoProfile />
      <Title>
        Eventos <img src={ticket} style={{ width: 80, height: 80, margin: 0 }} alt="" />
      </Title>
      <Container sx={{display:' flex', alignItems: 'center', justifyContent: 'center'}}>

      <Box sx={{margin: 'auto', width: '85vw'}}>
         <ViewCards idEstabelecimento={card.Estabelecimento.id_estabelecimento} />

      </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export default Profile