
import {
  Festival,
  MusicNote,
  MusicOff,
  Computer,
  Restaurant,
  LocalDining,
  Headset,
  QueueMusic,
  DiscFull,
  Mic,
  MicNone,
  LocalBar,
  LocalDrink,
  Event,
  WineBar,
  RestaurantMenu,
  Fastfood,
  PartyMode,
  SentimentVerySatisfied,
  Palette,
  SportsSoccer
} from '@mui/icons-material';


interface Dados {
  title: string;
  icon: React.ReactNode;
}

export const dados: Dados[] = [
  { title: 'Show', icon: <MusicNote /> },
  { title: 'Festival', icon: <Festival /> },
  { title: 'Tecnologia', icon: <Computer /> },
  { title: 'Comida Caseira', icon: <Restaurant /> },
  { title: 'Gastronomia', icon: <LocalDining /> },
  { title: 'Show ao Vivo', icon: <MusicNote /> },
  { title: 'Música Acústica', icon: <MusicOff /> },
  { title: 'Noite do Sertanejo', icon: <MusicNote /> }, // GuitarIcon substituído
  { title: 'Noite de Rock', icon: <Headset /> },
  { title: 'Samba e Pagode', icon: <MusicNote /> },
  { title: 'Jazz & Blues', icon: <QueueMusic /> },
  { title: 'Eletrônica / DJ Set', icon: <DiscFull /> },
  { title: 'Karaokê', icon: <Mic /> },
  { title: 'Open Mic', icon: <MicNone /> },
  { title: 'Chopp em Dobro', icon: <LocalBar /> },
  { title: 'Rodada de Caipirinha', icon: <LocalDrink /> },
  { title: 'Noite de Drinks Especiais', icon: <LocalBar /> },
  { title: 'Festival de Cervejas Artesanais', icon: <LocalBar /> },
  { title: 'Happy Hour', icon: <Event /> },
  { title: 'Degustação de Vinhos', icon: <WineBar /> },
  { title: 'Promoção de Balde de Cerveja', icon: <LocalBar /> },
  { title: 'Coquetelaria ao Vivo', icon: <LocalBar /> },
  { title: 'Jantar Temático', icon: <Restaurant /> },
  { title: 'Noite de Massas', icon: <RestaurantMenu /> },
  { title: 'Festival de Comida de Boteco', icon: <Fastfood /> },
  { title: 'Rodízio Especial (Pizza, Sushi etc.)', icon: <Restaurant /> },
  { title: 'Feijoada Especial', icon: <Restaurant /> },
  { title: 'Brunch', icon: <RestaurantMenu /> },
  { title: 'Noite do Japa', icon: <Restaurant /> },
  { title: 'Food Truck no Local', icon: <LocalDining /> },
  { title: 'Festa à Fantasia', icon: <PartyMode /> },
  { title: 'Balada Anos 80 / 90', icon: <MusicNote /> },
  { title: 'Noite Latina', icon: <MusicNote /> },
  { title: 'Noite do Flashback', icon: <MusicNote /> },
  { title: 'Festa Junina / Temática Regional', icon: <MusicNote /> },
  { title: 'Carnaval Fora de Época', icon: <MusicNote /> },
  { title: 'Halloween Party', icon: <MusicNote /> },
  { title: 'Stand-up Comedy', icon: <SentimentVerySatisfied /> },
  { title: 'Tarde Cultural / Exposição de Arte', icon: <Palette /> },
  { title: 'Evento Esportivo', icon: <SportsSoccer /> },
];