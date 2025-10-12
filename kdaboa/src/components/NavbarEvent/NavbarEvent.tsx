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
import './NavbarEvent.css';
import { Link as RouterLink, useNavigate } from "react-router-dom"; 
import ShareEvento from "../Share/ShareEvento";
import EventoProps from '../CardEventHome/props/EventoProps'; 


interface NavbarEventProps {
  evento?: EventoProps;
}

const NavbarEvent = ({ evento }: NavbarEventProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [whatsMessage, setWhatsMessage] = useState("");
  const navigate = useNavigate(); // Hook de navegação

  if (!evento) {
    return null;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleShare = () => {
  
    if (!evento?.Endereco) return;
    const enderecoCompleto = `${evento.Endereco.logradouro}, ${evento.Endereco.numero}, ${evento.Endereco.bairro} - ${evento.Endereco.cidade}/${evento.Endereco.estado}`;
    const dataFormatada = new Date(evento.data_inicio).toLocaleDateString("pt-BR");
    const horaFormatada = new Date(evento.data_inicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    const telefone = evento.Estabelecimento.Contato?.tel_cel_1 || "Não informado";

    const message = (
      `🎉 Ei! Olha só este evento que eu achei no *KDABOA!* 🤙\n\n` +
      `*${evento.nome_evento}*\n\n` +
      `📅 Data: *${dataFormatada}*\n\n` +
      `⏰ Horário: *${horaFormatada}*\n\n` +
      `📍 Local: ${enderecoCompleto}\n\n` +
      `🏢 Estabelecimento: ${evento.Estabelecimento.nome}\n\n` +
      `📞 Contato: ${telefone}\n\n` +
      `📝 Descrição: _${evento.descricao}_\n`
    );
    setWhatsMessage(message);
    setShareOpen(true);
  };


  const pages = [
    { label: "Home", icon: <HomeOutlined />, action: () => navigate("/") },
    { label: "Pesquisar outros eventos", icon: <Search />, action: () => navigate("/search") },
  ];

  return (
    <AppBar
      position="sticky" 
      elevation={3}
      sx={{
        py: 1,
        bgcolor: "rgba(255, 255, 255, 0.9)",
        color: "black",
        fontFamily: "Fredoka, sans-serif",
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
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 50 }} />
            <Typography
              sx={{
                fontFamily: "var(--fredoka)",
                fontWeight: "600",
                fontSize: "25px",
                pl: 1,
                color: "black",
              }}
            >
              KDABOA &reg;
            </Typography>
          </Box>

          {/* Container Mobile (Logo + Menu) */}
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
              to="/"
              sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            >
              <img src={logo} alt="Logo" style={{ height: 45 }} />
              <Typography sx={{ fontFamily: "var(--fredoka)", fontWeight: "600", fontSize: "22px", pl: 1, color: "black" }}>
                KDABOA &reg;
              </Typography>
            </Box>

            {/* Menu Mobile */}
            <Box>
              <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: "#6c15d5" }}>
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={() => { page.action(); handleCloseNavMenu(); }}>
                    <Typography textAlign="center" sx={{ fontFamily: "Fredoka", fontSize: "1.1rem" }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => { handleShare(); handleCloseNavMenu(); }}>
                  <Typography textAlign="center" sx={{ fontFamily: "Fredoka", fontSize: "1.1rem" }}>
                    Compartilhar
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Links Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={page.action}
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
                  "&:hover::after": { width: "100%" },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Botão Compartilhar Desktop */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Button
              variant="contained"
              endIcon={<ShareOutlined />}
              onClick={handleShare}
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

      {/* Modal de Compartilhamento */}
      <ShareEvento
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        eventUrl={`https://kdaboa.vercel.app/view-event/${evento.id_evento}`} // Use o ID do evento aqui
        eventTitle={evento.nome_evento}
        whatsMessage={whatsMessage}
      />
    </AppBar>
  );
};

export default NavbarEvent;