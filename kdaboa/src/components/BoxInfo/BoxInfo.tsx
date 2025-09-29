import { Box, Grid, Typography, Button, Container, Card } from "@mui/material"
import festa from "../../assets/festa.png"
import aparecida from "../../assets/aparecida.png"
import cristo from "../../assets/cristo.png"
import praia from "../../assets/praia.png"
import bahia from "../../assets/bahia.png"
import jantar from "../../assets/jantar.png"
import show from "../../assets/show.png"
import restaurante from "../../assets/restaurante.png"
import happy from "../../assets/happy.png"
import './BoxInfo.css'
import { LocalActivityOutlined, LocationOnOutlined, PersonAddAlt1Outlined, SearchOutlined, StarOutlined } from "@mui/icons-material"
import Title from "../Title/Title"
import eventosproximos from '../../assets/eventos-proximos.png'
import check from '../../assets/check.png'
import { Link as RouterLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../api/api'
import { useNavigate } from "react-router-dom";


const imagens = [festa, praia, aparecida, cristo, show, bahia, jantar, restaurante, happy];
const BoxInfo = () => {
  const navigate = useNavigate()
  const [eventos, setEventos] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cidadeUsuario, setCidadeUsuario] = useState<string | null>(null);
  const [estadoUsuario, setEstadoUsuario] = useState<string | null>(null);
  const [stats, setStats] = useState({
    eventos: 0,
    estabelecimentos: 0,
    cidades: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const cidade =
            data.address?.city || data.address?.town || data.address?.village;
          const estado = data.address?.state;

          if (cidade && estado) {
            console.log(cidade);
            setCidadeUsuario(cidade);
            setEstadoUsuario(estado);
          }
        } catch (err) {
          console.error("Erro ao buscar cidade:", err);
        }
      },
      (error) => {
        console.error("Erro ao pegar localização:", error);
      }
    );
  }, []);

  const calculaStats = (eventosData: any[]) => {
    const totalEventos = eventosData.length;
    const cidadesUnicas = new Set(eventosData.map((e: any) => e.Endereco.cidade)).size;
    const estabUnicos = new Set(eventosData.map((e: any) => e.id_estabelecimento)).size;

    setStats({
      eventos: totalEventos,
      estabelecimentos: estabUnicos,
      cidades: cidadesUnicas,
    })
  }

  const fetchEventos = async () => {
    try {
      const res: any = await api.get("/event");
      const eventosData = res.data;
      setEventos(eventosData);
      calculaStats(eventosData);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    }
  };


  useEffect(() => {
    fetchEventos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imagens.length);
    }, 4000); // troca a cada 3 segundos
    return () => clearInterval(interval);
  }, []);
  const top2Eventos =
    cidadeUsuario && estadoUsuario
      ? eventos
        .filter(
          (event) =>
            event.Endereco?.cidade === cidadeUsuario ||
            event.Endereco?.estado === estadoUsuario
        )
        .slice(0, 2)
      : eventos.slice(0, 2);
  return (
    <Grid container spacing={2} className="box-info-container" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Container>
          <Box sx={{
            textAlign: { xs: 'center', sm: 'center', md: 'center' },
            px: { xs: 2 }
          }}>
            <Title >
              Eventos próximos de você <Box component='img' src={eventosproximos} sx={{
                width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
                height: "auto", // mantém a proporção
              }} />
            </Title>
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", fontFamily: 'var(--notosans)' }}>
                Baseado na sua localização, encontramos estes eventos incríveis acontecendo perto de você
              </Typography>
            </Box>
          </Box>

        </Container>
      </Grid>
      <Container sx={{ pb: 10 }}>
        <Grid container spacing={3}>
          {top2Eventos.map((event) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={event.id_evento} sx={{ pt: 4 }}>
              <Card onClick={() => navigate("/view-event", { state: { id: event.id_evento } })} sx={{ fontFamily: 'var(--notosans)', p: 3, cursor: "pointer", "&:hover": { boxShadow: "0px 8px 20px #ff84384e" } }}>
                <Box display="flex" gap={2} >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: "linear-gradient(35deg, #ff7038ff, #FF8e38)",
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontFamily: 'var(--notosans)' }}>
                      {new Date(event.data_inicio).toLocaleString("pt-BR", {
                        month: "short",
                      }).toUpperCase()}
                    </Typography>
                    <Typography variant="h5" sx={{ fontFamily: 'var(--notosans)' }}>
                      {new Date(event.data_inicio).getDate()}
                    </Typography>
                  </Box>

                  <Box flex={1}>
                    <Typography variant="h6" sx={{ mb: 1, fontFamily: 'var(--notosans)' }}>
                      {event.nome_evento}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{
                        mb: 2,
                        fontFamily: 'var(--notosans)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {event.descricao}
                    </Typography>

                    <Box display="flex" gap={1} alignItems={"center"}>
                      <LocationOnOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                        {event.Endereco.cidade}, {event.Endereco.estado}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} className="box-info">
        <Container>

          <Box className="texts">
            <Typography className="p1">
              Ei, produtor! O KdAboa é a plataforma perfeita para divulgar seus eventos e atrair seu público.
            </Typography>
            <Typography className="p2">
              Junte-se aos produtores que já estão transformando suas vendas com o KdAboa!
            </Typography>
          </Box>
        </Container>
        <Box className="btns" sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'flex-start',
          },
          alignItems: 'center',
        }}>
        </Box>
        <Grid
          container
          spacing={4}
          textAlign="center"
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}
        >
          {[
            { number: stats.eventos, label: "Eventos cadastrados", color: "#6C15D5" },
            { number: stats.estabelecimentos, label: "Estabelecimentos parceiros", color: "#FF8e38" },
            { number: stats.cidades, label: "Cidades atendidas", color: "#6C15D5" },
          ].map((stat, index) => (
            <Grid size={{ xs: 4, sm: 4, md: 3 }} key={index}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "var(--notosans)",
                  fontWeight: "bold",
                  color: stat.color,
                  mb: 1,
                }}
              >
                {stat.number}+
              </Typography>
              <Typography color="text.secondary">{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>

      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


        <Container sx={{ width: '100vw', height: '50vh', display: 'flex' }} >
          <Box sx={{ position: "relative", width: "100%", height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {imagens.map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img}
                alt={`Imagem ${i}`}
                sx={{
                  pl: { xs: 0, sm: 0, md: 2 },
                  pt: { xs: 6, sm: 6, md: 0 },
                  width: { xs: "100%", md: "100%" },
                  height: "100%",

                  display: 'block',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: i === activeIndex ? 1 : 0,
                  transition: "opacity 1s ease", // fade suave
                }}
              />
            ))}
          </Box>

        </Container>

      </Grid>
      <Box sx={{ pt: 4, pb: 8, backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{
            textAlign: { xs: 'center' },
            px: { xs: 1 }
          }}>
            <Title>
              Por que escolher o KDABOA?  <Box component='img' src={check} sx={{
                width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
                height: "auto", // mantém a proporção
              }} />
            </Title>

          </Box>
          <Grid container spacing={4}>
            {[
              {
                icon: <SearchOutlined sx={{ fontSize: 32 }} />,
                title: "Busca Inteligente",
                description: "Encontre eventos por nome, categoria, data ou localização.",
              },
              {
                icon: <StarOutlined sx={{ fontSize: 32 }} />,
                title: "Eventos Verificados",
                description: "Todos os eventos passam por verificação para garantir qualidade e confiabilidade.",
              },
              {
                icon: <LocalActivityOutlined sx={{ fontSize: 32 }} />,
                title: "Recomendações Personalizadas",
                description: "Receba sugestões de eventos baseadas nos seus interesses e localização",
              },
            ].map((feature, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 4 }} key={index} sx={{ py: 5 }}>
                <Box textAlign="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      background: "#6C15D5",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      mx: "auto",
                      mb: 2,
                      transition: "all 0.3s ease",
                      '&:hover': {
                        transform: "scale(1.1) rotate(10deg)", // aumenta e gira levemente
                        background: "#4a0da5",                // roxo mais escuro
                        boxShadow: "0 8px 20px rgba(108,21,213,0.5)", // glow roxo
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography variant="h6" sx={{ fontFamily: "var(--fredoka)", fontWeight: 500, mb: 2, fontSize: '22px' }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" fontFamily={'var(--notosans)'} sx={{ fontSize: '20px' }}>{feature.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button endIcon={<PersonAddAlt1Outlined />} component={RouterLink} variant='outlined' color='inherit' size='large' to="/signin" className="btn-cadastrar">
            <Typography className="btn-text">
              Quero me cadastrar!
            </Typography>
          </Button>

        </Box>
      </Box>
    </Grid>
  )
}

export default BoxInfo