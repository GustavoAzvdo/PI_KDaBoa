import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material'
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CloudUpload, Close, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon, LibraryAdd, Event, ConfirmationNumber, Description, AttachFile } from '@mui/icons-material';
import { styled } from '@mui/material/styles'
import { dados } from '../../../categorys/dados';
import { useState, useEffect } from 'react';
import 'dayjs/locale/pt-br';
import { ptBR } from '@mui/x-date-pickers/locales';
import './CriarEvento.css'
import Endereco from '../Endereco/Endereco';
import { EnderecoData } from '../Endereco/Endereco';
import { useEnderecoContext } from '../../../context/EnderecoContext';
dayjs.locale('pt-br');
dayjs.extend(utc);
const MAX_CHARS = 1000;



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface CategoryProps {
    onCategoryChange?: (categories: string[]) => void;

}

const CriarEvento = ({ onCategoryChange }: CategoryProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [enderecoModo, setEnderecoModo] = useState<'manter' | 'alterar'>('manter');
    const [fileName, setFileName] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [end, setEnd] = useState<EnderecoData[]>([]);
    const [selectedEndereco, setSelectedEndereco] = useState<EnderecoData | null>(null);
    const { enderecos, favorito } = useEnderecoContext();
    const handleAddEndereco = (novoEndereco: EnderecoData) => {
        setEnd((prev) => [...prev, novoEndereco]);
    }

    const handleSelectEndereco = (event: any, value: EnderecoData | null) => {
        setSelectedEndereco(value);
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(event.target.files);
        if (file) {
            setFileName(file.name);
        }
    }

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
    const [descricao, setDescricao] = React.useState<string>('');

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= MAX_CHARS) {
            setDescricao(event.target.value);
        }
    };

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs.utc('2022-04-17T15:30'),
    );

    const handleCategoryChange = (_event: any, value: any) => {
        const categories = value.map((item: any) => item.title);
        setSelectedCategories(categories);
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
    return (
        <>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <TextField
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
                                value={value}
                                onChange={setValue}
                                label="Data/hora inicio"
                                slotProps={{
                                    textField: {
                                        sx: { borderColor: 'var(--roxo) !important' }
                                    }
                                }}
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
                            <DateTimePicker value={value} onChange={setValue} label="Data/hora fim"
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--roxo) !important',
                                    }
                                }}
                            />

                        </Stack>
                    </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
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

                <Grid size={{ xs: 10, sm: 6, md: 6 }} sx={{ marginTop: 2 }}>
                    <Box>
                        <Autocomplete
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
                            renderInput={(params) => (
                                <TextField {...params} label="Categorias" />
                            )}

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
                            <FormControl sx={{ my: 2, display: { xs: 'flex', md: 'none', sm: 'flex' }, justifyContent: { xs: 'center', md: 'center', sm: 'center' } }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="selecionaEndereco"
                                    name="row-radio-buttons-group"
                                    value={enderecoModo}
                                    onChange={e => setEnderecoModo(e.target.value as 'manter' | 'alterar')}

                                >
                                    <FormControlLabel value="manter" control={<Radio />} label="Manter endereço" />
                                    <FormControlLabel value="alterar" control={<Radio />} label="Alterar endereço" />
                                    {enderecoModo === 'alterar' && (
                                        <Autocomplete
                                            disablePortal
                                            disabled={enderecoModo !== 'alterar'}
                                            onChange={handleSelectEndereco}
                                            value={selectedEndereco}
                                            options={enderecos}
                                            getOptionLabel={(option) => `${option.cep} | ${option.numero}`}
                                            sx={{
                                                width: 300,
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
                        <Endereco buttonLabel='Criar evento' showButton={false} disabledComponents={true} enderecoSelecionado={selectedEndereco}
                            onAddEndereco={handleAddEndereco} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 1 }}>
                        <Button variant='contained' sx={{
                            backgroundColor: 'var(--roxo)'
                        }} onClick={() => alert('Evento criado com sucesso')}>
                            <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450' }}>
                                Criar evento
                            </Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default CriarEvento