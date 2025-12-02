import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";

import "./Produtor.css";
import Title from "../../components/Title/Title";
import interrogacao from  '../../assets/interrogacao.png';
import logohero from  '../../assets/logohero.png';
import logohero1 from  '../../assets/logohero1.png';
import logohero2 from  '../../assets/logohero2.png';
import nuvem from  '../../assets/nuvem.png';
import ideaImg from  '../../assets/ideia.png';
import produtorBanner from '../../assets/produtor-banner.gif';
import BrazilMap from "../../components/BrazilMap/BrazilMap"

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
    title: "Divulgue conosco agora!",
    subtitle: "Divulgue eventos e atraia público qualificado para suas noites.",
    img: logohero,
    ctaPrimary: "Quero divulgar meu evento",
  },
  {
    id: 2,
    title: "Filtre seu evento!",
    subtitle: "Segmentação por categoria e visibilidade local para resultados reais.",
    img: logohero1,
    ctaPrimary: "Começar agora",
  },
  {
    id: 3,
    title: "Gestão simples e fácil!",
    subtitle: "Publique eventos, acompanhe performance e otimize promoções.",
    img: logohero2,
    ctaPrimary: "Minha dashboard",
  },
];

const Produtor: React.FC = () => {
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
                Seja visto por pessoas perto de você, no momento certo.
              </Typography>
            </Box>

            <Box className="beneficio-card">
              <Typography className="beneficio-title">Segmentação por categoria</Typography>
              <Typography className="beneficio-text">
                Mostre seus eventos para quem realmente se interessa.
              </Typography>
            </Box>

            <Box className="beneficio-card">
              <Typography className="beneficio-title">Gestão simplificada</Typography>
              <Typography className="beneficio-text">
                Publique, edite e acompanhe seu desempenho facilmente.
              </Typography>
            </Box>

            <Box className="beneficio-card">
              <Typography className="beneficio-title">Estatísticas rápidas</Typography>
              <Typography className="beneficio-text">
                Veja visualizações e interações em tempo real.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

  <BrazilMap />

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

      {/* CTA */}
      <Box className="produtor-cta">
        <Container>
          <Title>Cadastre agora seu estabelecimento!</Title>

          <Button variant="contained" className="cta-btn cta-btn-large">
            Começar agora
          </Button>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Produtor;
