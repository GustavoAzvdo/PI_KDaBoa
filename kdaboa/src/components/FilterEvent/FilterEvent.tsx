import BD from "../../DB/CardsBD.json";
import CardEventHome from "../CardEventHome/CardEventHome";
import CardProps from "../CardEventHome/props/CardProps";
import { Box } from '@mui/material'
import Search from "../Search/Search";
import { useState } from "react";
import Footer from "../Footer/Footer";
import "./FilterEvent.css";
import Title from "../Title/Title";
import Navbar from "../Navbar/Navbar";
import search from "../../assets/search.png";
import Banner from "../Banner/Banner";
const FilterEvetn = () => {
    const [category, setCategory] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filtered, setFiltered] = useState<CardProps[]>(BD);

    const handleCategoryChange = (categories: string[]) => {
        setCategory(categories);
        handleCategoryAndTextChange(categories, searchText);
    };

    const handleTextChange = (selectedText: string) => {
        setSearchText(selectedText);
        handleCategoryAndTextChange(category, selectedText);
    };

    const handleCategoryAndTextChange = (selectedCategories: string[], searchText: string) => {
        let filter = BD;

        if (selectedCategories.length > 0) {
            filter = filter.filter((event) =>
                event.category.map((eventCategory) =>
                    selectedCategories.map((selectedCategory) =>
                        eventCategory === selectedCategory
                    ).includes(true)
                ).includes(true)
            );
        }

        if (searchText.length > 0) {
            filter = filter.filter((event) =>
                event.title.toLowerCase().includes(searchText)
            );
        }

        setFiltered(filter);
    };

    return (
        <>

            <Navbar />
            <Banner />
            <Title>
                Pesquisar Evento
                <img width="70" height="70" src={search} alt="hang-ten" />
            </Title>
            <Box className="search-container" sx={{paddingBottom: 10, borderBottom: 1, borderColor: '#e0e0e0' }} >
                <Search onCategoryChange={handleCategoryChange} onTextChange={handleTextChange} />
            </Box>
            <Box className="title-container">
                <Title>
                    {filtered.length > 0 ? `${category.length > 0 ? `${category.join(', ')}` : 'Todos os eventos'}` : 'Nenhum evento encontrado'}
                    
                </Title>
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
                gap: 4, // Espaçamento entre os cards
                padding: 2,
            }}> 
                {
                    filtered.map((card: CardProps, index: number) => (
                    <CardEventHome key={index} card={card} />
                ))}
            </Box>
            <Box sx={{marginTop: 10}}>
                <Footer />
            </Box>
        </>
    )

}

export default FilterEvetn;