import { Autocomplete, Box, Button, Checkbox, Grid, IconButton, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
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
import { useState } from 'react';
import 'dayjs/locale/pt-br';
import { ptBR } from '@mui/x-date-pickers/locales';
import './CriarEvento.css'

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

    const [fileName, setFileName] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
        }
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

    return (
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
                        <DateTimePicker value={value} onChange={setValue} label="Data/hora inicio" />

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
                        <DateTimePicker value={value} onChange={setValue} label="Data/hora fim" />

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
                        startIcon={<CloudUpload />}
                        onClick={handleButtonClick}
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

            <Grid size={{ xs: 10, sm: 6, md: 3 }} sx={{ marginTop: 2 }}>
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
                            <TextField {...params} label="Categorias" helperText="Envie uma categoria por vez" />
                        )}

                    />
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ marginTop: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1, width: '100%' }}>
                    <Button startIcon={<LibraryAdd />} variant='contained' sx={{ p: 1, backgroundColor: 'var(--roxo)' }} fullWidth>
                        <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important', px: 1 }}>
                            Adicionar Categorias
                        </Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{ width: '200px', backgroundColor: 'var(--roxo)' }} onClick={() => alert('Evento criado!')}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--notosans) !important', px: 1 }}>
                        Criar Evento
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default CriarEvento