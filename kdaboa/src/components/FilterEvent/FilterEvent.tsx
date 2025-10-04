import CardEventHome from "../CardEventHome/CardEventHome";
import { Box, Button, Container } from '@mui/material'
import Search from "../Search/Search";
import { useState } from "react";
import Footer from "../Footer/Footer";
import "./FilterEvent.css";
import Title from "../Title/Title";
import Navbar from "../Navbar/Navbar";
import search from "../../assets/search.png";
import Banner from "../Banner/Banner";
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { useSearch } from "../../context/SearchContext";
import { useEffect } from "react";
import api from "../../api/api";
import EventoProps from "../CardEventHome/props/EventoProps";
import sad from '../../assets/sad.png'
import { dados } from '../../categorys/dados'
const FilterEvent = () => {
    const {
        searchText,
        categories: contextCategories,
        city: contextCity,
        date: contextDate,
        setSearchText,
        setCategories,
        setDate
    } = useSearch();
    //console.log('FilterEvent context values:', searchText, contextCategories, contextDate);

    const [displayCategories, setDisplayCategories] = useState<string[]>([]);
    const [filtered, setFiltered] = useState<EventoProps[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(6);
    const fetchEventos = async () => {
        try {
            const params = {
                name: searchText || undefined,
                category: contextCategories.length > 0 ? contextCategories : undefined,
                date: contextDate || undefined,
                city: contextCity || undefined,
            };

            const queryParams = new URLSearchParams();

            if (params.name) queryParams.append("name", params.name);

            // 👉 é aqui que você coloca
            if (params.category && params.category.length > 0) {
                params.category.forEach((id: string) => {
                    queryParams.append("category", id);
                });
            }

            if (params.date) queryParams.append("date", params.date);
            if (params.city) queryParams.append("city", params.city);
            const queryString = queryParams.toString();
            const url = `/event${queryString ? `?${queryString}` : ""}`;

            console.log("query string:", queryString); // debug

            const res: any = await api.get(url);
            setFiltered(res.data);
        } catch (err) {
            console.error("Erro ao buscar eventos:", err);
        }
    };






    useEffect(() => {
        fetchEventos();
        // converte os ids salvos em nomes
        const categoryNames = contextCategories.map(id => {
            const match = dados.find(opt => String(opt.id) === id);
            return match ? match.title : '';
        });
        setDisplayCategories(categoryNames);
        setVisibleCount(6);
    }, [searchText, contextCategories, contextDate, contextCity]);


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

     const generateTitle = () => {
        if (filtered.length === 0) {
            return 'Nenhum evento encontrado';
        }

        const categoryText = displayCategories.join(', ');

        if (contextCity) {
            // Se tem cidade E categorias, combina os dois.
            if (categoryText) {
                return `${categoryText} em ${contextCity}`;
            }
            // Se tem apenas cidade.
            return `Eventos em ${contextCity}`;
        }

        // Se não tem cidade, mas tem categorias.
        if (categoryText) {
            return categoryText;
        }

        // Se não tem nenhum filtro.
        return 'Todos os eventos';
    };


    return (
        <>

            <Navbar />
            <Banner />
            <Box sx={{ textAlign: { xs: 'center' } }}>
                <Title className="title-search" sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 5 }}>
                    Pesquisar Evento
                    <Box component='img' src={search} sx={{
                        pl: 2,
                        width: { xs: 60, sm: 60, md: 80 }, // muda conforme a tela
                        height: "auto", // mantém a proporção
                    }} />
                </Title>
            </Box>
            <Box className="search-container" sx={{ paddingBottom: 10, borderBottom: 1, borderColor: '#e0e0e0' }} >
                <Container>
                    <Search onDateChange={handleDateChange} onCategoryChange={handleCategoryChange} onTextChange={handleTextChange} />

                </Container>
            </Box>
            <Box className="title-container" sx={{ textAlign: 'center', display: 'flex' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexDirection: { xs: 'column', md: 'row' }, // column no mobile, row no desktop
                        justifyContent: 'center',
                    }}
                >
                    <Title>
                        {generateTitle()}
                    </Title>

                    {filtered.length === 0 && (
                        <Box sx={{ height: 70, width: 70 }}>
                            <img src={sad} alt="sad" style={{ width: '100%', height: '100%' }} />
                        </Box>
                    )}
                </Box>


            </Box>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Box sx={{
                    margin: '0 auto',
                    width: '90vw',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // 1 coluna em telas pequenas, 2 em médias, 3 em grandes
                    gap: 4, // Espaçamento entre os cards

                }}>
                    {
                        filtered.slice(0, visibleCount).map((card: EventoProps, index: number) => (
                            <CardEventHome key={index} card={card} />
                        ))}

                </Box>
            </Container>
            {visibleCount < filtered.length && (
                <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                    <Button endIcon={<KeyboardArrowDownOutlined />} variant="contained" onClick={() => setVisibleCount(prev => prev + 6)} sx={{ fontSize: 18, fontFamily: 'var(--fredoka)', backgroundColor: 'var(--roxo)' }}>Ver mais</Button>
                </Box>
            )}
            <Box sx={{ marginTop: 10 }}>
                <Footer />
            </Box>
        </>
    )

}

export default FilterEvent;