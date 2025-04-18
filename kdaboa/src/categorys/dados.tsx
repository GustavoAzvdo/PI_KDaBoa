
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import FestivalOutlinedIcon from '@mui/icons-material/FestivalOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';

interface Dados {
  title: string;
  icon: React.ReactNode;
}

export const dados: Dados[] = [
    {title: 'Show', icon: <MusicNoteOutlinedIcon />},
    {title: 'Festival', icon: <FestivalOutlinedIcon />},
    {title: 'Tecnologia', icon: <ComputerOutlinedIcon />},
    {title: 'Comida Caseira', icon: <RestaurantOutlinedIcon />},
    {title: 'Gastronomia', icon: <LocalDiningOutlinedIcon />},
  ];