import React, { createContext, useContext, useState } from "react";
import { EnderecoData } from "../components/Forms/Endereco/Endereco";

export interface Evento {
  id_evento: number;
  nome_evento: string;
  descricao: string;
  data_criacao: string;
  data_inicio: string;
  data_fim: string;
  categorias: string[];
  foto: string;
  endereco: EnderecoData | null;
}


interface EventosContextType {
  eventos: Evento[];
  addEvento: (evento: Evento) => void;
  updateEvento: (evento: Evento) => void;
  removeEvento: (id: string) => void;
  setEventoEdicao: (evento: Evento | null) => void;
  eventoEdicao: Evento | null;
  setEventoEditando:  (evento: Evento | null) => void;
  eventoEditando: Evento | null
}

const EventosContext = createContext<EventosContextType | undefined>(undefined);

export const EventosProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoEdicao, setEventoEdicao] = useState<Evento | null>(null);
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null)

  const addEvento = (evento: Evento) => setEventos(prev => [...prev, evento]);
  const updateEvento = (evento: Evento) =>
    setEventos(prev => prev.map(e => (e.id_evento === evento.id_evento ? evento : e)));
  const removeEvento = (id: string) =>
    setEventos(prev => prev.filter(e => e.id_evento !== Number(id)));

  return (
    <EventosContext.Provider value={{ setEventoEditando,eventoEditando,eventos, addEvento, updateEvento, removeEvento, eventoEdicao, setEventoEdicao }}>
      {children}
    </EventosContext.Provider>
  );
};

export const useEventos = () => {
  const ctx = useContext(EventosContext);
  if (!ctx) throw new Error('useEventos must be used within EventosProvider');
  return ctx;
};