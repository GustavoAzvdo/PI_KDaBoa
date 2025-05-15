import React from 'react'
import CardsBD from '../CardEventHome/CardsBD'
import CardEventHome from '../CardEventHome/CardEventHome'
import { Box, Container } from '@mui/material'

const ViewCards = () => {
    return (
        <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
            gap: 4, // Espaçamento entre os cards
            padding: 2,
            paddingBottom: 10
        }}>
            {
                CardsBD.map((card, index) => (
                    <CardEventHome  key={index} card={card} />
                ))
            }
        </Box>
    )
}

export default ViewCards