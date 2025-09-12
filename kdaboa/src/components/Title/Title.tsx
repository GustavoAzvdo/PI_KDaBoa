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
              fontFamily: 'var(--fredoka)',
              fontSize: { xs: '2.3rem', md: '3.38em' },
              fontWeight: 500,
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
