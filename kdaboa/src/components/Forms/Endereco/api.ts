import axios from 'axios';

export const buscaCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return null;
  }
};
