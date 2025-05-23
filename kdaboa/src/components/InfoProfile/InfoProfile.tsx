import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import './InfoProfile.css'
import cdg from '../../assets/cdg.jpg'
import Address from '../Details/Address'
import Contacts from '../Details/Contacts'
import Photos from '../Photos/Photos'
import { useState } from 'react'

const InfoProfile = () => {
    const fullDescription = "O CDG Beer Garden é um espaço de entretenimento localizado na Rodovia Presidente Dutra, entre Guaratinguetá e Lorena (SP), conhecido por promover grandes shows e eventos musicais. Com uma estrutura voltada para o conforto e diversão do público, o CDG se destaca como uma das principais casas de balada e show da região, recebendo artistas renomados do cenário nacional, como Ferrugem, Marcelo Falcão, Capital Inicial e Roupa Nova. O ambiente é moderno, com áreas de pista, camarotes e opções VIP, além de promover ações interativas com os fãs pelas redes sociais, como sorteios para acesso ao camarim. Os ingressos são vendidos online, facilitando o acesso ao público jovem e conectado. O CDG Beer Garden se firmou como referência em lazer e cultura musical no Vale do Paraíba."
    const [showFull, setShowFull] = useState<boolean>(false)
    const isLong = fullDescription.length > 400;
    const displayText = showFull ? fullDescription : fullDescription.substring(0, 400) + ' ...';
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
                    <Box className="title-description" sx={{ paddingX: { xs: 5, md: 0 }, }}>
                        <Typography variant="h3" className="description-title" sx={{ paddingTop: 5, textAlign: { xs: 'center', md: 'left' } }}>DESCRIÇÃO DO ESTABELECIMENTO</Typography>
                        <Typography className="description-text" sx={{ paddingY: 5 }}>
                            {'\t' + displayText}
                        </Typography>
                    </Box>
                    {isLong && (
                        <Box sx={{ marginBottom: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Button
                                variant='outlined'
                                className='btn-seemore'
                                onClick={() => setShowFull((prev) => !prev)}
                            >
                                <Typography sx={{ paddingX: 1, paddingY: '3px' }}>
                                    {showFull ? 'Ver menos' : 'Ver mais '}
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Grid>


                <Grid container size={{ xs: 12, md: 10 }} spacing={2} className="info_right"
                    sx={{ display: 'flex', alignItems: { md: 'center' }, justifyContent: { xs: 'center', md: 'space-around' }, margin: 'auto', paddingTop: 4 }}>

                    <Grid size={{ xs: 10, md: 5 }}>
                        <Address />
                    </Grid>
                    <Grid
                        size={{ xs: 10, md: 5 }}
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-end' }, // centraliza no xs, joga pra direita no md+
                            pt: { xs: 5, md: 0 }
                        }}
                    >
                        <Contacts />
                    </Grid>
                </Grid>


                <Grid container size={{ xs: 12, md: 10 }} sx={{ margin: 'auto', paddingTop: 4, display: 'flex', justifyContent: 'start', width: '100%' }}>
                    <Box className="title-photos" >
                        <Typography variant='h3' className='title-photos-text' sx={{ paddingTop: 1, px: { xs: 5, md: 0 }, pb: 3 }}>
                            FOTOS DO ESTABELECIMENTO
                        </Typography>
                    </Box>
                </Grid>
                <Grid container size={{ xs: 12, md: 12 }} sx={{ margin: 'auto', paddingTop: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Photos />
                </Grid>
            </Grid>
        </Box>
    )
}

export default InfoProfile