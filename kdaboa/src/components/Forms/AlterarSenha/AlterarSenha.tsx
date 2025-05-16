
import { Box, Button, Typography } from '@mui/material'
import logo from '../../../assets/logo.png'

import Password from '../../Password/Password'    
import './AlterarSenha.css'

const AlterarSenha = () => {
  return (
     <Box className='container_alterar'>
                <Box className='body_alterar'>
                    <Box className='header'>
                        <img src={logo} alt="logo" style={{ width: 30, height: 30 }}/>
                        <Typography  className='title'>
                            KDABOA
                        </Typography>
                    </Box>
                    <Box className='title' sx={{ marginTop: 1 }}>
                        <Typography  variant='h5'>
                            Alterar senha
                        </Typography>
                    </Box>
                    <Box component='form' className='form' >
                        <Box className='inputs'>
                            <Password/>   
                        </Box>
                        <Box className='btn'>
                            <Button variant="contained" className='btn-login' sx={{ marginTop: 1 }}>
                                <Typography className='btn'>
                                    Alterar
                                </Typography>
                            </Button>
                           
                        </Box>
                    </Box>
                </Box>
            </Box>
  )
}

export default AlterarSenha