import { Autocomplete, Box, Button, Checkbox, Chip, Grid, Modal, TextField, Typography, Card, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fade } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { Warning, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon, InsertPhoto, AddAPhoto, Delete, BusinessOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { dados } from '../../../categorys/dados';
import api from '../../../api/api';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import { CircularProgress } from '@mui/material'

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

interface CategoryProps {
  onCategoryChange?: (categories: string[]) => void;
}

interface PostEstablishmentResponse {
  id: number;
  id_estabelecimento: number;
}

interface Dados {
  id: number
  title: string;
  icon: React.ReactNode;
}

interface getEstabelecimento {

  id_estabelecimento: number;
  nome: string;
  cnpj: string;
  descricao: string;
  imagem: string;
  status: number;
  id_contato: number;
  Usuario: Array<object>;
  Estabelecimento_Categoria: Array<{
    id_categoria: number,
    Categoria: {
      nome_categoria: string
    }
  }>;
  Contato: Array<object>;
  Estabelecimento_Endereco: Array<object>;
  Evento: Array<object>;
  Galeria: Array<object>
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const Estabelecimento = ({ onCategoryChange }: CategoryProps) => {
  const rteRef = useRef<RichTextEditorRef>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [estabelecimentoId, setEstabelecimentoId] = React.useState<number | null>(null)
  const [nome, setNome] = React.useState<string>('');
  const [descricao, setDescricao] = React.useState<string>('');
  const [CNPJ, setCNPJ] = React.useState<string>('');
  const [viewCNPJ, setViewCNPJ] = React.useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', autoHideDuration: 4000, severity: 'success' as 'success' | 'warning' | 'error' | 'info' });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [firstRegister, setFirstRegister] = useState<boolean>(true);
  const [showCnpjModal, setShowCnpjModal] = useState<boolean>(false);
  const [modalCountdown, setModalCountdown] = useState<number>(5);
  const [modalButtonEnabled, setModalButtonEnabled] = useState<boolean>(false);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<Dados[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [nomeImagem, setNomeImagem] = useState('');
  // Estados para foto de perfil do estabelecimento
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);


  
  useEffect(() => {
    handleGetEstablishment();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showCnpjModal && modalCountdown > 0) {
      timer = setTimeout(() => setModalCountdown((prev) => prev - 1), 1000);
    } else if (showCnpjModal && modalCountdown === 0) {
      setModalButtonEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [showCnpjModal, modalCountdown]);

  useEffect(() => {
    const editor = rteRef.current?.editor;

    // Verifica se o editor existe
    if (!editor) {
      return;
    }

    // Pega o HTML atual do editor
    const currentHtml = editor.getHTML();

    // Se o conteúdo do estado (vindo da API) for diferente do conteúdo do editor
    // Atualiza o editor. Isso evita um loop infinito.
    if (descricao !== currentHtml) {
      editor.commands.setContent(descricao);
    }
  }, [descricao]);
  // Funções para gerenciar foto de perfil
  const handleBoxClick = () => {
    if (!imageUrl && editMode && !disabled) inputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      // Validação de tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({ open: true, message: 'Arquivo muito grande! Máximo 5MB', severity: 'error', autoHideDuration: 4000 });
        return;
      }

      setImageFile(file);

      const reader = new FileReader()
      reader.onload = () => {
        const imageDataUrl = reader.result as string
        setImageUrl(imageDataUrl)
      }
      reader.readAsDataURL(file)
      console.log(imageUrl)
      setSnackbar({ open: true, message: 'Foto adicionada com sucesso!', severity: 'success', autoHideDuration: 4000 });
    }
  }

  const handlePhotoButtonClick = () => {
    if (imageUrl) {
      setPhotoModalOpen(true)
    } else {
      inputRef.current?.click()
    }
  }

  const handleRemovePhoto = () => {
    setImageUrl(null)
    setNomeImagem('')
    setPhotoModalOpen(false)
    setSnackbar({ open: true, message: 'Foto removida com sucesso!', severity: 'success', autoHideDuration: 4000 });
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  // Função para abrir o modal antes do primeiro cadastro
  const handleOpenCnpjModal = () => {
    setShowCnpjModal(true);
    setModalCountdown(5);
    setModalButtonEnabled(false);
  };

  function formatCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5').slice(0, 18);
  }

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setViewCNPJ(formattedCNPJ)
    setCNPJ(event.target.value);
  };


  const handleCategoryChange = (_event: any, value: any) => {
    const categories = value.map((item: any) => item.id);
    setSelectedCategories(categories);
    if (onCategoryChange) {
      onCategoryChange(categories);
    }
  };

const allFieldsFilled = 
  nome.trim() !== '' && 
  (firstRegister ? viewCNPJ.trim().length === 18 : true) && // <-- Só valida CNPJ se for firstRegister
descricao.replace(/<[^>]+>/g, '').trim() !== '' &&
  selectedCategories.length > 0;


  // Função para buscar os dados do estabelecimento
  const handleGetEstablishment = async () => {
    try {
      const response = await api.get<getEstabelecimento>('/gerente/establishment', { withCredentials: true });
      const urlCompleta = response.data.imagem;
      console.log('descricao', response.data.descricao)
      if (urlCompleta) {
        // 1. Extrai o nome do arquivo da URL completa
        const nomeArquivoExtraido = urlCompleta.split('/').pop() || '';

        // 2. ATUALIZA O ESTADO, o que força o componente a redesenhar
        setNomeImagem(nomeArquivoExtraido);

        // Define a URL completa para o resto da lógica do componente (se necessário)
        setImageUrl(urlCompleta);
      } else {
        setImageUrl(null);
        setNomeImagem('');
      }

      // 3. Define o resto dos estados com segurança
      setEstabelecimentoId(response.data.id_estabelecimento ?? null);
      setNome(response.data.nome ?? '');
      setDescricao(response.data.descricao ?? '');
      setCNPJ(response.data.cnpj ?? '');
      setViewCNPJ(formatCNPJ(response.data.cnpj ?? ''));

      const categoriasIds = response.data.Estabelecimento_Categoria.map((item) => item.id_categoria);
      const categoriasSelecionadas = dados.filter((categoria) => categoriasIds.includes(categoria.id));
      setCategoriasSelecionadas(categoriasSelecionadas);
      setSelectedCategories(categoriasIds);

      setFirstRegister(false);
      setEditMode(false);

    } catch (error: any) {
      if (error.response?.status === 404) {
        setFirstRegister(true);
        setEditMode(true);
      }
    } finally {
      setDisabled(false);
    }
  }

  const handleCreateEstablishment = async () => {
    setLoading(true)
    setDisabled(true);
    try {
      const response = await api.post<PostEstablishmentResponse>('/gerente/establishment', {
        nome: nome,
        descricao: descricao,
        cnpj: CNPJ,
        categoria: selectedCategories,
      }, { withCredentials: true });

      setEstabelecimentoId(response.data.id_estabelecimento)
      setSnackbar({ autoHideDuration: 4000, open: true, message: 'Estabelecimento cadastrado com sucesso!', severity: 'success' });
      setEditMode(false);
      setFirstRegister(false);
      setShowCnpjModal(false);

    } catch (error) {
      setSnackbar({ autoHideDuration: 4000, open: true, message: 'Erro ao criar estabelecimento.', severity: 'warning' });
      console.error('Erro ao criar estabelecimento:', error);
    } finally {
      setLoading(false)
      setDisabled(false);
    }
  }


  const handleEditOrSave = async () => {
    if (editMode) {
      setDisabled(true);

      const formData = new FormData();

      formData.append('id', String(estabelecimentoId));
      formData.append('nome', nome);
      formData.append('descricao', descricao);
     formData.append('categoria', String(selectedCategories));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      try {

        await api.put('/gerente/establishment/', formData, {
          withCredentials: true,
        });

        setSnackbar({ autoHideDuration: 4000, open: true, message: 'Informações salvas com sucesso!', severity: 'success' });
        setEditMode(false);
        setImageFile(null);
      } catch (error) {
        console.log(error);
        setSnackbar({ autoHideDuration: 4000, open: true, message: 'Erro ao salvar informações.', severity: 'warning' });
      } finally {
        setDisabled(false);
      }
    } else {
      setEditMode(true);
      setSnackbar({ autoHideDuration: 4000, open: true, message: 'Edição habilitada!', severity: 'warning' });
    }
  };

  return (
    <>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      {/* Modal CNPJ */}
      <Modal open={showCnpjModal} onClose={() => setShowCnpjModal(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, minWidth: 320,
        }}>
          <Typography sx={{ fontFamily: 'var(--notosans) !important' }} variant="h6" gutterBottom>
            Confirmar CNPJ:&nbsp; {CNPJ}
          </Typography>
          <Typography sx={{ mb: 2, fontFamily: 'var(--notosans) !important', fontSize: 18 }}>
            Tem certeza que deseja cadastrar este CNPJ? <br />
            <b> {<Warning sx={{ pt: 1, mt: 1, pr: 1 }} />}Você não poderá alterá-lo futuramente.</b>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!modalButtonEnabled || loading}
              onClick={handleCreateEstablishment}
              sx={{ minWidth: 180 }}
            >
              {loading ? (<CircularProgress size={20} color='inherit' />) : (<Typography sx={{ fontFamily: 'var(--notosans) !important', fontSize: 16 }}>
                {modalButtonEnabled ? 'Cadastrar' : `Aguarde ${modalCountdown}s`}
              </Typography>)}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Foto */}
      <Dialog
        open={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{
          fontFamily: 'var(--notosans)',
          fontSize: '20px',
          fontWeight: '500',
          color: '#333',
          pb: 1
        }}>
          Remover foto do estabelecimento
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: 'var(--notosans)',
            fontSize: '16px',
            color: 'text.secondary',
            lineHeight: 1.6
          }}>
            Tem certeza que deseja remover a foto do estabelecimento?
            Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setPhotoModalOpen(false)}
            sx={{
              fontFamily: 'var(--notosans)',
              fontSize: '14px',
              color: 'text.secondary',
              textTransform: 'none',
              px: 3,
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleRemovePhoto}
            variant="contained"
            color="error"
            sx={{
              fontFamily: 'var(--notosans)',
              fontSize: '14px',
              textTransform: 'none',
              px: 3,
            }}
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        {/* Card da Foto de Perfil do Estabelecimento */}
        <Grid size={{ xs: 12 }}>
          <Card elevation={2} sx={{
            p: 3,
            mb: 3,
            border: '1px solid #f0f0f0',
          }}>
            <Typography variant="h6" sx={{
              fontFamily: 'var(--notosans)',
              fontWeight: '500',
              color: 'text.secondary',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <BusinessOutlined sx={{ color: 'var(--roxo)' }} />
              Foto do Estabelecimento
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3
            }}>
              {/* Avatar Container */}
              <Box sx={{ position: 'relative' }}>
                <Box
                  onClick={handleBoxClick}
                  sx={{
                    position: 'relative',
                    cursor: imageUrl || !editMode || disabled ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: imageUrl || !editMode || disabled ? 'none' : 'scale(1.05)',
                    },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />

                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      border: imageUrl ? '3px solid var(--roxo)' : '3px dashed #ddd',
                      bgcolor: imageUrl ? 'transparent' : '#f8f9fa',
                      boxShadow: imageUrl ? '0 8px 25px rgba(103, 58, 183, 0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    src={`http://localhost:3000/establishment/image/${nomeImagem}` || imageUrl || undefined}
                  >
                    {!imageUrl && (
                      <InsertPhoto sx={{
                        fontSize: 40,
                        color: '#999',
                        transition: 'color 0.2s',
                      }} />
                    )}
                  </Avatar>
                </Box>

                {/* Status Badge */}
                {imageUrl && (
                  <Chip
                    label="Ativo"
                    size="small"
                    sx={{
                      fontFamily: 'var(--notosans)',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: '#4caf50',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}
                  />
                )}
              </Box>

              {/* Informações e Botões */}
              <Box sx={{
                flex: 1,
                textAlign: { xs: 'center', sm: 'left' },
                minWidth: 0
              }}>
                <Typography variant="h6" sx={{
                  fontFamily: 'var(--notosans)',
                  fontWeight: '600',
                  color: 'text.secondary',
                  mb: 1
                }}>
                  {imageUrl ? 'Foto do estabelecimento' : 'Adicionar foto do estabelecimento'}
                </Typography>

                <Typography variant="body2" sx={{
                  color: 'text.secondary',
                  mb: 2,
                  lineHeight: 1.6
                }}>
                  {imageUrl
                    ? 'Sua foto está ativa e visível para clientes.'
                    : 'Adicione uma foto para representar seu estabelecimento. Formatos aceitos: JPG, PNG (máx. 5MB)'
                  }
                </Typography>

                <Button
                  variant={imageUrl ? "outlined" : "contained"}
                  color={imageUrl ? "error" : "primary"}
                  startIcon={imageUrl ? <Delete /> : <AddAPhoto />}
                  onClick={handlePhotoButtonClick}
                  disabled={!editMode || disabled}
                  sx={{
                    px: 3,
                    py: 1,
                    fontFamily: 'var(--notosans)',
                    fontWeight: '500',
                    textTransform: 'none',
                    ...(imageUrl ? {
                      borderColor: '#d32f2f',
                      color: '#d32f2f',
                      '&:hover': {
                        borderColor: '#b71c1c',
                        backgroundColor: 'rgba(211, 47, 47, 0.04)'
                      }
                    } : {
                      bgcolor: 'var(--roxo)',
                      '&:hover': {
                        bgcolor: 'var(--roxoForteDashboard)',
                        boxShadow: '0 4px 12px rgba(103, 58, 183, 0.3)'
                      }
                    })
                  }}
                >
                  {imageUrl ? "Remover foto" : "Selecionar foto"}
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Campos do formulário */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            disabled={!editMode || disabled}
            required
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            type='text'
            fullWidth
            variant="outlined"
            label="Nome do Estabelecimento"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            required
            value={viewCNPJ}
            onChange={handleCNPJChange}
            fullWidth
            variant="outlined"
            label="CNPJ"
            type="text"
            inputProps={{ maxLength: 18 }}
            disabled={!firstRegister || disabled}
          />
        </Grid>

        {/* <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <TextField
            required
            label="Descrição do estabelecimento"
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
                  <DescriptionOutlined />
                </InputAdornment>
            }}
            disabled={!editMode || disabled}
          />
        </Grid> */}

        <Grid size={{ xs: 12, sm: 12, md: 12 }}>

          <Box sx={{
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            '&:hover': {
              borderColor: !(editMode && !disabled) ? 'rgba(0, 0, 0, 0.23)' : 'rgba(0, 0, 0, 0.87)',
            },
            backgroundColor: !(editMode && !disabled) ? '#f5f5f5' : 'transparent',

          }}>
            <RichTextEditor
              ref={rteRef}
              extensions={[StarterKit]}
              content={descricao}
              editable={editMode && !disabled}
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
        <Grid size={{ xs: 12, sm: 12, md: 6 }} >
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={dados}
            disableCloseOnSelect
            value={categoriasSelecionadas}
            onChange={(event, newValue) => {
              setCategoriasSelecionadas(newValue);
              handleCategoryChange(event, newValue);
            }}
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
                    disabled={!editMode || disabled}
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
                      '&:hover': {
                        color: '#4a0da5',
                      },
                    },
                  }}
                />
              ))
            }
            renderInput={(params) => <TextField {...params} label="Categorias" />}
            disabled={!editMode || disabled}
          />
        </Grid>




        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1 }}>
            {firstRegister ? (
              <Button
                variant='contained'
                size='large'
                disabled={disabled || !allFieldsFilled}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: { xs: '100%', sm: '100%', md: '25%' },
                }}
                onClick={handleOpenCnpjModal}
              >
                <Typography sx={{ fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px', fontWeight: 500 }}>
                  Cadastrar Informações
                </Typography>
              </Button>
            ) : (
              <Button
                size='large'
                disabled={disabled || (editMode && !allFieldsFilled)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'var(--roxo)',
                  width: { xs: '100%', sm: '100%', md: '25%' },
                }}
                onClick={handleEditOrSave}
              >
                <Typography sx={{ color: 'white', fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px', fontWeight: 500 }}>
                  {editMode ? 'Salvar Informações' : 'Editar Informações'}
                </Typography>
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Estabelecimento