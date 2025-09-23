import { Autocomplete, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Close, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon, ConfirmationNumber, Description, AttachFile } from '@mui/icons-material';
import { styled } from '@mui/material/styles'
import { dados } from '../../../categorys/dados';
import { useState, useEffect } from 'react';
import 'dayjs/locale/pt-br';
import { ptBR } from '@mui/x-date-pickers/locales';
import './CriarEvento.css'
import Endereco from '../Endereco/Endereco';
import { EnderecoData } from '../Endereco/Endereco';
import { useEnderecoContext } from '../../../context/EnderecoContext';
import { useEventos } from '../../../context/EventoContext';

import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import api from '../../../api/api';
import imageCompression from 'browser-image-compression';

dayjs.locale('pt-br');
dayjs.extend(utc);
const MAX_CHARS = 1000;



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface CategoryProps {
    onCategoryChange?: (categories: string[]) => void;
    setEventoTitle: (title: string) => void;
}

const CriarEvento = ({ onCategoryChange, setEventoTitle }: CategoryProps) => {

    // valores do form 

    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = React.useState<string>('');
    const [ctg, setCtg] = useState<number[]>([]);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs().startOf('day'));
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs().startOf('day'));
    const [, setFotoUrl] = useState<string>('');
    const [fotoFile, setFotoFile] = useState<File | null>(null);
    const [, setData_criacao] = useState<Dayjs | null>(null);

    //pegar o id

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    //

    const [enderecoModo, setEnderecoModo] = useState<'manter' | 'alterar'>('manter');
    const [fileName, setFileName] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [, setEnd] = useState<EnderecoData[]>([]);
    const [selectedEndereco, setSelectedEndereco] = useState<EnderecoData | null>(null);
    const { enderecos, favorito, enderecoFavorito } = useEnderecoContext();
    const { eventoEditando, setEventoEditando } = useEventos();
    const [isEdit, setIsEdit] = useState(false);

    const enderecoParaExibir = enderecoModo === 'manter'
        ? enderecoFavorito
        : selectedEndereco;




    useEffect(() => {
        if (!isEdit && enderecoModo === 'manter' && enderecoFavorito) {
            setSelectedEndereco(enderecoFavorito);
        }
    }, [isEdit, enderecoModo, enderecoFavorito]);

    useEffect(() => {
        if (eventoEditando) {
            console.log('id_evento:', eventoEditando.id_evento);
            setEventoTitle('Editar evento')
            setIsEdit(true);
            setNome(eventoEditando.nome_evento || '');
            setDescricao(eventoEditando.descricao || '');
            setData_criacao(eventoEditando.data_criacao ? dayjs(eventoEditando.data_criacao) : null);
            setDataInicio(eventoEditando.data_inicio ? dayjs(eventoEditando.data_inicio) : null);
            setDataFim(eventoEditando.data_fim ? dayjs(eventoEditando.data_fim) : null);
            //setFotoFile(eventoEditando.foto || null);
            setSelectedEndereco(eventoEditando.endereco || null);

            // converte categorias de string para ID
            const categoriaIds = eventoEditando.categorias
                .map(cat => dados.find(d => d.title === cat)?.id)
                .filter((id): id is number => id !== undefined);

            setCtg(categoriaIds);
        } else {
            setIsEdit(false);
            setEventoTitle('Criar evento')
            setEventoEditando(null)
        }

    }, [eventoEditando]);

    const handleAddEndereco = (novoEndereco: EnderecoData) => {
        setEnd((prev) => [...prev, novoEndereco]); ''
    }

    const handleSelectEndereco = (_event: any, value: EnderecoData | null) => {
        setSelectedEndereco(value);
        console.log(value?.id_endereco);
    }



 const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
        return;
    }

    console.log(`Original file size: ${file.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,          // Tamanho máximo do arquivo em MB
        maxWidthOrHeight: 1920, // Dimensão máxima (largura ou altura)
        useWebWorker: true,    // Usa Web Worker para não travar a interface
    };

    try {
        const compressedFile = await imageCompression(file, options);
        console.log(`Compressed file size: ${compressedFile.size / 1024 / 1024} MB`);

        setFileName(compressedFile.name);
        setFotoFile(compressedFile); 

        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoUrl(reader.result as string);
        };
        reader.readAsDataURL(compressedFile);

    } catch (error) {
        console.error('Erro ao comprimir a imagem:', error);
        setFileName(file.name);
        setFotoFile(file);
    }
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


    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= MAX_CHARS) {
            setDescricao(event.target.value);
        }
    };



    const handleCategoryChange = (_event: any, value: any) => {
        const categories = value.map((item: any) => item.id);
        setCtg(categories);

        if (onCategoryChange) {

            onCategoryChange(categories);
        }
    };

    useEffect(() => {
        // Quando mudar para 'manter', limpa a seleção do autocomplete
        if (enderecoModo === 'manter' && favorito !== null) {
            setSelectedEndereco(enderecos[favorito]);
        }
    }, [enderecoModo, favorito, enderecos]);


    const handleEditEvento = async () => {
        console.log('fotoFile:', fotoFile);
        console.log('fileName:', fileName);
        try {
            const formData = new FormData();
            // formData.append('id_evento', eventoEditando?.id_evento.toString() || '');
            formData.append('nome', nome);
            formData.append('descricao', descricao);
            formData.append('data_inicio', dataInicio?.toISOString() || '');
            formData.append('data_fim', dataFim?.toISOString() || '');
            const enderecoUsado = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;
            if (enderecoUsado?.id_endereco) {
                formData.append('id_endereco', enderecoUsado.id_endereco.toString());
            }

            ctg.forEach(id => {
                formData.append('categoria', id.toString());
            });

            // ✅ Se tiver imagem, envia corretamente
            if (fotoFile) {
                formData.append('images', fotoFile); // se só for uma
            }

            // ✅ DEBUG: ver o que está sendo enviado
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }


            await api.put(`/gerente/event/?id=${eventoEditando?.id_evento}`, {
                nome: nome,
                descricao: descricao,
                data_inicio: dataInicio?.toISOString() || '',
                data_fim: dataFim?.toISOString() || '',
                images: fotoFile,
                id_endereco: enderecoUsado?.id_endereco,
                categoria: ctg,

            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSnackbarMessage('Evento editado com sucesso!');


            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            // Reset
            setNome('');
            setDescricao('');
            setCtg([]);
            setFileName('');
            setFotoUrl('');
            setFotoFile(null); // <- limpa também
            allFieldsFilled()
            setEventoTitle('Criar evento')
            setIsEdit(false)
        } catch (error) {
            console.error('Erro ao editar evento:', error);
            setSnackbarMessage('Erro ao editar evento. Tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setEventoEditando(null)
    };

    const handlePostEvento = async () => {
        console.log('fotoFile:', fotoFile);
        console.log('fileName:', fileName);
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('descricao', descricao);
            formData.append('data_inicio', dataInicio?.toISOString() || '');
            formData.append('data_fim', dataFim?.toISOString() || '');
            const enderecoUsado = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;
            if (enderecoUsado?.id_endereco) {
                formData.append('id_endereco', enderecoUsado.id_endereco.toString());
            }


            ctg.forEach(id => {
                formData.append('categoria', id.toString());
            });

            // ✅ Se tiver imagem, envia corretamente
            if (fotoFile) {
                formData.append('images', fotoFile); // se só for uma
            }

            // ✅ DEBUG: ver o que está sendo enviado
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }



            await api.post('/gerente/event', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSnackbarMessage('Evento criado com sucesso!');


            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            // Reset
            setNome('');
            setDescricao('');
            setCtg([]);
            setFileName('');
            setFotoUrl('');
            setFotoFile(null); // <- limpa também
            allFieldsFilled()
        } catch (error) {
            console.error('Erro ao criar evento:', error);
            setSnackbarMessage('Erro ao criar evento. Tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setEventoEditando(null)
    };


    const allFieldsFilled = () => {
        return (
            nome.trim() !== '' &&
            descricao.trim() !== '' &&
            dataInicio !== null &&
            dataFim !== null &&
            enderecoParaExibir !== null &&
            ctg.length > 0
        );
    };

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await api.get('/gerente/event', {
                    withCredentials: true
                })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchEventos()
    }, [selectedEndereco]);


    return (
        <>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <TextField
                        value={nome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                        sx={{
                            fontFamily: 'var(--notosans) !important',
                            fontSize: 18,
                        }}
                        label="Título do evento"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <InputAdornment position='end'>
                                    <ConfirmationNumber />
                                </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <TextField
                        label="Descrição do evento"
                        variant="outlined"
                        fullWidth
                        multiline
                        maxRows={6}
                        value={descricao}
                        onChange={handleDescricaoChange}
                        inputProps={{ maxLength: MAX_CHARS }}
                        helperText={`Restam ${MAX_CHARS - descricao.length} caracteres`}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position='end'>
                                    <Description />
                                </InputAdornment>
                        }}
                    />
                </Grid>
                {/* datas */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale='pt-br'
                        localeText={{
                            ...ptBR.components.MuiLocalizationProvider.defaultProps.localeText,
                            okButtonLabel: 'Confirmar',
                            cancelButtonLabel: 'Cancelar'
                        }}
                    >
                        <Stack spacing={2}>
                            <DateTimePicker
                                
                                value={dataInicio}
                                onChange={(e: any) => {
                                    setDataInicio(e);
                                    // Se a data final for anterior à nova data de início
                                    if (dataFim && e && e.isAfter(dataFim)) {
                                        setDataFim(e);
                                    }
                                }}
                                label="Data/hora inicio"
                                
                            />
                        </Stack>
                    </LocalizationProvider>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale='pt-br'
                        localeText={{
                            ...ptBR.components.MuiLocalizationProvider.defaultProps.localeText,
                            okButtonLabel: 'Confirmar',
                            cancelButtonLabel: 'Cancelar',
                        }}
                    >
                        <Stack spacing={2}>
                            <DateTimePicker
                                value={dataFim}
                                onChange={(e: any) => {
                                    // Bloqueia datas anteriores à data de início
                                    if (dataInicio && e && e.isBefore(dataInicio)) {
                                        setDataFim(dataInicio);
                                    } else {
                                        setDataFim(e);
                                    }
                                }}
                                label="Data/hora fim"
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--roxo) !important',
                                    }
                                }}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Grid>
                {/* datas */}



                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderStyle: 'dashed',
                                    borderWidth: 2,
                                },
                            },
                        }}
                        disabled
                        label="Arquivo selecionado"
                        value={fileName}
                        variant="outlined"
                        fullWidth
                        inputProps={{ readOnly: true }}
                        InputProps={{
                            endAdornment: fileName && (
                                <>
                                    <IconButton onClick={() => setFileName('')}>
                                        <Close />
                                    </IconButton>

                                </>


                            ),
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                        <Button
                            sx={{
                                width: '100%',
                                height: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'var(--roxo)'
                            }}
                            fullWidth
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<AttachFile />}

                        >
                            <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important' }}>
                                Escolher foto
                            </Typography>
                            <VisuallyHiddenInput
                                type="file"
                                ref={inputRef}
                                onChange={handleFileChange}
                                multiple
                            />
                        </Button>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ marginTop: 2 }}>
                    <Box>
                        <Autocomplete
                            value={dados.filter((option) => ctg.includes(option.id))}
                            multiple
                            id="checkboxes-tags-demo"
                            options={dados}
                            disableCloseOnSelect
                            onChange={handleCategoryChange}
                            noOptionsText="Nenhuma categoria encontrada"
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props
                                return (
                                    <li
                                        key={key}
                                        {...optionProps}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3e8ff'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }}
                                    >
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                            sx={{
                                                color: '#9c9c9c',
                                                '&.Mui-checked': {
                                                    color: '#6C15D5',
                                                },
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {option.title}
                                            {option.icon}
                                        </Box>
                                    </li>
                                )
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option.id}
                                        label={option.title}
                                        sx={{
                                            backgroundColor: '#f3e8ff', // roxo fraco
                                            color: '#6C15D5', // texto roxo forte
                                            '& .MuiChip-deleteIcon': {
                                                color: '#6C15D5', // X roxo forte
                                                '&:hover': {
                                                    color: '#4a0da5',
                                                },
                                            },
                                        }}
                                    />
                                ))
                            }
                            renderInput={(params) => <TextField {...params} label="Categorias" />}
                        />

                    </Box>
                </Grid>

                {/* Botao adicionar Categoria uma por uma no banco */}
                {/* <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ marginTop: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1, width: '100%' }}>
                    <Button startIcon={<LibraryAdd />} variant='contained' sx={{ p: 1, backgroundColor: 'var(--roxo)' }} fullWidth>
                        <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important', px: 1 }}>
                            Adicionar Categorias
                        </Typography>
                    </Button>
                </Box>
            </Grid> */}
            </Grid>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Box>
                        <Typography variant='h4'>
                            Endereço do evento
                        </Typography>
                    </Box>
                    <Box>
                        <Box sx={{ my: 2 }}>
                            <Typography>
                                Deseja usar outro endereço ou o endereço do seu perfil?
                            </Typography>
                        </Box>
                        <Box sx={{ my: 2 }}>

                            {/* <Button variant="contained" sx={{ width: '200px', backgroundColor: 'var(--roxo)' }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--notosans) !important' }}>
                                    Manter endereço
                                </Typography>
                            </Button>
                            <Button variant="outlined" sx={{ width: '200px', borderColor: 'var(--roxo)', color: 'var(--roxo)', marginLeft: 3 }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--notosans) !important' }}>
                                    Alterar endereço
                                </Typography>
                            </Button> */}
                            <FormControl sx={{ my: 2, display: { xs: 'flex', md: 'flex', sm: 'flex' }, justifyContent: { xs: 'center', md: 'center', sm: 'center' } }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="selecionaEndereco"
                                    name="row-radio-buttons-group"
                                    value={enderecoModo}
                                    onChange={e => setEnderecoModo(e.target.value as 'manter' | 'alterar')}

                                >
                                    <FormControlLabel value="manter" control={<Radio sx={{
                                        color: 'default',
                                        '&.Mui-checked': {
                                            color: 'var(--roxoForteDashboard)',
                                        },
                                    }} />} label="Endereço favorito" />
                                    <FormControlLabel value="alterar" control={<Radio
                                        sx={{
                                            color: 'default',
                                            '&.Mui-checked': {
                                                color: 'var(--roxoForteDashboard)',
                                            },
                                        }}
                                    />} label="Alterar endereço" />
                                    {enderecoModo === 'alterar' && (
                                        <Autocomplete
                                            disablePortal
                                            disabled={enderecoModo !== 'alterar'}
                                            onChange={handleSelectEndereco}
                                            value={selectedEndereco}
                                            options={enderecos}
                                            getOptionLabel={(option) => `${option.cep} | ${option.numero}`}
                                            sx={{
                                                width: { xs: '100%', sm: '100%', md: '25%' },
                                                ml: 2,
                                                opacity: enderecoModo === 'alterar' ? 1 : 0.7,
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            componentsProps={{
                                                paper: {
                                                    sx: {
                                                        display: enderecoModo === 'alterar' ? 'block' : 'none'
                                                    }
                                                }
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Endereços cadastrados" />}
                                            isOptionEqualToValue={(option, value) => option.cep === value.cep && option.numero === value.numero}
                                        />
                                    )}
                                </RadioGroup>

                            </FormControl>

                        </Box>
                    </Box>
                    <Box>
                        <Endereco buttonLabel='Criar evento'
                            showButton={false}
                            disabledComponents={true}
                            enderecoSelecionado={enderecoParaExibir}
                            onAddEndereco={handleAddEndereco} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 1 }}>
                        {!isEdit ? (
                            <Button
                                disabled={!allFieldsFilled()}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'var(--roxo)',
                                    width: { xs: '100%', sm: '100%', md: '25%' },
                                }}
                                variant='contained'
                                onClick={() => handlePostEvento()}
                            >
                                <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450' }}>
                                    Criar evento
                                </Typography>
                            </Button>
                        ) : (
                            <Button
                                disabled={!allFieldsFilled()}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'var(--roxo)',
                                    width: { xs: '100%', sm: '100%', md: '25%' },
                                }}
                                variant='contained'
                                onClick={() => handleEditEvento()}>
                                <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450' }}>
                                    Editar evento
                                </Typography>
                            </Button>
                        )}
                    </Box>
                </Grid>
                <CustomSnackbar
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                    onClose={() => setSnackbarOpen(false)}
                    autoHideDuration={4000}
                />
            </Grid>
        </>
    )
}

export default CriarEvento
