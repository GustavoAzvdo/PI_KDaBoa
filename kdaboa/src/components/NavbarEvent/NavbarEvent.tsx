import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  HomeOutlined,
  Search,
  ShareOutlined,
} from "@mui/icons-material";
import logo from "../../assets/logo.png";
import './NavbarEvent.css'
const pages = [
  { label: "Home", icon: <HomeOutlined />, href: "/home" },
  { label: "Pesquisar outros eventos", icon: <Search />, href: "/search" },
];

const NavbarEvent = () => {
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
        bgcolor: "white",
        color: "black",
        fontFamily: "Fredoka, sans-serif",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
          <Box
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 50 }} />
            <Typography
              sx={{
                fontFamily: "Fredoka, sans-serif",
                fontWeight: "600",
                fontSize: "25px",
                pl: 1,
                color: "black",
              }}
            >
              KDABOA &reg;
            </Typography>
          </Box>

          {/* Logo + menu mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              component="a"
              href="/home"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img src={logo} alt="Logo" style={{ height: 45 }} />
              <Typography
                sx={{
                  fontFamily: "Fredoka, sans-serif",
                  fontWeight: "600",
                  fontSize: "22px",
                  pl: 1,
                  color: "black",
                }}
              >
                KDABOA &reg;
              </Typography>
            </Box>

            {/* Menu mobile */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                sx={{ color: "#6c15d5" }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    component="a"
                    href={page.href}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ fontFamily: "Fredoka", fontSize: "1.1rem" }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: "Fredoka", fontSize: "1.1rem" }}
                  >
                    Compartilhar
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Links Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 3,
              ml: 4,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                href={page.href}
                startIcon={page.icon}
                sx={{
                  color: "black",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  fontFamily: "Fredoka, sans-serif",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    left: 0,
                    bottom: 0,
                    bgcolor: "#6c15d5",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Botão Compartilhar Desktop */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Button
              variant="contained"
              endIcon={<ShareOutlined />}
              sx={{
                backgroundColor: "#6c15d5",
                fontFamily: "Fredoka, sans-serif",
                fontSize: "1.2rem",
                px: 3,
                py: 1,
              }}
            >
              Compartilhar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarEvent;
