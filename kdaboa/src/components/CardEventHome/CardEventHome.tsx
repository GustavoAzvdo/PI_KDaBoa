import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

import "./CardEventHome.css"
import { Typography } from '@mui/material';
import CardProps from './props/CardProps';


interface CardEventHomeProps {
    card: CardProps;
}

export default function RecipeReviewCard({ card }: CardEventHomeProps) {
    
return (
    <Card className='cardHomeEvent'>
        <CardMedia
            component="img"
            height="194"
            image={card.image}
            alt="Paella dish"
        />
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    P 
                </Avatar>
            }
            title={card.title}
            subheader={card.date}
        />
        <CardActions sx={{alignItems: "flex-end", display:"flex", justifyContent: "flex-end"}}  disableSpacing>
            <button className='btn-cardHomeEvent' onClick={() => {
                // Insert script for open page of the especific event
            }}>
                <Typography className='txt-cardHomeEvent'>
                    Ver Mais
                </Typography>
            </button>
        </CardActions>
    </Card>
);
}
