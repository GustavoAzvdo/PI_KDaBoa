import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import dayjs from 'dayjs';

import { EnderecoData } from '../Endereco/Endereco';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import { useEventos } from '../../../context/EventoContext';
import { Category, Delete, Edit } from '@mui/icons-material';

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
    estatus: number;
}

interface EventosPostadosProps {
    router: { navigate: (path: string) => void };
}

const EventosPostados = ({ router }: EventosPostadosProps) => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    // Estado para armazenar quais IDs têm pendência no histórico
    const [idsComAlteracao, setIdsComAlteracao] = useState<number[]>([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [autoHideDuration,] = useState(4000);

    const { setEventoEditando } = useEventos();

    // Função que verifica no backend se existe histórico pendente para a lista de eventos
    const checarAlteracoes = async (listaEventos: Evento[]) => {
        const idsEncontrados: number[] = [];

        await Promise.all(listaEventos.map(async (evento) => {
            try {
                // O : any aqui previne o erro do typescript no .length
                const response: any = await api.get(`/gerente/event/alteration/${evento.id_evento}`, { withCredentials: true });

                if (response.data && response.data.length > 0) {
                    idsEncontrados.push(evento.id_evento);
                }
            } catch (error) {
                // Ignora se der erro (ex: sem histórico)
            }
        }));

        setIdsComAlteracao(idsEncontrados);
    };

    const fetchEventos = async () => {
        try {
            const response: any = await api.get('/gerente/event', { withCredentials: true });
            console.log('Dados do evento:', response.data);

            const eventosAprovados = response.data.filter((evento: any) =>
                Number(evento.estatus) === 1
            );

            const eventosFormatados = eventosAprovados.map((evento: any) => {
                return {
                    id_evento: evento.id_evento,
                    nome_evento: evento.nome_evento,
                    descricao: evento.descricao,
                    data_inicio: evento.data_inicio,
                    data_fim: evento.data_fim,
                    foto: evento.foto,
                    // CORREÇÃO AQUI EMBAIXO:
                    id_endereco: evento.Endereco ? {
                        id_endereco: evento.Endereco.id_endereco, // <--- ADICIONE ESTA LINHA
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
                    estatus: evento.estatus
                };
            });

            setEventos(eventosFormatados);
            // Chama a verificação de alterações após carregar os eventos
            checarAlteracoes(eventosFormatados);

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

    useEffect(() => {
        fetchEventos();
    }, []);

    return (
        <Grid container spacing={3}>
            {eventos.map((evento) => {
                // Verifica se este evento específico tem alteração pendente
                const temAlteracao = idsComAlteracao.includes(evento.id_evento);

                return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evento.id_evento}>
                        <Card
                            elevation={4}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease-in-out',
                                // Borda Laranja se tiver alteração
                                border: temAlteracao ? '3px solid #ff9800' : 'none',
                                position: 'relative',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 40px rgba(108, 21, 213, 0.2)',
                                }
                            }}
                        >
                            {/* Badge de Aviso */}
                            {temAlteracao && (
                                <Box sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    zIndex: 2,
                                    backgroundColor: '#ff9800',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}>
                                    Alteração Pendente
                                </Box>
                            )}

                            {/* Imagem do evento */}
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                height: '220px',
                                overflow: 'hidden'
                            }}>
                                <CardMedia
                                    component="img"
                                    image={evento.foto}
                                    alt={evento.nome_evento}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                {/* Overlay com gradiente */}
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '50%',
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    zIndex: 1
                                }} />
                            </Box>

                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    p: 3,
                                    fontFamily: 'Noto Sans, sans-serif !important',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                {/* Título do evento */}
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#2c2c2c',
                                        lineHeight: 1.3,
                                        fontSize: '1.3rem'
                                    }}
                                >
                                    {evento.nome_evento}
                                </Typography>

                                {/* Descrição */}
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            lineHeight: 1.5,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {evento.descricao}
                                    </Typography>
                                </Box>

                                {/* Informações em grid */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    {/* Data */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: '#6C15D5'
                                        }} />
                                        <Typography variant="body2" sx={{ fontWeight: '500', color: '#444' }}>
                                            {dayjs(evento.data_inicio).format('DD/MM/YYYY HH:mm')} - {dayjs(evento.data_fim).format('HH:mm')}
                                        </Typography>
                                    </Box>

                                    {/* Endereço */}
                                    {evento.id_endereco && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: '#6C15D5'
                                            }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {evento.id_endereco.logradouro}, {evento.id_endereco.numero} - {evento.id_endereco.bairro}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Categorias */}
                                    {evento.Evento_Categoria.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                            <Category sx={{ fontSize: 18, color: '#6c15d5', mr: 1 }} />
                                            {evento.Evento_Categoria.slice(0, 3).map((categoria, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={categoria}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'rgba(108, 21, 213, 0.1)',
                                                        color: '#6C15D5',
                                                    }}
                                                />
                                            ))}
                                            {evento.Evento_Categoria.length > 3 && (
                                                <Chip
                                                    label={`+${evento.Evento_Categoria.length - 3}`}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: '#f0f0f0',
                                                        color: '#666',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '600'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>

                            {/* Botões de ação */}
                            <CardActions
                                sx={{
                                    p: 3,
                                    pt: 0,
                                    gap: 1.5,
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Button
                                    variant='contained'
                                    startIcon={<Edit />}
                                    onClick={() => handleEdit(evento)}
                                    sx={{
                                        flex: 1,
                                        bgcolor: '#6C15D5',
                                        color: 'white',
                                        textTransform: 'none',
                                        py: 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: '#5a12b8',
                                        }
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant='outlined'
                                    color="error"
                                    startIcon={<Delete />}
                                    onClick={() => handleDelete(evento.id_evento)}
                                    sx={{
                                        flex: 1,
                                        textTransform: 'none',
                                        py: 1,
                                        '&:hover': {
                                            bgcolor: '#d32f2f',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Excluir
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
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

export default EventosPostados;