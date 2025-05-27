import { Box, Button, Container, Typography } from "@mui/material"
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import './SendEmail.css'
import { useEffect } from "react"
const SendEmail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    useEffect(() => {
        document.title = 'E-mail enviado';
    })

    function mascararEmail(email: string) {
        const [user, dominioCompleto] = email.split('@');
        if (!user || !dominioCompleto) return '';

        const [dominio, ...ext] = dominioCompleto.split('.');
        const extensao = ext.join('.');

        const userMascarado = user[0] + '*'.repeat(Math.max(0, user.length - 1));
        const dominioMascarado = '*'.repeat(dominio.length);

        return `${userMascarado}@${dominioMascarado}.${extensao}`;
    }

    return (
        <Container className="container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5, width: '60%' }}>
            <Box className="img-logo">
                <img src={logo} style={{ width: 60, height: 60 }} alt="" />
            </Box>
            <Box className="text" sx={{ marginTop: 2, textAlign: 'center' }}>
                <Box className="text-1">
                    <Typography>
                        Um e-mail para alteração de senha foi enviado para o endereço <Typography component="span" sx={{ fontWeight: 'bold', color: 'var(--roxoEmail)', fontSize: 20 }}>{mascararEmail(email)}</Typography>
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