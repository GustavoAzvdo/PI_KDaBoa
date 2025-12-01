import { Avatar, Box, Button, Card, CardContent, Grid,  Stack, Typography } from "@mui/material"
import "./InfoEvent.css"
import calendar from "../../assets/calendar.png"
import Contacts from "../Details/Contacts"
import Address from "../Details/Address"
import { useNavigate } from "react-router-dom"
import BannerEvent from "../BannerEvent/BannerEvent"
import { ConfirmationNumber, Person } from "@mui/icons-material"
import api from "../../api/api"
import EventoProps from "../CardEventHome/props/EventoProps";
import { useEffect, useState, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPDF from "../TicketPDF/TicketPDF";
import qrcode from "qrcode";
import NumberSpinner from '../NumberSpinner';
const InfoEvent = ({ evento }: { evento: EventoProps }) => {
    const [ticket, setTicket] = useState<number>(0);
    const [price,] = useState<number>(20)


    const [qrCodes, setQrCodes] = useState<string[]>([]);
    const [isGeneratingTickets, setIsGeneratingTickets] = useState(false);

    const navigate = useNavigate();

    const dataFormatadaX = new Date(evento?.data_inicio || '').toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    const dataFormatada = dataFormatadaX.charAt(0).toUpperCase() + dataFormatadaX.slice(1);

    const juntaEndereco = `${evento?.Endereco.logradouro}, ${evento?.Endereco.numero} - ${evento?.Endereco.bairro}, ${evento?.Endereco.cidade}/${evento?.Endereco.estado}`

    const data = new Date(evento?.data_inicio || '');

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');

    const dataFormatadaInicio = `${dia}/${mes}/${ano} - ${hora}h${minuto}m`;

    const data2 = new Date(evento?.data_fim || '');

    const dia2 = data2.getDate().toString().padStart(2, '0');
    const mes2 = (data2.getMonth() + 1).toString().padStart(2, '0');
    const ano2 = data2.getFullYear();

    const hora2 = data2.getHours().toString().padStart(2, '0');
    const minuto2 = data2.getMinutes().toString().padStart(2, '0');

    const dataFormatadaTermino = `${dia2}/${mes2}/${ano2} - ${hora2}h${minuto2}m`;

    const isHtml = (str: string | null | undefined): boolean => {
        if (!str) return false;
        // Procura por qualquer tag HTML (ex: <p>, <strong>, <h1>, etc.)
        const htmlTagRegex = /<[a-z][\s\S]*>/i;
        return htmlTagRegex.test(str);
    };

    function formatarCelular(numero: string | null | undefined): string {
        if (!numero) return '';
        return numero
            .replace(/\D/g, '') // remove tudo que não for dígito
            .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // aplica máscara
    }
    const catchEvent = async () => {
        try {
            const response: any = await api.get(`/event/${evento.id_evento}`);
            console.log(response)
        } catch (error) {
            console.log()
        }
    }
    useEffect(() => {
        catchEvent();
    }, [evento.id_evento]);


    const ticketData = useMemo(() => {
        // Cria um array com a quantidade 'ticket' de itens
        return Array.from({ length: ticket }, () => ({
            id: crypto.randomUUID(), // Gera um ID único para o QR Code
            // Ex: nome: 'Gustavo' (se você tivesse um formulário para isso)
        }));
    }, [ticket])

    useEffect(() => {
        // Se não há tickets, limpa os QR codes e sai
        if (ticketData.length === 0) {
            setQrCodes([]);
            setIsGeneratingTickets(false);
            return;
        }

        const generateQRs = async () => {
            setIsGeneratingTickets(true); // Inicia o loading
            try {
                const urls = await Promise.all(
                    ticketData.map(ticket => qrcode.toDataURL(ticket.id, { width: 200 }))
                );
                setQrCodes(urls); // Armazena os QR codes prontos
            } catch (err) {
                console.error('Erro ao gerar QR Codes:', err);
                setQrCodes([]); // Limpa em caso de erro
            } finally {
                setIsGeneratingTickets(false); // Termina o loading
            }
        };

        generateQRs();
    }, [ticketData]);

    return (
        <>
            <BannerEvent evento={evento} />


            <Grid container spacing={2} sx={{ paddingTop: 4, justifyContent: 'center', px: { xs: 2, md: 4 } }} className="container">
                <Grid size={{ xs: 12, md: 5 }} className="grid-left">
                    {/* Título do Evento */}
                    <Box className='title-event' sx={{
                        display: 'flex',
                        textAlign: { xs: 'center', md: 'left' },
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        mb: 4
                    }}>
                        <Typography variant="h3" sx={{
                            fontSize: {
                                xs: '1.8rem',
                                sm: '2.2rem',
                                md: '2.5rem',
                                lg: '3rem',
                            },
                            textAlign: {
                                xs: 'center',
                                md: 'left',
                            },
                            fontWeight: 'bold',
                            color: '#333',
                            lineHeight: 1.2
                        }}>
                            {evento?.nome_evento}
                        </Typography>
                    </Box>

                    {/* Seção de Data */}
                    <Box className="data" sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                        mb: 4,
                        p: 3,

                        borderRadius: 2,
                        borderLeft: '4px solid #6C15D5',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

                    }}>
                        <Box className="img-calendar" sx={{ mr: 2, mt: 0.5 }}>
                            <img src={calendar} style={{ width: '48px', height: '48px' }} alt="calendar" />
                        </Box>
                        <Box className="text-calendar" sx={{ flex: 1 }}>
                            <Typography className="text-calendar-title" sx={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#333',
                                mb: 2
                            }}>
                                {dataFormatada}
                            </Typography>
                            <Typography className="text-calendar-subtitle" sx={{
                                color: 'text.secondary',
                                mb: 1,
                                fontSize: '0.95rem'
                            }}>
                                <strong>Início:</strong> {dataFormatadaInicio}
                            </Typography>
                            <Typography className="text-calendar-subtitle" sx={{
                                color: 'text.secondary',
                                fontSize: '0.95rem'
                            }}>
                                <strong>Término:</strong> {dataFormatadaTermino}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Seção de Endereço */}
                    <Box className="address" sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        mb: 4,
                        p: 3,
                        borderRadius: 2,
                        borderLeft: '4px solid #FF8e38',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

                    }}>
                        <Address address={juntaEndereco} location={evento?.Estabelecimento.nome} />
                    </Box>

                    {/* Seção de Contatos */}
                    <Box className="contacts" sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        mb: 4,
                        p: 3,

                        borderRadius: 2,
                        borderLeft: '4px solid #6c15d5',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

                    }}>
                        <Contacts
                            email={evento.Estabelecimento.Contato.email}
                            telefone1={formatarCelular(evento.Estabelecimento.Contato.tel_cel_1)}
                            telefone2={formatarCelular(evento.Estabelecimento.Contato.tel_cel_2)}
                        />
                    </Box>
                </Grid>

                {/* Card do Perfil */}
                <Grid size={{ xs: 12, md: 5 }}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        my: { xs: 2, md: 0 },
                    }}
                    className="grid-right"
                >
                    <Stack spacing={2} direction="column">
                        {/* perfil do cabloco */}
                        <Card
                            elevation={6}
                            sx={{

                                height: '330px',
                                width: "380px",

                                borderRadius: 4,
                                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                border: '1px solid rgba(108, 21, 213, 0.1)',

                                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',

                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: 'column',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 3,
                                    textAlign: 'center',
                                    p: 4,
                                    height: '100%'
                                }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                        src={`http://localhost:3000/establishment/image/${evento.Estabelecimento.imagem?.split('/').pop()}`}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            border: '3px solid #6C15D5',
                                            boxShadow: '0 4px 15px rgba(108, 21, 213, 0.3)',
                                        }}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: -4,
                                        right: -4,
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        backgroundColor: '#4CAF50',
                                        border: '3px solid white',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                    }} />
                                </Box>

                                <Box className="text-profile" sx={{ width: '100%' }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            mb: 3,
                                            color: '#333',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        Produzido por <br />
                                        <span style={{ color: '#6C15D5', fontSize: '1.2rem' }}>
                                            {evento?.Estabelecimento.nome}
                                        </span>
                                    </Typography>

                                    <Button
                                        endIcon={<Person />}
                                        variant="outlined"
                                        className="btn-profile"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/view-event/${evento.id_evento}/profile`);
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
                        {/* compra de ingresso */}
                        <Card
                            elevation={6}
                            sx={{

                                height: '330px',
                                width: "100%",
                                maxWidth: 380,
                                borderRadius: 4,
                                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                border: '1px solid rgba(108, 21, 213, 0.1)',

                                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',

                            }}
                        >

                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: 'column',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 3,
                                    textAlign: 'center',
                                    p: 4,
                                    height: '100%'
                                }}
                            >
                                <Box>
                                    <ConfirmationNumber sx={{ color: 'primary.main' }} />
                                    <Typography
                                        sx={{
                                            fontFamily: 'var(--notosans)',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            mb: 3,
                                            color: '#333',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        Adquira seu ingresso agora mesmo!*
                                    </Typography>
                                    <Typography variant="caption" sx={{
                                        fontStyle: 'italic',
                                        color: 'text.secondary',
                                        mb: 1,
                                        display: 'block'
                                    }}>
                                        *Taxa de compra não inclusa
                                    </Typography>
                                    <Box>
                                        <Typography sx={{
                                            fontFamily: 'var(--notosans)',
                                            color: 'text.secundary'
                                        }}>
                                            Preço por ingresso: <strong>R$ {price.toFixed(2)}</strong>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ mt: -3 }}>
                                    <NumberSpinner
                                        value={ticket}
                                        onValueChange={(newValue) => setTicket(newValue ?? 0)}
                                        min={0}
                                        max={30}
                                        size='small'
                                        defaultValue={0}
                                    />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    {isGeneratingTickets ? (
                                        // 1. Mostra "Gerando..." enquanto os QR Codes são criados
                                        <Button variant="contained" color="primary" disabled={true}>
                                            Gerando Ingressos...
                                        </Button>
                                    ) : (ticket > 0 && qrCodes.length === ticketData.length) ? (
                                        // 2. Mostra o link de Download quando tudo estiver pronto
                                        <PDFDownloadLink
                                            document={<TicketPDF evento={evento} ticketData={ticketData} qrCodes={qrCodes} />}
                                            fileName={`ingressos-${evento.nome_evento}.pdf`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {({ loading }) => ( // 'loading' aqui é a compilação do PDF
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Compilando PDF...' : `Comprar por R$ ${(ticket * price).toFixed(2)}`}
                                                </Button>
                                            )}
                                        </PDFDownloadLink>
                                    ) : (
                                        // 3. Estado inicial (0 tickets) ou se algo falhar
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={true}
                                        >
                                            {/* Ajusta o texto se for 0 ingressos */}
                                            {ticket === 0 ? `Comprar por R$ 0.00` : 'Aguarde...'}
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>

                        </Card>

                    </Stack>

                </Grid>

                {/* Seção de Descrição */}

                <Grid size={{ xs: 12, md: 10 }} className="grid-description" sx={{
                    paddingTop: 4,
                    margin: 0,
                    mb: 10,
                    textAlign: 'justify'
                }}>
                    <Box className="title-description">
                        <Box sx={{
                            textAlign: { xs: 'center', md: 'left' },
                            mb: 4,

                            pb: 2,
                            display: 'inline-block'
                        }}>
                            <Typography variant="h4" className="description-title" sx={{
                                fontSize: {
                                    xs: '1.8rem',
                                    sm: '2.2rem',
                                    md: '2.5rem',
                                    lg: '3rem',
                                },
                                fontWeight: 'bold',
                                color: '#333',
                                letterSpacing: '1px'
                            }}>
                                DESCRIÇÃO DO EVENTO
                            </Typography>
                        </Box>
                        <Box sx={{

                            borderRadius: 2,
                            p: 4,
                            borderLeft: '4px solid #6C15D5',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            {isHtml(evento.descricao) ? (
                                <Box
                                    className="description-text"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.7,
                                        color: 'text.secondary',
                                        textAlign: 'justify',
                                        // Estilos para o HTML
                                        '& p': { margin: 0, marginBottom: '1em' },
                                        '& p:last-child': { marginBottom: 0 },
                                        '& strong': { fontWeight: 600 },
                                        '& em': { fontStyle: 'italic' },
                                        '& u': { textDecoration: 'underline' },
                                    }}
                                    dangerouslySetInnerHTML={{ __html: evento.descricao || '' }}
                                />
                            ) : (

                                <Typography className="description-text" sx={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.7,
                                    color: 'text.secondary',
                                    textAlign: 'justify',
                                    whiteSpace: 'pre-line' // Para respeitar quebras de linha
                                }}>
                                    {evento.descricao}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </>

    )
}

export default InfoEvent