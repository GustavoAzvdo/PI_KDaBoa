import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert, Card, Stack, Container, LinearProgress } from '@mui/material'
import { HttpsOutlined, EmailOutlined, HomeOutlined,  LoginOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { CircularProgress } from '@mui/material'
import api from '../../../api/api'
import logo from '../../../assets/logo.png'
import './Login.css'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // aqui voce muda o tempo de bloqueio em milissegundos (5 minutos)

const Login = () => {
    const location = useLocation();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [snackbarQueue, setSnackbarQueue] = useState<{ message: string; severity: 'success' | 'warning' | 'error' }[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning' | 'error'>('success');

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [attemptsLeft, setAttemptsLeft] = useState<number>(() => {
        const v = localStorage.getItem('login_attempts_left');
        return v ? Number(v) : MAX_ATTEMPTS;
    });
    const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
        const v = localStorage.getItem('login_lockout_until');
        return v ? Number(v) : null;
    });
    const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);
    const lockoutTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (location.state?.snackbars && Array.isArray(location.state.snackbars) && location.state.snackbars.length > 0) {
            setSnackbarQueue(location.state.snackbars);
        }
        // limpa o state da navegação para não reaparecer ao recarregar
        window.history.replaceState({}, document.title);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        // se havia bloqueio armazenado, inicializa contador
        if (lockoutUntil && Date.now() < lockoutUntil) {
            setLockoutRemaining(lockoutUntil - Date.now());
            startLockoutTimer(lockoutUntil);
        } else if (lockoutUntil) {
            // expirou
            clearLockout();
        }
        // limpa intervalo no unmount
        return () => {
            if (lockoutTimerRef.current) {
                window.clearInterval(lockoutTimerRef.current);
                lockoutTimerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem('login_attempts_left', String(attemptsLeft));
    }, [attemptsLeft]);

    const startLockoutTimer = (until: number) => {
        if (lockoutTimerRef.current) window.clearInterval(lockoutTimerRef.current);
        lockoutTimerRef.current = window.setInterval(() => {
            const rem = until - Date.now();
            if (rem <= 0) {
                if (lockoutTimerRef.current) {
                    window.clearInterval(lockoutTimerRef.current);
                    lockoutTimerRef.current = null;
                }
                clearLockout();
            } else {
                setLockoutRemaining(rem);
            }
        }, 1000) as unknown as number;
    };

    const clearLockout = () => {
        setLockoutUntil(null);
        localStorage.removeItem('login_lockout_until');
        setLockoutRemaining(0);
        setAttemptsLeft(MAX_ATTEMPTS);
        localStorage.setItem('login_attempts_left', String(MAX_ATTEMPTS));
        if (lockoutTimerRef.current) {
            window.clearInterval(lockoutTimerRef.current);
            lockoutTimerRef.current = null;
        }
    };

    const formatTime = (ms: number) => {
        const s = Math.ceil(ms / 1000);
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const disableLogin = isLoading || lockoutRemaining > 0;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (lockoutRemaining > 0) {
            setSnackbarMessage(`Bloqueado. Tente novamente em ${formatTime(lockoutRemaining)}.`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: senha,
            }, { withCredentials: true });

            if (response.status === 201 || response.status === 200) {
                const userData = await login();

                // reseta tentativas ao logar com sucesso
                setAttemptsLeft(MAX_ATTEMPTS);
                localStorage.setItem('login_attempts_left', String(MAX_ATTEMPTS));
                localStorage.removeItem('login_lockout_until');
                if (lockoutTimerRef.current) {
                    window.clearInterval(lockoutTimerRef.current);
                    lockoutTimerRef.current = null;
                }

                if (userData?.tipo === 'Funcionario') {
                    navigate('/dashboard_func');
                } else if (userData?.tipo === 'Gerente') {
                    navigate('/dashboard');
                } else {
                    setSnackbarMessage('Tipo de usuário desconhecido. Contate o suporte.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            } else {
                setSnackbarMessage('Seu e-mail ainda não foi verificado! Verifique sua caixa de entrada e clique no link de confirmação.');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
            }
        } catch (error: any) {
            // decrementa tentativas apenas em erros de credenciais (400/401)
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                const next = Math.max(0, attemptsLeft - 1);
                setAttemptsLeft(next);
                localStorage.setItem('login_attempts_left', String(next));

                if (next <= 0) {
                    const until = Date.now() + LOCKOUT_MS;
                    setLockoutUntil(until);
                    localStorage.setItem('login_lockout_until', String(until));
                    setLockoutRemaining(LOCKOUT_MS);
                    startLockoutTimer(until);
                    setSnackbarMessage(`Máximo de tentativas atingido. Bloqueado por ${formatTime(LOCKOUT_MS)}.`);
                } else {
                    setSnackbarMessage(`Email ou senha incorretos! Restam ${next} tentativa(s).`);
                }
            } else if (error.status === 302) {
                navigate('/alterar-senha');
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
        <Box className='container_login' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
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
                <Box>
                    <Button
                        component={RouterLink}
                        to='/'
                        size='small'
                        variant='text'
                        startIcon={<HomeOutlined fontSize='small' />}
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
                            Login
                        </Typography>

                        <Typography fontSize='15px' sx={{ pt: 1, pb: 3, color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                            Entre com o seu email e senha!
                        </Typography>
                    </Stack>

                    <Box component='form' onSubmit={handleLogin}>
                        <Box className='inputs'>
                            <Box>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    id="outlined-email"
                                    type="email" required
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end" >
                                            <EmailOutlined className='icons' />
                                        </InputAdornment>
                                    }}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    id="outlined-password"
                                    type="password" required
                                    label="Senha"
                                    variant="outlined"
                                    value={senha}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end" >
                                            <HttpsOutlined className='icons' />
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
                                disabled={disableLogin}
                                startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            >
                                <Typography className='btn' >
                                    {isLoading ? 'Entrando...' : <Box><Typography  sx={{ display: 'flex', alignItems: 'center' }}>Entrar <LoginOutlined sx={{ ml: 1 }} fontSize='small'/></Typography></Box>}
                                </Typography>
                            </Button>

                            {lockoutRemaining > 0 && (
                                <Box sx={{ width: '100%', mt: 1 }}>
                                    <Typography variant="body2" color="warning.main">Bloqueado. Tente novamente em {formatTime(lockoutRemaining)}</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(100, Math.max(0, ((LOCKOUT_MS - lockoutRemaining) / LOCKOUT_MS) * 100))}
                                        sx={{ height: 8, borderRadius: 2, mt: 1 }}
                                    />
                                </Box>
                            )}

                            <Box className='links'>
                                <Box>
                                    <Link component={RouterLink} to="/recuperar-senha">Esqueceu a sua senha?</Link>
                                </Box>
                            </Box>

                            <Box className="links-account-login" sx={{ mb: 2 }}>
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