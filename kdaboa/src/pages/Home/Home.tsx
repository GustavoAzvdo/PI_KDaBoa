import Navbar from '../../components/Navbar/Navbar'
import Search from '../../components/Search/Search'
import Carrousel from '../../components/CarroselEventHome/CarroselEventHome'
import BoxInfo from '../../components/BoxInfo/BoxInfo'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
import hangloose from '../../assets/hangloose.png'
import search from '../../assets/search.png'
import { Box, Container } from '@mui/material'
import { useState, useEffect } from 'react'
import { Drawer, Typography, Button } from '@mui/material'
import cookies from '../../assets/cookies.png'
import './Home.css'
import { useSearch } from '../../context/SearchContext'
import Carrosel from '../../components/Carrosel/Carrosel'
import CarroselHome from '../../components/CarroselHome/CarroselHome'
import api from '../../api/api'

interface Evento {
  id_evento: number;
  nome_evento: string;
  foto: string;
  data_inicio: string;
  Endereco: {
    cidade: string;
    estado: string;
  };
  Evento_Categoria: {
    Categoria: {
      nome_categoria: string;
    };
  }[];
}
const Home = () => {
  const { setSearchText, setCategories, setDate, setCity } = useSearch();
  const [open, setOpen] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  useEffect(() => {
    // Aqui você pode verificar localStorage se quiser persistência
    setOpen(true);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setOpen(false);
  };

  const handleReject = () => {
    setAccepted(false);
    setOpen(false);
  };

  useEffect(() => {
    if (accepted) {
      localStorage.setItem('cookiesAccepted', 'true');

    }
  }, [accepted]);

  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      setOpen(false);
    }
  })

  useEffect(() => {
    document.title = "Home"
    window.scrollTo(0, 0);

  })

  useEffect(() => {
    const loadEventos = async () => {
      try {
        const response = await api.get<Evento[]>("/event");

        // ADICIONE ESTA LINHA PARA DEBUGAR
        console.log("Eventos recebidos da API:", response.data);

        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    loadEventos();
  }, []);
  return (
    <>

      <Drawer anchor="bottom" open={open} >


        <Box p={2} display="flex" justifyContent="space-between" alignItems="center" sx={{ paddingY: 5, backgroundColor: '#f5f5f5' }}>
          <Box className="cookies" sx={{ gap: 2, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h3">Cookies? </Typography>
              <img src={cookies} alt="cokie" style={{ marginLeft: "10px" }} />
            </Box>
            <Typography>Utilizamos cookies pra melhorar sua experiência. Tudo bem pra você?</Typography>
          </Box>
          <Box display="flex" gap={4} sx={{ px: 5 }}>
            <Button size='large' className='cookies-acept' variant="contained" onClick={handleAccept}><Typography>Aceitar</Typography></Button>
            <Button size='large' className='cookies-reject' variant="outlined" onClick={handleReject}><Typography>Rejeitar</Typography></Button>
          </Box>
        </Box>

      </Drawer>

      <Navbar />

      <Carrosel />
      <Box sx={{
        textAlign: { xs: 'center' },
        px: { xs: 2 }
      }}>
        <Title>
          Qual a boa de hoje?
          <Box component='img' src={hangloose} sx={{
            width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
            height: "auto", // mantém a proporção
          }} />
        </Title>

      </Box>

      {/* search */}
      <Container>

        <Search
          showScreen={true}
          onTextChange={setSearchText}
          onCategoryChange={setCategories}
          onDateChange={setDate}
          onCityChange={setCity}
        />
      </Container>
      <CarroselHome eventos={eventos} />

      <Box sx={{
        textAlign: { xs: 'center' },
        px: { xs: 2 }
      }}>
        <Title>
          Alguns eventos  <Box component='img' src={search} sx={{
            width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
            height: "auto", // mantém a proporção
          }} />
        </Title>

      </Box>

      <Carrousel />
      <Container>
        <BoxInfo />

      </Container>
      <Footer />
    </>
  )
}

export default Home