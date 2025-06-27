import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Group, EditCalendar, Verified, NewReleases } from '@mui/icons-material';
import logoPC from './logoPC.png'
const BoasVindasGerente = ({ nome }: { nome?: string }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Bem-vindo, {nome || 'Usuário'}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Aqui estão seus atalhos e resumo de atividades recentes.
          </Typography>

        </Box>
        <Box sx={{pl: 5}}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logoPC} width={100} height={130} alt="logoPC" />
          </Box>
        </Box>
      </Box>
      {/* Atalhos */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: 'var(--roxo)', color: 'white', height: '100%' }}>
            <CardContent>
              <EditCalendar sx={{ fontSize: 40 }} />
              <Typography variant="h6">Criar Evento</Typography>
              <Button variant="outlined" color="inherit" size="small" sx={{ mt: 1 }}>Acessar</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#BB8AFF', color: 'white', height: '100%' }}>
            <CardContent>
              <Group sx={{ fontSize: 40 }} />
              <Typography variant="h6">Funcionários</Typography>
              <Button variant="outlined" color="inherit" size="small" sx={{ mt: 1 }}>Gerenciar</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#276321', color: 'white', height: '100%' }}>
            <CardContent>
              <Verified sx={{ fontSize: 40 }} />
              <Typography variant="h6">Eventos postados</Typography>
              <Typography>8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white', height: '100%' }}>
            <CardContent>
              <NewReleases sx={{ fontSize: 40 }} />
              <Typography variant="h6">Em análise</Typography>
              <Typography>3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoasVindasGerente;
