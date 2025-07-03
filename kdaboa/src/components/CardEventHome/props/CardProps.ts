interface CardProps {
    id_evento: number;
    nome_evento: string;
    descricao: string;
    foto: string;
    data_inicio: string;
    data_fim: string;
    categoria: string[];
}

export default CardProps;
export type { CardProps };