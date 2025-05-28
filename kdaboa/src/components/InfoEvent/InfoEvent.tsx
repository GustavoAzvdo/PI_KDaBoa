import { Avatar, Box, Button, Grid, Typography } from "@mui/material"
import "./InfoEvent.css"
import calendar from "../../assets/calendar.png"
import Contacts from "../Details/Contacts"
import Address from "../Details/Address"
import { useLocation } from "react-router-dom"
import Banner from "../Banner/Banner"
import BannerEvent from "../BannerEvent/BannerEvent"

const InfoEvent = () => {
    const location = useLocation();
    const  card = location.state?.card;
    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <>  
            <BannerEvent card={card} />
            <Grid container spacing={2} sx={{ padding: 2, paddingTop: 4 }} className="container">
                <Grid size={{ xs: 12, md: 5 }} className="grid-left"  >
                    <Box className='title-event'>
                        <Typography variant="h3" className="title-text">
                            {card.title}
                        </Typography>
                    </Box>
                    <Box className="data" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 3 }}>
                        <Box className="img-calendar">
                            <img src={calendar} style={{ width: '60px', height: '60px' }} alt="" />
                        </Box>
                        <Box className="text-calendar" sx={{ paddingLeft: 2 }}>
                            <Typography className="text-calendar-title">{card.date}</Typography>
                            <br />
                            <Typography className="text-calendar-subtitle">Inicio: 21h00 &nbsp; &nbsp; Termino: 05h00</Typography>

                        </Box>
                    </Box>
                    <Box className="address" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 8 }}>
                       <Box>
                            <Address address={""} />
                       </Box>
                    </Box>
                    <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%", paddingTop: 8 }}>
                        <Box sx={{margin: 'auto'}}>
                            <Contacts />
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
                            <Button variant="outlined" className="btn-profile" href="/profile">
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
                        <Typography className="description-text" sx={{paddingY: 5}}>{card.description}</Typography>
                    </Box>
                </Grid>
            </Grid>
           
        </>

    )
}

export default InfoEvent