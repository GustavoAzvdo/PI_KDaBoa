import BD from "../../DB/CardsBD.json";
import CardEventHome from "../CardEventHome/CardEventHome";
import CardProps from "../CardEventHome/props/CardProps";
import { Box } from '@mui/material'
import Search from "../Search/Search";
const FilterEvetn = () => {

    return (
        <>
            <Search />
            <Box sx={{ display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
                    gap: 4, // Espaçamento entre os cards
                    padding: 2, }}>
                {BD.map((card : CardProps, index : number) => (
                    <CardEventHome key={index} card={card} />
                ))}
            </Box>
        </>
    )

}

export default FilterEvetn;