import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.png'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='nav'>
            <Box>
                <AppBar position="static" className='navbar' elevation={0}>
                    <Toolbar className='toolbar'>
                        <Box className='btns-left'>
                            <img src={logo} alt="" style={{ width: 60, height: 60 }} className='logo' />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Button variant='text' color='inherit' size='large'>
                                    <Typography>
                                        Encontrar eventos
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                        <Box className='btns-right' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button variant='contained' color='secondary' size='large' className='btnPublicar'>
                                <Typography>
                                    Entrar
                                </Typography>
                            </Button>
                        </Box>
                    </Toolbar>

                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar