import React from 'react'
import './Banner.css'
import { Box, Typography } from '@mui/material'
const Banner = () => {
  return (
    <Box className="banner-container">
       <Box className="banner-content" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant='h1'>
                Os melhores eventos em um só lugar!
            </Typography>
       </Box>
    </Box>
  )
}

export default Banner