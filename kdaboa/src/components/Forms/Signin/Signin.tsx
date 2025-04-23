import { Box, Typography, TextField, InputAdornment, Button, Link } from '@mui/material'
import { PersonOutlined, HttpsOutlined, MailOutline, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import logo from '../../../assets/logo.png'
import { useState } from 'react';
import './Signin.css'
const Signin = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownPasswordConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPasswordConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box className='container'>
            <Box className='body'>
                <Box className='header'>
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
                <Box component='form' className='form'>
                    <Box className='inputs'>
                        <Box>
                            <TextField
                                fullWidth
                                sx={{ color: 'var(--roxoForm) !important' }}
                                margin='normal'
                                id="outlined-basic"
                                type="email" required
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

                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type="email" required
                                label="Email"
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
                        <Box>
                            <TextField
                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type={showPassword ? 'text' : 'password'} required
                                label="Senha"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" >
                                            <Button
                                                color='inherit'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                style={{
                                                    minWidth: 0, // Remove largura mínima padrão do botão
                                                    padding: 0, // Remove o padding interno
                                                }}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffOutlined className='icons' />
                                                ) : (
                                                    <VisibilityOutlined className='icons' />
                                                )}
                                            </Button>
                                            
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type={showPasswordConfirm ? 'text' : 'password'} required
                                label="Confirme sua senha"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" >
                                            <Button
                                                color='inherit'
                                                onClick={handleClickShowPasswordConfirm}
                                                onMouseDown={handleMouseDownPasswordConfirm}
                                                onMouseUp={handleMouseUpPasswordConfirm}
                                                style={{
                                                    minWidth: 0, // Remove largura mínima padrão do botão
                                                    padding: 0, // Remove o padding interno
                                                }}
                                            >
                                                {showPasswordConfirm ? (
                                                    <VisibilityOffOutlined className='icons' />
                                                ) : (
                                                    <VisibilityOutlined className='icons' />
                                                )}
                                            </Button>
                                            
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Box>
                    <Box className='btn'>
                        <Button variant="contained" className='btn-login' sx={{ padding: '10px' }}>
                            <Typography className='btn'>
                                Criar conta
                            </Typography>
                        </Button>

                        <Box className="links-account">
                            <Typography>
                                Já tem uma conta? <Link href="#">Faça login!</Link>
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signin