import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useEventos } from '../../../context/EventoContext';
import { useState } from 'react';
import dayjs from 'dayjs';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


interface EventosPostadosProps {
    router: { navigate: (path: string) => void };
}

const EventosPostados = ({ router }: EventosPostadosProps) => {
    const { eventos, removeEvento, setEventoEdicao } = useEventos();
    const [openModalId, setOpenModalId] = useState<string | null>(null);

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
                            <Button variant='contained' onClick={() => { setEventoEdicao(evento); router.navigate('/eventos/criar_evento') }}>Editar</Button>
                            <Button variant='contained' color="error" onClick={() => removeEvento(String(evento.id))}>Excluir</Button>
                           
                        </CardActions>
                    
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventosPostados