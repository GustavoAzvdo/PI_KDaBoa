import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarEvent from "../../components/NavbarEvent/NavbarEvent";
import Title from "../../components/Title/Title";
import ticket from "../../assets/ticket.png";
import InfoEvent from "../../components/InfoEvent/InfoEvent";
import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import api from '../../api/api'
const ViewEvent = () => {
  const { id } = useLocation().state;
  const [, setEvento] = useState<any>(null);

  useEffect(() => {
    document.title = "Evento";
    window.scrollTo(0, 0);

    // Fetch do evento pelo ID
    const pegaEvento = async () => {
     try {
      const response = await api.get(`/event/${id}`)
      setEvento(response)
      console.log(response.data)
     } catch (error) {
        console.log('nao deu certo')
     }


    }

    pegaEvento();
  }, [id]);

  console.log('id q to passando: ' + id)
  return (
    <>
      {/* Passa o evento pro Navbar */}
     <NavbarEvent id={id} />

      <Title>
        Evento{" "}
        <Box
          component="img"
          src={ticket}
          sx={{
            width: { xs: 60, sm: 60, md: 80 },
            height: "auto",
          }}
        />
      </Title>

      {/* InfoEvent pode continuar recebendo só o ID */}
      <InfoEvent id={id} />

      <Footer />
    </>
  );
};

export default ViewEvent;
