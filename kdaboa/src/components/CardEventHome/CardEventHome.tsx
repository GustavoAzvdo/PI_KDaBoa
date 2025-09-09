import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { CelebrationOutlined, CalendarToday, LocalActivityOutlined } from '@mui/icons-material';
import "./CardEventHome.css"
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react'
import { Star, StarBorder } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import EventoProps from './props/EventoProps';

interface CardEventHomeProps {
    card: EventoProps;
}

export default function RecipeReviewCard({ card }: CardEventHomeProps) {
    const [favorito, setFavorito] = useState(false);
    const navigate = useNavigate();

    const dataFormatada = new Date(card.data_inicio).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

  
    return (

        <Card
            onClick={() => navigate('/view-event', { state: { id: card.id_evento } })}
            sx={{
                borderRadius: 4,
                cursor: "pointer",
                width: { xs: '90%', sm: '80%', md: '100%' }, // ex: responsivo, maior no desktop
                maxWidth: 500, // limite máximo do card (ajuste como quiser)
                margin: '0 auto', // centralizar horizontalmente
                transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
                boxShadow: 4,
                '&:hover': {
                     boxShadow: "0px 8px 20px #b789ef61",
                    transform: 'translateY(-8px)',
                },
            }}
            className='cardHomeEvent'
            title={card.nome_evento}
        >
            <Box sx={{ position: "relative", width: "100%", height: 200 }}>
                <CardMedia
                    component="img"
                    image={card.foto}
                    alt={card.nome_evento}
                    sx={{ width: "100%", height: "100%", borderRadius: "16px 16px 0 0" }}
                />

                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        setFavorito(!favorito);
                    }}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#6C15D5",
                            "& .MuiSvgIcon-root": { color: "white" },
                        },
                    }}
                >
                    {favorito ? (
                        <Star sx={{ color: "#6C15D5" }} />
                    ) : (
                        <StarBorder sx={{ color: "#6C15D5" }} />
                    )}
                </IconButton>
            </Box>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                    </Avatar>
                }

                title={card.nome_evento ? (card.nome_evento.length > 20 ? card.nome_evento.substring(0, 20) + "..." : card.nome_evento) : "Sem título"}

                subheader={
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2, pt: 1 }}>
                            <CalendarToday fontSize='small' />
                            {dataFormatada}
                        </Box>
                     
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2, pt: 1 }}>
                            <LocalActivityOutlined fontSize='small' />
                            {card.Endereco.cidade} - {card.Endereco.estado}
                        </Box>
                    </Box>
                }
                className='header-cardHomeEvent'
            />
            <CardActions sx={{ alignItems: "flex-end", display: "flex", justifyContent: "flex-end" }} disableSpacing>

                <Button className='btn-cardHomeEvent' endIcon={<CelebrationOutlined sx={{ color: "#6C15D5" }} />} onClick={() => {

                    navigate('/view-event', { state: { id: card.id_evento } });

                }}>

                    <Typography className='txt-cardHomeEvent' >
                        Ver evento
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
}
