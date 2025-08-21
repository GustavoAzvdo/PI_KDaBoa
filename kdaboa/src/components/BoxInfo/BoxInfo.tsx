import { Box, Grid, Typography, Button} from "@mui/material"
import festa from "../../assets/festa.png"
import './BoxInfo.css'
import { PersonAddAlt1 } from "@mui/icons-material"

const BoxInfo = () => {

  return (
    <Grid container spacing={2} className="box-info-container" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} className="box-info">
        <Box className="texts">
          <Typography className="p1">
            Ei, produtor! O KdAboa é a plataforma perfeita para divulgar seus eventos e atrair seu público.
          </Typography>
          <Typography className="p2">
            Junte-se aos produtores que já estão transformando suas vendas com o KdAboa!
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

          <Button endIcon={<PersonAddAlt1 />} variant='outlined' color='inherit' size='large' href="/signin" className="btn-cadastrar">
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
            width: { xs: '100%', sm: '100%', md: '100%' },
            heuight: { xs: '100%', sm: '100%', md: '100%' },
          }}>


        </Box>

        <Box
          component="img"
          src={festa}
          alt="Festa"
          sx={{
            width: {
              xs: '100%',   // celulares (se visível)
              md: '80%',    // desktops
            },
            height: 'auto',
            display: {
              xs: 'none',   // 👉 ESCONDE em celulares (até 600px)
              sm: 'none',   // opcional, garante até ~960px
              md: 'block',  // 👉 MOSTRA em desktops
            },
            maxWidth: '100%',
          }}
        />
        
      </Grid>
    </Grid>
  )
}

export default BoxInfo