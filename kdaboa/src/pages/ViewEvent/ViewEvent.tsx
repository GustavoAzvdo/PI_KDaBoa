import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom";
import NavbarEvent from "../../components/NavbarEvent/NavbarEvent";
import InfoEvent from "../../components/InfoEvent/InfoEvent";
import Footer from "../../components/Footer/Footer";
import api from '../../api/api';
import ScreenErrorX from "../../components/ScreenError/ScreenErrorX";

const ViewEvent = () => {
  const { eventId } = useParams();
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Evento";
    window.scrollTo(0, 0);

    if (!eventId) return;

    const pegaEvento = async () => {
      try {
        const response = await api.get(`/event/${eventId}`);
        setEvento(response.data);
      } catch (error) {
        console.log('nao deu certo', error);
      } finally {
        setLoading(false);
      }
    };

    pegaEvento();
  }, [eventId]);

  if (!evento && !loading) {
    return (
      <ScreenErrorX variant="event"/>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Box sx={{ width: '100%', maxWidth: 1300, mb: 2 }}>
          <Box sx={{ mb: 1 }}>
            <Box component="span" sx={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--notosans)' }}>Carregando evento</Box>
            <Box component="div" sx={{ color: 'text.secondary', fontFamily: 'var(--notosans)' }}>Por favor, aguarde...</Box>
          </Box>
          <LinearProgress sx={{ height: 6, borderRadius: 3, mb: 3 }} />
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: '20px',
              mb: 3,
              width: '100%',
              height: { xs: 300, sm: 300, md: 400 },
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={30} sx={{ width: '60%', mb: 2 }} />
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1, mb: 2 }} />
              <Skeleton variant="text" height={20} sx={{ width: '40%' }} />
            </Box>

            <Box sx={{ width: '100%', maxWidth: 380, display: 'flex', justifyContent: 'center' }}>
              <Skeleton variant="rectangular" sx={{ width: '100%', height: 330, borderRadius: 4 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* MUDANÇA 7: Passa o objeto completo, é mais eficiente */}
      <NavbarEvent evento={evento} />
      <InfoEvent evento={evento} />
      <Footer />
    </>
  );
};

export default ViewEvent;