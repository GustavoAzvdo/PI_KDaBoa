import { Star, StarBorder, Fence, Flag, LocationCity, MapsHomeWork, Numbers, Place, Signpost } from '@mui/icons-material';
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
    const { setEnderecosDireto, enderecos, addEndereco, updateEndereco, removeEndereco, favorito, favoritarEndereco } = useEnderecoContext();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleOpenDeleteModal = (idx: number) => {
        setDeleteIndex(idx);
        setDeleteModalOpen(true);
    };

    // Função para confirmar exclusão
    const handleConfirmDelete = () => {
        if (deleteIndex !== null) {
            removeEndereco(deleteIndex);
            setSnackbarMsg('Endereço excluído com sucesso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
        setDeleteModalOpen(false);
        setDeleteIndex(null);
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

            console.log(response.data)
            
            const novoEndereco: EnderecoData = {
                id_endereco: response.data?.id_endereco, cep, logradouro, bairro, cidade, estado: uf, complemento, numero,
                
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
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
                <Grid size={{ xs: 12, sm: 9, md: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }}   >
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 2 }} sx={{ mt: 0 }}>
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
                    <Grid size={{ xs: 12, md: 12, sm: 6 }}  >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                sx={{ width: '200px', backgroundColor: 'var(--roxo)' }}
                                onClick={handleButtonClick}
                                disabled={!isValid()}
                            >
                                <Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--notosans) !important' }}>
                                    {editing ? 'Salvar novo endereço' : 'Salvar endereço'}
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
                            <Grid size={{ xs: 12, md: 4 }} key={idx}>
                                <Paper elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }} className='paper'>
                                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                        <IconButton
                                            onClick={() => {
                                                favoritarEndereco(idx);
                                                setSnackbarMsg('Endereço favoritado!');
                                                setSnackbarSeverity('warning');
                                                setSnackbarOpen(true);
                                            }}
                                            sx={{ color: 'var(--roxo)' }}
                                        >
                                            {favorito === idx ? <Star /> : <StarBorder />}
                                        </IconButton>
                                    </Box>
                                    <Typography variant="subtitle1"><b>CEP:</b> {e.cep}</Typography>
                                    <Typography variant="subtitle1"><b>Logradouro:</b> {e.logradouro}</Typography>
                                    <Typography variant="subtitle1"><b>Bairro:</b> {e.bairro}</Typography>
                                    <Typography variant="subtitle1"><b>Cidade:</b> {e.cidade}</Typography>
                                    <Typography variant="subtitle1"><b>UF:</b> {e.estado}</Typography>
                                    <Typography variant="subtitle1"><b>Complemento:</b> {e.complemento}</Typography>
                                    <Typography variant="subtitle1"><b>Número:</b> {e.numero}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 2 }}>
                                        <Button
                                            variant="outlined"

                                            onClick={() => handleEdit(idx)}
                                            sx={{
                                                color: 'var(--roxo)',
                                                borderColor: 'var(--roxo)',
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '16px', fontWeight: '500', fontFamily: 'var(--notosans) !important' }}>
                                                Editar

                                            </Typography>
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<Delete />}
                                            onClick={() => handleOpenDeleteModal(idx)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#d32f2f !important',
                                                }
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '16px', fontWeight: '500', fontFamily: 'var(--notosans) !important' }}>
                                                Excluir
                                            </Typography>
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