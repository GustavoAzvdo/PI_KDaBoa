import { useState } from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button,
  Container, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HomeOutlined, Search, DashboardOutlined } from '@mui/icons-material';
import logo from '../../assets/logo.png';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';

const pages = [
  { label: 'Home', icon: <HomeOutlined />, href: '/' },
  { label: 'Dashboard', icon: <DashboardOutlined />, href: '/dashboard' },
];

const NavbarLogged = () => {
 const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { setSearchText, setCategories, setDate, setCity } = useSearch();

 const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNav(event.currentTarget);
};
  const handleCloseNavMenu = () => setAnchorElNav(null);

 const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
};
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleGoToSearch = () => {
    setCity('');
    setSearchText('');
    setCategories([]);
    setDate('');
    navigate('/search');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <Typography
              sx={{
                fontFamily: 'var(--fredoka)',
                fontWeight: '600',
                fontSize: '25px',
                pl: 1,
                color: 'black',
              }}
            >
              KDABOA &reg;
            </Typography>
          </Box>

          {/* Logo + menu mobile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: { xs: '100%', md: 'auto' },
            }}
          >
            {/* Logo mobile */}
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
              <Typography
                sx={{
                  fontFamily: 'var(--fredoka)',
                  fontWeight: '600',
                  fontSize: '25px',
                  pl: 1,
                  color: 'black',
                }}
              >
                KDABOA &reg;
              </Typography>
            </Box>

            {/* Menu Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                sx={{ color: '#6c15d5' }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    component={RouterLink}
                    to={page.href}
                    onClick={handleCloseNavMenu}
                  >
                    {page.label}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleGoToSearch}>Encontrar eventos</MenuItem>
                <MenuItem onClick={() => navigate('/perfil')}>
                  Meu Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Links Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, ml: 4 }}>
            {pages.map((page) => {
              const isActive = pathname === page.href;
              return (
                <Button
                  key={page.label}
                  component={RouterLink}
                  to={page.href}
                  startIcon={page.icon}
                  sx={{
                    color: isActive ? '#6c15d5' : 'black',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    fontFamily: 'Fredoka, sans-serif',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      left: 0,
                      bottom: 0,
                      bgcolor: '#6c15d5',
                      transition: 'width 0.3s ease-in-out',
                    },
                    ...(!isActive && { '&:hover::after': { width: '100%' } }),
                  }}
                >
                  {page.label}
                </Button>
              );
            })}

            <Button
              onClick={handleGoToSearch}
              startIcon={<Search />}
              sx={{
                color: pathname === '/search' ? '#6c15d5' : 'black',
                fontSize: '1.2rem',
                fontWeight: 500,
                fontFamily: 'Fredoka, sans-serif',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: pathname === '/search' ? '100%' : '0%',
                  height: '2px',
                  left: 0,
                  bottom: 0,
                  bgcolor: '#6c15d5',
                  transition: 'width 0.3s ease-in-out',
                },
                ...(pathname !== '/search' && { '&:hover::after': { width: '100%' } }),
              }}
            >
              Encontrar eventos
            </Button>
          </Box>

          {/* Avatar + Menu de Usuário */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={user?.foto ? `http://localhost:3000/uploads/${user.foto}` : ''}
                alt={user?.nome_usuario || 'Usuário'}
              />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarLogged;
