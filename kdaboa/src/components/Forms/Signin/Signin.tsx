import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert, Card, Stack, Container } from '@mui/material'
import { PersonOutlined, MailOutline } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import logo from '../../../assets/logo.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css'
import Password from '../../Password/Password';
import { Link as RouterLink } from 'react-router-dom'
import api from '../../../api/api'

const Signin = () => {
   
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [resetPasswordFields, setResetPasswordFields] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleValidationChange = (isPasswordValid: boolean) => {
        const isNameValid = name.replace(/\s/g, '').length >= 3;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
    };

    const handlePasswordChange = (password: string) => {
        setSenha(password);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
            setName(value);
        }
    };

    const nameLengthWithoutSpaces = name.replace(/\s/g, '');

    const handleCreateAccount = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/singin', {
                nome: name,
                email: email,
                senha: senha,
            });

            if (response.status === 201) {
                navigate('/login', {
                    state: {
                        snackbars: [
                            { message: 'Conta criada com sucesso!', severity: 'success' },
                            { message: 'Foi enviado um email de verificação!', severity: 'warning' }
                        ]
                    }
                });

                setName('');
                setEmail('');
                setSenha('');
                setResetPasswordFields((prev) => !prev);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error;
            if (error.response?.status === 400) {
                setSnackbarMessage('Gerente já existe ou dominio de email não permitido!');
            } else if (error.response?.status === 500) {
                setSnackbarMessage('Erro interno do servidor!');
            } else {
                setSnackbarMessage(errorMessage || 'Erro ao criar conta!');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSnackbar = (_e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    useEffect(() => {
        document.title = 'Crie sua conta';
    });

    return (
        <Box className='container_signin' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' , py: 2}}>
         <Card 
            elevation={2}
            sx={{
                width: { xs: '90%', sm: '400px' }, // responsivo
                maxWidth: '500px',
                height: 'auto',
                maxHeight: '100vh', // limita altura máxima
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
                overflow: 'auto' // scroll interno se necessário
            }}
        >
                

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
                            Criar Conta
                        </Typography>
                   
                        <Typography fontSize='15px' sx={{ pt: 1, pb: 3, color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                            Crie sua conta para continuar!
                        </Typography>
                    </Stack>

                    <Box component='form'>
                        <Box className='inputs'>
                            <Box>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    type="text"
                                    required
                                    label="Nome"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                    onFocus={() => setNameTouched(true)}
                                    onBlur={() => setNameTouched(false)}
                                    disabled={isLoading}
                                    error={nameTouched && nameLengthWithoutSpaces.length < 3}
                                    helperText={nameTouched && nameLengthWithoutSpaces.length < 3 ? 'Nome deve ter no mínimo 3 caracteres válidos!' : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonOutlined className='icons' />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    type="email"
                                    required
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    onFocus={() => setEmailTouched(true)}
                                    onBlur={() => setEmailTouched(false)}
                                    disabled={isLoading}
                                    error={emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                                    helperText={emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Digite um e-mail válido!' : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <MailOutline className='icons' />
                                            </InputAdornment>
                                        )
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
                            <Button
                                variant="contained"
                                className='btn-login'
                                disabled={!isFormValid || isLoading}
                                onClick={handleCreateAccount}
                                startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            >
                                <Typography className='btn'>
                                    {isLoading ? 'Criando...' : 'Criar Conta'}
                                </Typography>
                            </Button>

                            <Box className="links-account-signin" sx={{ mb: 2 }}>
                                <Typography>
                                    Já tem uma conta? <Link component={RouterLink} to="/login">Faça login!</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Card>
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbarSeverity} 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        fontSize: '20px',
                        fontFamily: "'Noto Sans', sans-serif",
                        '& .MuiAlert-icon': { fontSize: '30px' }
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Signin