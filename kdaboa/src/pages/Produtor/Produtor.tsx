import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";

import "./Produtor.css";
import Title from "../../components/Title/Title";
import interrogacao from  '../../assets/interrogacao.png';
import nuvem from  '../../assets/nuvem.png';
import ideia from  '../../assets/ideia.png';

const comments: any[] = [
  ];

const slides = [
  {
    id: 1,
    title: "Divulgue conosco agora!",
    subtitle: "Divulgue eventos e atraia público qualificado para suas noites.",
    img: "../assets/interrogacao.png",
    ctaPrimary: "Quero divulgar meu evento",
  },
  {
    id: 2,
    title: " Filtre seu evento!",
    subtitle: "Segmentação por categoria e visibilidade local para resultados reais.",
    img: "../assets/nuvem.png",
    ctaPrimary: "Começar agora",
  },
  {
    id: 3,
    title: "Gestão simples e fácil!",
    subtitle: "Publique eventos, acompanhe performance e otimize promoções.",
    img: "../assets/ideia.png",
    ctaPrimary: "Minha dashboard",
  },
];

const Produtor: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <Box component="section" className="produtor-hero">
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
                      <Button variant="contained" className="hero-btn-primary">
                        {slide.ctaPrimary}
                      </Button>

                      
                    </Box>
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
           < Title >
        Por que divulgar seus eventos conosco
         <Box component='img' src={interrogacao} sx={{
            width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
            height: "auto", // mantém a proporção
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

      {/* COMO FUNCIONA */}
      <Box className="produtor-como">
        <Container>
          < Title >
            Como funciona
            <Box component='img' src={ideia} sx={{
            width: { xs: 40, sm: 60, md: 70 }, // muda conforme a tela
            height: "auto", // mantém a proporção
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
          < Title >
Cadastre agora seu estabelecimento!  
      
      </Title>

          <Button variant="contained" className="cta-btn">
            Começar agora
          </Button>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Produtor;
