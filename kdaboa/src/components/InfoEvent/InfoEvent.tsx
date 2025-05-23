

import { Avatar, Box, Button, Grid, Typography } from "@mui/material"
import "./InfoEvent.css"
import calendar from "../../assets/calendar.png"
import maps from "../../assets/maps.png"
import contacts from "../../assets/contacts.png"

const InfoEvent = () => {
    return (
        <>
            <Grid container spacing={2} sx={{ padding: 2, paddingTop: 4 }} className="container">
                <Grid size={{ xs: 12, md: 5 }} className="grid-left" >
                    <Box className='title'>
                        <Typography variant="h3" className="title-text">
                            MATUE
                        </Typography>
                    </Box>
                    <Box className="data" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 3 }}>
                        <Box className="img-calendar">
                            <img src={calendar} style={{ width: '60px', height: '60px' }} alt="" />
                        </Box>
                        <Box className="text-calendar">
                            <Typography className="text-calendar-title">Sabado, 19 de outubro de 2024 </Typography>
                            <br />
                            <Typography className="text-calendar-subtitle">Inicio: 21h00 &nbsp; &nbsp; Termino: 05h00</Typography>

                        </Box>
                    </Box>
                    <Box className="address" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 8 }}>
                        <Box className="img-maps">
                            <img src={maps} style={{ width: '60px', height: '60px' }} alt="" />
                        </Box>
                        <Box className="text-address">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography >CDG BEER GARDEN </Typography>
                                <Button variant="outlined" className="btn-maps" sx={{ marginLeft: 3 }}>
                                    <Typography>
                                        Ver mapa
                                    </Typography>
                                </Button>
                            </Box>

                            <Typography className="text-address-subtitle" sx={{ paddingTop: 2 }}>Rodovia Presidente Dutra, Guará-Lorena, KM 57 - Guaratinguetá - São Paulo, 12504-290</Typography>

                        </Box>
                    </Box>
                    <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 8 }}>
                        <Box className="img-maps">
                            <img src={contacts} style={{ width: '60px', height: '60px' }} alt="" />
                        </Box>
                        <Box className="text-contacts">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography >CONTATOS </Typography>
                                
                            </Box>
                            <Box>
                                <Typography className="text-contacts-subtitle" sx={{ paddingTop: 2 }}>Telefone 1: &nbsp; (12) 9770-7070</Typography>
                                <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Telefone 2: &nbsp; (11) 4002-8922</Typography>
                                <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Email:&nbsp; cdg@gmail.com</Typography>
                            </Box>
                           

                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 11, md: 5 }}  sx={{justifyContent: {xs: 'center', sm: 'center', md: 'flex-end'}, marginY: {xs: 9, md: 0}}}    className="grid-right"  >
                    <Box className="container-right" sx={{ display: "flex", alignItems: 'center',justifyContent: 'center' }}>
                        <Box sx={{paddingX: 2}} className="img-profile" >
                            <Avatar sx={{ width: 56, height: 56 }}>
                                
                            </Avatar>
                        </Box>
                        <Box className="text-profile" sx={{paddingRight: 1}}>
                            <Typography>
                                Produzido por CDG BEER GARDEN
                            </Typography>
                            <Button variant="outlined" className="btn-profile">
                                <Typography>
                                    Ver perfil
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                   
                </Grid>

                <Grid size={{xs: 12, md: 10}} className="grid-description" sx={{paddingTop: 4, margin: 0, textAlign: 'justify', px: {xs: 2, md: 0}}}>
                    <Box className="title-description">
                        <Typography variant="h4" className="description-title">DESCRIÇÃO DO EVENTO</Typography>
                        <Typography className="description-text" sx={{paddingY: 5}}>O evento mais esperado do ano está chegando! O CDG Beer Garden traz para você a festa de lançamento do novo álbum do Matue, com um line-up incrível e muitas surpresas. Venha curtir uma noite inesquecível com a gente!</Typography>
                    </Box>
                </Grid>
            </Grid>
           
        </>

    )
}

export default InfoEvent