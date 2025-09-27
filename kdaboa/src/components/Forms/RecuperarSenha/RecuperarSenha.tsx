import './RecuperarSenha.css'
import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert, CircularProgress, Card, Stack, Container } from '@mui/material'
import { EmailOutlined, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import api from '../../../api/api';
import { Link as RouterLink } from 'react-router-dom'

const RecuperarSenha = () => {
    const [email, setEmail] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/auth/recovery-password', { email: email });
            navigate('/email-enviado', { state: { email: email } });
        }
        catch (error: any) {
            if (error.response?.status === 400) {
                console.log(error);
                setSnackbarMessage('E-mail inválido ou não encontrado');
                setSnackbarSeverity('error');
            } else {
                setSnackbarMessage('Erro interno do servidor!');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        document.title = 'Recuperar Senha';
    })

    return (
        <Box className='container_recuperar' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card
                elevation={2}
                sx={{
                    width: '400px',
                    height: 'auto',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'white',
                }}
            >
                {/* Botão Home */}
                <Box>
                    <Button
                        component={RouterLink}
                        to='/home'
                        size='small'
                        variant='text'
                        startIcon={<Home fontSize='small' />}
                        sx={{
                            fontWeight: 400,
                            fontFamily: 'var(--fredoka)',
                            px: 1,
                            py: 1,
                            borderBottomRightRadius: 10
                        }}
                    >
                        Voltar para tela inicial
                    </Button>
                </Box>

                <Container>
                    <Stack direction={'column'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                            component={'img'}
                            src={logo}
                            sx={{
                                mt: 3,
                                width: '60px',
                                height: '60px'
                            }}
                        />

                        <Typography variant='h4' sx={{ pt: 1, fontFamily: 'var(--fredoka)', fontWeight: '500' }}>
                            Recuperar Senha
                        </Typography>

                        <Typography fontSize='15px' sx={{ pt: 1, pb: 3, color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                            Digite seu email para receber as instruções!
                        </Typography>
                    </Stack>

                    <Box component='form' onSubmit={handleEmail}>
                        <Box className='inputs'>
                            <Box>
                                <TextField
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    margin='normal'
                                    type="email"
                                    required
                                    label="Email"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <EmailOutlined className='icons' />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box className='btn'>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btn-login'
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            >
                                <Typography className='btn'>
                                    {isLoading ? 'Enviando...' : 'Enviar'}
                                </Typography>
                            </Button>

                            <Box className='links'>
                                <Box>
                                    <Link component={RouterLink} to="/login">
                                        Voltar para o Login
                                    </Link>
                                </Box>
                            </Box>

                            <Box className="links-account-login" sx={{ mb: 2 }}>
                                <Typography>
                                    Não tem uma conta? <Link component={RouterLink} to="/signin">Crie Uma!</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Card>

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    fontSize: '20px',
                    fontFamily: "'Noto Sans', sans-serif",
                    '& .MuiAlert-icon': { fontSize: '30px' }
                }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default RecuperarSenha