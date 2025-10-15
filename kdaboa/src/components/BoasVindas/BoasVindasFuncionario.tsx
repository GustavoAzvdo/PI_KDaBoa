import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { EditCalendar, Verified, NewReleases, AccountCircle } from '@mui/icons-material';
import funcionario from './funcionario.png' // você precisará adicionar esta imagem
import { useState, useEffect } from 'react';
import api from '../../api/api'

const BoasVindasFuncionario = ({ router }: { nome_usuario?: string, router: any }) => {
  const [totalEventos, setTotalEventos] = useState<number>(0);
  const [nomeFuncionario, setNomeFuncionario] = useState<string>('');

  useEffect(() => {
    const fetchTotalEventos = async () => {
      try {
        const response: any = await api.get('/funcionario/event'); // endpoint específico para funcionário
        setTotalEventos(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar total de eventos:', error);
      }
    };
    fetchTotalEventos();
  }, [])

  const capitalizar = (nome_usuario: string) =>
    nome_usuario
      .toLowerCase()
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');

  useEffect(() => {
    const fetchNomeFuncionario = async () => {
      try {
        const response: any = await api.get('/auth/dados', { withCredentials: true }); // endpoint específico para funcionário
        const nomeFuncionario = response.data.nome_usuario;
        setNomeFuncionario(nomeFuncionario || 'Funcionário');
      } catch (err) {
        console.error('Erro ao buscar nome do funcionário:', err);
      }
    };
    fetchNomeFuncionario();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 4 },
          textAlign: { xs: "center", sm: "left" },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={funcionario}
            alt="funcionario"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: 'var(--notosans)',
              fontSize: { xs: "2.2rem", sm: "2.2rem" },
              fontWeight: 500,
            }}
          >
            Bem-vindo(a), {capitalizar(nomeFuncionario) || "Funcionário"}!
          </Typography>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.3rem" },
            }}
          >
            Gerencie eventos e mantenha tudo atualizado para o estabelecimento.
          </Typography>
        </Box>
      </Box>

      {/* Atalhos para Funcionário */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{
            bgcolor: 'var(--roxo)',
            color: 'white',
            height: '100%',
            transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
            boxShadow: 4,
            '&:hover': {
              boxShadow: 8,
              transform: 'translateY(-8px)',
            },
          }}>
            <CardContent>
              <EditCalendar sx={{ fontSize: 40 }} />
              <Typography variant="h6">Criar Evento</Typography>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="small" 
                sx={{ mt: 1 }} 
                onClick={() => router.navigate('/eventos/criar_evento')}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{
            bgcolor: '#4CAF50',
            color: 'white',
            height: '100%',
            transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
            boxShadow: 4,
            '&:hover': {
              boxShadow: 8,
              transform: 'translateY(-8px)',
            },
          }}>
            <CardContent>
              <Verified sx={{ fontSize: 40 }} />
              <Typography variant="h6">Eventos Criados</Typography>
              <Typography variant="h4">{totalEventos}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{
            bgcolor: 'warning.main',
            color: 'white',
            height: '100%',
            transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
            boxShadow: 4,
            '&:hover': {
              boxShadow: 8,
              transform: 'translateY(-8px)',
            },
          }}>
            <CardContent>
              <NewReleases sx={{ fontSize: 40 }} />
              <Typography variant="h6">Em Análise</Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{
            bgcolor: '#2196F3',
            color: 'white',
            height: '100%',
            transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
            boxShadow: 4,
            '&:hover': {
              boxShadow: 8,
              transform: 'translateY(-8px)',
            },
          }}>
            <CardContent>
              <AccountCircle sx={{ fontSize: 40 }} />
              <Typography variant="h6">Meu Perfil</Typography>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="small" 
                sx={{ mt: 1 }} 
                onClick={() => router.navigate('/dashboard/info')}
              >
                Ver Perfil
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoasVindasFuncionario;