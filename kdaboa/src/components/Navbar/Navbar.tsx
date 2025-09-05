import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { HomeOutlined, Search } from '@mui/icons-material';
import logo from '../../assets/logo.png';

const pages = [
  { label: 'Home', icon: <HomeOutlined />, href: '/' },
  { label: 'Encontrar eventos', icon: <Search />, href: '/search' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        py: 1,
        bgcolor: 'white',
        color: 'black',
        fontFamily: 'Fredoka, sans-serif',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo Desktop */}
          <Box
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 50 }} />
            <Typography sx={{ fontFamily: 'var(--fredoka)', fontWeight: '600', fontSize: '25px', pl: 1, color: 'black' }}>
              KDABOA &reg;
            </Typography>
          </Box>
          {/* Logo Mobile */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', sm: '100%', md: 'auto' } }}>
            <Box
              component="a"
              href="/"
              sx={{

                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img src={logo} alt="Logo" style={{ height: 45 }} />
              <Typography sx={{ fontFamily: 'var(--fredoka)', fontWeight: '600', fontSize: '25px', pl: 1, color: 'black' }}>
                KDABOA &reg;
              </Typography>
            </Box>

            {/* Menu Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: '#6c15d5' }}
              >
                <MenuIcon fontSize='large' />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    component="a"
                    href={page.href}
                  >
                    <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseNavMenu} component="a" href="/login">
                  <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                    Entrar
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>



          {/* Links Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                href={page.href}
                startIcon={page.icon}
                sx={{
                  color: 'black',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  fontFamily: 'Fredoka, sans-serif',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    left: 0,
                    bottom: 0,
                    bgcolor: '#6c15d5',
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Botão Entrar */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <Button
              variant="contained"

              href="/login"
              endIcon={<PersonOutlined />}
              sx={{
                backgroundColor: '#6c15d5',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '1.2rem',
                px: 3,
                py: 1,
              }}
            >
              Entrar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
