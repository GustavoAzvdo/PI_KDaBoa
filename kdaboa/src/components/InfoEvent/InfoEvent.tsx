import { Avatar, Box, Button, Card, CardContent, Grid, Typography, List, ListItem } from "@mui/material"
import "./InfoEvent.css"
import calendar from "../../assets/calendar.png"
import Contacts from "../Details/Contacts"
import Address from "../Details/Address"
import { useNavigate } from "react-router-dom"
import BannerEvent from "../BannerEvent/BannerEvent"
import { Person } from "@mui/icons-material"
import api from "../../api/api"
import { useState } from "react";
import EventoProps from "../CardEventHome/props/EventoProps";
import { useEffect } from "react";

import erro from '../../assets/404.png'
const InfoEvent = ({ id }: { id: number }) => {
    const navigate = useNavigate();


    const [card, setCard] = useState<EventoProps | null>(null);

    const dataFormatadaX = new Date(card?.data_inicio || '').toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    const dataFormatada = dataFormatadaX.charAt(0).toUpperCase() + dataFormatadaX.slice(1);

    // const horaFormatadaInicio = new Date(card?.data_inicio || '').toLocaleTimeString('pt-BR', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });

    // const horaFormatadaTermino = new Date(card?.data_fim || '').toLocaleTimeString('pt-BR', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });

    const juntaEndereco = `${card?.Endereco.logradouro}, ${card?.Endereco.numero} - ${card?.Endereco.bairro}, ${card?.Endereco.cidade}/${card?.Endereco.estado}`

    const data = new Date(card?.data_inicio || '');

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');

    const dataFormatadaInicio = `${dia}/${mes}/${ano} - ${hora}h${minuto}m`;

    const data2 = new Date(card?.data_fim || '');

    const dia2 = data2.getDate().toString().padStart(2, '0');
    const mes2 = (data2.getMonth() + 1).toString().padStart(2, '0');
    const ano2 = data2.getFullYear();

    const hora2 = data2.getHours().toString().padStart(2, '0');
    const minuto2 = data2.getMinutes().toString().padStart(2, '0');

    const dataFormatadaTermino = `${dia2}/${mes2}/${ano2} - ${hora2}h${minuto2}m`;


    function formatarCelular(numero: string | null | undefined): string {
        if (!numero) return '';
        return numero
            .replace(/\D/g, '') // remove tudo que não for dígito
            .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // aplica máscara
    }
    const catchEvent = async () => {
        try {
            const response: any = await api.get(`/event/${id}`)
            setCard(response.data)
        } catch (error) {
            console.log()
        }
    }
    useEffect(() => {
        catchEvent();
    }, [id]);

    if (!card) {
        return (
            <Box
                sx={{
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    textAlign: 'center',
                    px: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>

                    <Typography variant="h3" fontFamily={'var(--fredoka)'} fontWeight="500">
                        Evento não disponível
                    </Typography>

                    <Box sx={{ height: 70, width: 70 }}>
                        <img src={erro} alt="sad" style={{ width: '100%', height: '100%' }} />
                    </Box>
                </Box>

                <Typography variant="h6" fontFamily={'var(--fredoka)'} sx={{ color: 'text.secondary', fontSize: '22px' }}>Possíveis causas:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <List sx={{ maxWidth: 400, fontFamily: 'var(--notosans)', color: 'text.secondary', fontSize: '21px' }}>
                        <ListItem>O evento ainda não foi publicado;</ListItem>
                        <ListItem>O evento foi cancelado ou removido;</ListItem>
                        <ListItem>Problemas de conexão ou filtragem por categoria.</ListItem>
                    </List>

                </Box>
            </Box>
        );
    }

    return (
        <>
            <BannerEvent card={card} />
            <Grid container spacing={2} sx={{ padding: 2, paddingTop: 4 }} className="container">
                <Grid size={{ xs: 12, md: 5 }} className="grid-left"  >
                    <Box className='title-event' sx={{ display: 'flex', textAlign: { xs: 'center', sm: 'center', md: 'left' }, justifyContent: { xs: 'center', sm: 'center', md: 'left' } }}>
                        <Typography variant="h3" sx={{
                            fontSize: {
                                xs: '2.5rem',  // celulares
                                sm: '2.5rem',    // tablets pequenos
                                md: '3rem',    // desktops médios
                                lg: '3.5rem',  // desktops grandes
                            },
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left', // 'start' não funciona aqui, usa 'left' mesmo
                                lg: 'left',
                            },
                        }}>
                            {card?.nome_evento}
                        </Typography>
                    </Box>
                    <Box className="data" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 3 }}>
                        <Box className="img-calendar">
                            <img src={calendar} style={{ width: '60px', height: '60px' }} alt="" />
                        </Box>
                        <Box className="text-calendar" sx={{ paddingLeft: 2 }}>
                            <Typography className="text-calendar-title">{dataFormatada}</Typography>
                            <br />
                            <Typography className="text-calendar-subtitle">Inicio: {dataFormatadaInicio}</Typography>
                            <Typography className="text-calendar-subtitle" sx={{ paddingTop: 2 }}>Termino: {dataFormatadaTermino}</Typography>

                        </Box>
                    </Box>
                    <Box className="address" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 8 }}>
                        <Box>
                            <Address address={juntaEndereco}
                                location={card?.Estabelecimento.nome} />
                        </Box>
                    </Box>
                    <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 8 }}>
                        <Box sx={{ margin: 'auto' }}>
                            <Contacts email={card.Estabelecimento.Contato.email} telefone1={formatarCelular(card.Estabelecimento.Contato.tel_cel_1)} telefone2={formatarCelular(card.Estabelecimento.Contato.tel_cel_2)} />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 11, md: 5 }}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        my: { xs: 4, md: 0 },
                    }}
                    className="grid-right"
                >
                    <Card
                        elevation={3}
                        sx={{
                            height: '250px',
                            width: "100%",
                            maxWidth: 360,
                            borderRadius: 3,
                            transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
                            boxShadow: 4,
                            '&:hover': {
                                boxShadow: "0px 8px 20px #b789ef61",

                            },
                        }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center",
                                justifyContent: "center",
                                gap: { xs: 2, sm: 3 },
                                textAlign: 'center',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: { xs: 56, sm: 64 },
                                    height: { xs: 56, sm: 64 },
                                }}
                            />

                            <Box className="text-profile">
                                <Typography
                                    sx={{
                                        fontSize: { xs: "0.95rem", md: "1rem" },
                                        fontWeight: 500,
                                        mb: { xs: 1, sm: 0.5 },
                                    }}
                                >
                                    Produzido por {card?.Estabelecimento.nome}
                                </Typography>

                                <Button
                                    endIcon={<Person />}
                                    variant="outlined"
                                    className="btn-profile"
                                    href="/profile"
                                    onClick={() => {
                                        navigate("/profile", { state: { card } });
                                    }}
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1rem", md: '1.1rem' },
                                        fontFamily: 'var(--notosans)',
                                        px: { xs: 2, sm: 3 },

                                    }}
                                >
                                    Ver perfil
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 10 }} className="grid-description" sx={{ paddingTop: 4, margin: 0, textAlign: 'justify', px: { xs: 2, md: 0 } }}>
                    <Box className="title-description" >
                        <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
                            <Typography variant="h4" className="description-title" sx={{
                                alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: { xs: 'center', md: 'flex-start' }, fontSize: {
                                    xs: '2.5rem',  // celulares
                                    sm: '2.5rem',    // tablets pequenos
                                    md: '3rem',    // desktops médios
                                    lg: '3.5rem',  // desktops grandes
                                }
                            }}>DESCRIÇÃO DO EVENTO</Typography>

                        </Box>
                        <Typography className="description-text" sx={{ paddingY: 5 }}>{card.descricao}</Typography>
                    </Box>
                </Grid>
            </Grid>

        </>

    )
}

export default InfoEvent