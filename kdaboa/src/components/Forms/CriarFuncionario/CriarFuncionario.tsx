import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, IconButton, TextField, Typography } from '@mui/material'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import { useState } from 'react'
import { Delete, Edit } from '@mui/icons-material';
import perfil from './fotoPerfil/perfil.png'
const CriarFuncionario = () => {
    const [status] = useState('Ativo');
    const [nome] = useState('KDaBoa de Souza e Silva');
    const [email] = useState('kdaboa@gmail.com');
    const [eventosPostados] = useState(5);
    const [fotoPerfil, ] = useState(perfil);
    return (
        <Box sx={{ fontFamily: 'var(--notosans) !important' }}>
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <TextField required id="outlined-basic" label="Nome do Funcionário" variant="outlined" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <TextField required id="outlined-basic" label="Email do Funcionario" variant="outlined" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Button

                        fullWidth
                        sx={{
                            mt: 1,
                            fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450',
                            mb: 2,
                            backgroundColor: 'var(--roxo)',

                        }}
                        variant='contained'
                        endIcon={<BadgeIcon />}
                    >
                        Criar Funcionário
                    </Button>

                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '15px' }}>
                        <PriorityHighRoundedIcon sx={{ color: '#6515d5' }} />
                        <Typography variant='h6' color='text.secondary'>
                            Após o primeiro acesso, o funcionário receberá um e-mail para definir sua própria senha.
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }} elevation={2}>
                        <Avatar
                            src={fotoPerfil}
                            alt={nome}
                            sx={{ width: 70, height: 70, mr: 3 }}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Chip
                                label={status}
                                color={status === 'Ativo' ? 'success' : status === 'Inativo' ? 'default' : 'warning'}
                                size="small"
                                sx={{ my: 1 }}
                            />
                            <Typography variant="h6">{nome}</Typography>
                            <Typography variant="body2" color="text.secondary">{email}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Eventos postados: <b>{eventosPostados}</b>
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ flexDirection: 'row', gap: 1 }}>
                            <IconButton color="success" aria-label="editar">
                                <Edit />
                            </IconButton>
                            <IconButton color="error" aria-label="excluir">
                                <Delete />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CriarFuncionario