import { Star, StarBorder, Fence, Flag, LocationCity, MapsHomeWork, Numbers, Place, Signpost, Edit } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import './Endereco.css';
import { useEffect } from 'react';
import { useEnderecoContext } from '../../../context/EnderecoContext';
import { Delete } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import api from '../../../api/api'

interface EnderecoProps {
    buttonLabel?: string;
    showButton?: boolean;
    disabledComponents?: boolean
    enderecoSelecionado?: EnderecoData | null;
    onAddEndereco?: (endereco: EnderecoData) => void;
}

export interface EnderecoData {
    id_endereco: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    favorito?: boolean
}


const Endereco = ({ enderecoSelecionado, showButton = true, disabledComponents = true }: EnderecoProps) => {

    const [] = useState<EnderecoData[]>([]);
    const [, setLoadingEnderecos] = useState(true);

    const [cep, setCep] = useState<string>('');
    //
    const [viewCep, setViewCep] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [uf, setUf] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    //
    const [numero, setNumero] = useState<string>('');
    const [cepError, setCepError] = useState<boolean>(false);
    const [cepHelper, setCepHelper] = useState<string>('');
    const [, setDisabled] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const { setEnderecosDireto, enderecos, addEndereco, updateEndereco, removeEndereco } = useEnderecoContext();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    //
    const [idEndereco, setIdEndereco] = useState<number>()



    const handleOpenDeleteModal = (idx: number) => {
        const e = enderecos[idx];
        setDeleteIndex(idx);
        setIdEndereco(e.id_endereco)
        setDeleteModalOpen(true);
    };

    // Função para confirmar exclusão
    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/gerente/address/?id=${idEndereco}`, { withCredentials: true })

            if (deleteIndex !== null) {
                removeEndereco(deleteIndex);
                setSnackbarMsg('Endereço excluído com sucesso!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
            setDeleteModalOpen(false);
            setDeleteIndex(null);
        } catch (error) {
            console.log(error)
        }


    };

    // Função para cancelar exclusão
    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setDeleteIndex(null);
    };

    function formatCep(value: string): string {
        value = value.replace(/\D/g, '');
        if (value.length > 5) {
            return value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        return value.slice(0, 9);
    }

    const clearFields = () => {
        setCep('');
        setViewCep('')
        setLogradouro('');
        setBairro('');
        setCidade('');
        setUf('');
        setComplemento('');
        setNumero('');
        setCepError(false);
        setCepHelper('');
    };

    const isValid = () => {
        // Verifica se o CEP tem 8 dígitos numéricos (sem traço)
        const cepNumerico = cep.replace(/\D/g, '');
        return cepNumerico.length === 8 && numero !== '';
    };
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setViewCep(formatCep(e.target.value));
        setCepError(false);
        setCepHelper('');
    };

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cepValue = e.target.value.replace(/\D/g, '');
        if (cepValue.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setLogradouro(data.logradouro || '');
                    setBairro(data.bairro || '');
                    setCidade(data.localidade || '');
                    setUf(data.uf || '');
                    setComplemento(data.complemento || '');
                    setCepError(false);
                    setCepHelper('');
                } else {
                    setLogradouro('');
                    setBairro('');
                    setCidade('');
                    setUf('');
                    setComplemento('');
                    setCepError(true);
                    setCepHelper('CEP não encontrado');
                }
            } catch (error) {
                setLogradouro('');
                setBairro('');
                setCidade('');
                setUf('');
                setComplemento('');
                setCepError(true);
                setCepHelper('Erro ao buscar CEP');
            }
        } else {
            setCepError(true);
            setCepHelper('CEP inválido');
        }
    };

    // Adicionar ou atualizar endereço
    const handleButtonClick = async () => {

        try {
            const response = await api.post<EnderecoData>('/gerente/address', {

                cep: cep,
                logradouro: logradouro,
                numero: numero,
                bairro: bairro,
                complemento: complemento,
                cidade: cidade,
                estado: uf,


            }, { withCredentials: true })

            const novoEndereco: EnderecoData = {
                id_endereco: response.data?.id_endereco, cep, logradouro, bairro, cidade, estado: uf, complemento, numero, favorito: false

            };

            console.log(novoEndereco)


            const exists = enderecos.some((e: EnderecoData, idx: number) =>
                e.cep === cep &&
                e.numero === numero &&
                (editIndex === null || idx !== editIndex)
            );

            if (exists) {
                setSnackbarMsg('Endereço já foi adicionado!');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }

            if (editing && editIndex !== null) {
                updateEndereco(editIndex, novoEndereco); // Usa função do contexto
                setSnackbarMsg('Endereço atualizado com sucesso!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setEditing(false);
                setEditIndex(null);
                clearFields();
            } else {
                addEndereco(novoEndereco); // Usa função do contexto
                setSnackbarMsg('Endereço salvo com sucesso!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                clearFields();
            } clearFields();
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = (idx: number) => {
        const e = enderecos[idx];
        setIdEndereco(e.id_endereco)
        setCep(e.cep);
        setViewCep(formatCep(e.cep))
        setLogradouro(e.logradouro);
        setBairro(e.bairro);
        setCidade(e.cidade);
        setUf(e.estado);
        setComplemento(e.complemento);
        setNumero(e.numero);
        setEditing(true);
        setDisabled(false);
        setEditing(true);
        setEditIndex(idx);
    };

    //função para editar algum estbalecimento
    const handleEditAddress = async () => {
        try {
            const response = await api.put<EnderecoData>(`/gerente/address/${idEndereco}`, {
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                bairro: bairro,
                complemento: complemento,
                cidade: cidade,
                estado: uf,

            }, { withCredentials: true })

            const novoEndereco: EnderecoData = {
                id_endereco: response.data?.id_endereco, cep, logradouro, bairro, cidade, estado: uf, complemento, numero

            };


            const exists = enderecos.some((e: EnderecoData, idx: number) =>
                e.cep === cep &&
                e.numero === numero &&
                (editIndex === null || idx !== editIndex)
            );

            if (exists) {
                setSnackbarMsg('Endereço já foi adicionado!');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }

            if (editing && editIndex !== null) {
                updateEndereco(editIndex, novoEndereco); // Usa função do contexto
                setSnackbarMsg('Endereço atualizado com sucesso!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setEditing(false);
                setEditIndex(null);
                clearFields();
            } else {
                addEndereco(novoEndereco); // Usa função do contexto
                setSnackbarMsg('Endereço salvo com sucesso!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                clearFields();
            } clearFields();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (enderecoSelecionado) {
            // Preenche os campos quando há um endereço selecionado
            setCep(enderecoSelecionado.cep || '');
            setViewCep(enderecoSelecionado.cep || '')
            setLogradouro(enderecoSelecionado.logradouro || '');
            setBairro(enderecoSelecionado.bairro || '');
            setCidade(enderecoSelecionado.cidade || '');
            setUf(enderecoSelecionado.estado || '');
            setComplemento(enderecoSelecionado.complemento || '');
            setNumero(enderecoSelecionado.numero || '');
        } else {
            // Limpa os campos quando o endereço selecionado é null/undefined
            clearFields();
        }
    }, [enderecoSelecionado]);

    useEffect(() => {
        async function carregarEnderecos() {
            try {
                const response = await api.get<EnderecoData[]>('/gerente/address', { withCredentials: true });
                console.log(response)
                setEnderecosDireto(response.data);
                console.log(enderecos)
            } catch (error) {
                console.error('Erro ao carregar endereços:', error);
            } finally {
                setLoadingEnderecos(false);
            }
        }

        carregarEnderecos();
    }, []);

    return (
        <>
            <Grid container spacing={2}
                sx={{
                    padding: 2,
                    backgroundColor: disabledComponents ? '#f5f5f5' : 'transparent',
                    pointerEvents: disabledComponents ? 'none' : 'auto',
                    opacity: disabledComponents ? 0.7 : 1
                }}
            >
                {/* Campos do endereço */}
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                    <Box>
                        <TextField
                            fullWidth

                            value={viewCep}
                            onBlur={handleCepBlur}
                            onChange={(event: any) => {
                                handleCepChange(event)
                                setCep(event.target.value.replace(/\D/g, ''))
                            }}
                            label="CEP"
                            variant="outlined"
                            placeholder="Digite seu CEP"
                            inputProps={{ maxLength: 9 }}
                            error={cepError}
                            helperText={cepHelper ? cepHelper : 'Ex: 12345-678'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Place />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField

                            disabled
                            fullWidth
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                            label="Logradouro"
                            variant="outlined"
                            placeholder="Digite o logradouro"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Signpost />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}   >
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            disabled
                            fullWidth
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            type="text"
                            label="Bairro"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Fence />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            disabled
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            type="text"
                            label="Cidade"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LocationCity />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 2 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            disabled
                            fullWidth
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                            type="text"
                            label="UF"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Flag />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField

                            fullWidth
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            type="text"
                            label="Complemento"
                            variant="outlined"
                            helperText="Opcional"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MapsHomeWork />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 2 }} sx={{ mt: 0 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField

                            type="number"
                            fullWidth
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            label="Número"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Numbers />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>

                {showButton && (
                    <Grid size={{ xs: 12, md: 12, sm: 12 }}  >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button

                                variant="contained"
                                sx={{ width: { xs: '100%', sm: '100%', md: '25%' }, backgroundColor: 'var(--roxo)' }}
                                onClick={editing ? handleEditAddress : handleButtonClick}
                                disabled={!isValid()}
                            >
                                <Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--notosans) !important' }}>
                                    {editing ? 'Salvar endereço' : 'Salvar novo endereço'}
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                )}
            </Grid>

            {
                showButton && (
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        {enderecos.map((e: EnderecoData, idx: number) => (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={idx}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        mb: 2,
                                        position: 'relative',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #e0e0e0',
                                        backgroundColor: '#ffffff',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }
                                    }}
                                >
                                    {/* CEP em destaque */}
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 2,
                                        pb: 2,
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Place sx={{ color: 'var(--roxo)', mr: 1, fontSize: 20 }} />
                                            <Typography variant="h6" sx={{
                                                fontWeight: '600',
                                                color: '#333',
                                                fontSize: '1.1rem'
                                            }}>
                                                {e.cep}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={async () => {
                                                try {
                                                    await Promise.all(enderecos.map(async (end) => {
                                                        const isFavorito = end.id_endereco === e.id_endereco;
                                                        await api.put(`/gerente/address/${end.id_endereco}`, {
                                                            favorito: isFavorito,
                                                        }, { withCredentials: true });
                                                    }));

                                                    const atualizados = enderecos.map((end) => ({
                                                        ...end,
                                                        favorito: end.id_endereco === e.id_endereco,
                                                    }));
                                                    setEnderecosDireto(atualizados);

                                                    setSnackbarMsg('Endereço favoritado!');
                                                    setSnackbarSeverity('success');
                                                    setSnackbarOpen(true);
                                                } catch (err) {
                                                    console.error(err);
                                                    setSnackbarMsg('Erro ao favoritar endereço.');
                                                    setSnackbarSeverity('error');
                                                    setSnackbarOpen(true);
                                                }
                                            }}
                                            sx={{
                                                color: e.favorito ? 'primary.main' : '#ccc',
                                                '&:hover': { color: e.favorito ? 'primary.main' : 'var(--roxo)' }
                                            }}
                                        >
                                            {e.favorito ? <Star /> : <StarBorder />}
                                        </IconButton>
                                    </Box>

                                    {/* Informações do endereço */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <Signpost sx={{ color: 'text.secondary', mr: 1.5, mt: 0.2, fontSize: 18 }} />
                                            <Box>
                                                <Typography variant="caption" sx={{
                                                    color: 'text.secondary',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7rem'
                                                }}>
                                                    Logradouro
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: '500', lineHeight: 1.3 }}>
                                                    {e.logradouro}, {e.numero}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <Fence sx={{ color: 'text.secondary', mr: 1.5, mt: 0.2, fontSize: 18 }} />
                                            <Box>
                                                <Typography variant="caption" sx={{
                                                    color: 'text.secondary',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7rem'
                                                }}>
                                                    Bairro
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: '500', lineHeight: 1.3 }}>
                                                    {e.bairro}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <LocationCity sx={{ color: 'text.secondary', mr: 1.5, mt: 0.2, fontSize: 18 }} />
                                            <Box>
                                                <Typography variant="caption" sx={{
                                                    color: 'text.secondary',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7rem'
                                                }}>
                                                    Cidade/UF
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: '500', lineHeight: 1.3 }}>
                                                    {e.cidade}/{e.estado}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {e.complemento && (
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <MapsHomeWork sx={{ color: 'text.secondary', mr: 1.5, mt: 0.2, fontSize: 18 }} />
                                                <Box>
                                                    <Typography variant="caption" sx={{
                                                        color: 'text.secondary',
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.7rem'
                                                    }}>
                                                        Complemento
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: '500', lineHeight: 1.3 }}>
                                                        {e.complemento}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Botões de Ação */}
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1,
                                        pt: 2,
                                        borderTop: '1px solid #f0f0f0'
                                    }}>
                                        <Button
                                            size="large"
                                            variant="contained"
                                            startIcon={<Edit />}
                                            onClick={() => handleEdit(idx)}
                                            sx={{
                                                flex: 1,
                                               
                                             
                                                py: 0.8,
                                                fontSize: '15px',
                                             
                                            }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="large"
                                            variant="outlined"
                                            startIcon={<Delete />}
                                            onClick={() => handleOpenDeleteModal(idx)}
                                            sx={{
                                                flex: 1,
                                              
                                                py: 0.8,
                                                borderColor: '#f44336',
                                                color: '#f44336',
                                             
                                                '&:hover': {
                                                    bgcolor: '#f44336',
                                                    color: 'white'
                                                }
                                            }}
                                        >
                                            Excluir
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                )
            }

            <Dialog
                open={deleteModalOpen}
                onClose={handleCancelDelete}
                sx={{ fontFamily: 'var(--notosans) !important' }}
            >
                <DialogTitle sx={{ fontFamily: 'var(--notosans) !important', fontSize: '20px' }}>Excluir endereço</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontFamily: 'var(--notosans) !important', fontSize: '18px' }}>
                        Tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ gap: 1 }}>
                    <Button onClick={handleCancelDelete} sx={{ fontFamily: 'var(--notosans) !important', fontSize: '16px' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" sx={{ fontFamily: 'var(--notosans) !important', fontSize: '16px', backgroundColor: 'var(--roxo)' }}>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMsg}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </>

    );
};



export default Endereco;