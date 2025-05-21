import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert } from '@mui/material'
import { PersonOutlined, HttpsOutlined, EmailOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/api'
import logo from '../../../assets/logo.png'
import './Login.css'
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
            });

            if (response.status === 201) {


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
        <Box className='container_login'>
            <Box className='body_login'>
                <Box className='header'>
                    <img src={logo} alt="logo" style={{ width: 30, height: 30 }} />
                    <Typography className='title'>
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title'>
                    <Typography variant='h5'>
                        Login
                    </Typography>
                </Box>
                <Box component='form' className='form' onSubmit={handleLogin}>
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
                        >
                            <Typography className='btn' >
                                Entrar
                            </Typography>
                        </Button>
                        <Box className='links'>
                            <Box>
                                <Link href="/recuperar-senha">Esqueceu a sua senha?</Link>
                            </Box>
                        </Box>
                        <Box className="links-account-login">
                            <Typography>
                                Não tem uma conta? <Link href='/signin'>Crie Uma!</Link>
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
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