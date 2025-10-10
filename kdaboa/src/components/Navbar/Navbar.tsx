import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { BadgeOutlined, HomeOutlined, Search } from '@mui/icons-material';
import logo from '../../assets/logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

const pages = [
  { label: 'Home', icon: <HomeOutlined />, href: '/' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { setSearchText, setCategories, setDate } = useSearch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleGoToSearch = () => {
    // Reseta ou define filtros padrão
    setSearchText('');
    setCategories([]);
    setDate('');
    navigate('/search'); // Navega para a tela de SearchEvent
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        py: 1,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        fontFamily: 'Fredoka, sans-serif',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
          <Box
            component={RouterLink}
            to="/"
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
              component={RouterLink}
              to="/"
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
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu} component={RouterLink} to={page.href}>
                    <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => { handleCloseNavMenu(); handleGoToSearch(); }}>
                  <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                    Encontrar eventos
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={RouterLink} to="/login">
                  <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                    Entrar
                  </Typography>
                </MenuItem>
                {/* novo botao para a area do produtor */}
                <MenuItem onClick={handleCloseNavMenu} component={RouterLink} to="/produtor">
                  <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                    Area do Produtor
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Links Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, ml: 4 }}>
            {pages.map((page) => (
              <Button
                component={RouterLink}
                key={page.label}
                to={page.href}
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
                  '&:hover::after': { width: '100%' },
                }}
              >
                {page.label}
              </Button>
            ))}
            <Button
              onClick={handleGoToSearch}
              startIcon={<Search />}
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
                  '&:hover::after': { width: '100%' },
                }}
            >
              Encontrar eventos
            </Button>
            <Button
              component={RouterLink}
              //rota ficticiama, ajustar quando a area do produtor estiver pronta
              to="/produtor"
              startIcon={<BadgeOutlined />}
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
                  '&:hover::after': { width: '100%' },
                }}
            >
              Area do Produtor
            </Button>
          </Box>

          {/* Botão Entrar Desktop */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/login"
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
