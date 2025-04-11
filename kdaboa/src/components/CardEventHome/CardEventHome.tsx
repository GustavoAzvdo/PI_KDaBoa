import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

import "./CardEventHome.css"
import { Typography } from '@mui/material';

export default function RecipeReviewCard() {

return (
    <Card sx={{ maxWidth: 345, borderRadius: 4}}>
        <CardMedia
            component="img"
            height="194"
            image="/public/Cabelinho_Banner.jpg"
            alt="Paella dish"
        />
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    P 
                </Avatar>
            }
            title="Prefixo011 - MC Cabelinho"
            subheader="Setembro 14, 2016"
        />
        <CardActions sx={{alignItems: "flex-end", display:"flex", justifyContent: "flex-end"}}  disableSpacing>
            <button className='btn-cardHomeEvent' onClick={() => {

            }}>
                <Typography className='txt-cardHomeEvent'>
                    Ver Mais
                </Typography>
            </button>
        </CardActions>
    </Card>
);
}
