import { Box, Grid } from "@mui/material";
import EventoProps from "../CardEventHome/props/EventoProps";

interface BannerEventProps {
  card: EventoProps;
}

const BannerEvent = ({ card }: BannerEventProps) => {
  const imageUrl = `http://localhost:3000/event/image/${card.foto}`;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: '300px', sm: '350px', md: '550px' }, 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#111',
        isolation: 'isolate', 
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'blur(15px)',
          zIndex: -1, 
        },
      }}
    >
      <Grid 
        container 
        sx={{ 
          justifyContent: 'center', 
          padding: { xs: '20px 10px', md: '40px 20px' }, 
          width: '100%', 
          maxWidth: '1300px', 
        }}
      >
       
        <Grid size={{xs: 12, sm: 12, md: 12}} sx={{width: '100%'}}> 
          <Box
            sx={{
              width: {xs: '100%', sm: '100%', md: '100%'},
              height: { xs: '100%', sm: '300px', md: '400px' }, 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0)',
              borderRadius: '20px',
              overflow: 'hidden', 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
               
            }}
          >
            <img
              src={imageUrl}
              alt={card.nome_evento}
              style={{
                width: "100%",
                height: "100%",
                objectFit: 'fill', //ou cover, depende, vou ver ainda
                borderRadius: '20px',
                display: 'block'
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerEvent;