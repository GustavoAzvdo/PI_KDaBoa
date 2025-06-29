import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


interface Evento {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    foto: string;
    endereco: {
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
        complemento: string;
    } | null;
    categorias: string[];
}

interface EventosPostadosProps {
    router: { navigate: (path: string, state: any) => void };
}

const EventosPostados = ({ router }: EventosPostadosProps) => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

        useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response: any = await api.get('/gerente/event', {
                    withCredentials: true
                });

                const eventosFormatados = response.data.map((evento: any) => ({
                    id: evento.id,
                    nome: evento.nome,
                    descricao: evento.descricao,
                    dataInicio: evento.data_inicio,
                    dataFim: evento.data_fim,
                    foto: evento.foto ? `http://localhost:3000/images/events/${evento.foto}` : '',
                    endereco: evento.endereco ? {
                        logradouro: evento.endereco.logradouro,
                        numero: evento.endereco.numero,
                        bairro: evento.endereco.bairro,
                        cidade: evento.endereco.cidade,
                        estado: evento.endereco.estado,
                        cep: evento.endereco.cep,
                        complemento: evento.endereco.complemento || ''
                    } : null,
                    categorias: evento.categorias ? evento.categorias.map((cat: any) => cat.nome) : []
                }));

                setEventos(eventosFormatados);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/gerente/event/${id}`, {
                withCredentials: true
            });
            // Atualiza a lista após exclusão
            setEventos(eventos.filter(evento => String(evento.id) !== id));
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
        }
    };

    const handleEdit = (evento: Evento) => {
        // Se você está usando contexto para edição, mantenha essa lógica
        // Caso contrário, pode navegar diretamente para a página de edição
        router.navigate('/eventos/criar_evento', { state: { evento } });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (eventos.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6">Nenhum evento encontrado</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {eventos.map(evento => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evento.id}>
                    <Card>
                        <CardMedia component="img" height="140" image={evento.foto} alt={evento.nome} />
                        <CardContent className='card-evento' sx={{ fontFamily: 'Noto Sans, sans-serif !important' }}>
                            <Typography variant='h5' sx={{ mt: 1, fontWeight: 'bold' }}>
                                {evento.nome}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Descrição:</b> {evento.descricao}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Endereço:</b> {evento.endereco?.logradouro}, {evento.endereco?.numero} - {evento.endereco?.bairro}
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                <b>Inicio:</b> {dayjs(evento.dataInicio).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Final:</b> {dayjs(evento.dataFim).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Categorias:</b> {evento.categorias.join(', ')}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ position: 'relative', minHeight: 40 , gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Button variant='contained' onClick={() => navigate('/eventos/criar_evento')}>Editar</Button>
                            <Button variant='contained' color="error" onClick={() => handleDelete(String(evento.id))}>Excluir</Button>

                        </CardActions>

                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventosPostados

