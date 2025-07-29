
import { createContext, useContext, useState, ReactNode, useEffect} from 'react';
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
  enderecoFavorito: EnderecoData | null;
  addEndereco: (endereco: EnderecoData) => void;
  updateEndereco: (index: number, endereco: EnderecoData) => void;
  removeEndereco: (index: number) => void;
  favorito: number | null;
  favoritarEndereco: (idx: number) => void;
  setEnderecosDireto: (enderecos: EnderecoData[]) => void;
}

const EnderecoContext = createContext<EnderecoContextType | undefined>(undefined);

export const EnderecoProvider = ({ children }: { children: ReactNode }) => {
  const [enderecos, setEnderecos] = useState<EnderecoData[]>([]);
  const [favorito, setFavorito] = useState<number | null>(() => {
    // Tenta carregar favorito do localStorage (opcional)
    const fav = localStorage.getItem('enderecoFavorito');
    return fav !== null ? Number(fav) : null;
  });

  useEffect(() => {
    fetchEnderecos()
  },[])

  useEffect(() => {
    // Atualiza localStorage sempre que favorito mudar
    if (favorito !== null) {
      localStorage.setItem('enderecoFavorito', favorito.toString());
    } else {
      localStorage.removeItem('enderecoFavorito');
    }
  }, [favorito]);

  // Garante que favorito seja válido após mudanças em enderecos
  useEffect(() => {
    if (favorito !== null) {
      if (favorito >= enderecos.length) {
        setFavorito(null); // índice inválido
      }
    }
  }, [enderecos, favorito]);

  const addEndereco = (endereco: EnderecoData) => {
    setEnderecos((prev) => [...prev, endereco]);
  };

  const setEnderecosDireto = (novos: EnderecoData[]) => {
    setEnderecos(novos);
  };

  const favoritarEndereco = (idx: number) => {
    if (idx >= 0 && idx < enderecos.length) {
      setFavorito(idx);
    }
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
    // Se remover o favorito, zera favorito
    if (favorito === index) {
      setFavorito(null);
    } else if (favorito !== null && favorito > index) {
      // Ajusta índice favorito se removeu endereço antes dele
      setFavorito(favorito - 1);
    }
  };

 
    const fetchEnderecos = async () => {
      try {
        const response: any = await api.get('/gerente/address', { withCredentials: true });
        const lista: EnderecoData[] = response.data;
  
        setEnderecos(lista);
  
        // Define automaticamente o primeiro que for favorito
        const favoritoEndereco = lista.find((e) => e.favorito === true);
        if (favoritoEndereco) {
          const index = lista.findIndex(e => e.id_endereco === favoritoEndereco.id_endereco);
          setFavorito(index);
        }
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      }
    };
  
    useEffect(() => {
      fetchEnderecos()
    },[])
  
  return (
    <EnderecoContext.Provider value={{
        enderecoFavorito: favorito !== null ? enderecos[favorito] ?? null : null ,
        setEnderecosDireto, 
        enderecos, 
        addEndereco, 
        updateEndereco, 
        removeEndereco, 
        favorito, 
        favoritarEndereco
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
