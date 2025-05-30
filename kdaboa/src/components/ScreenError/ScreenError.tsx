import { Box, Button, Container, Typography } from '@mui/material'

import erro from '../../assets/erro.png'
const ScreenError = () => {
    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={erro} style={{ width: 200, height: 200 }} alt="erro_404" />
                    <Typography sx={{fontFamily: 'Noto Sans, sans-serif !important', fontSize: '25px', fontWeight: 500}}>Ops, algo deu errado! Err: 404 </Typography>
                </Box>
                <Box sx={{mt: 2}}>
                    <Button variant='contained' sx={{ backgroundColor: '#6C15D5' }} href='/home'>
                        <Typography sx={{ fontSize: '18px', fontFamily: 'Noto Sans, sans-serif !important' }}>Home</Typography>
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ScreenError