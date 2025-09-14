import { useState, useEffect } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import api from '../../api/api'
const pages = [
  { label: "Home", icon: <HomeOutlined />, href: "/home" },
  { label: "Pesquisar outros eventos", icon: <Search />, href: "/search" },
];
type Props = { id: number };

const NavbarEvent = ({ id }: Props) => {
  const [evento, setEvento] = useState<any>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  console.log(evento?.nome_evento)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await api.get(`/event/${id}`);
        setEvento(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvento();
  }, [id]);

  const handleShare = () => {
    if (!evento?.Endereco) return;
    const enderecoCompleto = `${evento.Endereco.logradouro}, ${evento.Endereco.numero}, ${evento.Endereco.bairro} - ${evento.Endereco.cidade}/${evento.Endereco.estado}`;
    const dataFormatada = new Date(evento.data_inicio).toLocaleDateString("pt-BR");
    const horaFormatada = new Date(evento.data_inicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    const telefone = evento.Estabelecimento.Contato?.tel_cel_1 || "Não informado";

    const message = encodeURIComponent(
      `🎉 Ei! Olha só este evento que eu achei no *KDABOA!* 🤙\n\n` +
      `*${evento.nome_evento}*\n` +
      `📅 Data: *${dataFormatada}*\n` +
      `⏰ Horário: *${horaFormatada}*\n` +
      `📍 Local: ${enderecoCompleto}\n` +
      `🏢 Estabelecimento: ${evento.Estabelecimento.nome}\n` +
      `📞 Contato: ${telefone}\n` +
      `📝 Descrição: _${evento.descricao}_\n\n`
    );

    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
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
            component={RouterLink}
            to="/home"
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
              component={RouterLink}
              to="/home"
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
                    component={RouterLink}
                    to={page.href}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ fontFamily: "Fredoka", fontSize: "1.1rem" }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleShare} sx={{cursor: 'pointer'}}>
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: "Fredoka", fontSize: "1.1rem" }}
                    onClick={handleShare}
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
                component={RouterLink}
                key={page.label}
                to={page.href}
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
              onClick={handleShare}
             
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
