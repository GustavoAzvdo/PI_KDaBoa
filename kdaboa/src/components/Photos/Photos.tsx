import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { images } from '../Photos/Gallery/Gallery';
import './Photos.css';
const Photos = () => {

  const theme = useTheme();
  // Se a tela for menor que 900px, use 2 colunas, senão 3
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Container
      sx={{
        height: '75vh',
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
        cols={isSmallScreen ? 2 : 3}
        rowHeight={300}
      >                {images.map((item) => (
        <ImageListItem key={item.src}>
          <img
            srcSet={item.src}
            src={item.src}
            alt={item.alt}
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