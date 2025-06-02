import { Fence, Flag, LocationCity, MapsHomeWork, Numbers, Place, Signpost } from '@mui/icons-material';
import { Alert, Box, Button, Divider, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import './Endereco.css';

interface EnderecoProps {
    buttonLabel?: string;
    showButton?: boolean;
    disabledComponents?: boolean
}

interface EnderecoData {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento: string;
    numero: string | number;
}

const Endereco = ({ buttonLabel = "Salvar endereço", showButton = true, disabledComponents = true}: EnderecoProps) => {
    const [cep, setCep] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [uf, setUf] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [numero, setNumero] = useState<string | number>('');
    const [cepError, setCepError] = useState<boolean>(false);
    const [cepHelper, setCepHelper] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [enderecos, setEnderecos] = useState<EnderecoData[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    function formatCep(value: string): string {
        value = value.replace(/\D/g, '');
        if (value.length > 5) {
            return value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        return value.slice(0, 9);
    }

    const clearFields = () => {
        setCep('');
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
        setCep(formatCep(e.target.value));
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
    const handleButtonClick = () => {
        const novoEndereco: EnderecoData = {
            cep,
            logradouro,
            bairro,
            cidade,
            uf,
            complemento,
            numero,
        };

        // Verifica duplicidade (CEP + número)
        const exists = enderecos.some((e, idx) =>
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
            // Atualiza endereço existente
            const novosEnderecos = [...enderecos];
            novosEnderecos[editIndex] = novoEndereco;
            setEnderecos(novosEnderecos);
            setSnackbarMsg('Endereço atualizado com sucesso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setEditing(false);
            setEditIndex(null);
            clearFields();
        } else {
            // Adiciona novo endereço
            setEnderecos([...enderecos, novoEndereco]);
            setSnackbarMsg('Endereço salvo com sucesso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            clearFields();
        }
    };

    // Preenche campos para edição
    const handleEdit = (idx: number) => {
        const e = enderecos[idx];
        setCep(e.cep);
        setLogradouro(e.logradouro);
        setBairro(e.bairro);
        setCidade(e.cidade);
        setUf(e.uf);
        setComplemento(e.complemento);
        setNumero(e.numero);
        setEditing(true);
        setDisabled(false);
        setEditing(true);
        setEditIndex(idx);
    };

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
                            disabled={disabled}
                            value={cep}
                            onBlur={handleCepBlur}
                            onChange={handleCepChange}
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

                            disabled={disabled}
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
                            disabled={disabled}
                            fullWidth
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            type="text"
                            label="Complemento"
                            variant="outlined"
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
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            disabled={disabled}
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


            <Grid container spacing={2} sx={{ padding: 2 }}>

                {enderecos.map((e, idx) => (
                    <Grid size={{ xs: 12, md: 4 }} key={idx}>
                        <Paper elevation={2} sx={{ p: 2, mb: 2 }} className='paper'>
                            <Typography variant="subtitle1"><b>CEP:</b> {e.cep}</Typography>
                            <Typography variant="subtitle1"><b>Logradouro:</b> {e.logradouro}</Typography>
                            <Typography variant="subtitle1"><b>Bairro:</b> {e.bairro}</Typography>
                            <Typography variant="subtitle1"><b>Cidade:</b> {e.cidade}</Typography>
                            <Typography variant="subtitle1"><b>UF:</b> {e.uf}</Typography>
                            <Typography variant="subtitle1"><b>Complemento:</b> {e.complemento}</Typography>
                            <Typography variant="subtitle1"><b>Número:</b> {e.numero}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
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
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

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