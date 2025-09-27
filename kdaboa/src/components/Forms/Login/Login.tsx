import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert, Card, Stack, Container } from '@mui/material'
import { HttpsOutlined, EmailOutlined,  Home } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material'
import api from '../../../api/api'
import logo from '../../../assets/logo.png'
import './Login.css'
import {Link as RouterLink} from 'react-router-dom'

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [snackbarQueue, setSnackbarQueue] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning' | 'error'>('success');

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (location.state?.snackbars && location.state.snackbars.length > 0) {
            setSnackbarQueue(location.state.snackbars);
        }
        // Limpa o state para não mostrar de novo se recarregar
        window.history.replaceState({}, document.title);
    }, [location.state]);

    useEffect(() => {
        if (snackbarQueue.length > 0) {
            const { message, severity } = snackbarQueue[0];
            setSnackbarMessage(message);
            setSnackbarSeverity(severity);
            setSnackbarOpen(true);

            const timer = setTimeout(() => {
                setSnackbarOpen(false);
                setSnackbarQueue(prev => prev.slice(1));
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [snackbarQueue]);

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: senha,
            },
                {
                    withCredentials: true
                })

            if (response.status === 201) {
                localStorage.setItem('userEmail', email);
                navigate('/dashboard');
            } else {
                console.log('Email ainda nao verificado');
                setSnackbarMessage('Seu e-mail ainda não foi verificado! Verifique sua caixa de entrada e clique no link de confirmação.');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
            }

        } catch (error: any) {
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                setSnackbarMessage('Email ou senha incorretos!');
            } else {
                setSnackbarMessage(error.response?.data?.message || 'Erro ao fazer login!');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box className='container_login' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
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
                {/* <Box className='header_login' >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <img src={logo} alt="logo" className='logo-login' />
                        <Typography className='title_navbar_login'>
                            KDABOA
                        </Typography>
                    </Box>
                    <Box className='home-login' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '50%' }}>
                        <Link component={RouterLink} sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline', textDecorationColor: 'var(--roxoLoginBtn)' } }} to='/home'>
                            <Typography className='title_home_login'>
                                Home
                            </Typography>
                            <HomeOutlined sx={{ color: 'var(--roxoLoginBtn)' }} />
                        </Link>
                    </Box>
                </Box> */}
                
                {/* <Box className='title_login' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant='h5'>
                        Login
                    </Typography>
                </Box> */}
                <Box>
                    <Button

                        component={RouterLink}
                        to='/home'
                        size='small' 
                        variant='text'
                        startIcon={<Home fontSize='small'/>}
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
                <Stack direction={'column'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box
                        component={'img'}
                        src={logo}
                        sx={{
                            mt: 3,
                            width: '60px',
                            height: '60px'
                        }}
                    />
                    
                        <Typography variant='h4' sx={{ pt: 1, fontFamily: 'var(--fredoka)', fontWeight: '500'}}>
                            Login
                        </Typography>
                   
                        <Typography fontSize='15px' sx={{pt: 1,pb: 3,color: 'text.secondary', fontFamily: 'var(--notosans)'}}>
                            Entre com o seu email e senha!
                        </Typography>
                   
                </Stack>
                <Box component='form'  onSubmit={handleLogin}>
                    <Box className='inputs'>
                        <Box>
                            <TextField
                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type="email" required
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <EmailOutlined
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type="password" required
                                label="Senha"
                                variant="outlined"
                                value={senha}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <HttpsOutlined
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>
                    </Box>
                    <Box className='btn'>
                        <Button
                            variant="contained"
                            className='btn-login'
                            type='submit'
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        >
                            <Typography className='btn' >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Typography>
                        </Button>
                        <Box className='links'>
                            <Box>
                                <Link component={RouterLink} to="/recuperar-senha">Esqueceu a sua senha?</Link>
                            </Box>
                        </Box>
                        <Box className="links-account-login" sx={{mb: 2}}>
                            <Typography>
                                Não tem uma conta? <Link component={RouterLink} to='/signin'>Crie Uma! </Link>
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

export default Login