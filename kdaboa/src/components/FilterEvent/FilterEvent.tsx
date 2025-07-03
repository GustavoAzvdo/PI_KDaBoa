import CardEventHome from "../CardEventHome/CardEventHome";
import { Box, CardProps } from '@mui/material'
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
import api from "../../api/api";
import EventoProps from "../CardEventHome/props/EventoProps";
const FilterEvetn = () => {
    const {
        searchText,
        categories: contextCategories,
        date: contextDate,
        setSearchText,
        setCategories,
        setDate
    } = useSearch();
      //console.log('FilterEvent context values:', searchText, contextCategories, contextDate);

    const [displayCategories, setDisplayCategories] = useState<string[]>([]);
    const [filtered, setFiltered] = useState<EventoProps[]>([]);

    const fetchEventos = async () => {
        try {
            const params = {
                name: searchText || undefined,
                category: contextCategories[0] ? Number(contextCategories[0]) : undefined, // ajuste se for ID real
                date: contextDate || undefined,
              };
            const queryParams = new URLSearchParams();
            if (params.name) queryParams.append('name', params.name);
            if (params.category) queryParams.append('category', params.category.toString());
            if (params.date) queryParams.append('date', params.date);
            
            const queryString = queryParams.toString();
            const url = `/event${queryString ? `?${queryString}` : ''}`;

            const res: any = await api.get(url);
            setFiltered(res.data); // <---

        } catch (err) {
          console.error('Erro ao buscar eventos:', err);
        }
      };
      



   

    useEffect(() => {
        fetchEventos();
        setDisplayCategories(contextCategories);
      }, [searchText, contextCategories, contextDate]);

    const handleDateChange = (date: string) => {
        setDate(date)
    };

    const handleCategoryChange = (categories: string[]) => {
        //console.log(categories);
        setCategories(categories);
    };

    const handleTextChange = (selectedText: string) => {
        setSearchText(selectedText);
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
                    filtered.map((card: EventoProps, index: number) => (
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