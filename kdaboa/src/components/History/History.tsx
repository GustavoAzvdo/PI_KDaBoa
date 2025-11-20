import { Popover, Typography, Button, Box, Divider, Chip } from '@mui/material';
import { Alteracao } from '../Forms/CriarEvento/CriarEvento';
import dayjs from 'dayjs';
import { dados } from '../../categorys/dados'; // Importe seus dados de categoria aqui
import { EnderecoData } from '../Forms/Endereco/Endereco';
interface HistoryPopoverProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    alteracao: Alteracao | null;
    onAction: (id_his: number, action: 'accept' | 'reject', novoValor: string, campo: string) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    enderecos: EnderecoData[]; // Adicione a prop endereco aqui
}

const HistoryPopover = ({ 
    anchorEl, 
    open, 
    onClose, 
    alteracao, 
    onAction,
    onMouseEnter,
    onMouseLeave,
    enderecos
}: HistoryPopoverProps) => {
    if (!alteracao) return null;

    const renderContent = () => {
        // 1. FOTO
       if (alteracao.campo === 'foto') {
            // Pega a URL (ex: http://.../imagem.png) e extrai só o final (imagem.png)
            const nomeArquivo = alteracao.valor_novo.split('/').pop() || 'imagem.png';

            return (
                <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <img 
                        src={alteracao.valor_novo} 
                        alt="Nova sugestão" 
                        style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: 4 }} 
                    />
                    {/* Mostra o nome do arquivo extraído */}
                    <Typography variant="caption" display="block" sx={{ mt: 0.5, fontWeight: '500' }}>
                        {nomeArquivo}
                    </Typography>
                </Box>
            );
        }

        // 2. DATA
        if (alteracao.campo.includes('data')) {
            return (
                <Typography sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    {dayjs(alteracao.valor_novo).format('DD/MM/YYYY HH:mm')}
                </Typography>
            );
        }

        // 3. DESCRIÇÃO (HTML)
        if (alteracao.campo === 'descricao') {
            return (
                <Box sx={{ maxHeight: 100, overflowY: 'auto', p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                     <div dangerouslySetInnerHTML={{ __html: alteracao.valor_novo }} />
                </Box>
            );
        }

        // 4. NOME (Título)
        if (alteracao.campo === 'nome_evento') {
            return (
                <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {alteracao.valor_novo}
                    </Typography>
                </Box>
            );
        }

        // 5. CATEGORIA (Array de IDs)
        // Supondo que valor_novo venha como string "[1, 2, 3]" ou "1,2,3"
       if (alteracao.campo === 'categoria' || alteracao.campo === 'categorias') {
            let ids: number[] = [];
            
            try {
                // Tenta fazer o parse
                const parsed = JSON.parse(alteracao.valor_novo);
                
                // Se for um array (ex: [1, 2]), usa ele.
                // Se for um único valor (ex: 1), transforma em array (ex: [1]).
                ids = Array.isArray(parsed) ? parsed : [Number(parsed)];
            } catch {
                // Se der erro no JSON ou for uma string separada por vírgulas
                if (typeof alteracao.valor_novo === 'string') {
                    ids = alteracao.valor_novo.split(',').map(v => Number(v.trim()));
                }
            }

            // SEGURANÇA FINAL: Se depois de tudo ids não for array ou tiver NaN, limpa ou filtra
            if (!Array.isArray(ids)) {
                ids = [];
            }
            // Filtra para garantir que só temos números válidos
            ids = ids.filter(id => !isNaN(id) && id !== 0);

            return (
                <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {ids.length > 0 ? (
                        ids.map(id => {
                            const cat = dados.find((d: { id: number; }) => d.id === id);
                            return cat ? (
                                <Chip key={id} label={cat.title} size="small" sx={{ bgcolor: 'white' }} />
                            ) : (
                                <Chip key={id} label={`ID: ${id}`} size="small" />
                            );
                        })
                    ) : (
                        <Typography variant="caption">Sem categorias</Typography>
                    )}
                </Box>
            );
        }

        // 6. ENDEREÇO (ID do endereço)
        if (alteracao.campo === 'id_endereco') {
            // Procura o endereço completo usando o ID que veio na alteração
            const novoId = Number(alteracao.valor_novo);
            const endEncontrado = enderecos.find(e => e.id_endereco === novoId);

            return (
                <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        Sugestão de Novo Endereço:
                    </Typography>
                    
                    {endEncontrado ? (
                        <>
                            <Typography variant="body2" display="block">
                                {endEncontrado.logradouro}, {endEncontrado.numero}
                            </Typography>
                            <Typography variant="caption" display="block" color="textSecondary">
                                {endEncontrado.bairro} - {endEncontrado.cidade}/{endEncontrado.estado}
                            </Typography>
                            <Typography variant="caption" display="block" color="textSecondary">
                                CEP: {endEncontrado.cep}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body2" color="error">
                            Endereço ID {novoId} não encontrado na sua lista.
                        </Typography>
                    )}
                </Box>
            );
        }

        // 7. Padrão
        return (
            <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                {alteracao.valor_novo}
            </Box>
        );
    };

    return (
        <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            disableRestoreFocus
            sx={{ pointerEvents: 'none' }} 
            PaperProps={{
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                sx: { pointerEvents: 'auto' }
            }}
        >
            <Box sx={{ p: 2, maxWidth: 300, backgroundColor: '#fff' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#6C15D5' }}>
                    Alteração: {alteracao.campo.toUpperCase()}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Por: {alteracao.Usuario.nome_usuario}
                </Typography>
                <Divider sx={{ my: 1 }} />
                
                {renderContent()}

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                        size="small" variant="contained" color="error"
                        onClick={() => onAction(alteracao.id_his, 'reject', alteracao.valor_novo, alteracao.campo)}
                    >
                        Rejeitar
                    </Button>
                    <Button 
                        size="small" variant="contained" color="success"
                        onClick={() => onAction(alteracao.id_his, 'accept', alteracao.valor_novo, alteracao.campo)}
                    >
                        Aceitar
                    </Button>
                </Box>
            </Box>
        </Popover>
    );
};

export default HistoryPopover;