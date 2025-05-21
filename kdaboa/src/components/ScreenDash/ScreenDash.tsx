import { Container, Box, Typography } from '@mui/material'
import em_breve from '../../assets/em_breve.png'
import { useEffect } from 'react'
const ScreenDash = () => {

  useEffect(() => {
    document.title = 'Dashboard';
  })

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box>
        <img
          src={em_breve} alt="" style={{
            filter: 'drop-shadow(0 4px 32px rgba(108,21,213,0.4))',
            width: 200, height: 200
          }} />
      </Box>
      <Box>
        <Typography component="p" sx={{ fontFamily: 'Fredoka', fontSize: 30, fontWeight: 500 }}>
          Em construção ...
        </Typography>
      </Box>
    </Container>
  )
}

export default ScreenDash