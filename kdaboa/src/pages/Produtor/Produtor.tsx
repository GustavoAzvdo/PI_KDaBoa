import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "./Produtor.css";
import Title from "../../components/Title/Title";
import interrogacao from '../../assets/interrogacao.png';
import logohero from '../../assets/logohero.png';
import logohero1 from '../../assets/logohero1.png';
import logohero2 from '../../assets/logohero2.png';
import nuvem from '../../assets/nuvem.png';
import ideaImg from '../../assets/ideia.png';
import produtorBanner from '../../assets/produtor-banner.gif';
import BrazilMap from "../../components/BrazilMap/BrazilMap"
import people from '../../assets/people.png';
import shop from '../../assets/shop.png';
import { Link as RouterLink } from 'react-router-dom';
export const ProdutorMapPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <BrazilMap />
    </main>
  )
}

const comments: any[] = [
  // você pode preencher dinamicamente
];

const slides = [
  {
    id: 1,
    title: "Cadastre-se e atraia!",
    subtitle: "KDaBOA conecta seu estabelecimento a milhares de usuários em busca de eventos.",
    img: logohero1,
    ctaPrimary: "Cadastrar meu estabelecimento",
  },
  {
    id: 2,
    title: "Divulgue conosco agora!",
    subtitle: "Receba clientes novos diariamente divulgando seus eventos no KDaBOA.",
    img: logohero,
    ctaPrimary: "Quero divulgar meu evento",
  },
  {
    id: 3,
    title: "Cadastre seu funcionário!",
    subtitle: "Gerencie seus eventos com facilidade cadastrando seus funcionários no KDaBOA.",
    img: logohero2,
    ctaPrimary: "Minha Dashboard",
  },
];



