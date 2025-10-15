import {  Box, Button, Grid,  TextField, Typography, CircularProgress } from '@mui/material'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import { useState } from 'react'
// import { Delete, Edit } from '@mui/icons-material';
// import perfil from './fotoPerfil/perfil.png'
import api from '../../../api/api'
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';

const CriarFuncionario = () => {
    
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [emailFuncionario, setEmailFuncionario] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // custom snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    
    
    // Dados de exemplo para o funcionário existente

    const handleCriarFuncionario = async () => {
      
        if (!nomeFuncionario.trim()) {
            setSnackbarMessage('Nome do funcionário é obrigatório!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (!emailFuncionario.trim()) {
            setSnackbarMessage('Email do funcionário é obrigatório!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailFuncionario)) {
            setSnackbarMessage('Email inválido!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/auth/employee', {
                nome: nomeFuncionario,
                email: emailFuncionario,
            });

            if (response.status === 200) {

                setNomeFuncionario('');
                setEmailFuncionario('');                
                setSnackbarMessage('Funcionário criado com sucesso! Um email de verificação foi enviado.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error;
            if (error.response?.status === 400) {
                setSnackbarMessage('Funcionário já existe ou domínio de email não permitido!');
            } else if (error.response?.status === 500) {
                setSnackbarMessage('Erro interno do servidor!');
            } else {
                setSnackbarMessage(errorMessage || 'Erro ao criar funcionário!');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ fontFamily: 'var(--notosans) !important' }}>
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <TextField 
                        required 
                        id="nome-funcionario" 
                        label="Nome do Funcionário" 
                        variant="outlined" 
                        fullWidth 
                        value={nomeFuncionario}
                        onChange={(e) => setNomeFuncionario(e.target.value)}
                        disabled={isLoading}
                        error={!nomeFuncionario.trim() && nomeFuncionario.length > 0}
                        helperText={!nomeFuncionario.trim() && nomeFuncionario.length > 0 ? 'Nome é obrigatório' : ''}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <TextField 
                        required 
                        id="email-funcionario" 
                        label="Email do Funcionário" 
                        variant="outlined" 
                        fullWidth 
                        type="email"
                        value={emailFuncionario}
                        onChange={(e) => setEmailFuncionario(e.target.value)}
                        disabled={isLoading}
                        error={emailFuncionario.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFuncionario)}
                        helperText={emailFuncionario.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFuncionario) ? 'Email inválido' : ''}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Button
                        onClick={handleCriarFuncionario}
                        disabled={isLoading || !nomeFuncionario.trim() || !emailFuncionario.trim()}
                        fullWidth
                        sx={{
                            mt: 1,
                            fontSize: 19, 
                            fontFamily: 'var(--notosans) !important', 
                            px: 2, 
                            fontWeight: '450',
                            mb: 2,
                            backgroundColor: 'var(--roxo)',
                            '&:disabled': {
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                            }
                        }}
                        variant='contained'
                        endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <BadgeIcon />}
                    >
                        {isLoading ? 'Criando...' : 'Criar Funcionário'}
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
                
                {/* <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontFamily: 'var(--notosans)', color: 'text.primary' }}>
                        Funcionários Existentes
                    </Typography>
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
                            <Typography variant="h6" sx={{ fontFamily: 'var(--notosans)' }}>{nome}</Typography>
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
                </Grid> */}
            </Grid>

            {/* CustomSnackbar para feedback */}
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
            />
        </Box>
    )
}

export default CriarFuncionario