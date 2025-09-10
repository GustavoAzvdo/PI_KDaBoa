import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import CardEventHome from "../CardEventHome/CardEventHome"

import EventoProps from '../CardEventHome/props/EventoProps.ts'

import './CarroselEventHome.css'
import { useEffect, useState } from 'react';
import api from '../../api/api.ts';
const estadosUF: Record<string, string> = {
    "Acre": "AC",
    "Alagoas": "AL",
    "Amapá": "AP",
    "Amazonas": "AM",
    "Bahia": "BA",
    "Ceará": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    "Pará": "PA",
    "Paraíba": "PB",
    "Paraná": "PR",
    "Pernambuco": "PE",
    "Piauí": "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    "Rondônia": "RO",
    "Roraima": "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    "Sergipe": "SE",
    "Tocantins": "TO",
};

export default function CarroselEventHome() {
    const [cards, setCards] = useState<EventoProps[]>([]);
    const [estadoUsuario, setEstadoUsuario] = useState<string | null>(null);

    useEffect(() => {
        // pega eventos
        api.get<any>("/event").then((res) => {
            setCards(res.data);
        });

        // pega localização do user
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
        
            const estado = data.address?.state;
   
            if (estado) setEstadoUsuario(estado);
        });
    }, []);

    // filtra só os eventos do mesmo estado
    const ufUsuario = estadoUsuario ? estadosUF[estadoUsuario] : undefined; 
    const cardsFiltrados = ufUsuario
        ? cards.filter((c) => c.Endereco.estado === ufUsuario)
        : cards;

    useEffect(() => {
        // Para teste
        setEstadoUsuario("Pará");
    }, []);
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                    return `<button class="${className}">${index + 1}</button>`;
                },
            }}
            breakpoints={{
                300: { slidesPerView: 1, spaceBetween: 10 },
                530: { slidesPerView: 2, spaceBetween: 30 },
                1200: { slidesPerView: 3, spaceBetween: 60 },
            }}
        >
            {cardsFiltrados.slice(0, 6).map((card: EventoProps, index: number) => (
                <SwiperSlide key={index}>
                    <CardEventHome card={card} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}