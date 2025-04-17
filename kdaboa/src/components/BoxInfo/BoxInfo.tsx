import { Box, Grid, Typography, Button } from "@mui/material"
import festa from "../../assets/festa.png"

import './BoxInfo.css'
const BoxInfo = () => {
  return (
    <Grid container spacing={2} className="box-info-container" sx={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} className="box-info">
        <Box className="texts">
          <Typography className="p1">
            Ei, produtor! O KdAboa é a plataforma perfeita para divulgar seus eventos e atrair seu público.
          </Typography>
          <Typography className="p2">
            Junte-se aos milhares de produtores que já estão transformando suas vendas com o KdAboa!
          </Typography>
        </Box>
        <Box className="btns" sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'center',
              md: 'flex-start',
            },
            alignItems: 'center',
          }}>

          <Button variant='outlined' color='inherit' size='large'>
            <Typography className="btn-text">
              Quero me cadastrar!
            </Typography>
          </Button>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box className="festa"
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'center',
              md: 'flex-end',
            },

            paddingTop: {
              sm: 3
            },
            alignItems: 'center',
          }}>
          <img src={festa}
            style={{ width: '80%', height: '100%', alignItems: 'center' }}
            className="festa"
          />

        </Box>

      </Grid>
    </Grid>
  )
}

export default BoxInfo