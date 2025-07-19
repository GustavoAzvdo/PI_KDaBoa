interface EventoProps {
    id_evento: number;
    nome_evento: string;
    descricao: string;
    data_criacao: string;
    data_inicio: string;
    data_fim: string;
    estatus: number;
    foto: string;
    id_estabelecimento: number;
    id_endereco: number;
    Endereco: {
      id_endereco: number;
      logradouro: string;
      numero: string;
      complemento: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
      favorito: boolean;
    };
    Estabelecimento: {
      id_estabelecimento: number;
      nome: string;
      cnpj: string;
      descricao: string;
      status: string | null;
      imagem: string | null;
      id_contato: number;
      Contato: {
        id_contato: number;
        email: string;
        tel_cel_1: string;
        tel_cel_2: string;
      };
    };
    Evento_Categoria: {
      id_evento: number;
      id_categoria: number;
      Categoria: {
        id_categoria: number;
        nome_categoria: string;
        icone: string;
      };
    }[];
  }
  
export default EventoProps;