import './Banner.css'
import { Box, Typography } from '@mui/material'
const Banner = () => {
  return (
    <Box className="banner-container " sx={{ height: '430px' }} >
      <Box className="banner-content"
        sx={{
          width: { xs: '100%', sm: '100%', md: '50%' },
          paddingLeft: { xs: 0, sm: 0, md: 0 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
          justifyContent: { xs: 'center', sm: 'center', md: 'center' },
          textAlign: { xs: 'center', sm: 'center', md: 'left' },
          height: '100%', // garante centralização vertical se necessário
        }}
      >
        <Typography variant='h1'
        sx={{
            padding: '40px',
            fontSize: { xs: '62px', sm: '65px', md: '73px' },
            fontWeight: '650',
            marginBottom: '20px',
            fontFamily: 'var(--notosans)',
        }}
        >
          Os melhores eventos em um só lugar!
        </Typography>
      </Box>
    </Box>
  )
}

export default Banner