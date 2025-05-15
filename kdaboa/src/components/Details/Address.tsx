import { Box, Button, Typography } from '@mui/material'
import maps from '../../assets/maps.png'
import './Details.css'

const Address = () => {
    return (
        <Box className="address" sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Box className="img-maps" sx={{ paddingRight: 2 }}>
                <img src={maps} style={{ width: '60px', height: '60px' }} alt="" />
            </Box>
            <Box className="text-address">
                <Box sx={{ display: "flex", alignItems: "center" }} className="text-address-title">
                    <Typography className='t'>CDG BEER GARDEN </Typography>
                    <Button  variant="outlined" className="btn-maps" sx={{ marginLeft: 3 }}>
                        <Typography >
                            Ver mapa
                        </Typography>
                    </Button>
                </Box>

                <Typography className="text-address-subtitle" sx={{ paddingTop: 2 }}>Rodovia Presidente Dutra, Guará-Lorena, KM 57 - Guaratinguetá - São Paulo, 12504-290</Typography>

            </Box>
        </Box>
    )
}

export default Address