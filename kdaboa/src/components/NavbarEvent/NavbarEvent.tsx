import { Box, Button, Grid, Typography, Drawer, List, ListItem } from "@mui/material"
import logo from "../../assets/logo.png"
import { ShareOutlined, Menu as MenuIcon } from '@mui/icons-material';
import Link from '@mui/material/Link';
import { useState } from "react";
import "./NavbarEvent.css"



const ViewEvent = () => {
    const [open, setOpen] = useState(false);

    return (
        <Grid container spacing={2} sx={{ padding: 2 }} className="container">
            <Grid size={{ xs: 12, md: 10 }} className="grid-form"  >
                <Box className="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/home" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <img src={logo} style={{ width: 50, height: 50 }} alt="" />
                        <Typography>
                            KDABOA
                        </Typography>
                    </Link>
                    {/* Home link só aparece em telas médias pra cima */}
                    <Link
                        href="/home"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            pl: 3
                        }}
                    >
                        <Typography sx={{ fontWeight: '500 !important' }}>
                            Home
                        </Typography>
                    </Link>
                </Box>
                <Box className="right" sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Esses só aparecem em telas médias pra cima */}
                    <Link
                        href="/search"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            pl: 3,
                            pr: 3
                        }}
                    >
                        <Typography sx={{ fontFamily: 'var(--fredoka)', fontWeight: '500 !important', fontSize: '23px' }}>
                            Pesquisar outros eventos
                        </Typography>
                    </Link>
                    <Button
                        variant="contained"
                        endIcon={<ShareOutlined />}
                        size="large"
                        className="btn-share"
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <Typography>
                            Compartilhar
                        </Typography>
                    </Button>

                    {/* Botão hambúrguer só aparece no mobile */}
                    <Button
                        className='btn-hamburguer'
                        variant="outlined"
                        color='inherit'
                        sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto', alignItems: 'center' }}
                        onClick={() => setOpen(true)}

                    >
                        <MenuIcon className='menu-icon' color='inherit' sx={{ fontSize: '70px !important' }} />
                    </Button>
                </Box>
            </Grid>
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
                            }}
                        >
                            Pesquisar outros eventos
                        </Typography>
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
                            }}
                        >
                            Home
                        </Typography>
                    </ListItem>
                    <ListItem component={Button}  onClick={() => setOpen(false)}
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
                            }}
                        >
                            Compartilhar
                        </Typography>
                    </ListItem>
                </List>
            </Drawer>
        </Grid>
    )
}

export default ViewEvent