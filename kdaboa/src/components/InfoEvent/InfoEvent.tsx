import { Avatar, Box, Button, Grid, Typography } from "@mui/material"
import "./InfoEvent.css"
import calendar from "../../assets/calendar.png"
import Contacts from "../Details/Contacts"
import Address from "../Details/Address"
import { useLocation, useNavigate } from "react-router-dom"
import BannerEvent from "../BannerEvent/BannerEvent"
import { Person } from "@mui/icons-material"
import api from "../../api/api"
import { useState } from "react";
import EventoProps from "../CardEventHome/props/EventoProps";
import { useEffect } from "react";

const InfoEvent = ({ id }: { id: number }) => {
    const navigate = useNavigate();
    const location = useLocation();

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
        return <div>Card not found</div>;
    }
    return (
        <>
            <BannerEvent card={card} />
            <Grid container spacing={2} sx={{ padding: 2, paddingTop: 4 }} className="container">
                <Grid size={{ xs: 12, md: 5 }} className="grid-left"  >
                    <Box className='title-event'>
                        <Typography variant="h3" className="title-text">
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
                            {/* <Contacts email={card.Estabelecimento.id_contato.email} telefone1={card.Estabelecimento.id_contato.tel_1} telefone2={card.Estabelecimento.id_contato.tel_2} /> */}
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 11, md: 5 }} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' }, marginY: { xs: 9, md: 0 } }} className="grid-right"  >
                    <Box className="container-right" sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ paddingX: 2 }} className="img-profile" >
                            <Avatar sx={{ width: 56, height: 56 }}>

                            </Avatar>
                        </Box>
                        <Box className="text-profile" sx={{ paddingRight: 1 }}>
                            <Typography>
                                Produzido por {card?.Estabelecimento.nome}
                            </Typography>
                            <Button endIcon={<Person />} variant="outlined" className="btn-profile" href='/profile' onClick={() => {
                                navigate('/profile', { state: { card} });
                            }}>
                                <Typography>
                                    Ver perfil
                                </Typography>
                            </Button>
                        </Box>
                    </Box>

                </Grid>

                <Grid size={{ xs: 12, md: 10 }} className="grid-description" sx={{ paddingTop: 4, margin: 0, textAlign: 'justify', px: { xs: 2, md: 0 } }}>
                    <Box className="title-description" >
                        <Typography variant="h4" className="description-title" sx={{ alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>DESCRIÇÃO DO EVENTO</Typography>
                        <Typography className="description-text" sx={{ paddingY: 5 }}>{card.descricao}</Typography>
                    </Box>
                </Grid>
            </Grid>

        </>

    )
}

export default InfoEvent