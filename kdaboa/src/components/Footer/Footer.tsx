import React from 'react'
import './Footer.css'
import { Box, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import { WhatsApp, Instagram, X} from '@mui/icons-material'
const Footer = () => {
    return (
        <Box component='footer' className='footer' >
            <Box className='footer-left'>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box>
                        <img src={logo} alt="" style={{ width: 60, height: 60 }} />
                    </Box>
                    <Box className='footer-texts'>
                        <Typography>
                            KDABOA &reg;
                        </Typography>
                        <Typography className='f1'>
                            Todos os direitos reservados
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className='footer-right'>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <WhatsApp fontSize='large' />
                    <Instagram fontSize='large'/>
                    <X fontSize='large' />
                </Box>
            </Box>
        </Box>
    )
}

export default Footer