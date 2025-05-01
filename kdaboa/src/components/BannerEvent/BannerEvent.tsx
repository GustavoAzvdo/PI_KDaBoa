import { Box, Grid } from "@mui/material"
import "./BannerEvent.css"
import banner from "../../../public/Image_cardHomeEvent/matue.jpeg"

const BannerEvent = () => {
  return (

    <Grid container spacing={2} sx={{ padding: 2 }} className="container">
       <Grid size={{ xs: 12, md: 10 }} className="grid-form" >
            <Box className="img-event" sx={{width: "100%", height: "480px"}}>
                <img src={banner} style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: '20px' }} alt="" />
            </Box>
       </Grid>
    </Grid>

  )
}

export default BannerEvent