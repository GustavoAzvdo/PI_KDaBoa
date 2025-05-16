import './RecuperarSenha.css'
import { Box, Typography, TextField, InputAdornment, Button, Link } from '@mui/material'
import {PersonOutlined} from '@mui/icons-material';
import logo from '../../../assets/logo.png'
const RecuperarSenha = () => {
  return (
     <Box className='container_recuperar'>
            <Box className='body_recuperar'>
                <Box className='header_recuperar'>
                    <img src={logo} alt="logo" style={{ width: 30, height: 30 }}/>
                    <Typography  className='title'>
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title' sx={{ marginTop: 5 }}>
                    <Typography  variant='h5'>
                        Recuperar Senha
                    </Typography>
                </Box>
                <Box component='form' className='form_recuperar'>
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
                        
                    </Box>
                    <Box className='btn'>
                        <Button href="/email-enviado" variant="contained" className='btn-login' sx={{ marginTop: 1 }} component={Link}>
                            <Typography className='btn' >
                                Enviar
                            </Typography>
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
        </Box>
  )
}

export default RecuperarSenha