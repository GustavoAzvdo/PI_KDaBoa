import { Box, Button, Grid, Typography, Drawer, List, ListItem } from "@mui/material"
import logo from "../../assets/logo.png"
import { ShareOutlined, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from "react";
import "./NavbarEvent.css"

const ViewEvent = () => {
    const [open, setOpen] = useState(false);

    const navButtonStyle = {
        color: "black",
        fontFamily: "Fredoka, sans-serif",
        fontWeight: 500,
        fontSize: "20px",
        textTransform: "none",
        position: "relative",
        "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: -2,
            width: "0%",
            height: "3px",
            backgroundColor: "#6c15d5",
            transition: "width 0.3s ease",
        },
        "&:hover::after": {
            width: "100%",
        },
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{
                padding: 2,
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Logo + título */}
            <Grid size={{ xs: 12, md: 10 }} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        href="/home"
                        sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black', textTransform: "none" }}
                    >
                        <img src={logo} style={{ width: 50, height: 50, marginRight: 8 }} alt="Logo" />
                        <Typography sx={{ fontFamily: "Fredoka, sans-serif", fontSize: "22px", fontWeight: "bold" }}>
                            KDABOA &reg;
                        </Typography>
                    </Button>
                </Box>

                {/* Menu desktop */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Button href="/home" sx={{ ...navButtonStyle, display: { xs: 'none', md: 'flex' } }}>
                        Home
                    </Button>
                    <Button href="/search" sx={{ ...navButtonStyle, display: { xs: 'none', md: 'flex' } }}>
                        Pesquisar outros eventos
                    </Button>

                    <Button
                        variant="contained"

                      
                        endIcon={<ShareOutlined />}
                        sx={{
                            backgroundColor: '#6c15d5',
                            fontFamily: 'Fredoka, sans-serif',
                            fontSize: '1.2rem',
                            px: 3,
                            py: 1,
                        }}
                    >
                        Compartilhar
                    </Button>

                    {/* Hambúrguer mobile */}
                    <Button
                        variant="outlined"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            ml: "auto",
                            border: "none",
                            color: "black"
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon sx={{ fontSize: "40px" }} />
                    </Button>
                </Box>
            </Grid>

            {/* Drawer Mobile */}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <List sx={{ width: 250, padding: 2 }}>
                    {[
                        { label: "Home", href: "/home" },
                        { label: "Pesquisar outros eventos", href: "/search" },
                        { label: "Compartilhar", href: "#" },
                    ].map((item, index) => (
                        <ListItem key={index} sx={{ padding: 0, mb: 1 }}>
                            <Button
                                href={item.href}
                                onClick={() => setOpen(false)}
                                sx={{
                                    width: "100%",
                                    color: "black",
                                    fontFamily: "Fredoka, sans-serif",
                                    fontSize: "1.2rem",
                                    fontWeight: 500,
                                    justifyContent: "flex-start",
                                    textTransform: "none",
                                    "&:hover": { backgroundColor: 'var(--roxoNav)', color: "#fff" }
                                }}
                            >
                                {item.label}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Grid>
    )
}

export default ViewEvent
