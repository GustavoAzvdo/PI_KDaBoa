import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { EnderecoData } from '../Endereco/Endereco';


interface Evento {
    id_evento: number;
    nome_evento: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    images: string;
    id_endereco: {
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
        complemento: string;
    } | null;
    Evento_Categoria: any[];
    favorito: number;
}

interface EventosPostadosProps {
    router: { navigate: (path: string, state: any) => void };
}

const EventosPostados = ({ router }: EventosPostadosProps) => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const navigate = useNavigate();


    const fetchEventos = async () => {
        try {
            const response: any = await api.get('/gerente/event', { withCredentials: true });
            console.log('Dados do evento:', response.data);

            const eventosFormatados = response.data.map((evento: any) => ({
                id_evento: evento.id_evento,              // Verifique se "id" existe e está correto
                nome_evento: evento.nome_evento,          // Confirme os nomes reais das props
                descricao: evento.descricao,
                data_inicio: evento.data_inicio,
                data_fim: evento.data_fim,
                images: evento.images ? `http://localhost:3000/gerente/event/${evento.images}` : '',
                id_endereco: evento.id_endereco ? {
                    logradouro: evento.id_endereco.logradouro,
                    numero: evento.id_endereco.numero,
                    bairro: evento.id_endereco.bairro,
                    cidade: evento.id_endereco.cidade,
                    uf: evento.id_endereco.uf,
                    cep: evento.id_endereco.cep,
                    complemento: evento.id_endereco.complemento || ''
                } : null,
                Evento_Categoria: evento.Evento_Categoria ? evento.Evento_Categoria.map((cat: any) => cat.nome) : [],
                favorito: evento.favorito || 0,
            }));
            console.log(eventosFormatados);
            setEventos(eventosFormatados);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);

        }
    }
  


    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/gerente/event/${id}`, {
                withCredentials: true
            });
            // Atualiza a lista após exclusão
            setEventos(eventos.filter(evento => String(evento.id_evento) !== id));
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
        }
    };

    const handleEdit = (evento: Evento) => {
        // Se você está usando contexto para edição, mantenha essa lógica
        // Caso contrário, pode navegar diretamente para a página de edição
        router.navigate('/eventos/criar_evento', { state: { evento } });
    };

    // if (loading) {
    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    // if (eventos.length === 0) {
    //     return (
    //         <Box sx={{ textAlign: 'center', mt: 4 }}>
    //             <Typography variant="h6">Nenhum evento encontrado</Typography>
    //         </Box>
    //     );
    // }

    useEffect(() => {
        fetchEventos();
    }, []);

    return (
        <Grid container spacing={2}>
            {eventos.map((evento, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Card>
                        <CardMedia component="img" height="140" image={evento.images} alt={evento.nome_evento} />
                        <CardContent className='card-evento' sx={{ fontFamily: 'Noto Sans, sans-serif !important' }}>
                            <Typography variant='h5' sx={{ mt: 1, fontWeight: 'bold' }}>
                                {evento.nome_evento}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Descrição:</b> {evento.descricao}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Endereço:</b> {evento.id_endereco?.logradouro}, {evento.id_endereco?.numero} - {evento.id_endereco?.bairro}
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                <b>Inicio:</b> {dayjs(evento.data_inicio).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Final:</b> {dayjs(evento.data_fim).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Categorias:</b> {evento.Evento_Categoria.join(', ')}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ position: 'relative', minHeight: 40, gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Button variant='contained' onClick={() => navigate('/eventos/criar_evento', { state: { evento } })}>Editar</Button>
                            <Button variant='contained' color="error" onClick={() => handleDelete(String(evento.id_evento))}>Excluir</Button>

                        </CardActions>

                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventosPostados  