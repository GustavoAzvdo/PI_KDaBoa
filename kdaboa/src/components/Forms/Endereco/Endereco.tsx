import { Fence, Flag, LocationCity, LocationCityOutlined, MapsHomeWork, Numbers, Place, Signpost } from '@mui/icons-material';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import ScreenError from '../../ScreenError/ScreenError';

const Endereco = () => {
    const [cep, setCep] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [uf, setUf] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [numero, setNumero] = useState<number | string>('');
    const [cepError, setCepError] = useState<boolean>(false);
    const [cepHelper, setCepHelper] = useState<string>('');

    function formatCep(value: string): string {
        value = value.replace(/\D/g, '');
        if (value.length > 5) {
            return value.slice(0, 5) + '-' + value.slice(5, 8);
        }

        return value.slice(0, 9);
    }

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(formatCep(e.target.value));
        setCepError(false);
        setCepHelper('');
    };
    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cepValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
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
    }
    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Box >
                    <TextField
                        fullWidth
                        value={cep}
                        onBlur={handleCepBlur}
                        onChange={handleCepChange}
                        label="CEP"
                        variant="outlined"
                        placeholder="Digite seu CEP"
                        inputProps={{ maxLength: 9 }} // Formato de CEP com traço
                        error={cepError}
                        helperText={cepHelper ? cepHelper : 'Ex: 12345-678'}
                        InputProps= {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <Place/>
                            </InputAdornment>
                        }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        disabled
                        fullWidth
                        value={logradouro}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogradouro(e.target.value)}
                        label="Logradouro"
                        variant="outlined"
                        placeholder="Digite o logradouro"
                        InputProps= {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <Signpost/>
                            </InputAdornment>
                        }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3, md: 4 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        disabled
                        fullWidth
                        value={bairro}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBairro(e.target.value)}
                        type='text'
                        label="Bairro"
                        variant="outlined"
                        InputProps= {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <Fence/>
                            </InputAdornment>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCidade(e.target.value)}
                        type='text'
                        label="Cidade"
                        variant="outlined"
                        InputProps = {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <LocationCity/>
                            </InputAdornment>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUf(e.target.value)}
                        type='text'
                        label="UF"
                        variant="outlined"
                        InputProps= {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <Flag/>
                            </InputAdornment>
                        }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField

                        fullWidth
                        value={complemento}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComplemento(e.target.value)}
                        type='text'
                        label="Complemento"
                        variant="outlined"
                        InputProps = {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <MapsHomeWork/>
                            </InputAdornment>
                        }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        type='number'
                        fullWidth
                        value={numero}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumero(e.target.value)}
                        label="Número"
                        variant="outlined"
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                <Numbers/>
                            </InputAdornment>
                        }}
                    />
                </Box>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button variant="contained" sx={{ width: '200px', backgroundColor: 'var(--roxo)' }}  onClick={() => alert('Endereço salvo!')}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily:'var(--notosans) !important', p:1 }}>
                            Salvar Endereço
                        </Typography>
                    </Button>
                </Box>
            </Grid>
                        
        </Grid>
    )
}

export default Endereco