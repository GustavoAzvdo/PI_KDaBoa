
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
  SportsSoccer,
  SportsBar,
  SmokeFree,
  Speaker,
  Agriculture
} from '@mui/icons-material';



export interface Dados {
  id: number
  title: string;
  icon: React.ReactNode;
}

export const dados: Dados[] = [

  { id: 1,title: 'Show', icon: <MusicNote /> },
  { id: 2,title: 'Festival', icon: <Festival /> },
  { id: 3,title: 'Tecnologia', icon: <Computer /> },
  { id: 4,title: 'Comida Caseira', icon: <Restaurant /> },
  { id: 5,title: 'Gastronomia', icon: <LocalDining /> },
  { id: 6,title: 'Show ao Vivo', icon: <MusicNote /> },
  { id: 7,title: 'Música Acústica', icon: <MusicOff /> },
  { id: 8,title: 'Noite do Sertanejo', icon: <MusicNote /> }, // GuitarIcon substituído
  { id: 9,title: 'Noite de Rock', icon: <Headset /> },
  { id: 10,title: 'Samba e Pagode', icon: <MusicNote /> },
  { id: 11,title: 'Jazz & Blues', icon: <QueueMusic /> },
  { id: 12,title: 'Eletrônica / DJ Set', icon: <DiscFull /> },
  { id: 13,title: 'Karaokê', icon: <Mic /> },
  { id: 14,title: 'Open Mic', icon: <MicNone /> },
  { id: 15,title: 'Chopp em Dobro', icon: <LocalBar /> },
  { id: 16,title: 'Rodada de Caipirinha', icon: <LocalDrink /> },
  { id: 17,title: 'Noite de Drinks Especiais', icon: <LocalBar /> },
  { id: 18,title: 'Festival de Cervejas Artesanais', icon: <LocalBar /> },
  { id: 19,title: 'Happy Hour', icon: <Event /> },
  { id: 20,title: 'Degustação de Vinhos', icon: <WineBar /> },
  { id: 21,title: 'Promoção de Balde de Cerveja', icon: <LocalBar /> },
  { id:22,title: 'Coquetelaria ao Vivo', icon: <LocalBar /> },
  { id: 23,title: 'Jantar Temático', icon: <Restaurant /> },
  { id: 24,title: 'Noite de Massas', icon: <RestaurantMenu /> },
  { id: 25,title: 'Festival de Comida de Boteco', icon: <Fastfood /> },
  { id: 26,title: 'Rodízio Especial (Pizza, Sushi etc.)', icon: <Restaurant /> },
  { id : 27,title: 'Feijoada Especial', icon: <Restaurant /> },
  { id : 28,title: 'Brunch', icon: <RestaurantMenu /> },
  { id : 29,title: 'Noite do Japa', icon: <Restaurant /> },
  { id : 30,title: 'Food Truck no Local', icon: <LocalDining /> },
  { id : 31,title: 'Festa à Fantasia', icon: <PartyMode /> },
  { id : 32,title: 'Balada Anos 80 / 90', icon: <MusicNote /> },
  { id : 33,title: 'Noite Latina', icon: <MusicNote /> },
  { id : 34,title: 'Noite do Flashback', icon: <MusicNote /> },
  { id : 35,title: 'Festa Junina / Temática Regional', icon: <MusicNote /> },
  { id : 36,title: 'Carnaval Fora de Época', icon: <MusicNote /> },
  { id : 37,title: 'Halloween Party', icon: <MusicNote /> },
  { id : 38,title: 'Stand-up Comedy', icon: <SentimentVerySatisfied /> },
  { id : 39,title: 'Tarde Cultural / Exposição de Arte', icon: <Palette /> },
  { id : 40,title: 'Evento Esportivo', icon: <SportsSoccer /> },
  { id : 41,title: 'Futebol ao vivo', icon: <SportsSoccer /> },
  { id : 42,title: 'Universitário', icon: <SportsBar /> },
  { id : 43,title: 'Rap & Trap', icon: <SmokeFree /> },
  { id : 44,title: 'Rock', icon: <Speaker /> },
  { id : 45,title: 'Pop', icon: <DiscFull  /> },
  { id : 46,title: 'Sertanejo', icon: <Agriculture  /> },

];



