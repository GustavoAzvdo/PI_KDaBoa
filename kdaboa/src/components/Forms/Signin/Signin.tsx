import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert } from '@mui/material'
import { PersonOutlined, MailOutline } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import logo from '../../../assets/logo.png'
import { useEffect, useState } from 'react';
import './Signin.css'
import Password from '../../Password/Password';

//API
import api from '../../../api/api'

const Signin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [bodyHeight, setBodyHeight] = useState<number>(760);
    const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // Mensagem da Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Tipo da Snackbar
    const [resetPasswordFields, setResetPasswordFields] = useState<boolean>(false); // Estado para redefinir os campos de senha

    const handleValidationChange = (isPasswordValid: boolean) => {
        const isNameValid = name.length >= 3;
        setIsFormValid(isNameValid && isPasswordValid);
    };

    const handlePasswordChange = (password: string) => {
        setSenha(password);
    };

    const handleCreateAccount = async () => {
        setIsLoading(true); // Ativa o estado de carregamento
        try {
            const response = await api.post('/auth/singin', {
                nome: name,
                email: email,
                senha: senha,
            });

            if (response.status === 201) {
                setSnackbarMessage('Conta criada com sucesso!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                setTimeout(() => {
                    setSnackbarMessage('Foi enviado um email de verificação!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }, 4000);


                setName('');
                setEmail('');
                setSenha('');
                setResetPasswordFields((prev) => !prev);
            }


        } catch (error: any) {
            const errorMessage = error.response?.data?.error;
            console.log(error.response.data.message);
            if (error.response?.status === 409) {
                setSnackbarMessage('Erro nos dados fornecidos. Verifique e tente novamente.');
            } else if (error.response?.status === 400) {
                setSnackbarMessage('Este e-mail já está cadastrado!');
            } else {
                setSnackbarMessage(errorMessage || 'Erro ao criar conta!');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento
        }
    };

    const handleCloseSnackbar = (e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    useEffect(() => {
        if (isFormValid) {
            setBodyHeight(735);
        } else {
            setBodyHeight(785);
        }
    }, [isFormValid]);
    return (
        <Box className='container_signin'>
            <Box className="body_signin" sx={{ height: `${bodyHeight}px` }}> {/* Altura dinâmica */}
                <Box className='header_signin'>
                    <img src={logo} alt="logo" style={{ width: 30, height: 30 }} />
                    <Typography className='title'>
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title'>
                    <Typography variant='h5'>
                        Crie sua conta
                    </Typography>
                </Box>
                <Box component='form' className='form_signin'>
                    <Box className='inputs'>
                        <Box>
                            <TextField
                                disabled={isLoading}
                                fullWidth
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                sx={{ color: 'var(--roxoForm) !important' }}
                                margin='normal'
                                id={name.length > 3 ? 'outlined-basic' : 'outlined-error'}
                                error={name.length < 3}
                                helperText={name.length < 3 ? 'Nome deve ter no mínimo 3 caracteres!' : ''}
                                type="text" required
                                label="Nome"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <PersonOutlined
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                disabled={isLoading}
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                fullWidth
                                required
                                margin='normal'
                                id="outlined-basic"
                                type="email"
                                label="Email"
                                error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)} // 
                                helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Digite um e-mail válido!' : ''}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <MailOutline
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>

                        <Password
                            key={resetPasswordFields.toString()}
                            onValidationChange={handleValidationChange}
                            onPasswordChange={handlePasswordChange}
                            reset={resetPasswordFields}
                            isLoading={isLoading}
                        />                    
                        </Box>
                    <Box className='btn'>
                        <Button variant="contained" size="large" className='btn-login' disabled={!isFormValid || isLoading} sx={{ padding: '10px', minWidth: '150px', height: '40px' }} onClick={handleCreateAccount}>
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" /> // Exibe o spinner enquanto está carregando
                            ) : (
                                <Typography className="btn">Criar Conta</Typography>
                            )}
                        </Button>

                        <Box className="links-account-signin">
                            <Typography>
                                Já tem uma conta? <Link href="/login">Faça login!</Link>
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleCloseSnackbar} className='alert' severity={snackbarSeverity} sx={{
                    display: 'flex', alignItems: 'center', width: '100%', fontSize: '20px', '& .MuiAlert-icon': {
                        fontSize: '30px',
                    },
                }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Signin