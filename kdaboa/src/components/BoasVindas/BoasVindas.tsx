import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Group, EditCalendar, Verified, NewReleases } from '@mui/icons-material';
import gerente from './gerente.png'
import { useState, useEffect } from 'react';
import api from '../../api/api'

const BoasVindasGerente = ({ router }: { nome?: string, router: any }) => {
  const [totalAprovados, setTotalAprovados] = useState<number>(0);
  const [totalAnalise, setTotalAnalise] = useState<number>(0);
  const [nomeGerente, setNomeGerente] = useState<string>('');

  useEffect(() => {
    const fetchTotalAprovados = async () => {
      try {
        const response: any = await api.get('/gerente/event');
        const aprovados = response.data.filter((evento: any) => 
          Number(evento.estatus) === 1
        );
        setTotalAprovados(aprovados.length);
      } catch (error) {
        console.error('Erro ao buscar total de eventos:', error);
      }
    };
    fetchTotalAprovados();
  }, [])

  useEffect(() => {
    const fetchTotalAnalise = async () => {
      try {
        const response: any = await api.get('/gerente/event/waiting');
        setTotalAnalise(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar total de eventos:', error);
      }
    };
    fetchTotalAnalise();
  }, []);

  const capitalizar = (nome: string) =>
    nome
      .toLowerCase()
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');

  useEffect(() => {
    const fetchNomeUsuario = async () => {
      try {
        const response: any = await api.get('/gerente/establishment', { withCredentials: true });
        const nomeUsuario = response.data.Usuario?.[0]?.nome_usuario;
        setNomeGerente(nomeUsuario || 'Gerente');
      } catch (err) {
        console.error('Erro ao buscar nome do usuário:', err);
      }
    };
    fetchNomeUsuario();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          flexDirection: { xs: "column", sm: "row" }, // empilha no mobile, lado a lado em telas maiores
          gap: { xs: 2, sm: 4 }, // espaçamento entre logo e texto
          textAlign: { xs: "center", sm: "left" },
          px: { xs: 2, sm: 0 }, // padding lateral no mobile
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
            src={gerente}
            alt="gerente"
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
              fontSize: { xs: "2.2rem", sm: "2.2rem" }, // menor no mobile
              fontWeight: 500,
            }}
          >
            Bem-vindo(a), {capitalizar(nomeGerente) || "Gerente"}!
          </Typography>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.3rem" },
            }}
          >
            Aqui estão seus atalhos e resumo de atividades recentes.
          </Typography>
        </Box>
      </Box>

      {/* Atalhos */}

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
              <Button variant="outlined" color="inherit" size="small" sx={{ mt: 1 }} onClick={() => router.navigate('/eventos/criar_evento')}>Acessar</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
          <Card sx={{
            bgcolor: '#BB8AFF',
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
              <Group sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Funcionários</Typography>
              </Box>
              <Button variant="outlined" color="inherit" size="small" sx={{ mt: 1 }} onClick={() => router.navigate('/funcionarios')} >Gerenciar</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
          <Card sx={{
            bgcolor: '#276321',
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
              <Typography variant="h6">Eventos postados</Typography>
              <Typography>{totalAprovados}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
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
              <Typography variant="h6">Em análise</Typography>
              <Typography>{totalAnalise}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoasVindasGerente;
