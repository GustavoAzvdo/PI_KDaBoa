import { Box, Grid } from "@mui/material"
import "./BannerEvent.css"
import EventoProps from "../CardEventHome/props/EventoProps";
interface BannerEventProps {
    card: EventoProps;
    };

const BannerEvent = ({ card }: BannerEventProps) => {
  return (

    <Grid container spacing={2} sx={{ padding: 2 }} className="container">
       <Grid size={{ xs: 12, md: 10 }} className="grid-form" >
            <Box className="img-event" sx={{width: "100%", height: {xs: '100%', sm: '100%', md: '470px'}}}>
                <img  src={`http://localhost:3000/event/image/${card.foto}`} style={{width: "100%", height: "100%", objectFit: 'fill', borderRadius: '20px' }} alt="" />
            </Box>
       </Grid>
    </Grid>

  )
}

export default BannerEvent