import { Box, IconButton, Typography, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { CalendarToday, LocalActivityOutlined } from '@mui/icons-material';

// Swiper styles
import 'swiper'

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// 1. USE THE SAME RICH INTERFACE FROM YOUR CARDS
interface EventoProps {
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


const CarroselHome = ({ eventos }: { eventos: EventoProps[] }) => {
    return (
        <Box position="relative" width="100%" sx={{ pt: 2 }}>
            <Swiper
                loopAdditionalSlides={5}
                loopAddBlankSlides={false}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={eventos.length > 5} 
                spaceBetween={-300} 
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 1000,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                modules={[Autoplay, EffectCoverflow, Navigation]}
                style={{ padding: "40px 0" }}

                breakpoints={{
                   
                    0: { // 0px e acima
                        slidesPerView: 1.5, 
                        spaceBetween: -70,  
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 0,
                            depth: 500, 
                            modifier: 1,
                            slideShadows: false, // Sem sombra para ser mais leve
                        }
                    },
                    // Quando a tela tiver 600px ou mais (tablet)
                    600: {
                        slidesPerView: 2.5, 
                        spaceBetween: 50,   
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 0,
                            depth: 500, 
                            modifier: 1,
                            slideShadows: true,
                        }
                    },
                    // Quando a tela tiver 960px ou mais (desktop)
                    960: {
                        slidesPerView: 'auto', 
                        spaceBetween: -100,    
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 0,
                            depth: 600, 
                            modifier: 1,
                            slideShadows: true,
                        }
                    },
                }}
            >
            
                {eventos?.map((evento) => (
                    
                    <SwiperSlide key={evento.id_evento} style={{ width: '50%', maxWidth: '700px' }}>
                        <Link  to={`/view-event/${evento.id_evento}`} style={{ textDecoration: 'none' }}>
                            <Box sx={{ fontFamily: 'var(--notosans)', position: 'relative', borderRadius: 2, overflow: 'hidden', height: '420px' }}>

                                {/* IMAGE */}
                                <Box
                                    component="img"
                                    src={evento.foto}
                                    alt={evento.nome_evento}
                                    sx={{
                                        width: {xs: '100%', md: '630px', sm: '100%'},
                                        height: "100%",
                                        objectFit: {xs: 'cover', md: 'fill', sm: 'cover'},
                                       
                                    }}
                                />

                                
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        color: 'white',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                                        padding: 2,
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        height: '50%', 
                                    }}
                                >
                                    {/* nome do evento */}
                                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ fontFamily: 'var(--notosans)' , textShadow: '1px 1px 2px rgba(0, 0, 0, 1)' }}>
                                        {evento.nome_evento}
                                    </Typography>

                                    {/* data */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                                        <CalendarToday fontSize='small' />
                                        <Typography variant="body2" sx={{ fontFamily: 'var(--notosans)' ,  textShadow: '1px 1px 2px rgba(0, 0, 0, 1)'}}>
                                            {new Date(evento.data_inicio).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                        </Typography>
                                        <LocalActivityOutlined fontSize='small' sx={{ ml: 2 }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'var(--notosans)',  textShadow: '1px 1px 2px rgba(0, 0, 0, 1)' }}>
                                            {evento.Endereco.cidade} - {evento.Endereco.estado}
                                        </Typography>
                                    </Box>

                                    {/* categorias */}
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                                        {evento.Evento_Categoria?.slice(0, 3).map((item, index) => (
                                            <Chip
                                                key={index}
                                                label={item.Categoria.nome_categoria}
                                                size="small"
                                                sx={{
                                                    bgcolor: '#6c15d5',
                                                    color: 'white',
                                                    fontWeight: 500,
                                                    fontFamily: 'var(--notosans)'
                                                }}
                                            />
                                        ))}
                                    </Box>

                                </Box>
                            </Box>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

           
            <IconButton
                className="swiper-button-prev-custom"
                sx={{ position: "absolute", top: "50%", left: 10, zIndex: 10, color: 'white', bgcolor: '#E2CFFC70', '&:hover': { bgcolor: '#e2cffcff' } }}
            >
                <ChevronLeftIcon fontSize="large" sx={{ color: '#6c15d5' }} />
            </IconButton>
            <IconButton
                className="swiper-button-next-custom"
                sx={{ position: "absolute", top: "50%", right: 10, zIndex: 10, color: 'white', bgcolor: '#E2CFFC70', '&:hover': { bgcolor: '#E2CFFCff' } }}
            >
                <ChevronRightIcon fontSize="large" sx={{ color: '#6c15d5' }} />
            </IconButton>
        </Box>
    );
};

export default CarroselHome;