import { createContext, useContext, useState, ReactNode } from 'react';

export interface EnderecoData {
  id: boolean;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento: string;
  numero: string | number;
}

interface EnderecoContextType {
  enderecos: EnderecoData[];
  addEndereco: (endereco: EnderecoData) => void;
  updateEndereco: (index: number, endereco: EnderecoData) => void;
  removeEndereco: (index: number) => void;
  favorito: number | null;
  favoritarEndereco: (idx: number) => void
  setEnderecosDireto: (enderecos: EnderecoData[]) => void
}

const EnderecoContext = createContext<EnderecoContextType | undefined>(undefined);

export const EnderecoProvider = ({ children }: { children: ReactNode }) => {
  const [enderecos, setEnderecos] = useState<EnderecoData[]>([]);
  const [favorito, setFavorito] = useState<number | null>(null);


  const addEndereco = (endereco: EnderecoData) => {
    setEnderecos((prev) => [...prev, endereco]);
  };

  const setEnderecosDireto = (novos: EnderecoData[]) => {
    setEnderecos(novos);
  };

  const favoritarEndereco = (idx: number) => {
    setFavorito(idx);
  }

  const updateEndereco = (index: number, endereco: EnderecoData) => {
    setEnderecos((prev) => {
      const novos = [...prev];
      novos[index] = endereco;
      return novos;
    });
  };

  const removeEndereco = (index: number) => {
    setEnderecos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <EnderecoContext.Provider value={{ setEnderecosDireto,enderecos, addEndereco, updateEndereco, removeEndereco, favorito, favoritarEndereco }}>
      {children}
    </EnderecoContext.Provider>
  );
};

export const useEnderecoContext = () => {
  const context = useContext(EnderecoContext);
  if (!context) throw new Error('useEnderecoContext must be used within EnderecoProvider');
  return context;
};