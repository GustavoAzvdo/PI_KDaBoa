import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, LinearProgress, Skeleton, Grid } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import InfoProfile from "../../components/InfoProfile/InfoProfile";
import ViewCards from "../../components/ViewCards/ViewCards";
import Footer from "../../components/Footer/Footer";
import Title from "../../components/Title/Title";
import user from "../../assets/user.png";
import ticket from "../../assets/ticket.png";
import api from "../../api/api";
import EventoProps from '../../components/CardEventHome/props/EventoProps'; 

type EstablishmentResponse = EventoProps['Estabelecimento'] & {
  Endereco: EventoProps['Endereco'];
};


type ProfilePageData = {
  estabelecimento: EventoProps['Estabelecimento'];
  endereco: EventoProps['Endereco'];
}
const Profile = () => {

  const { establishmentId, eventId } = useParams();

  const [profileData, setProfileData] = useState<ProfilePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Perfil";
    window.scrollTo(0, 0);

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        let estabData: EventoProps['Estabelecimento'];
        let enderData: EventoProps['Endereco'];

        if (establishmentId) {
    
          const response = await api.get<EstablishmentResponse>(`/estableshiment/${establishmentId}`);
          estabData = response.data;
          enderData = response.data.Endereco; 

        } else if (eventId) {
         
          const eventResponse = await api.get<EventoProps>(`/event/${eventId}`);
          estabData = eventResponse.data.Estabelecimento;
          enderData = eventResponse.data.Endereco;
        } else {
          throw new Error("Nenhum ID válido encontrado na URL.");
        }
        
        setProfileData({ estabelecimento: estabData, endereco: enderData });

      } catch (err) {
        setError("Não foi possível carregar o perfil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [establishmentId, eventId]); 

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Title>
          Perfil <Box component='img' src={user} sx={{ width: { xs: 60, md: 80 }, height: "auto" }} />
        </Title>
        <Container>
          <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mt: 2 }}>
            <Box sx={{ mb: 1 }}>
              <Box component="span" sx={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--notosans)' }}>Carregando perfil</Box>
              <Box component="div" sx={{ color: 'text.secondary', fontFamily: 'var(--notosans)' }}>Por favor, aguarde...</Box>
            </Box>
            <LinearProgress sx={{ height: 6, borderRadius: 3, mb: 3 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', py: 3 }}>
                  <Skeleton variant="circular" width={80} height={80} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} sx={{ width: '60%' }} />
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}><Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} /></Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (error || !profileData) {
    return <div>{error || "Perfil não encontrado."}</div>;
  }

  return (
    <Box>
      <Navbar />
      <Title>
        Perfil <Box component='img' src={user} sx={{ width: { xs: 60, md: 80 }, height: "auto" }} />
      </Title>
      <InfoProfile profileData={profileData} />
      <Title>
        Eventos <Box component='img' src={ticket} sx={{ width: { xs: 60, md: 80 }, height: "auto" }} />
      </Title>
      <Container>
        <Box>
          <ViewCards idEstabelecimento={profileData.estabelecimento.id_estabelecimento} />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Profile;