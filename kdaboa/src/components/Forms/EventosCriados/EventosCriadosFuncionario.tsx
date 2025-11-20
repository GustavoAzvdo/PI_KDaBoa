import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Grid,
  CircularProgress,
  Alert,
  CardActions,
  Button,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  Category,
  CheckCircle,
  Cancel,
  Schedule,
} from '@mui/icons-material';
import api from '../../../api/api';

// Interface que o componente Card espera
interface Evento {
  id_evento: number;
  nome_evento: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  foto: string;
  endereco: string;
  categorias: string[];
  estatus: 'aprovado' | 'reprovado' | 'pendente';
}

// Interface da resposta da API
interface ApiEvento {
  id_evento: number;
  nome_evento: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  foto: string;
  estatus: number; // Coluna do banco (ex: 4)
  Endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  } | null;
  Evento_Categoria: {
    Categoria: {
      nome_categoria: string;
    };
  }[];
}

const EventosCriadosFuncionario = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [isMutating, setIsMutating] = useState(false);

  const mapStatus = (dbStatus: number): 'aprovado' | 'reprovado' | 'pendente' => {
    switch (dbStatus) {
      case 4:
        return 'pendente';
      case 1:
        return 'aprovado';
      case 2:
        return 'reprovado';
      default:
        return 'pendente'; 
    }
  };

  const fetchEventos = async () => {
    setLoading(true);
    setError(null);
    try {
     
     
      const response: unknown = await api.get('/gerente/event/waiting', {
        withCredentials: true,
      });

     
      const eventosFiltrados: ApiEvento[] = (response as any).data;

      console.log('eventos response (waiting)', response);
      console.log(eventosFiltrados)

 
      const eventosFormatados: Evento[] = eventosFiltrados.map((evento: ApiEvento) => {
        
        const enderecoFormatado = evento.Endereco
          ? `${evento.Endereco.logradouro}, ${evento.Endereco.numero} - ${evento.Endereco.bairro} - ${evento.Endereco.cidade}/${evento.Endereco.estado}`
          : 'Endereço não informado';

        
        const categoriasFormatadas = evento.Evento_Categoria
          ? evento.Evento_Categoria.map(
            (cat) => cat.Categoria.nome_categoria,
          )
          : [];

        return {
          id_evento: evento.id_evento,
          nome_evento: evento.nome_evento,
          descricao: evento.descricao,
          data_inicio: evento.data_inicio,
          data_fim: evento.data_fim,
          foto: evento.foto,
          endereco: enderecoFormatado,
          categorias: categoriasFormatadas,
        
          estatus: mapStatus(evento.estatus),
        };
      });

      setEventos(eventosFormatados);
    } catch (err) {
      console.error('Erro ao buscar eventos criados:', err);
      setError('Não foi possível carregar os eventos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // funções de aprovação/rejeição comentadas para futura implementação
  // const handleApproveEvent = async (id_evento: number) => {
  //   setIsMutating(true); // Começa a mutação (desativa botões)
  //   setError(null); // Limpa erros anteriores
  //   try {
  //     // PUT /gerente/event/waiting/{id} com query param accept=true
  //     await api.put(`/gerente/event/waiting/${id_evento}`, null, {
  //       params: {
  //         accept: true,
  //       },
  //       withCredentials: true,
  //     });

  //     // Recarrega a lista para remover o evento aprovado (melhor UX)
  //     await fetchEventos();
  //   } catch (err) {
  //     console.error(`Erro ao aprovar o evento ${id_evento}:`, err);
  //     setError('Erro ao aprovar o evento. Verifique a conexão e tente novamente.');
  //   } finally {
  //     setIsMutating(false); // Finaliza a mutação
  //   }
  // };

 
  // const handleRejectEvent = async (id_evento: number) => {
  //   setIsMutating(true); // Começa a mutação (desativa botões)
  //   setError(null); // Limpa erros anteriores
  //   try {
  //     // PUT /gerente/event/waiting/{id} com query param accept=false
  //     await api.put(`/gerente/event/waiting/${id_evento}`, null, {
  //       params: {
  //         accept: false,
  //       },
  //       withCredentials: true,
  //     });

  //     // Recarrega a lista para remover o evento rejeitado
  //     await fetchEventos();
  //   } catch (err) {
  //     console.error(`Erro ao rejeitar o evento ${id_evento}:`, err);
  //     setError('Erro ao rejeitar o evento. Verifique a conexão e tente novamente.');
  //   } finally {
  //     setIsMutating(false); // Finaliza a mutação
  //   }
  // };


  
  useEffect(() => {
    fetchEventos();
  }, []);

  // Função para configurar o Chip de status (sem alterações)
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

  // Funções de formatação de data e hora (sem alterações)
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

  // ---- RENDERIZAÇÃO ----

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Feedback de Nenhum Evento Encontrado (agora mais preciso)
  if (eventos.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'var(--notosans)' }}>
          Você não possui eventos pendentes de aprovação no momento.
        </Typography>
      </Box>
    );
  }

  // Renderização da lista de eventos (Layout dos Cards mantido)
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {eventos.map((evento) => {
          const statusConfig = getStatusConfig(evento.estatus);

          return (
            <Grid size={{ xs: 12, md: 4, sm: 4 }} key={evento.id_evento}>
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
                {/* Chip de Status */}
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
                  <CardActions sx={{ mt: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="error"
                       
                    >
                     Excluir
                    </Button>
                  </CardActions>
                </CardContent>
            
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default EventosCriadosFuncionario;