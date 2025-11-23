import { Autocomplete, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Close, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon, ConfirmationNumber, AttachFile, Edit, ArrowBack, Create } from '@mui/icons-material';
import { styled } from '@mui/material/styles'
import { dados } from '../../../categorys/dados';
import { useState, useEffect, useRef } from 'react';
import 'dayjs/locale/pt-br';
import { ptBR } from '@mui/x-date-pickers/locales';
import './CriarEvento.css'
import Endereco from '../Endereco/Endereco';
import { EnderecoData } from '../Endereco/Endereco';
import { useEnderecoContext } from '../../../context/EnderecoContext';
import { useEventos } from '../../../context/EventoContext';
import HistoryPopover from '../../History/History';

import { Dialog, DialogContent, Tooltip } from '@mui/material';
import { Visibility, } from '@mui/icons-material';

//EDIT TEXT EDITOR
import StarterKit from "@tiptap/starter-kit";
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonUnderline,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor,
    type RichTextEditorRef,
} from "mui-tiptap";

import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import api from '../../../api/api';
import imageCompression from 'browser-image-compression';

dayjs.locale('pt-br');
dayjs.extend(utc);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface CategoryProps {
    onCategoryChange?: (categories: string[]) => void;
    setEventoTitle: (title: string) => void;
}

export interface Alteracao {
    id_his: number;
    id_usuario: number;
    campo: string;
    valor_antigo: string;
    valor_novo: string;
    Usuario: {
        nome_usuario: string;
    };
}

