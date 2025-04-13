import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import CardEventHome from "../CardEventHome/CardEventHome"
import CardsBD from '../CardEventHome/CardsBD.ts'
import CardProps from '../CardEventHome/props/CardProps.ts'

import './CarroselEventHome.css'

export default function CarroselEventHome() {

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
                    spaceBetween: 20,
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

                {CardsBD.map((card : CardProps, index: number) => 
                    <SwiperSlide key={index}>
                        <CardEventHome card={card} />
                    </SwiperSlide>
            )} 

        </Swiper>
    )
}