const Produtor: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  })
  const [stats, setStats] = useState<{ eventos: number | null; estabelecimentos: number | null; cidades: number | null }>({
    eventos: 0,
    estabelecimentos: 0,
    cidades: 0,
  });

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
      calculaStats(eventosData);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <>

      <Navbar />

      {/* HERO */}
      <Box component="section" className="produtor-hero" style={{ backgroundImage: `url(${produtorBanner})` }}>
        <Container className="produtor-hero-content">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            className="hero-swiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <Box className="hero-slide">
                  <Box className="hero-left">
                    <Typography variant="h2" className="hero-title">
                      {slide.title}
                    </Typography>

                    <Typography className="hero-desc">
                      {slide.subtitle}
                    </Typography>

                    <Box className="hero-buttons">
                      <Button
                        variant="contained"
                        className="hero-btn-primary"
                        component={RouterLink}
                        to="/login"
                        aria-label={slide.ctaPrimary}
                      >
                        {slide.ctaPrimary}
                      </Button>
                    </Box>
                  </Box>

                  {/* RIGHT IMAGE (adicionado para balancear o hero) */}
                  <Box className="hero-right" role="img" aria-label={`${slide.title} imagem`}>
                    <Box component="img" src={slide.img} alt={slide.title} className="hero-image" />
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      {/* Números kdaboa */}
      <Title>
        A plataforma que cresce todos os dias
        <Box component='img' src={people} sx={{
          width: { xs: 40, sm: 60, md: 70 },
          height: "auto",
          marginLeft: "12px"
        }} />
      </Title>

      <Grid
        container
        spacing={4}
        textAlign="center"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", my: 4, mb: 10 }}
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

      {/* BENEFÍCIOS */}
      <Box className="produtor-beneficios">
        <Container>
          <Title>
            Por que divulgar seus eventos conosco
            <Box component='img' src={interrogacao} sx={{
              width: { xs: 40, sm: 60, md: 70 },
              height: "auto",
              marginLeft: "12px"
            }} />
          </Title>



          <Box className="beneficios-grid">
            <Box className="beneficio-card">
              <Typography className="beneficio-title">Visibilidade local</Typography>
              <Typography className="beneficio-text">
                Aumente o público da sua casa em dias fracos.
              </Typography>
            </Box>

            <Box className="beneficio-card">
              <Typography className="beneficio-title">Foco em localidade</Typography>
              <Typography className="beneficio-text">
                seu evento se destaca para usuários próximos.
              </Typography>
            </Box>

            <Box className="beneficio-card">
              <Typography className="beneficio-title">Processo simplificado</Typography>
              <Typography className="beneficio-text">
                Divulgue seu evento em menos de 30 segundos.
              </Typography>
            </Box>

            <Box className="beneficio-card">
              <Typography className="beneficio-title">Crescimento KDaBOA</Typography>
              <Typography className="beneficio-text">
                Receba novos clientes vindos do KDaBOA todos os dias.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>





      {/* COMO FUNCIONA */}
      <Box className="produtor-como">
        <Container>
          <Title>
            Como funciona
            <Box component='img' src={ideaImg} sx={{
              width: { xs: 40, sm: 60, md: 70 },
              height: "auto",
              marginLeft: "12px"
            }} />
          </Title>

          <Box className="steps">
            <Box className="step-card">
              <Typography className="step-number">1</Typography>
              <Typography className="step-title">Cadastro Fácil</Typography>
              <Typography className="step-text">
                Registre seu estabelecimento em poucos minutos.
              </Typography>
            </Box>

            <Box className="step-card">
              <Typography className="step-number">2</Typography>
              <Typography className="step-title">Publique Eventos</Typography>
              <Typography className="step-text">
                Adicione data, localização, categorias e imagem.
              </Typography>
            </Box>

            <Box className="step-card">
              <Typography className="step-number">3</Typography>
              <Typography className="step-title">Atraia o público</Typography>
              <Typography className="step-text">
                Alcance pessoas realmente interessadas no seu evento.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box className="produtor-testimonials">

        < Title >
          O que dizem nossos Parceiros
          <Box component='img' src={nuvem} sx={{
            width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
            height: "auto", // mantém a proporção
          }} />
        </Title>

        <Box className="testimonials-marquee">
          <Box className="marquee-track">
            <Box className="marquee-item card-comment">“Desde que comecei a divulgar no Kdaboa, as noites ficaram muito mais cheias.” <span className="author">— Dono do Bar XYZ</span></Box>
            <Box className="marquee-item card-comment">“Plataforma simples e com ótimo alcance regional.” <span className="author">— Casa Cultural ABC</span></Box>
            <Box className="marquee-item card-comment">“Excelente para atrair novos clientes toda semana.” <span className="author">— Bistrô do Centro</span></Box>
            <Box className="marquee-item card-comment">“Nunca recebi tantas visitas após divulgar aqui.” <span className="author">— Espaço Lounge 77</span></Box>
            {comments.map((c, index) => (
              <Box key={`c1-${index}`} className="marquee-item card-comment">{c}</Box>
            ))}

            <Box className="marquee-item card-comment">“Desde que comecei a divulgar no Kdaboa, as noites ficaram muito mais cheias.” <span className="author">— Dono do Bar XYZ</span></Box>
            <Box className="marquee-item card-comment">“Plataforma simples e com ótimo alcance regional.” <span className="author">— Casa Cultural ABC</span></Box>
            {comments.map((c, index) => (
              <Box key={`c2-${index}`} className="marquee-item card-comment">{c}</Box>
            ))}
          </Box>
        </Box>
      </Box>

      <BrazilMap />

      <Box
        className="produtor-cta"
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          py: 8,
        }}
      >
        <Title>
          Pronto para atrair mais clientes hoje?
          <Box
            component="img"
            src={shop}
            sx={{
              width: { xs: 40, sm: 60, md: 70 },
              height: "auto",
              marginLeft: "12px",
            }}
          />
        </Title>

        <Button className="cta-btn" component={RouterLink} to="/login" variant="contained" size="large">
          Quero começar agora
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default Produtor;
