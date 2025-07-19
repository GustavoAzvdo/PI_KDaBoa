
import CardEventHome from '../CardEventHome/CardEventHome'
import { Box } from '@mui/material'
import Cards from '../../DB/CardsBD.json'

import {useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import api from '../../api/api'

interface ViewCardsProps {
    idEstabelecimento: number;
}

const ViewCards = ( {idEstabelecimento}: ViewCardsProps ) => {
    const location = useLocation();
    const selectedLocation = location.state?.location;

      const filteredCards = Cards.filter(card => card.location === selectedLocation);

      const [eventos, setEventos] = useState<any[]>([]);
      useEffect(() => {
        const fetchEventos = async () => {
          try {
            const res: any = await api.get('/event');
            const todos = res.data;
            const filtrados = todos.filter((evento: any) => evento.id_estabelecimento === idEstabelecimento);
            setEventos(filtrados);
          } catch (err) {
            console.error('Erro ao carregar eventos', err);
          }
        };
    
        fetchEventos();
      }, [idEstabelecimento]);
    
    return (
        <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
            gap: 4, // Espaçamento entre os cards
            padding: 2,
            paddingBottom: 10
        }}>
            {
                eventos.map((card, index) => (
                    <CardEventHome  key={index} card={card} />
                ))
            }
        </Box>
    )
}

export default ViewCards