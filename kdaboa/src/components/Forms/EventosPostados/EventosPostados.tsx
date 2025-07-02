import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { EnderecoData } from '../Endereco/Endereco';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import  {useEventos}  from '../../../context/EventoContext';

interface Evento {
    data_criacao: string;
    id_evento: number;
    nome_evento: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    foto: string;
    id_endereco: EnderecoData | null;
    Evento_Categoria: any[];
    favorito: number;
}

interface EventosPostadosProps {
    router: { navigate: (path: string) => void };
}

const EventosPostados = ({ router }: EventosPostadosProps) => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [autoHideDuration, setAutoHideDuration] = useState(4000);
   
    const navigate = useNavigate();

    const {setEventoEditando} = useEventos()
    const fetchEventos = async () => {
        try {
            const response: any = await api.get('/gerente/event', { withCredentials: true });
            console.log('Dados do evento:', response.data);
         
            const eventosFormatados = response.data.map((evento: any) => {
                
                return {
                    id_evento: evento.id_evento,
                    nome_evento: evento.nome_evento,
                    descricao: evento.descricao,
                    data_inicio: evento.data_inicio,
                    data_fim: evento.data_fim,
                    foto: evento.foto,
                    id_endereco: evento.Endereco ? {
                        logradouro: evento.Endereco.logradouro,
                        numero: evento.Endereco.numero,
                        bairro: evento.Endereco.bairro,
                        cidade: evento.Endereco.cidade,
                        uf: evento.Endereco.uf,
                        cep: evento.Endereco.cep,
                        complemento: evento.Endereco.complemento || ''
                    } : null,
                    Evento_Categoria: evento.Evento_Categoria ? evento.Evento_Categoria.map((cat: any) => cat.Categoria.nome_categoria) : [],
                    favorito: evento.favorito || 0,
                };
            });
            console.log(eventosFormatados);
            setEventos(eventosFormatados);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);

        }
    }



    const handleDelete = async (id_evento: number) => {
        try {
            await api.delete(`/gerente/event/${id_evento}`, {
                withCredentials: true
            });
            // Atualiza a lista após exclusão
            setEventos(eventos.filter(evento => evento.id_evento !== id_evento));
            setOpenSnackbar(true);
            setMessage('Evento excluído com sucesso!');
            setSeverity('success');
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            setOpenSnackbar(true);
            setMessage('Erro ao excluir evento!');
            setSeverity('error');
        }
    };

    const handleEdit = (evento: Evento) => {
        setEventoEditando({
          id_evento: evento.id_evento,
          nome_evento: evento.nome_evento,
          descricao: evento.descricao,
          data_criacao: evento.data_criacao,
          data_inicio: evento.data_inicio,
          data_fim: evento.data_fim,
          categorias: evento.Evento_Categoria,
          foto: evento.foto,
          endereco: evento.id_endereco,
        });
      
        router.navigate('/eventos/criar_evento');
      };


    // if (!loading) {
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
                        <CardMedia component="img" image={evento.foto} alt={evento.foto} />
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
                                <b>Data inicial:</b> {dayjs(evento.data_inicio).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Data final:</b> {dayjs(evento.data_fim).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <b>Categorias:</b> {evento.Evento_Categoria.join(', ')}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ position: 'relative', minHeight: 40, gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Button variant='contained' onClick={() => handleEdit(evento)}>Editar</Button>
                            <Button variant='contained' color="error" onClick={() => handleDelete(evento.id_evento)}>Excluir</Button>

                        </CardActions>

                    </Card>
                </Grid>
            ))}
            <CustomSnackbar
                open={openSnackbar}
                message={message}
                severity={severity}
                onClose={() => setOpenSnackbar(false)}
                autoHideDuration={autoHideDuration}
            />
        </Grid>
    );
};

export default EventosPostados  