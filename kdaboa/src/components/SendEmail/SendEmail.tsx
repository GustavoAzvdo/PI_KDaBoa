import { Box, Button, Container, Typography, Card, Stack } from "@mui/material"
import { EmailOutlined, CheckCircleOutlined, ArrowBack, Home } from '@mui/icons-material'
import logo from '../../assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import './SendEmail.css'
import { useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom'

const SendEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    useEffect(() => {
        document.title = 'E-mail enviado';
    }, [])

    function mascararEmail(email: string) {
        const [user, dominioCompleto] = email.split('@');
        if (!user || !dominioCompleto) return '';

        const [dominio, ...ext] = dominioCompleto.split('.');
        const extensao = ext.join('.');

        const userMascarado = user[0] + '*'.repeat(Math.max(0, user.length - 1));
        const dominioMascarado = '*'.repeat(dominio.length);

        return `${userMascarado}@${dominioMascarado}.${extensao}`;
    }

    return (
        <Box className='container_send_email' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
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
                        {/* Ícone de check simples */}
                        <Box sx={{
                            width: 70,
                            height: 70,
                            borderRadius: '50%',
                            backgroundColor: '#4caf50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 3,
                            mb: 2,
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                        }}>
                            <CheckCircleOutlined sx={{ 
                                fontSize: 40, 
                                color: 'white'
                            }} />
                        </Box>
                        <Box
                            component={'img'}
                            src={logo}
                            sx={{
                                mt: 2,
                                width: '60px',
                                height: '60px'
                            }}
                        />
                        <Typography variant='h4' sx={{ pt: 1, fontFamily: 'var(--fredoka)', fontWeight: '500' }}>
                            Email Enviado!
                        </Typography>

                        <Typography fontSize='15px' sx={{ pt: 1, pb: 3, color: 'text.secondary', fontFamily: 'var(--notosans)' }}>
                            Verifique sua caixa de entrada!
                        </Typography>
                    </Stack>

                    <Box>
                        {/* Email mascarado */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            mb: 3,
                            p: 2,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            border: '1px solid #e0e0e0'
                        }}>
                            <EmailOutlined sx={{ color: '#666' }} />
                            <Typography sx={{
                                fontWeight: '500',
                                color: '#333',
                                fontSize: '1rem',
                                fontFamily: 'monospace'
                            }}>
                                {mascararEmail(email)}
                            </Typography>
                        </Box>

                        <Typography sx={{
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                            lineHeight: 1.6,
                            mb: 3,
                            textAlign: 'center',
                            fontFamily: 'var(--notosans)'
                        }}>
                            Um e-mail para alteração de senha foi enviado. Verifique sua caixa de entrada ou span e siga as instruções.
                        </Typography>

                        <Box className='btn'>
                            <Button
                                variant="contained"
                                className='btn-login'
                                startIcon={<ArrowBack />}
                                onClick={() => navigate('/login')}
                            >
                                <Typography className='btn'>
                                    Voltar para Login
                                </Typography>
                            </Button>

                            <Box className='links'>
                                <Box>
                                    <Button
                                        variant="text"
                                        onClick={() => navigate('/recuperar-senha')}
                                        sx={{
                                            fontFamily: 'var(--fredoka)',
                                            fontSize: 16,
                                            fontWeight: 400,
                                            textTransform: 'none',
                                            color: 'var(--roxoLoginBtn)',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Reenviar email
                                    </Button>
                                </Box>
                            </Box>

                            <Box className="links-account-login" sx={{ mb: 2 }}>
                                <Typography>
                                    Não tem uma conta? <Button
                                        component={RouterLink}
                                        to="/signin"
                                        variant="text"
                                        sx={{
                                            textTransform: 'none',
                                            p: 0,
                                            minWidth: 'auto',
                                            color: 'var(--roxoLoginBtn)',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Crie Uma!
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Card>
        </Box>
    )
}

export default SendEmail