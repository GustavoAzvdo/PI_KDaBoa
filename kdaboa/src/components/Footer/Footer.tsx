import './Footer.css'
import { Box, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import { WhatsApp, Instagram, X } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        display: 'flex',
        height: '30vh',
        backgroundColor: 'var(--corFundo)',
        color: 'var(--corTexto)',
        alignItems: 'center',
        padding: '10px 30px',
        justifyContent: 'space-between',
        gap: 0,
        // Media query para telas até 450px 
        '@media (max-width:450px)': {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '10px',
          gap: 3,
          textAlign: 'center',
        },
      }}
    >
      <Box
        className="footer-left"
        sx={{
          width: '100%',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'flex-start',
          '@media (max-width:450px)': {
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
          },
        }}
      >
        <Box>
          <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
        </Box>
        <Box className="footer-texts" sx={{}}>
          <Typography>KDABOA &reg;</Typography>
          <Typography className="f1">Todos os direitos reservados</Typography>
        </Box>
      </Box>

      <Box
        className="footer-right"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          '@media (max-width:450px)': {
            justifyContent: 'center',
            width: '100%',
          },
        }}
      >
        <WhatsApp fontSize="large" sx={{ color: 'var(--corTexto)' }} />
        <Instagram fontSize="large" sx={{ color: 'var(--corTexto)' }} />
        <X fontSize="large" sx={{ color: 'var(--corTexto)' }} />
      </Box>
    </Box>
  )
}

export default Footer
