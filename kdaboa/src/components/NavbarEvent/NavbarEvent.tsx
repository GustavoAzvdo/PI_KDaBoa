import { Box, Button, Grid, Typography } from "@mui/material"
import logo from "../../assets/logo.png"
import { ShareOutlined } from '@mui/icons-material';

import "./NavbarEvent.css"
const ViewEvent = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }} className="container">
        <Grid size={{ xs: 12, md: 10 }} className="grid-form" >
            <Box className="left">
                <img src={logo} style={{ width: 50, height:50 }} alt="" />
                <Typography>
                    KDABOA
                </Typography>
            </Box>
            <Box className="right">
                <Button variant="contained" endIcon={<ShareOutlined />} size="large" className="btn-share">
                   <Typography>
                        Compartilhar
                   </Typography>
                </Button>
            </Box>
        </Grid>
    </Grid>
  )
}

export default ViewEvent