import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import logo from '../../assets/logo.png';
import Link from '@mui/material/Link';
import Person from '@mui/icons-material/Person';
import './Navbar.css';
import { Home, Search } from '@mui/icons-material';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='nav'>
      <Box>
        <AppBar position="static" className='navbar-home' elevation={0}>
          <Toolbar className='toolbar-home'>
            <Box className='btns-left-home' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href='/home' sx={{ pl: 0, display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="" className='logo-home' />
              </Link>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                <Button variant='text' color='inherit' size='large' endIcon={<Home />}>
                  <Link href='/home' sx={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Home</Typography>
                  </Link>
                </Button>
                <Button variant='text' color='inherit' size='large' endIcon={<Search />}>
                  <Link href='/search' sx={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Encontrar eventos</Typography>
                  </Link>
                </Button>
              </Box>
            </Box>

            {/* Botões normais no desktop */}
            <Box className='btns-right-home' sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Button variant='contained' color='secondary' href='/' size='large' className='btnPublicar' endIcon={<Person />}>
                <Typography>Entrar</Typography>
              </Button>
            </Box>

            {/* Botão hambúrguer no mobile */}
            <Button
              className='btn-hamburguer'
              variant="outlined"
              color='inherit'
              sx={{ display: { xs: 'block', md: 'none' }, marginLeft: 'auto' }}
              onClick={() => setOpen(true)}

            >
              <MenuIcon className='menu-icon' color='inherit' sx={{ fontSize: 40 }} />
            </Button>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <List sx={{ width: 250, padding: 2 }} className='list'>
            <ListItem component={Button} href={'/search'} onClick={() => setOpen(false)}
              sx={{
                transition: 'background 0.2s',
                '&:hover': {
                  backgroundColor: 'var(--roxoNav)',
                  '& .MuiTypography-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: 'var(--roxoNav)',
                  fontFamily: 'var(--notosans)',
                  fontSize: '1.2rem',
                  fontWeight: ''
                }}
              >
                Encontrar eventos
              </Typography>
            </ListItem>

            <ListItem component={Button} href={'/'} onClick={() => setOpen(false)}
              sx={{
                transition: 'background 0.2s',
                '&:hover': {
                  backgroundColor: 'var(--roxoNav)',
                  '& .MuiTypography-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: 'var(--roxoNav)',
                  fontFamily: 'var(--notosans)',
                  fontSize: '1.2rem',
                  fontWeight: ''
                }}
              >Entrar</Typography>
            </ListItem>

            <ListItem component={Button} href={'/home'} onClick={() => setOpen(false)}
              sx={{
                transition: 'background 0.2s',
                '&:hover': {
                  backgroundColor: 'var(--roxoNav)',
                  '& .MuiTypography-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: 'var(--roxoNav)',
                  fontFamily: 'var(--notosans)',
                  fontSize: '1.2rem',
                  fontWeight: ''
                }}
              >Home</Typography>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Navbar;
