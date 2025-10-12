import { Container, ImageList, ImageListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import './Photos.css';
import EventoProps from '../CardEventHome/props/EventoProps';
type EstablishmentData = EventoProps['Estabelecimento'];
interface PhotosProps {
  card: {
    Estabelecimento?: EstablishmentData;
  };
}

const Photos = ({ card }: PhotosProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const galeria = card?.Estabelecimento?.Galeria;

  if (!galeria || galeria.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h6" color="text.secondary">
          Nenhuma foto disponível para este estabelecimento.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
       height: '80vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        flexDirection: 'column', 
      }}
    >
      <ImageList
        sx={{ width: '82vw', maxWidth: 1450 }}
        gap={20}
        cols={isSmallScreen ? 1 : 2}
        rowHeight={300}
      >
        {galeria.map((gal) => (
          <ImageListItem key={gal.foto}>
            <img
              src={`http://localhost:3000/gallery/${gal.foto}`}
              alt={`Foto da galeria`}
              loading="lazy"
               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

export default Photos;