import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import './InfoProfile.css'
import cdg from '../../assets/cdg.jpg'
import maps from '../../assets/maps.png'
import contacts from '../../assets/contacts.png'
const InfoProfile = () => {
    return (
        <Box>
            <Grid container spacing={2} className="infoProfile">
                <Grid size={{ xs: 12, md: 6 }} className="info_left" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box className="round" >
                            <Avatar src={cdg} sx={{ width: 130, height: 130 }}></Avatar>
                        </Box>
                        <Box sx={{ paddingLeft: 2, marginLeft: 2 }} className="info_text">
                            <Typography variant='h3'>CDG BEER GARDEN</Typography>
                            <Typography >12 eventos publicados</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 10 }} className="description" sx={{ paddingTop: 4, margin: 'auto', textAlign: 'justify' }}>
                    <Box className="title-description">
                        <Typography variant="h3" className="description-title" sx={{ paddingTop: 5 }}>DESCRIÇÃO DO ESTABELECIMENTO</Typography>
                        <Typography sx={{ paddingY: 5 }}>O evento mais esperado do ano está chegando! O CDG Beer Garden traz para você a festa de lançamento do novo álbum do Matue, com um line-up incrível e muitas surpresas. Venha curtir uma noite inesquecível com a gente!</Typography>
                    </Box>
                    <Box sx={{marginBottom: 7 }}>
                        <Button variant='outlined' className='btn-seemore' >
                            <Typography sx={{ paddingX: 2, paddingY: '5px'}}>
                                Ver mais ...
                            </Typography>
                        </Button>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} className="grid-maps" sx={{margin: 'auto',justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' }, display: 'flex', alignItems: 'center', marginY: { xs: 5, md: 0 } }}>
                    <Box className="img-maps">
                        <img src={maps} style={{ width: '60px', height: '60px' }} alt="" />
                    </Box>
                    <Box className="text-address" sx={{ paddingLeft: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant='h5'>CDG BEER GARDEN </Typography>
                            <Button variant="outlined" className="btn-maps" sx={{ marginLeft: 3 }}>
                                <Typography>
                                    Ver mapa
                                </Typography>
                            </Button>
                        </Box>

                        <Typography className="text-address-subtitle" sx={{ paddingTop: 2 }}>Rodovia Presidente Dutra, Guará-Lorena, KM 57 - Guaratinguetá - São Paulo, 12504-290</Typography>

                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} className="grid-contacts" sx={{  margin: 'auto',justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' }, display: 'flex', alignItems: 'center', marginY: { xs: 5, md: 0 } }}>
                    <Box className="img-maps" sx={{paddingRight: 2}}>
                        <img src={contacts} style={{ width: '60px', height: '60px' }} alt="" />
                    </Box>
                    <Box className="text-contacts">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant='h5'>CONTATOS </Typography>

                        </Box>
                        <Box>
                            <Typography className="text-contacts-subtitle" sx={{ paddingTop: 2 }}>Telefone 1: &nbsp; (12) 9770-7070</Typography>
                            <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Telefone 2: &nbsp; (11) 4002-8922</Typography>
                            <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Email:&nbsp; cdg@gmail.com</Typography>
                        </Box>


                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default InfoProfile