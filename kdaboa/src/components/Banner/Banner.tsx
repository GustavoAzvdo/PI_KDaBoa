import './Banner.css'
import { Box, Typography } from '@mui/material'
const Banner = () => {
  return (
    <Box className="banner-container" >
      <Box className="banner-content" sx={{
        paddingLeft: { xs: 2, md: 0 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
        justifyContent: 'center',
        textAlign: {xs: 'center', md: 'left', sm: 'center'}
      }}>
        <Typography variant='h1'>
          Os melhores eventos em um só lugar!
        </Typography>
      </Box>
    </Box>
  )
}

export default Banner