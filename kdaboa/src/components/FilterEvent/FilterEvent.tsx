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
import { useSearch } from "../../context/SearchContext";
import { useEffect } from "react";
const FilterEvetn = () => {
    const {
        searchText,
        categories: contextCategories,
        date: contextDate,
        setSearchText,
        setCategories,
        setDate
    } = useSearch();
      console.log('FilterEvent context values:', searchText, contextCategories, contextDate);

    const [displayCategories, setDisplayCategories] = useState<string[]>([]);
    const [filtered, setFiltered] = useState<CardProps[]>(BD);

    useEffect(() => {
        handleCategoryAndTextChange(contextCategories, searchText, contextDate);
        setDisplayCategories(contextCategories); // Atualiza as categorias para exibição
    }, [searchText, contextCategories, contextDate]);

    const handleDateChange = (date: string) => {
        setDate(date)
    };

    const handleCategoryChange = (categories: string[]) => {
        setCategories(categories);
    };

    const handleTextChange = (selectedText: string) => {
        setSearchText(selectedText);
    };

    // const handleCategoryAndTextChange = (selectedCategories: string[], searchText: string, date: string) => {
    //     let filter = BD;

    //     if (selectedCategories.length > 0) {
    //         filter = filter.filter((event) =>
    //             event.category.map((eventCategory) =>
    //                 selectedCategories.map((selectedCategory) =>
    //                     eventCategory === selectedCategory
    //                 ).includes(true)
    //             ).includes(true)
    //         );
    //     }

    //     if (searchText.length > 0) {
    //         filter = filter.filter((event) =>
    //             event.title.toLowerCase().includes(searchText)
    //         );
    //     }

    //     if (date && date.length > 0) {
    //         filter = filter.filter((event) =>

    //             event.createdAt === date
    //         );
    //     }
    //     setFiltered(filter);
    // };

    const handleCategoryAndTextChange = (
        selectedCategories: string[],
        searchText: string,
        date: string
    ) => {
        let filter = BD;

        // Filtro por categorias (mantido seu código original)
        if (selectedCategories.length > 0) {
            filter = filter.filter((event) =>
                event.category.map((eventCategory) =>
                    selectedCategories.map((selectedCategory) =>
                        eventCategory === selectedCategory
                    ).includes(true)
                ).includes(true)
            );
        }

        // Filtro por texto
        if (searchText.length > 0) {
            filter = filter.filter((event) =>
                event.title.toLowerCase().includes(searchText)
            );
        }

        // Filtro por data
        if (date && date.length > 0) {
            filter = filter.filter((event) =>
                event.createdAt === date
            );
        }

        setFiltered(filter);
    };
    return (
        <>

            <Navbar />
            <Banner />
            <Box sx={{ textAlign: { xs: 'center' } }}>
                <Title className="title-search" sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 5 }}>
                    Pesquisar Evento
                    <img width="70" height="70" src={search} alt="hang-ten" />
                </Title>
            </Box>
            <Box className="search-container" sx={{ paddingBottom: 10, borderBottom: 1, borderColor: '#e0e0e0' }} >
                <Search onDateChange={handleDateChange} onCategoryChange={handleCategoryChange} onTextChange={handleTextChange} />
            </Box>
            <Box className="title-container" sx={{ textAlign: 'center' }}>
                <Title>
                    {filtered.length > 0 ? `${displayCategories.length > 0 ? `${displayCategories.join(', ')}` : 'Todos os eventos'}` : 'Nenhum evento encontrado'}

                </Title>
            </Box>
            <Box sx={{
                margin: '0 auto',
                width: '85vw',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
                gap: 7, // Espaçamento entre os cards
                padding: 2,
            }}>
                {
                    filtered.map((card: CardProps, index: number) => (
                        <CardEventHome key={index} card={card} />
                    ))}
            </Box>
            <Box sx={{ marginTop: 10 }}>
                <Footer />
            </Box>
        </>
    )

}

export default FilterEvetn;