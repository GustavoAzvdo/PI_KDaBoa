import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import CardEventHome from "../CardEventHome/CardEventHome"

import EventoProps from '../CardEventHome/props/EventoProps.ts'

import './CarroselEventHome.css'
import { useEffect, useState } from 'react';
import api from '../../api/api.ts';

export default function CarroselEventHome() {

    const [cards, setCards] = useState<EventoProps[]>([]);

    useEffect(() => {
        api.get<any>("/event").then((res) => {
            setCards(res.data);
            // console.log(res)
        })
    }, [])

    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={3}
            
            navigation
            pagination={{ clickable: true,
                renderBullet: (index, className) => {
                    return `<button class="${className}">${index + 1}</button>`;
                }
             }}
             breakpoints={{
                300: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                530: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 60,
                },
             }}>

                {cards.slice(0, 6).map((card : EventoProps, index: number) => 
                    <SwiperSlide key={index}>
                        <CardEventHome card={card} />
                    </SwiperSlide>
            )} 

        </Swiper>
    )
}