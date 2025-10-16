import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import './InfoProfile.css';
import Address from '../Details/Address';
import Contacts from '../Details/Contacts';
import Photos from '../Photos/Photos';
import { useState, useEffect } from 'react';
import api from '../../api/api';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import EventoProps from '../CardEventHome/props/EventoProps'; 


type ProfilePageData = {
    estabelecimento: EventoProps['Estabelecimento'];
    endereco: EventoProps['Endereco'];
}


interface InfoProfileProps {
    profileData: ProfilePageData;
}

const InfoProfile = ({ profileData }: InfoProfileProps) => {


    const [eventosPublicados, setEventosPublicados] = useState<number>(0);

    useEffect(() => {
     
        const buscarContagemEventos = async () => {
            if (!profileData?.estabelecimento?.id_estabelecimento) return;
            try {
                const response: any = await api.get('/event');
                const eventosDoEstabelecimento = response.data.filter(
                    (evento: any) => evento.id_estabelecimento === profileData.estabelecimento.id_estabelecimento
                );
                setEventosPublicados(eventosDoEstabelecimento.length);
            } catch (error) {
                console.error('Erro ao buscar contagem de eventos:', error);
            }
        };
        buscarContagemEventos();
    }, [profileData]);

    if (!profileData) {
        return null;
    }

    const { estabelecimento, endereco } = profileData;

    const fullDescription = estabelecimento.descricao || 'Descrição não disponível';
    const [showFull, setShowFull] = useState<boolean>(false);
    const isLong = fullDescription.length > 400;
    const displayText = showFull ? fullDescription : fullDescription.substring(0, 400) + (isLong ? ' ...' : '');

    const juntaEndereco = `${endereco?.logradouro}, ${endereco?.numero} - ${endereco?.bairro}, ${endereco?.cidade}/${endereco?.estado}`;

    function formatarCelular(numero: string | undefined): string {
        if (!numero) return '';
        return numero.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center' }}>
                    <Box sx={{ py: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3 }}>
                        <Avatar
                            src={`http://localhost:3000/establishment/image/${estabelecimento.imagem?.split('/').pop()}`}
                            sx={{ width: { xs: 80, md: 130 }, height: { xs: 80, md: 130 } }}
                        />
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="h3" sx={{ fontSize: { xs: '2.2rem', md: '2.5rem' }, fontFamily: 'var(--fredoka)', fontWeight: '500' }}>
                                {estabelecimento.nome}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, mt: 2, backgroundColor: 'rgba(108, 21, 213, 0.1)', borderRadius: 2, border: '1px solid rgba(108, 21, 213, 0.2)' }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#6C15D5' }} />
                                    <Typography sx={{ fontSize: '0.95rem', fontFamily: 'var(--notosans)', fontWeight: '600', color: '#6C15D5' }}>
                                        {eventosPublicados} eventos publicados
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ py: 4, margin: 'auto', textAlign: 'justify' }}>
                    <Box className="title-description" sx={{ paddingX: { xs: 5, md: 0 }, }}>
                        <Typography variant="h3" className="description-title" sx={{ paddingTop: 5, textAlign: { xs: 'center', md: 'left' } }}>DESCRIÇÃO DO ESTABELECIMENTO</Typography>
                        <Typography className="description-text" sx={{ paddingY: 5 }}>
                            {'\t' + displayText}
                        </Typography>
                    </Box>
                    {isLong && (
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Button variant='outlined' className='btn-seemore' onClick={() => setShowFull((prev) => !prev)} endIcon={showFull ? <KeyboardArrowUp /> : <KeyboardArrowDown />}>
                                <Typography sx={{ paddingX: 1, paddingY: '3px' }}>
                                    {showFull ? 'Ver menos' : 'Ver mais '}
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%", mb: 4, p: 3, borderRadius: 2, borderLeft: '4px solid #6c15d5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Address address={juntaEndereco} location={estabelecimento.nome} />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, pt: { xs: 5, md: 0 } }}>
                    <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%", mb: 4, p: 3, py: 5, borderRadius: 2, borderLeft: '4px solid #6c15d5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Contacts email={estabelecimento.Contato.email} telefone1={formatarCelular(estabelecimento.Contato.tel_cel_1)} telefone2={formatarCelular(estabelecimento.Contato.tel_cel_2)} />
                    </Box>
                </Grid>

                <Grid container size={{ xs: 12 }} sx={{ margin: 'auto', paddingTop: 4, display: 'flex', justifyContent: 'start', width: '100%' }}>
                     <Box className="title-photos" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}>
                        <Typography variant='h3' className='title-photos-text' sx={{ paddingTop: 1, pb: 3 }}>
                            FOTOS DO ESTABELECIMENTO
                        </Typography>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ margin: 'auto', paddingTop: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Container>
                        {/* 5. TRUQUE PARA NÃO MEXER NO Photos.js:
                Criamos um objeto 'card' no formato que o Photos espera, usando os dados do 'estabelecimento'.
            */}
                        <Photos card={{ Estabelecimento: estabelecimento }} />
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
}

export default InfoProfile;