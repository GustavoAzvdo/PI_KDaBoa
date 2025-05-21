import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert } from '@mui/material'
import { PersonOutlined, MailOutline } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import logo from '../../../assets/logo.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css'
import Password from '../../Password/Password';

//API
import api from '../../../api/api'

const Signin = () => {
    const [nameFocused, setNameFocused] = useState(false);

    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
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

    const navigate = useNavigate();
    const handleValidationChange = (isPasswordValid: boolean) => {
        const isNameValid = name.length >= 3;
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

    const handleCreateAccount = async () => {
        setIsLoading(true); // Ativa o estado de carregamento
        try {
            const response = await api.post('/auth/singin', {
                nome: name,
                email: email,
                senha: senha,
            });

            if (response.status === 201) {

                navigate('/', {
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
            console.log(error.response.data.message);
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
            setIsLoading(false); // Desativa o estado de carregamento
        }
    };

    const handleCloseSnackbar = (_e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    useEffect(() => {
        if (isFormValid) {
            setBodyHeight(735);
        } else {
            setBodyHeight(735);
        }
    }, [isFormValid]);

    useEffect(() => {
        document.title = 'Crie sua conta';
    })
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
                                onFocus={() => setNameTouched(true)}
                                onBlur={() => setNameTouched(false)}
                                disabled={isLoading}
                                fullWidth
                                value={name}
                                onChange={handleNameChange}
                                sx={{ color: 'var(--roxoForm) !important' }}
                                margin='normal'
                                id={name.length > 3 ? 'outlined-basic' : 'outlined-error'}
                                error={nameTouched && name.length < 3}
                                helperText={nameTouched && name.length < 3 ? 'Nome deve ter no mínimo 3 caracteres!' : ''} type="text" required
                                label="Nome"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (<InputAdornment position="end" >
                                        <PersonOutlined
                                            className='icons'
                                        />
                                    </InputAdornment>
                                    ),
                                    className: nameFocused && name.length >= 3 ? 'valid' : undefined

                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                onFocus={() => setEmailTouched(true)}
                                onBlur={() => setEmailTouched(false)}
                                disabled={isLoading}
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                fullWidth
                                required
                                margin='normal'
                                id="outlined-basic"
                                type="email"
                                label="Email"
                                error={emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)} // 
                                helperText={emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Digite um e-mail válido!' : ''}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (<InputAdornment position="end" >
                                        <MailOutline
                                            className='icons'
                                        />
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
                autoHideDuration={5000}
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