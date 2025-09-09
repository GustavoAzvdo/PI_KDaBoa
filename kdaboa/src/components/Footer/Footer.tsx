import { Box, Container, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import logoKonectai from '../../assets/logoKonectai.png'
import { WhatsApp, Instagram, X, EmailOutlined, PhoneOutlined } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#FF8E38', py: { xs: 6, md: 12 } }}>
      <Container>
        {/* Topo do footer */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 0 }}
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          {/* Logo + direitos */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '50px', height: '50px' }}>
              <img src={logo} alt="logo" style={{ width: '100%', height: '100%' }} />
            </Box>
            <Box sx={{ pl: 1 }}>
              <Typography sx={{ fontFamily: 'var(--fredoka)', fontWeight: '600', fontSize: '23px' }}>
                KDABOA &reg;
              </Typography>
              <Typography sx={{ fontFamily: 'var(--notosans)', fontSize: '15px' }}>
                Todos os direitos reservados
              </Typography>
            </Box>
          </Box>

          {/* Redes sociais + contatos */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 10 }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
          >
            {/* Redes Sociais */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'var(--fredoka)',
                  fontWeight: 500,
                  fontSize: '23px',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: 'black',
                    borderRadius: '12px',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                Redes Sociais
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton><WhatsApp /></IconButton>
                <IconButton><Instagram /></IconButton>
                <IconButton><X /></IconButton>
              </Stack>
            </Box>

            {/* Contatos */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'var(--fredoka)',
                  fontWeight: 500,
                  fontSize: '23px',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    backgroundColor: 'black',
                    borderRadius: '12px',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                Contatos
              </Typography>
              <Stack sx={{ fontFamily: 'var(--notosans)', mt: 1 }} spacing={1}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <EmailOutlined sx={{color: 'text.secondary'}} />
                  <Typography>contato@kdaboa.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <PhoneOutlined sx={{color: 'text.secondary'}} />
                  <Typography>(12) 4002-8922</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider />
        </Box>

        {/* Desenvolvido por */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textAlign: 'center'
          }}
        >
          <Typography sx={{ fontFamily: 'var(--notosans)' }}>
            Desenvolvido por
            <Link
              href="https://konectai.vercel.app"
              sx={{
                fontWeight: 'bold',
                pl: 1,
                textDecoration: 'none',
                background: 'linear-gradient(90deg, purple, orange)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '0.3px black',
              }}
            >
              KonectAi
            </Link>
          </Typography>
          <Box sx={{ width: '25px', height: '25px' }}>
            <img src={logoKonectai} alt="" style={{ width: '100%', height: '100%' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
