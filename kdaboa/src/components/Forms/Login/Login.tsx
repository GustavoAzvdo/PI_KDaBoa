import { Box, Typography, TextField, InputAdornment, Button, Link } from '@mui/material'
import {PersonOutlined, HttpsOutlined} from '@mui/icons-material';
import logo from '../../../assets/logo.png'
import './Login.css'
const Login = () => {
    return (
        <Box className='container'>
            <Box className='body'>
                <Box className='header'>
                    <img src={logo} alt="logo" style={{ width: 30, height: 30 }}/>
                    <Typography  className='title'>
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title'>
                    <Typography  variant='h5'>
                        Login
                    </Typography>
                </Box>
                <Box component='form' className='form'>
                    <Box className='inputs'>
                        <Box>
                            <TextField 
                                fullWidth 
                                margin='normal' 
                                id="outlined-basic" 
                                type="email" required 
                                label="Email" 
                                variant="outlined" 
                                InputProps={{endAdornment: <InputAdornment position="end" >
                                                                <PersonOutlined 
                                                                    className='icons'
                                                                />
                                                            </InputAdornment>}}
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
                                InputProps={{endAdornment: <InputAdornment position="end" >
                                                                <HttpsOutlined 
                                                                    className='icons'
                                                                />
                                                            </InputAdornment>}}
                                />
                        </Box>
                    </Box>
                    <Box className='btn'>
                        <Button variant="contained" className='btn-login'>
                            <Typography className='btn'>
                                Entrar
                            </Typography>
                        </Button>
                        <Box className='links'>
                            <Box>
                                <Link href="#">Esqueceu a sua senha?</Link>
                            </Box>
                        </Box>
                        <Box className="links-account">
                                <Typography>
                                    Não tem uma conta? <Link href="#">Crie Uma!</Link>
                                </Typography>
                            </Box>
                            
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login