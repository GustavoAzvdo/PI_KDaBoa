import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Close, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon, ConfirmationNumber, Description, AttachFile } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { dados } from '../../../categorys/dados';
import { useState, useEffect } from 'react';
import 'dayjs/locale/pt-br';
import Endereco, { EnderecoData } from '../Endereco/Endereco';
import { useEnderecoContext } from '../../../context/EnderecoContext';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import api from '../../../api/api';
import imageCompression from 'browser-image-compression';

// Configuração do Dayjs
dayjs.locale('pt-br');
dayjs.extend(utc);

const MAX_CHARS = 1000;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CriarEventoFuncionario = () => {
    // --- Estados do formulário ---
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [ctg, setCtg] = useState<number[]>([]);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs());
    const [fotoFile, setFotoFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    // --- Estados de Endereço ---
    const [enderecoModo, setEnderecoModo] = useState<'manter' | 'alterar'>('manter');
    const [selectedEndereco, setSelectedEndereco] = useState<EnderecoData | null>(null);
    const { enderecoFavorito, enderecos } = useEnderecoContext();

    // --- Estados de Feedback e UI ---
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    const enderecoParaExibir = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;

    useEffect(() => {
        // Define o endereço favorito como padrão ao carregar ou quando "manter" é selecionado
        if (enderecoModo === 'manter' && enderecoFavorito) {
            setSelectedEndereco(enderecoFavorito);
        }
    }, [enderecoModo, enderecoFavorito]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            setFileName(compressedFile.name);
            setFotoFile(compressedFile);
        } catch (error) {
            console.error('Erro ao comprimir a imagem:', error);
            setFileName(file.name);
            setFotoFile(file);
            setSnackbarMessage('Erro ao processar imagem.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handlePostEvento = async () => {
        const enderecoUsado = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;

        if (!allFieldsFilled()) {
            setSnackbarMessage('Por favor, preencha todos os campos obrigatórios.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('descricao', descricao);
            formData.append('data_inicio', dataInicio!.toISOString());
            formData.append('data_fim', dataFim!.toISOString());
            formData.append('id_endereco', enderecoUsado!.id_endereco.toString());

            ctg.forEach(id => {
                formData.append('categoria', id.toString());
            });

            if (fotoFile) {
                formData.append('images', fotoFile);
            }
            
            await api.post('/funcionario/event', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSnackbarMessage('Evento criado com sucesso e enviado para validação!');
            setSnackbarSeverity('success');
            
            // Limpa o formulário após o sucesso
            setNome('');
            setDescricao('');
            setCtg([]);
            setFileName('');
            setFotoFile(null);
            setDataInicio(dayjs());
            setDataFim(dayjs());

        } catch (error) {
            console.error('Erro ao criar evento:', error);
            setSnackbarMessage('Erro ao criar evento. Tente novamente.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const allFieldsFilled = () => {
        const enderecoValido = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;
        return (
            nome.trim() !== '' &&
            descricao.trim() !== '' &&
            dataInicio !== null &&
            dataFim !== null &&
            enderecoValido !== null &&
            ctg.length > 0 &&
            fotoFile !== null // Imagem agora é obrigatória
        );
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

   return (
    <>
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {/* Campos de Nome e Descrição */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    label="Título do evento"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{ endAdornment: <InputAdornment position='end'><ConfirmationNumber /></InputAdornment> }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Descrição do evento"
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    maxRows={6}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value.slice(0, MAX_CHARS))}
                    helperText={`Restam ${MAX_CHARS - descricao.length} caracteres`}
                    InputProps={{ endAdornment: <InputAdornment position='end'><Description /></InputAdornment> }}
                />
            </Grid>

            {/* Campos de Data/Hora */}
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DateTimePicker
                        value={dataInicio}
                        onChange={(e) => {
                            setDataInicio(e);
                            if (dataFim && e && e.isAfter(dataFim)) {
                                setDataFim(e);
                            }
                        }}
                        label="Data/hora início"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <DateTimePicker
                        value={dataFim}
                        minDateTime={dataInicio || undefined} 
                        onChange={(e) => setDataFim(e)}
                        label="Data/hora fim"
                    />
                </Grid>
            </LocalizationProvider>

            {/* Upload de Imagem */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                    label="Arquivo selecionado"
                    value={fileName || "Nenhuma imagem selecionada"}
                    variant="outlined"
                    fullWidth
                    disabled
                    InputProps={{
                        endAdornment: fileName && (
                            <IconButton size="small" onClick={() => { setFileName(''); setFotoFile(null); }}>
                                <Close />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<AttachFile />}
                    fullWidth
                    sx={{ height: '100%', backgroundColor: 'var(--roxo)' }}
                >
                    Escolher foto
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                </Button>
            </Grid>

            {/* Campo de Categorias */}
            <Grid size={{ xs: 12 }}>
                 <Autocomplete
                    multiple
                    options={dados}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    value={dados.filter(d => ctg.includes(d.id))}
                    onChange={(_event, value) => setCtg(value.map(item => item.id))}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                            {option.title} {option.icon}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Categorias" required />}
                />
            </Grid>
        </Grid>
        
        {/* Seção de Endereço */}
        <Grid container spacing={2} sx={{ p: 2, mt: 2 }}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h5'>Endereço do evento</Typography>
                <FormControl sx={{ my: 2 }}>
                    <RadioGroup row value={enderecoModo} onChange={(e) => setEnderecoModo(e.target.value as 'manter' | 'alterar')}>
                        <FormControlLabel value="manter" control={<Radio />} label="Usar endereço favorito" />
                        <FormControlLabel value="alterar" control={<Radio />} label="Escolher outro endereço" />
                    </RadioGroup>
                </FormControl>

                {enderecoModo === 'alterar' && (
                    <Autocomplete
                        options={enderecos}
                        getOptionLabel={(option) => `${option.logradouro}, ${option.numero} - ${option.bairro} | ${option.cep}`}
                        value={selectedEndereco}
                        onChange={(_event, value) => setSelectedEndereco(value)}
                        renderInput={(params) => <TextField {...params} label="Endereços cadastrados" />}
                        isOptionEqualToValue={(option, value) => option.id_endereco === value.id_endereco}
                        sx={{ maxWidth: 500 }}
                    />
                )}
            </Grid>
            <Grid size={{ xs: 12 }}>
                
                <Endereco
                    showButton={false}
                    disabledComponents={true}
                    enderecoSelecionado={enderecoParaExibir}
                />
            </Grid>
        </Grid>

        {/* Botão de Submissão */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button
                disabled={!allFieldsFilled()}
                sx={{ backgroundColor: 'var(--roxo)', width: { xs: '100%', md: '25%' } }}
                variant='contained'
                onClick={handlePostEvento}
            >
                <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450' }}>
                    Criar evento
                </Typography>
            </Button>
        </Box>

        <CustomSnackbar
            open={snackbarOpen}
            message={snackbarMessage}
            severity={snackbarSeverity}
            onClose={() => setSnackbarOpen(false)}
        />
    </>
);
}

export default CriarEventoFuncionario;