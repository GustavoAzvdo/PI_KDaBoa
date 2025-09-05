import { Box, Grid, Typography } from '@mui/material'

import './Title.css'

const Title = ({ children }: any) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Box
          className="search"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 1, md: 2 },
          }}
        >
          <Typography
           
            sx={{
              fontFamily: 'Fredoka',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {children}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Title
