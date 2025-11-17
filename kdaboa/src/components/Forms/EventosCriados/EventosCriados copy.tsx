import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Grid,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  Category,
  CheckCircle,
  Cancel,
  Schedule,
} from '@mui/icons-material';

interface Evento {
  id_evento: number;
  nome_evento: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  foto: string;
  endereco: string;
  categorias: string[];
  status: 'aprovado' | 'reprovado' | 'pendente';
}

const EventosCriados = () => {
// EVENTOS SIMULADOS PARA A VISUALIZAÇÃO DO CARD
  const [eventos] = useState<Evento[]>([
    {
      id_evento: 1,
      nome_evento: 'Show de Rock ao Vivo',
      descricao: 'Grande show com bandas locais e nacionais. Venha curtir uma noite incrível de muito rock!',
      data_inicio: '2025-11-15T20:00:00',
      data_fim: '2025-11-15T23:59:00',
      foto: 'https://via.placeholder.com/400x200',
      endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
      categorias: ['Música', 'Show', 'Rock'],
      status: 'aprovado',
    },
    {
      id_evento: 2,
      nome_evento: 'Festival de Gastronomia',
      descricao: 'Evento com os melhores pratos da culinária regional e internacional. Não perca!',
      data_inicio: '2025-12-01T18:00:00',
      data_fim: '2025-12-01T22:00:00',
      foto: 'https://via.placeholder.com/400x200',
      endereco: 'Av. Principal, 456 - Jardim América - Rio de Janeiro/RJ',
      categorias: ['Gastronomia', 'Festival', 'Cultura'],
      status: 'pendente',
    },
    {
      id_evento: 3,
      nome_evento: 'Corrida Beneficente 5K',
      descricao: 'Corrida em prol de instituições de caridade. Participe e ajude!',
      data_inicio: '2025-10-20T07:00:00',
      data_fim: '2025-10-20T11:00:00',
      foto: 'https://via.placeholder.com/400x200',
      endereco: 'Parque Municipal - Zona Sul - Belo Horizonte/MG',
      categorias: ['Esporte', 'Beneficente', 'Saúde'],
      status: 'reprovado',
    },
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'aprovado':
        return {
          label: 'Aprovado',
          color: 'success' as const,
          icon: <CheckCircle sx={{ fontSize: 18 }} />,
        };
      case 'reprovado':
        return {
          label: 'Reprovado',
          color: 'error' as const,
          icon: <Cancel sx={{ fontSize: 18 }} />,
        };
      case 'pendente':
        return {
          label: 'Pendente',
          color: 'warning' as const,
          icon: <Schedule sx={{ fontSize: 18 }} />,
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'default' as const,
          icon: <Schedule sx={{ fontSize: 18 }} />,
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {eventos.map((evento) => {
          const statusConfig = getStatusConfig(evento.status);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evento.id_evento}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* Chip de Status no canto superior direito */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    icon={statusConfig.icon}
                    label={statusConfig.label}
                    color={statusConfig.color}
                    size="medium"
                    sx={{
                      fontFamily: 'var(--notosans)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      boxShadow: 2,
                    }}
                  />
                </Box>

                <CardMedia
                  component="img"
                  height="200"
                  image={evento.foto}
                  alt={evento.nome_evento}
                  sx={{ objectFit: 'cover' }}
                />

                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'var(--notosans)',
                      fontWeight: 600,
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {evento.nome_evento}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: 'var(--notosans)',
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {evento.descricao}
                  </Typography>

                  <Stack spacing={1.5}>
                    {/* Data e Hora */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 18, color: '#6c15d5' }} />
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: 'var(--notosans)' }}
                      >
                        {formatDate(evento.data_inicio)} às{' '}
                        {formatTime(evento.data_inicio)}
                      </Typography>
                    </Box>

                    {/* Endereço */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <LocationOn sx={{ fontSize: 18, color: '#6c15d5', mt: 0.2 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'var(--notosans)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {evento.endereco}
                      </Typography>
                    </Box>

                    {/* Categorias */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Category sx={{ fontSize: 18, color: '#6c15d5' }} />
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {evento.categorias.map((categoria, index) => (
                          <Chip
                            key={index}
                            label={categoria}
                            size="small"
                            sx={{
                              fontFamily: 'var(--notosans)',
                              fontSize: '0.75rem',
                              bgcolor: 'rgba(108, 21, 213, 0.1)',
                              color: '#6c15d5',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default EventosCriados;