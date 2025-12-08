import './Banner.css'
import { Box, Typography } from '@mui/material'
import RotatingText from '../../../ReactBits/RotatingText'
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
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center', 
          alignItems: 'center',
          width: 'auto',
          height: 'auto',
        }}>

          <Typography variant='h1'
            sx={{
              padding: '40px',
              fontSize: { xs: '62px', sm: '65px', md: '73px' },
              fontWeight: '650',
              marginBottom: '20px',
              fontFamily: 'var(--notosans)',
            }}
          >
            <span style={{ paddingRight: '10px' }}>
              Os melhores
            </span>

            <Box sx={{
              color: 'white',
              py: 1,
              px: 3,
              bgcolor: 'var(--roxoForteDashboard)', borderRadius: 2, display: "inline-flex",
              transition: "width 1s ease, min-width 0.4s ease",
              overflow: "hidden",
            }}>
              <RotatingText
                texts={['eventos', ' shows ', ' rolês ', 'festivais', 'encontros', ' afters ', 'roteiros', 'sunsets']}
                staggerFrom={"last"}
                initial={{ y: "130%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%", opacity: 0 }}
                animatePresenceMode='wait'
                splitBy='characters'

                staggerDuration={0.045}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 500 }}
                rotationInterval={3000}
              />

            </Box>
            <span style={{ paddingLeft: '10px' }}>
              em um só lugar!

            </span>
          </Typography>

        </Box>
      </Box>
    </Box>
  )
}

export default Banner