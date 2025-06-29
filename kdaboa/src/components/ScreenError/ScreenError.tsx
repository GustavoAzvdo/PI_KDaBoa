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
            </Box>
        </Container>
    )
}

export default ScreenError