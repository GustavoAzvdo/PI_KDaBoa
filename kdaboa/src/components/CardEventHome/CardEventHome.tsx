import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { CelebrationOutlined, CalendarToday, LocalActivityOutlined, Share } from '@mui/icons-material';
import "./CardEventHome.css"
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import { useState } from 'react'
import { Star, StarBorder } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import EventoProps from './props/EventoProps';
import ShareEvento from '../Share/ShareEvento';

interface CardEventHomeProps {
    card: EventoProps;
}

export default function RecipeReviewCard({ card }: CardEventHomeProps) {
    const [favorito, setFavorito] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [whatsMessage, setWhatsMessage] = useState('');
    const navigate = useNavigate();

    const dataFormatada = new Date(card.data_inicio).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const nomeImagemDoAvatar = card.Estabelecimento.imagem;

    const buildShareMessage = () => {
        const enderecoObj = card.Endereco || {};
        const enderecoParts = [
            enderecoObj.logradouro,
            enderecoObj.numero,
            enderecoObj.bairro,
        ].filter(Boolean).join(', ');
        const cidadeEstado = [enderecoObj.cidade, enderecoObj.estado].filter(Boolean).join('/');
        const enderecoCompleto = [enderecoParts, cidadeEstado].filter(Boolean).join(' - ');

        return (
            `🎉 ${card.nome_evento}\n\n` +
            `📅 Data: ${dataFormatada}\n` +
            (card.data_inicio ? `⏰ Hora: ${new Date(card.data_inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n` : '') +
            `📍 Local: ${enderecoCompleto || 'Não informado'}\n` +
            `🏢 Estabelecimento: ${card.Estabelecimento?.nome || 'Não informado'}\n\n` +
            `📝 ${card.descricao || ''}\n\n` +
            `🔗 ${window.location.origin}/view-event/${card.id_evento}`
        );
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const message = buildShareMessage();
        setWhatsMessage(message);
        setShareOpen(true);
    };


    return (
        <>
            <Card
                onClick={() => navigate(`/view-event/${card.id_evento}`)}
                sx={{
                    borderRadius: 4,
                    cursor: "pointer",
                    width: { xs: '89%', sm: '80%', md: '100%' }, // ex: responsivo, maior no desktop
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
                    <Box
                        sx={{

                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            p: 1,
                            width: '100%',
                            position: "absolute",
                            bottom: 0,

                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        {card.Evento_Categoria?.slice(0, 3).map((item, index) => (
                            <Chip
                                key={index}
                                label={item.Categoria.nome_categoria}
                                size="small"
                                sx={{
                                    fontFamily: 'var(--notosans)',
                                    bgcolor: '#6c15d5',
                                    color: 'white',
                                    fontWeight: 500,
                                }}
                            />
                        ))}

                        {card.Evento_Categoria?.length > 3 && (
                            <Tooltip
                                title={card.Evento_Categoria.map((c) => c.Categoria.nome_categoria).join(", ")}
                            >
                                <Chip
                                    label="..."
                                    size="small"
                                    sx={{
                                        fontFamily: 'var(--notosans)',
                                        backgroundColor: "rgba(255,255,255,0.7)",
                                        color: 'black',
                                        fontWeight: 500,
                                        cursor: "pointer"
                                    }}
                                />
                            </Tooltip>
                        )}

                    </Box>
                </Box>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={nomeImagemDoAvatar || undefined}>
                            {card.Estabelecimento?.nome?.charAt(0)}
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
                <CardActions sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", mb: 1 }} disableSpacing>

                    <IconButton onClick={(e) => { e.stopPropagation(); handleShareClick(e); }}>
                        <Share sx={{ color: '#6c15d5' }} />
                    </IconButton>

                    <Button className='btn-cardHomeEvent' sx={{ px: 2 }} endIcon={<CelebrationOutlined sx={{ color: "#6C15D5" }} />}
                        onClick={(e: any) => {
                            e.stopPropagation(); // Evita que o clique do card seja disparado junto
                            navigate(`/view-event/${card.id_evento}`);

                        }}>

                        <Typography className='txt-cardHomeEvent' >
                            Ver evento
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
            {/* Modal de compartilhamento */}
            <ShareEvento
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                eventUrl={`${window.location.origin}/view-event/${card.id_evento}`}
                eventTitle={card.nome_evento}
                whatsMessage={whatsMessage}
            />
        </>
    );
}
