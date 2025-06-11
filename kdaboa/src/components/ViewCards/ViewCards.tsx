
import CardEventHome from '../CardEventHome/CardEventHome'
import { Box } from '@mui/material'
import Cards from '../../DB/CardsBD.json'

import {useLocation} from 'react-router-dom'
const ViewCards = ( ) => {
    const location = useLocation();
    const selectedLocation = location.state?.location;

      const filteredCards = Cards.filter(card => card.location === selectedLocation);

    return (
        <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
            gap: 4, // Espaçamento entre os cards
            padding: 2,
            paddingBottom: 10
        }}>
            {
                filteredCards.map((card, index) => (
                    <CardEventHome  key={index} card={card} />
                ))
            }
        </Box>
    )
}

export default ViewCards