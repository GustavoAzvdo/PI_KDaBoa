import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Stack,
    TextField,
    InputAdornment,
    Typography,
    Divider,
    Dialog,                
    DialogActions,          
    DialogContent,          
    DialogContentText,      
    DialogTitle            
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import dayjs from 'dayjs';

import { EnderecoData } from '../Endereco/Endereco';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import { useEventos } from '../../../context/EventoContext';
import { Adjust, Category, Delete, Edit, Search } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'; 

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
    router: {
        navigate: (path: string) => void;
        pathname: string;
        locationState?: { targetEventId?: number };
    };
}

const EventosPostados = ({ router }: EventosPostadosProps) => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [idsComAlteracao, setIdsComAlteracao] = useState<number[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [autoHideDuration,] = useState(4000);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);

    const { setEventoEditando } = useEventos();

    const checarAlteracoes = async (listaEventos: Evento[]) => {
        const idsEncontrados: number[] = [];

        await Promise.all(listaEventos.map(async (evento) => {
            try {
                const response: any = await api.get(`/gerente/event/alteration/${evento.id_evento}`, { withCredentials: true });
                if (response.data && response.data.length > 0) {
                    idsEncontrados.push(evento.id_evento);
                }
            } catch (error) {
                // Ignora erro
            }
        }));

        setIdsComAlteracao(idsEncontrados);
    };

    const fetchEventos = async () => {
        try {
            const response: any = await api.get('/gerente/event', { withCredentials: true });
            
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
                    id_endereco: evento.Endereco ? {
                        id_endereco: evento.Endereco.id_endereco,
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
            checarAlteracoes(eventosFormatados);

        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    }

    const handleOpenDeleteDialog = (id_evento: number) => {
        setIdToDelete(id_evento);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setIdToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!idToDelete) return;

        try {
            await api.delete(`/gerente/event/${idToDelete}`, {
                withCredentials: true
            });
            setEventos(eventos.filter(evento => evento.id_evento !== idToDelete));
            setOpenSnackbar(true);
            setMessage('Evento excluído com sucesso!');
            setSeverity('success');
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            setOpenSnackbar(true);
            setMessage('Erro ao excluir evento!');
            setSeverity('error');
        } finally {
            handleCloseDeleteDialog(); 
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

   
    useEffect(() => {
        if (eventos.length > 0) {
            let targetId: number | null = null;
            if (router.locationState?.targetEventId) {
                targetId = router.locationState.targetEventId;
            } 
            else if (router.pathname.includes('?id=')) {
                const idFromUrl = router.pathname.split('?id=')[1];
                targetId = Number(idFromUrl);
            }

            if (targetId) {
                const eventoEncontrado = eventos.find(e => e.id_evento === targetId);
                
                if (eventoEncontrado) {
                    setSearchTerm(eventoEncontrado.nome_evento);
                    setMessage(`Filtrando evento: ${eventoEncontrado.nome_evento}`);
                    setSeverity('info');
                    setOpenSnackbar(true);
                }
            }
        }
    }, [eventos, router.locationState, router.pathname]); 

    const eventosFiltrados = eventos.filter((evento) => 
        evento.nome_evento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Grid container spacing={3}>
            <Grid size={{xs: 12}} sx={{my: 2}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Pesquisar evento pelo nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search sx={{ color: '#6C15D5' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Divider sx={{ mt: 3 }} />
            </Grid>

            {/* Mensagem se não encontrar nada */}
            {eventosFiltrados.length === 0 && searchTerm !== '' && (
                 <Grid size={{ xs: 12 }}>
                    <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                        <Typography variant="h6">Nenhum evento encontrado com esse nome.</Typography>
                    </Box>
                 </Grid>
            )}

            {eventosFiltrados.map((evento) => {
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
                                border: temAlteracao ? '3px solid #FF8e38' : 'none',
                                position: 'relative',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: temAlteracao ? '0 8px 16px #FF8e38' : '0 12px 40px rgba(108, 21, 213, 0.2)',
                                }
                            }}
                        >
                            {temAlteracao && (
                                <Box sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    zIndex: 2,
                                    backgroundColor: '#ff8e38',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Adjust sx={{ fontSize: 16 }} />
                                        <Typography variant="caption">Alteração Pendente</Typography>
                                    </Stack>
                                </Box>
                            )}

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

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
                                    onClick={() => handleOpenDeleteDialog(evento.id_evento)}
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

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        padding: 1,
                        maxWidth: '360px'
                    }
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
                    <WarningAmberRoundedIcon
                        sx={{
                            fontSize: 60,
                            color: 'warning.main',
                            bgcolor: '#fff4e5',
                            borderRadius: '50%',
                            p: 1,
                            mb: 2
                        }}
                    />

                    <DialogTitle  sx={{ fontWeight: 'bold', textAlign: 'center', fontFamily: 'var(--notosans)' }}>
                        Deseja excluir este evento?
                    </DialogTitle>
                </Box>

                <DialogContent>
                    <DialogContentText  sx={{ textAlign: 'center', color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                        Você está prestes a excluir o evento permanentemente.
                        <br />
                        <Typography component="span" sx={{ fontWeight: 'bold', color: 'error.main', display: 'block', mt: 1 }}>
                            Essa ação é irreversível e não poderá ser desfeita!
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
                    <Button
                        onClick={handleCloseDeleteDialog}
                        variant="outlined"
                        sx={{
                            color: 'text.primary',
                            textTransform: 'none',
                            px: 3,
                           
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        autoFocus
                        endIcon={<DeleteOutlineIcon />}
                        sx={{
                            textTransform: 'none',
                            px: 3,
                            boxShadow: 'none'
                        }}
                    >
                        Sim, excluir
                    </Button>
                </DialogActions>
            </Dialog>

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