import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import ticket from "../../assets/ticket.png"
import BannerEvent from "../../components/BannerEvent/BannerEvent"
import InfoEvent from "../../components/InfoEvent/InfoEvent"
import Footer from "../../components/Footer/Footer"


const ViewEvent = () => {
  return (
    <>
        <NavbarEvent />
        <Title>
            Evento <img src={ticket} style={{ width: 80, height:80, margin: 0 }} alt="" />
        </Title>
        <BannerEvent />
        <InfoEvent />
        <Footer />
    </>
  )
}

export default ViewEvent