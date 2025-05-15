import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import './InfoProfile.css'
import cdg from '../../assets/cdg.jpg'
import Address from '../Details/Address'
import Contacts from '../Details/Contacts'
import Photos from '../Photos/Photos'
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
                    <Box sx={{ marginBottom: 0 }}>
                        <Button variant='outlined' className='btn-seemore' >
                            <Typography sx={{ paddingX: 2, paddingY: '5px' }}>
                                Ver mais ...
                            </Typography>
                        </Button>
                    </Box>
                </Grid>
                <Grid container size={{ xs: 12, md: 10 }} spacing={2} className="info_right" sx={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', margin: 'auto', paddingTop: 4 }}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Address />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Contacts />
                    </Grid>
                </Grid>
                <Grid container size={{xs: 12, md: 10}} sx={{margin: 'auto', paddingTop: 4, display: 'flex', justifyContent: 'start', width: '100%'}}>
                    <Box className="title-photos" >
                        <Typography variant='h3' className='title-photos-text' sx={{paddingTop: 5}}>
                            FOTOS DO ESTABELECIMENTO
                        </Typography>
                    </Box>
                </Grid>
                <Grid container size={{xs: 12, md: 12}} sx={{margin: 'auto', paddingTop: 4, display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <Photos />
                </Grid>
            </Grid>
        </Box>
    )
}

export default InfoProfile