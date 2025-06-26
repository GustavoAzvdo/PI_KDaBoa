import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { VisibilityOutlined } from '@mui/icons-material';
import "./CardEventHome.css"
import {useNavigate} from 'react-router-dom';
import { Button, Typography } from '@mui/material';


import CardProps from './props/CardProps';


interface CardEventHomeProps {
    card: CardProps;
}

export default function RecipeReviewCard({ card }: CardEventHomeProps) {
    const navigate = useNavigate();
    return (

       <Card
  sx={{
    borderRadius: 4,
    cursor: "pointer",
    width: { xs: '90%', sm: '80%', md: 400 }, // ex: responsivo, maior no desktop
    maxWidth: 500, // limite máximo do card (ajuste como quiser)
    margin: '0 auto', // centralizar horizontalmente
    transition: "box-shadow 0.3s cubic-bezier(.25,.8,.25,1), transform 0.3s cubic-bezier(.25,.8,.25,1)",
    boxShadow: 4,
    '&:hover': {
      boxShadow: 8,
      transform: 'translateY(-8px)',
    },
  }}
  className='cardHomeEvent'
  title={card.title}
>

            <CardMedia

                component="img"
                height="194"
                image={card.image}
                alt="Paella dish"
            />
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        
                    </Avatar>
                }

                title={card.title.length > 20 ? card.title.substring(0, 20) + "..." : card.title}

                subheader={card.date}
                className='header-cardHomeEvent' />
            <CardActions sx={{ alignItems: "flex-end", display: "flex", justifyContent: "flex-end" }} disableSpacing>

                <Button className='btn-cardHomeEvent' sx={{}} endIcon={<VisibilityOutlined sx={{ color: "#6C15D5" }} />} href={'/view-event'}onClick={() => {
                         navigate('/view-event', { state: { card } });
                    // Insert script for open page of the especific event
                }}>

                    <Typography className='txt-cardHomeEvent' >
                        Ver Mais
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
}
