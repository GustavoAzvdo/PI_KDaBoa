import { Box, Button, Typography, Snackbar, Alert, CircularProgress } from '@mui/material'
import logo from '../../../assets/logo.png'
import api from '../../../api/api'
import Password from '../../Password/Password'
import './AlterarSenha.css'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AlterarSenha: React.FC = () => {
    const [] = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [, setConfirmaSenha] = useState<string>('');
    const [resetPasswordFields, setResetPasswordFields] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [isSenhaValida, setIsSenhaValida] = useState<boolean>(false);

    const handleValidationChange = (isValid: boolean) => {
        setIsSenhaValida(isValid);
    };

    const handlePasswordChange = (senha: string, confirma: string) => {
        setNovaSenha(senha);
        setConfirmaSenha(confirma);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);


        try {
            await api.put(
                '/auth/change-password',
                { senha: novaSenha }, // corpo da requisição
                {   
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     'x-csrf-token': token
                    // },
                    withCredentials: true,
                }
            )
            setSnackbarMessage('Senha alterada com sucesso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setConfirmaSenha('');
            setNovaSenha('');
            setResetPasswordFields(true);
            
        } catch (error: any) {
            if (error.response?.status === 400) {
                setSnackbarMessage('Requisição inválida.');
                setSnackbarSeverity('error');
            } else if (error.response?.status === 500) {
                setSnackbarMessage('Erro interno do servidor.');
                setSnackbarSeverity('error');
            } else {
                console.log(error)
                setSnackbarMessage('Erro ao alterar senha!');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Alterar senha';
    },[])
    return (
        <Box className='container_alterar'>
            <Box className='body_alterar'>
                <Box className='header-alterar'>
                    <img src={logo} alt="logo" className='logo-alterar' />
                    <Typography >
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title_alterar' sx={{ marginTop: 1 }}>
                    <Typography variant='h5'>
                        Alterar senha
                    </Typography>
                </Box>
                <Box component='form' className='form' onSubmit={handleSubmit}>
                    <Box className='inputs'>
                        <Password pegarSenha={handlePasswordChange}
                            onValidationChange={handleValidationChange}
                            isLoading={isLoading}
                            reset={resetPasswordFields}
                        />
                    </Box>
                    <Box className='btn'>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isSenhaValida || isLoading}
                            className='btn-login'
                            sx={{ marginTop: 1 }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                <Typography className='btn'>
                                    Alterar
                                </Typography>
                            )}
                        </Button>
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
                    '& .MuiAlert-icon': { fontSize: '30px' },
                }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AlterarSenha