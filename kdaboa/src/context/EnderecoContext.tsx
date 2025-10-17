import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react'; // 1. Importe useMemo
import api from '../api/api';

export interface EnderecoData {
  id_endereco: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  favorito?: boolean;
}

interface EnderecoContextType {
  enderecos: EnderecoData[];
  enderecoFavorito: EnderecoData | null; // ✅ Este agora será derivado
  addEndereco: (endereco: EnderecoData) => void;
  updateEndereco: (index: number, endereco: EnderecoData) => void;
  removeEndereco: (index: number) => void;
  setEnderecosDireto: (enderecos: EnderecoData[]) => void;
}

const EnderecoContext = createContext<EnderecoContextType | undefined>(undefined);

export const EnderecoProvider = ({ children }: { children: ReactNode }) => {
  const [enderecos, setEnderecos] = useState<EnderecoData[]>([]);


  const fetchEnderecos = async () => {
    try {
      const response: any = await api.get('/gerente/address', { withCredentials: true });
      const lista: EnderecoData[] = response.data;
      setEnderecos(lista);
 

    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
    }
  };

  useEffect(() => {
    fetchEnderecos();
  },[]); 

  const enderecoFavorito = useMemo(() => {
    return enderecos.find(e => e.favorito === true) || null;
  }, [enderecos]); 

  const addEndereco = (endereco: EnderecoData) => {
    setEnderecos((prev) => [...prev, endereco]);
  };

  const setEnderecosDireto = (novos: EnderecoData[]) => {
    setEnderecos(novos);
  };

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
    <EnderecoContext.Provider value={{
        enderecoFavorito,
        setEnderecosDireto, 
        enderecos, 
        addEndereco, 
        updateEndereco, 
        removeEndereco,
    }}>
      {children}
    </EnderecoContext.Provider>
  );
};

export const useEnderecoContext = () => {
  const context = useContext(EnderecoContext);
  if (!context) throw new Error('useEnderecoContext must be used within EnderecoProvider');
  return context;
};