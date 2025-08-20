import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { CelebrationOutlined } from '@mui/icons-material';
import "./CardEventHome.css"
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';


import EventoProps from './props/EventoProps';

interface CardEventHomeProps {
    card: EventoProps;
}

export default function RecipeReviewCard({ card }: CardEventHomeProps) {
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
                width: { xs: '90%', sm: '80%', md: 400 }, // ex: responsivo, maior no desktop
                maxWidth: 500, // limite máximo do card (ajuste como quiser)
                margin: '0 auto', // centralizar horizontalmente
                transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
                boxShadow: 4,
                '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-8px)',
                },
            }}
            className='cardHomeEvent'
            title={card.nome_evento}
        >
            <Box sx={{width: '400px', height: '200px'}}>
                <CardMedia

                    component="img"
                    image={card.foto}
                    alt="Paella dish"
                    sx={{width: '100%', height: '100%'}}
                />
            </Box>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                    </Avatar>
                }

                title={card.nome_evento ? (card.nome_evento.length > 20 ? card.nome_evento.substring(0, 20) + "..." : card.nome_evento) : "Sem título"}

                subheader={dataFormatada}
                className='header-cardHomeEvent' />
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
