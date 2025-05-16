import { Box, Button, Container, Typography } from "@mui/material"
import logo from '../../assets/logo.png'
import './SendEmail.css'
const SendEmail = () => {
    return (
        <Container className="container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5,width: '60%' }}>
            <Box className="img-logo">
                <img src={logo} style={{ width: 60, height: 60 }} alt="" />
            </Box>
            <Box className="text" sx={{ marginTop: 2, textAlign: 'center' }}>
                <Box className="text-1">
                    <Typography>
                        Um e-mail para alteração de senha foi enviado para o endereço <Typography component="span" sx={{ fontWeight: 'bold', color: 'var(--roxoEmail)', fontSize: 20 }}>ghca12@gmail.com</Typography>
                    </Typography>
                </Box>
                <Box className="text-2" sx={{ marginTop: 2 }}>
                    <Typography>
                        Verifique sua caixa de entrada e siga as instruções para definir uma nova senha. Se não encontrar o e-mail, confira também a pasta de spam ou lixo eletrônico.
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 3 }}>
                    <Button className="btn-voltar" size="large" variant="contained" href='/login'>
                        <Typography>
                            Voltar para o login
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default SendEmail