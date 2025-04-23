import BD from "../../DB/CardsBD.json";
import CardEventHome from "../CardEventHome/CardEventHome";
import CardProps from "../CardEventHome/props/CardProps";
import { Box } from '@mui/material'
import Search from "../Search/Search";
import { useState } from "react";
import Footer from "../Footer/Footer";
import "./FilterEvent.css";
const FilterEvetn = () => {
    const [category, setCategory] = useState<CardProps[]>(BD);
    
    const handleCategoryChange = (categories: string[]) => {
        if (categories.length === 0) {
          setCategory(BD); // Mostra todos os eventos se nenhuma categoria estiver selecionada
        } else {
          const filtered = BD.filter((event) =>
            categories.some((category) => event.category.includes(category))
          );
          setCategory(filtered);
        }
    };
    return (
        <>
        <br />
        <br />
            <Search onCategoryChange={handleCategoryChange}/>
            <Box sx={{ display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
                    gap: 4, // Espaçamento entre os cards
                    padding: 2, }}>
                {category.map((card : CardProps, index : number) => (
                    <CardEventHome key={index} card={card} />
                ))}
            </Box>
            <Footer />
        </>
    )

}

export default FilterEvetn;