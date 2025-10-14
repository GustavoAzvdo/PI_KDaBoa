import { Box, Button, Typography, Snackbar, Alert, CircularProgress, Card, Stack, Container, Link } from '@mui/material'
import { Home } from '@mui/icons-material';
import logo from '../../../assets/logo.png'
import api from '../../../api/api'
import Password from '../../Password/Password'
import './AlterarSenha.css'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

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

    const handlePasswordChange = (senha: string) => {
        setNovaSenha(senha);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.put(
                '/auth/change-password',
                { senha: novaSenha },
                {   
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
    }, [])

    return (
        <Box className='container_alterar' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
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
                        to='/'
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
                            Alterar Senha
                        </Typography>

                        <Typography fontSize='15px' sx={{ pt: 1, pb: 3, color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                            Digite sua nova senha abaixo!
                        </Typography>
                    </Stack>

                    <Box component='form' onSubmit={handleSubmit}>
                        <Box className='inputs'>
                            <Password 
                                onValidationChange={handleValidationChange}
                                onPasswordChange={handlePasswordChange}
                                isLoading={isLoading}
                                reset={resetPasswordFields}
                            />
                        </Box>

                        <Box className='btn'>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btn-login'
                                disabled={!isSenhaValida || isLoading}
                                startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            >
                                <Typography className='btn'>
                                    {isLoading ? 'Alterando...' : 'Alterar'}
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
                    '& .MuiAlert-icon': { fontSize: '30px' },
                }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AlterarSenha