import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Container, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { BadgeOutlined, HomeOutlined, Search, DashboardOutlined, LogoutOutlined, Face } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../../assets/logo.png';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';

const pages = [
  { label: 'Home', icon: <HomeOutlined />, href: '/' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setSearchText, setCategories, setDate, setCity } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGoToSearch = () => {
    setCity('');
    setSearchText('');
    setCategories([]);
    setDate('');
    navigate('/search');
  };

  const handleOpenLogoutModal = () => {
    setLogoutModalOpen(true);
    handleCloseUserMenu();
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutModalOpen(false);
    navigate('/login', {
      state: {
        snackbars: [
          {
            message: 'Sessão encerrada!',
            severity: 'success'
          }
        ]
      }
    });
  };

  const handleGoToDashboard = () => {
    handleCloseUserMenu();

    if (user?.tipo === 'Gerente') {
      navigate('/dashboard');
    } else if (user?.tipo === 'Funcionario') {
      navigate('/dashboard_func');
    } else {
      // Fallback para uma rota padrão caso 'tipo' não esteja definido
      console.warn("Tipo de usuário não reconhecido, redirecionando para dashboard padrão.");
      navigate('/dashboard');
    }
  };

  return (
    <>
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

                  {/* Menu mobile condicional */}
                  {isAuthenticated ? (
                    <>
                      <MenuItem onClick={() => { handleCloseNavMenu(); handleGoToDashboard(); }}>
                        <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                          Dashboard
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={() => { handleCloseNavMenu(); setLogoutModalOpen(true); }}>
                        <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                          Sair
                        </Typography>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      {isAuthenticated ? [
                        <MenuItem key="dashboard" onClick={() => { handleCloseNavMenu(); handleGoToDashboard(); }}>
                          <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                            Dashboard
                          </Typography>
                        </MenuItem>,

                        <MenuItem key="logout" onClick={() => { handleCloseNavMenu(); setLogoutModalOpen(true); }}>
                          <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                            Sair
                          </Typography>
                        </MenuItem>
                      ] : [
                        <MenuItem key="produtor" onClick={handleCloseNavMenu} component={RouterLink} to="/produtor">
                          <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                            Área do Produtor
                          </Typography>
                        </MenuItem>,

                        <MenuItem key="login" onClick={handleCloseNavMenu} component={RouterLink} to="/login">
                          <Typography textAlign="center" sx={{ fontFamily: 'Fredoka', fontSize: '1.1rem' }}>
                            Entrar
                          </Typography>
                        </MenuItem>
                      ]}
                    </>
                  )}
                </Menu>
              </Box>
            </Box>

            {/* Links Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, ml: 4 }}>
              {pages.map((page) => {
                const isActive = pathname === page.href;
                return (
                  <Button
                    component={RouterLink}
                    key={page.label}
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
                )
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

              {/* Area do produtor */}
              <Button
                component={RouterLink}
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
                Área do Produtor
              </Button>

            </Box>

            {/* Área de usuário Desktop */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              {isAuthenticated ? (
                <>
                  {/* Saudação + Menu do usuário */}
                  <Tooltip title="Menu do usuário">
                    <Button
                      onClick={handleOpenUserMenu}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{
                        pl: 2,
                        color: 'black',
                        fontFamily: 'Fredoka, sans-serif',
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(108, 21, 213, 0.1)',
                        }
                      }}
                      startIcon={<Face />}
                    >
                      Olá, {user && user.nome_usuario
                        ? user.nome_usuario.charAt(0).toUpperCase() + user.nome_usuario.slice(1).toLowerCase()
                        : 'Usuário'}
                    </Button>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleGoToDashboard}>
                      <DashboardOutlined sx={{ mr: 1 }} />
                      <Typography sx={{ fontFamily: 'Fredoka' }}>Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleOpenLogoutModal}>
                      <LogoutOutlined sx={{ mr: 1 }} />
                      <Typography sx={{ fontFamily: 'Fredoka' }}>Sair</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                //  só mostra se tiver logado
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
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* vai sair memo? ent toma modal */}
      <Dialog
        open={logoutModalOpen}
        onClose={handleCloseLogoutModal}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{
            fontFamily: 'var(--notosans)',
            fontWeight: 500,
            fontSize: '1.6rem'
          }}
        >
          Confirmar saída
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="logout-dialog-description"
            sx={{
              fontFamily: 'var(--notosans)',
              fontSize: '1rem'
            }}
          >
            Você tem certeza que deseja sair da sua conta? Será necessário fazer login novamente para acessar sua conta.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseLogoutModal}
            sx={{
              fontFamily: 'var(--notosans)',
              textTransform: 'none',
              color: 'text.secondary',
              fontSize: '1rem',
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            color="error"
            sx={{
              fontFamily: 'var(--notosans)',
              textTransform: 'none',
              fontSize: '1rem',
            }}
            endIcon={<LogoutOutlined />}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;