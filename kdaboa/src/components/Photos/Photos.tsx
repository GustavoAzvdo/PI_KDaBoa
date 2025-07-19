import { Container, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './Photos.css';
const Photos = ({ card }: { card: any }) => {

  const theme = useTheme();
  // Se a tela for menor que 900px, use 2 colunas, senão 3
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Container
      sx={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        flexDirection: 'column', // Para alinhar o botão abaixo das imagens
      }}
    >
      <ImageList
        sx={{ width: '82vw', maxWidth: 1450 }}
        gap={20}
        cols={isSmallScreen ? 1 : 2}
        rowHeight={300}
      >
        {card.Estabelecimento.Galeria.map((gal: any) => (
          <ImageListItem key={gal.foto}>
            <img
              src={`http://localhost:3000/gallery/${gal.foto}`}
              alt={gal.foto}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImageListItem>
        ))}
      </ImageList>

    </Container>
  )
}

export default Photos