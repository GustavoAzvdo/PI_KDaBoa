import { Box, Grid, Typography, Button, Container, Card } from "@mui/material"
import festa from "../../assets/festa.png"
import './BoxInfo.css'
import { LocationOnOutlined, PersonAddAlt1Outlined, SearchOutlined, StarOutlined, TrendingUpOutlined } from "@mui/icons-material"
import Title from "../Title/Title"
import eventosproximos from '../../assets/eventos-proximos.png'
import check from '../../assets/check.png'
const BoxInfo = () => {

  return (
    <Grid container spacing={2} className="box-info-container" sx={{ py: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Container>
          <Box sx={{
            textAlign: { xs: 'center' },
            px: { xs: 2 }
          }}>
            <Title>
              Eventos próximos de você <img width="70" height="70" src={eventosproximos} alt="hang-ten" />
            </Title>
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto" }}>
                Baseado na sua localização, encontramos estes eventos incríveis acontecendo perto de você
              </Typography>
            </Box>
          </Box>

        </Container>
      </Grid>
      <Container sx={{ pb: 10 }}>
        <Grid container spacing={3}>
          {[
            {
              title: "Os meninos da nova",
              description: "Supernova ent",
              date: "18",
              month: "DEZ",
              distance: "2.5 km",
              attendees: 45,
            },
            {
              title: "Submundo 808",
              description: "MU540, pretus.wav, só beat bolha",
              date: "25",
              month: "DEZ",
              distance: "1.2 km",
              attendees: 892,
            },
          ].map((event, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
              <Card sx={{ p: 3, cursor:'pointer', "&:hover": { boxShadow: "0px 8px 20px #ff84384e",} }}>
                <Box display="flex" gap={2}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: "linear-gradient(35deg, #ff7038ff, #FF8e38)",
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: 'var(--notosans)'
                    }}
                  >
                    <Typography variant="caption">{event.month}</Typography>
                    <Typography variant="h5">{event.date}</Typography>
                  </Box>

                  <Box flex={1}>
                    <Typography variant="h6" sx={{ fontFamily: "var(--fredoka)", fontWeight: 500, mb: 1 }}>
                      {event.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                      {event.description}
                    </Typography>

                    <Box display="flex" gap={2} color="text.secondary" alignItems={'center'} justifyContent={'space-between'}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnOutlined fontSize="small" />
                        <Typography variant="body2">{event.distance} de distância</Typography>
                      </Box>
                      {/* <Box display="flex" alignItems="center" gap={0.5}>
                        <PeopleOutlined fontSize="small" />
                        <Typography variant="body2">{event.attendees} interessados</Typography>
                      </Box> */}
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
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


        </Box>
        <Grid container spacing={4} textAlign="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          {[
            { number: "1000+", label: "Eventos cadastrados", color: '#6C15D5' },
            { number: "100+", label: "Estabelecimentos parceiros", color: '#FF8e38' },
            { number: "200+", label: "Cidades atendidas", color: '#6C15D5' },

          ].map((stat, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 3 }} key={index}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "var(--notosans)",
                  fontWeight: "bold",
                  color: stat.color,
                  mb: 1,
                }}
              >
                {stat.number}
              </Typography>
              <Typography color="text.secondary">{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>

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
      <Box sx={{ py: 8, backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{
            textAlign: { xs: 'center' },
            px: { xs: 2 }
          }}>
            <Title>
              Por que escolher o KDABOA?  <img width="70" height="70" src={check} alt="hang-ten" />
            </Title>

          </Box>
          <Grid container spacing={4}>
            {[
              {
                icon: <SearchOutlined sx={{ fontSize: 32 }} />,
                title: "Busca Inteligente",
                description: "Encontre eventos por nome, categoria, data ou localização com nosso filtro inteligente.",
              },
              {
                icon: <StarOutlined sx={{ fontSize: 32 }} />,
                title: "Eventos Verificados",
                description: "Todos os eventos passam por verificação para garantir qualidade e confiabilidade.",
              },
              {
                icon: <TrendingUpOutlined sx={{ fontSize: 32 }} />,
                title: "Recomendações Personalizadas",
                description: "Receba sugestões de eventos baseadas nos seus interesses e histórico de participação.",
              },
            ].map((feature, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 4 }} key={index} sx={{ py: 5 }}>
                <Box textAlign="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      background: "#6C15D5",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      mx: "auto",
                      mb: 2,
                      transition: "all 0.3s ease",
                      '&:hover': {
                        transform: "scale(1.1) rotate(10deg)", // aumenta e gira levemente
                        background: "#4a0da5",                // roxo mais escuro
                        boxShadow: "0 8px 20px rgba(108,21,213,0.5)", // glow roxo
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography variant="h6" sx={{ fontFamily: "var(--fredoka)", fontWeight: 500, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" fontFamily={'var(--notosans)'}>{feature.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button endIcon={<PersonAddAlt1Outlined />} variant='outlined' color='inherit' size='large' href="/signin" className="btn-cadastrar">
            <Typography className="btn-text">
              Quero me cadastrar!
            </Typography>
          </Button>

        </Box>
      </Box>
    </Grid>
  )
}

export default BoxInfo