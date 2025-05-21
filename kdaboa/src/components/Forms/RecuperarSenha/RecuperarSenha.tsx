import './RecuperarSenha.css'
import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert, CircularProgress } from '@mui/material'
import { EmailOutlined, PersonOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import api from '../../../api/api';

const RecuperarSenha = () => {
    const [email, setEmail] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [isLoading, setIsLoading] = useState<boolean>(false); // novo estado

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
        <Box className='container_recuperar'>
            <Box className='body_recuperar'>
                <Box className='header_recuperar'>
                    <img src={logo} alt="logo" style={{ width: 30, height: 30 }} />
                    <Typography className='title'>
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title' sx={{ marginTop: 5 }}>
                    <Typography variant='h5'>
                        Recuperar Senha
                    </Typography>
                </Box>
                <Box component='form' className='form_recuperar' onSubmit={handleEmail}>
                    <Box className='inputs'>
                        <Box>
                            <TextField
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type="email" required
                                label="Email"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <EmailOutlined
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>

                    </Box>
                    <Box className='btn'>
                        <Button type="submit" variant="contained" className='btn-login' sx={{ marginTop: 1 }} disabled={isLoading}>
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                <Typography className='btn'>Enviar</Typography>
                            )}
                        </Button>
                        <Box className='links_recuperar' sx={{ paddingTop: 2 }}>
                            <Box>
                                <Link href="/login">Voltar para o Login</Link>
                            </Box>
                        </Box>
                        <Box className="links-account" >
                            <Typography>
                                Não tem uma conta? <Link href="/signin">Crie Uma!</Link>
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

export default RecuperarSenha