const CriarEvento = ({ onCategoryChange, setEventoTitle }: CategoryProps) => {

    // --- ESTADOS ---
    const [alteracoes, setAlteracoes] = useState<Alteracao[]>([]);
    const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
    const [activeAlteracao, setActiveAlteracao] = useState<Alteracao | null>(null);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = React.useState<string>('');
    const [ctg, setCtg] = useState<number[]>([]);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs().startOf('day'));
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs().startOf('day'));
    const [, setFotoUrl] = useState<string>('');
    const [fotoFile, setFotoFile] = useState<File | null>(null);
    const [, setData_criacao] = useState<Dayjs | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    const [enderecoModo, setEnderecoModo] = useState<'manter' | 'alterar'>('manter');
    const [fileName, setFileName] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [, setEnd] = useState<EnderecoData[]>([]);
    const [selectedEndereco, setSelectedEndereco] = useState<EnderecoData | null>(null);
    const { enderecos, enderecoFavorito } = useEnderecoContext();
    const { eventoEditando, setEventoEditando } = useEventos();
    const [isEdit, setIsEdit] = useState(false);
    const rteRef = React.useRef<RichTextEditorRef>(null);

    const enderecoParaExibir = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;
    const API_URL = 'http://localhost:3000';

    // --- FUNÇÃO DE RESETAR TUDO (VOLTAR PARA CRIAR) ---
    const resetForm = () => {
        setIsEdit(false);
        setEventoEditando(null);
        setEventoTitle('Criar evento');

        // Limpa campos
        setNome('');
        setDescricao('');
        setFotoUrl('');
        setFileName('');
        setFotoFile(null);
        setPreviewUrl('');
        setCtg([]);
        setDataInicio(dayjs().startOf('day'));
        setDataFim(dayjs().startOf('day'));

        // Reseta endereço para o favorito se existir
        if (enderecoFavorito) {
            setEnderecoModo('manter');
            setSelectedEndereco(enderecoFavorito);
        } else {
            setSelectedEndereco(null);
        }

        // Limpa alterações
        setAlteracoes([]);
    };

    // --- SYNC EDITOR ---
    useEffect(() => {
        const editor = rteRef.current?.editor;
        if (!editor) return;
        const currentHtml = editor.getHTML();
        if (descricao !== currentHtml) {
            editor.commands.setContent(descricao);
        }
    }, [descricao]);

    // --- FETCH ALTERAÇÕES ---
    const fetchAlteracoes = async (idEvento: number) => {
        try {
            const response: any = await api.get(`/gerente/event/alteration/${idEvento}`, {
                withCredentials: true
            });
            setAlteracoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
        }
    };

    // --- ENDEREÇO PADRÃO ---
    useEffect(() => {
        if (!isEdit && enderecoModo === 'manter' && enderecoFavorito) {
            setSelectedEndereco(enderecoFavorito);
        }
    }, [isEdit, enderecoModo, enderecoFavorito]);

    // --- CARREGAMENTO DE DADOS (EDITAR) ---
    useEffect(() => {
        if (eventoEditando) {
            console.log('Editando evento:', eventoEditando);
            setEventoTitle('Editar evento');
            setIsEdit(true);

            // Campos simples
            setNome(eventoEditando.nome_evento || '');
            setDescricao(eventoEditando.descricao || '');
            setData_criacao(eventoEditando.data_criacao ? dayjs(eventoEditando.data_criacao) : null);
            setDataInicio(eventoEditando.data_inicio ? dayjs(eventoEditando.data_inicio) : null);
            setDataFim(eventoEditando.data_fim ? dayjs(eventoEditando.data_fim) : null);


            if (eventoEditando.endereco && eventoEditando.endereco.id_endereco) {

                setEnderecoModo('alterar');


                const enderecoEncontrado = enderecos.find(
                    (end) => end.id_endereco === eventoEditando.endereco!.id_endereco
                );
                setSelectedEndereco(enderecoEncontrado || eventoEditando.endereco);
            } else {

                setEnderecoModo('manter');

            }

            // Histórico
            fetchAlteracoes(eventoEditando.id_evento);

            // Foto
            if (eventoEditando.foto) {
                const nomeArquivo = eventoEditando.foto.split('/').pop() || 'imagem.png';
                const urlCompleta = `${API_URL}/event/image/${nomeArquivo}?t=${new Date().getTime()}`;
                setPreviewUrl(urlCompleta);
                setFileName(nomeArquivo);
                setFotoFile(null);
            } else {
                setFotoUrl('');
                setFileName('');
                setFotoFile(null);
                setPreviewUrl('');
            }

            // Categorias
            const categoriaIds = eventoEditando.categorias
                .map(cat => dados.find(d => d.title === cat)?.id)
                .filter((id): id is number => id !== undefined);
            setCtg(categoriaIds);

        } else {
            resetForm();
        }

    }, [eventoEditando, enderecos]);

    const handleAddEndereco = (novoEndereco: EnderecoData) => {
        setEnd((prev) => [...prev, novoEndereco]);
    }

    const handleSelectEndereco = (_event: any, value: EnderecoData | null) => {
        setSelectedEndereco(value);
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };

        try {
            const compressedFile = await imageCompression(file, options);
            setFileName(compressedFile.name);
            setFotoFile(compressedFile);

            const reader = new FileReader();
            reader.onloadend = () => { setFotoUrl(reader.result as string); };
            reader.readAsDataURL(compressedFile);

            // Preview
            setFileName(file.name);
            setFotoFile(file);
            const localPreview = URL.createObjectURL(file);
            setPreviewUrl(localPreview);
        } catch (error) {
            console.error('Erro ao comprimir a imagem:', error);
            setFileName(file.name);
            setFotoFile(file);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
    });

    const handleCategoryChange = (_event: any, value: any) => {
        const categories = value.map((item: any) => item.id);
        setCtg(categories);
        if (onCategoryChange) onCategoryChange(categories);
    };

    useEffect(() => {
        if (enderecoModo === 'manter') {
            setSelectedEndereco(enderecos.find(e => e.id_endereco === enderecoFavorito?.id_endereco) || null);
        }
    }, [enderecoModo, enderecos]);

    const handleEditEvento = async () => {
        try {
            // 1. Prepara os dados para salvar (igual ao seu código atual)
            const formData = new FormData();
            formData.append('nome_evento', nome);
            formData.append('descricao', descricao);
            formData.append('data_inicio', dataInicio?.toISOString() || '');
            formData.append('data_fim', dataFim?.toISOString() || '');
            const enderecoUsado = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;
            if (enderecoUsado?.id_endereco) {
                formData.append('id_endereco', enderecoUsado.id_endereco.toString());
            }

            ctg.forEach(id => { formData.append('categoria', id.toString()); });

            if (fotoFile) {
                formData.append('images', fotoFile);
            }

            // 2. Envia a atualização oficial do evento (O SAVE DO GERENTE)
            await api.put(`/gerente/event/${eventoEditando?.id_evento}`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // 3. A MÁGICA: Limpa todas as pendências restantes (Categorias, Fotos, etc)
            // Se o gerente salvou manualmente, consideramos que as sugestões antigas devem ser descartadas/rejeitadas.
            if (alteracoes.length > 0) {
                // Mapeia todas as alterações pendentes e manda rejeitar (accept: false)
                const promessasLimpeza = alteracoes.map(alteracao =>
                    api.put(`/gerente/event/alteration/${eventoEditando?.id_evento}/${alteracao.id_his}`, {}, {
                        params: { accept: false },
                        withCredentials: true
                    }).catch(err => console.log(`Erro ao limpar id ${alteracao.id_his}`, err))
                    // O catch aqui garante que se um falhar, não trava o resto
                );

                await Promise.all(promessasLimpeza);
            }

            setSnackbarMessage('Evento atualizado e pendências resolvidas!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // 4. Limpa o estado local visual imediatamente para sumir as bordas laranjas
            setAlteracoes([]);

            // 5. Reseta o formulário
            resetForm();

        } catch (error) {
            console.error('Erro ao editar evento:', error);
            setSnackbarMessage('Erro ao editar evento. Tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handlePostEvento = async () => {
        try {
            const formData = new FormData();
            formData.append('nome_evento', nome);
            formData.append('descricao', descricao);
            formData.append('data_inicio', dataInicio?.toISOString() || '');
            formData.append('data_fim', dataFim?.toISOString() || '');
            const enderecoUsado = enderecoModo === 'manter' ? enderecoFavorito : selectedEndereco;
            if (enderecoUsado?.id_endereco) {
                formData.append('id_endereco', enderecoUsado.id_endereco.toString());
            }

            ctg.forEach(id => { formData.append('categoria', id.toString()); });

            if (fotoFile) { formData.append('images', fotoFile); }

            await api.post('/gerente/event', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSnackbarMessage('Evento criado com sucesso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            resetForm();
        } catch (error) {
            console.error('Erro ao criar evento:', error);
            setSnackbarMessage('Erro ao criar evento. Tente novamente.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
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

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement> | null, campo?: string) => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        if (event && campo) {
            const alteracaoEncontrada = alteracoes.find(a => a.campo === campo);
            if (alteracaoEncontrada) {
                setPopoverAnchor(event.currentTarget);
                setActiveAlteracao(alteracaoEncontrada);
            }
        }
    };

    const handlePopoverClose = () => {
        closeTimerRef.current = setTimeout(() => {
            setPopoverAnchor(null);
            setActiveAlteracao(null);
        }, 300);
    };

    const handleHistoryAction = async (id_his: number, action: 'accept' | 'reject', novoValor: string, campo: string) => {
        if (!eventoEditando) return;

        try {
            const isAccept = action === 'accept';


            await api.put(`/gerente/event/alteration/${eventoEditando.id_evento}/${id_his}`, {}, {
                params: { accept: isAccept },
                withCredentials: true
            });


            const duplicatasParaLimpar = alteracoes.filter(a =>
                a.id_his !== id_his && (
                    a.campo === campo ||
                    (campo === 'categoria' && a.campo === 'categorias') ||
                    (campo === 'categorias' && a.campo === 'categoria')
                )
            );


            if (duplicatasParaLimpar.length > 0) {
                await Promise.all(duplicatasParaLimpar.map(dup =>
                    api.put(`/gerente/event/alteration/${eventoEditando.id_evento}/${dup.id_his}`, {}, {
                        params: { accept: isAccept },
                        withCredentials: true
                    })
                ));
            }


            if (isAccept) {
                switch (campo) {
                    case 'nome_evento': setNome(novoValor); break;
                    case 'descricao':
                        setDescricao(novoValor);
                        rteRef.current?.editor?.commands.setContent(novoValor);
                        break;
                    case 'data_inicio': setDataInicio(dayjs(novoValor)); break;
                    case 'data_fim': setDataFim(dayjs(novoValor)); break;
                    case 'foto':
                        const urlNova = `${API_URL}/event/image/${novoValor}?t=${new Date().getTime()}`;
                        setPreviewUrl(urlNova);
                        setFileName(novoValor);
                        setFotoFile(null);
                        break;
                    case 'categorias':
                    case 'categoria':
                        let newIds: number[] = [];
                        try {
                            const parsed = JSON.parse(novoValor);
                            newIds = Array.isArray(parsed) ? parsed : [Number(parsed)];
                        } catch {
                            newIds = novoValor.split(',').map(v => Number(v.trim()));
                        }

                        if (Array.isArray(newIds)) {
                            setCtg(newIds.filter(n => !isNaN(n)));
                        } else {
                            setCtg([]);
                        }
                        break;
                    case 'id_endereco':
                        const newAddrId = Number(novoValor);
                        const addrEncontrado = enderecos.find(e => e.id_endereco === newAddrId);
                        if (addrEncontrado) {
                            setSelectedEndereco(addrEncontrado);
                            if (enderecoFavorito && addrEncontrado.id_endereco === enderecoFavorito.id_endereco) {
                                setEnderecoModo('manter');
                            } else {
                                setEnderecoModo('alterar');
                            }
                        }
                        break;
                    default: console.warn(`Campo ${campo} não mapeado.`);
                }
                setSnackbarMessage('Alteração aceita com sucesso!');
            } else {
                setSnackbarMessage('Alteração rejeitada.');
            }

            setSnackbarSeverity('success');
            setSnackbarOpen(true);


            setAlteracoes(prev => {
                const novas = prev.filter(a => {
                    const isDifferentId = a.id_his !== id_his;

                    const isDuplicate = a.campo === campo ||
                        (campo === 'categoria' && a.campo === 'categorias') ||
                        (campo === 'categorias' && a.campo === 'categoria');

                    return isDifferentId && !isDuplicate;
                });

                if (novas.length === 0) {
                    setTimeout(() => {
                        resetForm();
                        setSnackbarMessage('Todas alterações analisadas. Voltando para criação.');
                        setSnackbarOpen(true);
                    }, 1500);
                }
                return novas;
            });

            handlePopoverClose();

        } catch (error) {
            console.error('Erro ao processar alteração:', error);
            setSnackbarMessage('Erro ao processar a solicitação.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };



    const hasAlteration = (campo: string) => alteracoes.some(a => a.campo === campo);

    const getOrangeBorderSx = (campo: string) => {
        const changed = hasAlteration(campo);

        // Se não houver alteração, retornamos undefined para o componente seguir o padrão
        if (!changed) return undefined;

        return {
            // Alvo: O Container do Input
            '& .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: '#FF8e38 !important',
                border: '1px solid #FF8e38 !important',
            },

            '& .MuiOutlinedInput-root': {

                // 1. A Borda em estado Normal
            
                // Usamos a classe que você viu no F12 (geralmente é MuiOutlinedInput-notchedOutline)
               '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF8e38 !important',
                    border: '1px solid #FF8e38 !important',
                },

                // 2. A Borda quando passa o mouse (Hover)
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF8e38 !important',
                },

                // 3. A Borda quando está Focado (Clicado)
                // Aqui resolve o seu problema do "css-kl5dp3...Mui-focused"
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF8e38 !important',
                }
            },

            // Opcional: Muda a cor do Label ("Data inicio") para laranja também quando focado
            '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF8e38 !important',
            },
            '& .MuiInputLabel-root': {
                color: '#FF8e38 !important',
            },
            '& MuiPickersInputBase-root-MuiPickersOutlinedInput-root':{
                border: '1px solid #FF8e38',
            }

           
        };
    };

    return (
        <>
            <HistoryPopover
                open={Boolean(popoverAnchor)}
                anchorEl={popoverAnchor}
                onClose={handlePopoverClose}
                alteracao={activeAlteracao}
                onAction={handleHistoryAction}
                onMouseEnter={() => handlePopoverOpen(null)}
                onMouseLeave={handlePopoverClose}
                enderecos={enderecos}
            />

            <Grid container spacing={2} sx={{ padding: 2 }}>

                {/* --- BOTÃO DE VOLTAR PARA O MODO CRIAÇÃO (NOVO) --- */}
                {isEdit && (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Você está editando o evento: <strong>{nome}</strong>
                            </Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                color="inherit"
                                startIcon={<ArrowBack />}
                                onClick={resetForm}
                            >
                                Voltar para Criação
                            </Button>
                        </Box>
                    </Grid>
                )}

                {/* TÍTULO DO EVENTO */}
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <TextField
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        label="Título do evento"
                        variant="outlined"
                        fullWidth
                        onMouseEnter={(e) => handlePopoverOpen(e, 'nome_evento')}
                        onMouseLeave={handlePopoverClose}
                        sx={{
                            fontFamily: 'var(--notosans) !important',
                            fontSize: 18,
                            ...getOrangeBorderSx('nome_evento')
                        }}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position='end'>
                                    <ConfirmationNumber />
                                </InputAdornment>
                        }}
                    />
                </Grid>

                {/* DESCRIÇÃO */}
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box
                        onMouseEnter={(e) => handlePopoverOpen(e, 'descricao')}
                        onMouseLeave={handlePopoverClose}
                        sx={{
                            border: hasAlteration('descricao') ? '2px solid #ff9800' : '1px solid',
                            borderColor: hasAlteration('descricao') ? '#ff9800' : 'rgba(0, 0, 0, 0.23)',
                            borderRadius: '4px',
                            '&:hover': {
                                borderColor: hasAlteration('descricao') ? '#ff9800' : 'rgba(0, 0, 0, 0.87)',
                            },
                            backgroundColor: 'transparent',
                        }}>
                        <RichTextEditor
                            ref={rteRef}
                            extensions={[StarterKit]}
                            content={descricao}
                            editable={true}
                            onUpdate={({ editor }) => {
                                setDescricao(editor.getHTML());
                            }}
                            renderControls={() => (
                                <MenuControlsContainer>
                                    <MenuSelectHeading />
                                    <MenuDivider />
                                    <MenuButtonBold />
                                    <MenuButtonItalic />
                                    <MenuButtonUnderline />
                                </MenuControlsContainer>
                            )}
                        />
                    </Box>
                </Grid>

                {/* DATA INICIO */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box
                        onMouseEnter={(e) => handlePopoverOpen(e, 'data_inicio')}
                        onMouseLeave={handlePopoverClose}
                    >
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
                                        if (dataFim && e && e.isAfter(dataFim)) {
                                            setDataFim(e);
                                        }
                                    }}
                                    label="Data/hora inicio"
                                    slotProps={{
                                        textField: {
                                            sx: getOrangeBorderSx('data_inicio'),
                                            fullWidth: true // Garante que ocupe o espaço todo
                                        }
                                    }}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Box>
                </Grid>

                {/* DATA FIM */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box
                        onMouseEnter={(e) => handlePopoverOpen(e, 'data_fim')}
                        onMouseLeave={handlePopoverClose}
                    >
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
                                        if (dataInicio && e && e.isBefore(dataInicio)) {
                                            setDataFim(dataInicio);
                                        } else {
                                            setDataFim(e);
                                        }
                                    }}
                                    label="Data/hora fim"
                                    slotProps={{
                                        textField: {
                                            sx: getOrangeBorderSx('data_fim'),
                                            fullWidth: true // Garante que ocupe o espaço todo
                                        }
                                    }}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Box>
                </Grid>

                {/* FOTO: INPUT DE TEXTO */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        sx={{
                            ...getOrangeBorderSx('foto'),
                            '& .MuiOutlinedInput-root fieldset': {
                                borderStyle: 'dashed',
                                borderWidth: hasAlteration('foto') ? '2px !important' : '2px',
                                borderColor: hasAlteration('foto') ? '#ff9800 !important' : undefined,
                            }
                        }}
                        onMouseEnter={(e) => handlePopoverOpen(e, 'foto')}
                        onMouseLeave={handlePopoverClose}
                        disabled
                        label="Arquivo selecionado"
                        value={fileName}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Ver imagem">
                                        <span>
                                            <IconButton
                                                onClick={() => setModalOpen(true)}
                                                disabled={!previewUrl}
                                                edge="end"
                                                sx={{ mr: 1, color: 'var(--roxo)' }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    {fileName && (
                                        <IconButton onClick={() => {
                                            setFileName('');
                                            setFotoFile(null);
                                            setPreviewUrl('');
                                        }}>
                                            <Close />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* FOTO: BOTÃO DE ESCOLHER */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Button
                        sx={{
                            width: '100%',

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'var(--roxo)'
                        }}
                        fullWidth
                        component="label"
                        variant="contained"
                        startIcon={<AttachFile />}
                    >
                        <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important' }}>
                            Escolher foto
                        </Typography>
                        <VisuallyHiddenInput
                            type="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                        />
                    </Button>

                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ marginTop: 2 }}>
                    <Box
                        onMouseEnter={(e) => handlePopoverOpen(e, 'categoria')}
                        onMouseLeave={handlePopoverClose}
                    >
                        <Autocomplete
                            value={dados.filter((option) => Array.isArray(ctg) && ctg.includes(option.id))}
                            multiple
                            id="checkboxes-tags-demo"
                            options={dados}
                            disableCloseOnSelect
                            onChange={handleCategoryChange}
                            noOptionsText="Nenhuma categoria encontrada"
                            getOptionLabel={(option) => option.title}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props
                                return (
                                    <li
                                        key={key}
                                        {...optionProps}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3e8ff' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                                    >
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                            sx={{
                                                color: '#9c9c9c',
                                                '&.Mui-checked': { color: '#6C15D5' },
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
                                            backgroundColor: '#f3e8ff',
                                            color: '#6C15D5',
                                            '& .MuiChip-deleteIcon': {
                                                color: '#6C15D5',
                                                '&:hover': { color: '#4a0da5' },
                                            },
                                        }}
                                    />
                                ))
                            }
                            renderInput={(params) => <TextField {...params} label="Categorias" sx={getOrangeBorderSx('categoria')} />}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* RESTO DO LAYOUT (ENDEREÇO E BOTÕES DE SALVAR) */}
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
                                        <Box
                                            // O Box envolve o Autocomplete para capturar o mouse mesmo se estiver desabilitado
                                            onMouseEnter={(e) => handlePopoverOpen(e, 'id_endereco')}
                                            onMouseLeave={handlePopoverClose}
                                            sx={{
                                                width: { xs: '100%', sm: '100%', md: '25%' },
                                                ml: 2,
                                            }}
                                        >
                                            <Autocomplete
                                                disablePortal
                                                disabled={enderecoModo !== 'alterar'}
                                                onChange={handleSelectEndereco}
                                                value={selectedEndereco}
                                                options={enderecos}
                                                getOptionLabel={(option) => `${option.cep} | ${option.numero}`}
                                                sx={{
                                                    opacity: enderecoModo === 'alterar' ? 1 : 0.7,
                                                    transition: 'opacity 0.3s ease',
                                                    // Adiciona a borda laranja se houver alteração pendente neste campo
                                                    ...getOrangeBorderSx('id_endereco')
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
                                        </Box>
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
                            <span>

                                <Button
                                    disabled={!allFieldsFilled()}
                                    sx={{
                                        mb: 2,
                                        backgroundColor: 'var(--roxo)',
                                        width: '100%',
                                    }}
                                    variant='contained'
                                    onClick={() => handlePostEvento()}
                                    startIcon={<Create />}
                                >
                                    <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450' }}>
                                        Criar evento
                                    </Typography>
                                </Button>
                            </span>
                        ) : (
                            <Tooltip title={alteracoes.length > 0 ? "Analise todas as alterações pendentes antes de salvar." : ""}>
                                <span>
                                    <Button
                                        disabled={!allFieldsFilled() || alteracoes.length > 0}
                                        startIcon={<Edit />}
                                        sx={{
                                            mb: 2,
                                            backgroundColor: 'var(--roxo)',

                                            '&.Mui-disabled': {
                                                backgroundColor: alteracoes.length > 0 ? '#e0e0e0' : undefined
                                            }
                                        }}
                                        variant='contained'
                                        onClick={() => handleEditEvento()}>
                                        <Typography sx={{ fontSize: 19, fontFamily: 'var(--notosans) !important', px: 2, fontWeight: '450' }}>
                                            {alteracoes.length > 0 ? 'Analise alterações' : 'Editar evento'}
                                        </Typography>
                                    </Button>
                                </span>
                            </Tooltip>
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

            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'var(--notosans)' }}>
                        Visualização da Imagem
                    </Typography>
                    <IconButton onClick={() => setModalOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>

                <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 3, bgcolor: '#f5f5f5' }}>
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview do Evento"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                borderRadius: 4,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                            }}
                        />
                    ) : (
                        <Typography>Nenhuma imagem disponível para visualização.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CriarEvento