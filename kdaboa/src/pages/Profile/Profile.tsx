import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import user from "../../assets/user.png"
import InfoProfile from "../../components/InfoProfile/InfoProfile"
import { Box, Container } from "@mui/material"
import Footer from "../../components/Footer/Footer"
import CardEventHome from '../../components/CardEventHome/CardEventHome'
import CardsBD from '../../components/CardEventHome/CardsBD'
import ViewCards from "../../components/ViewCards/ViewCards"
import ticket from "../../assets/ticket.png"

const Profile = () => {
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
      <Box sx={{margin: 'auto', width: '85vw'}}>
         <ViewCards />

      </Box>

      <Footer />
    </Box>
  )
}

export default Profile