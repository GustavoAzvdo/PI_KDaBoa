import { Autocomplete, Box, Button, Checkbox, Grid, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Warning, Description, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { useState } from 'react';
import { dados } from '../../../categorys/dados';
import api from '../../../api/api';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';




const MAX_CHARS = 1000;
interface CategoryProps {
  onCategoryChange?: (categories: string[]) => void;

}
interface PostEstablishmentResponse {
  id: number;
  
}


interface Dados {
  id: number
  title: string;
  icon: React.ReactNode;
}

interface getEstabelecimento{
  id_estabelecimento: number;
  nome: string;
  cnpj: string;
  descricao: string;
  status: number;
  id_contato: number;
  Usuario: Array<object>;
  Estabelecimento_Categoria: Array<{id_categoria: number,
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
  const [estabelecimentoId, setEstabelecimentoId] = React.useState<number | null>(null)
  const [nome, setNome] = React.useState<string>('');
  const [descricao, setDescricao] = React.useState<string>('');
  const [CNPJ, setCNPJ] = React.useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', autoHideDuration: 4000, severity: 'success' as 'success' | 'warning' | 'error' | 'info' });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [firstRegister, setFirstRegister] = useState<boolean>(true);
  const [showCnpjModal, setShowCnpjModal] = useState<boolean>(false);
  const [modalCountdown, setModalCountdown] = useState<number>(5);
  const [modalButtonEnabled, setModalButtonEnabled] = useState<boolean>(false);
//
  const [categoriasSelecionadas ,setCategoriasSelecionadas] = useState<Dados[]>([])

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
    setCNPJ(formattedCNPJ);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= MAX_CHARS) {
      setDescricao(event.target.value);
    }
  };

  const handleCategoryChange = (_event: any, value: any) => {
    const categories = value.map((item: any) => item.id);
    setSelectedCategories(categories);
    if (onCategoryChange) {
      onCategoryChange(categories);

    }
  };

  const allFieldsFilled = nome.trim() !== '' && CNPJ.trim().length === 18 && descricao.trim() !== '' && selectedCategories.length > 0;

  const handleGetEstablishment = async () => {
    try {
      const response = await api.get<getEstabelecimento>('gerente/establishment', {withCredentials: true})

      setEstabelecimentoId(response.data.id_estabelecimento)
      setNome(response.data.nome)
      setDescricao(response.data.descricao)
      setCNPJ(response.data.cnpj)


    // extrai os ids das categorias do estabelecimento
    const categoriasIds = response.data.Estabelecimento_Categoria.map((item) => item.id_categoria);

    // filtra os objetos do array "dados" que possuem os ids acima
    const categoriasSelecionadas = dados.filter((categoria) => categoriasIds.includes(categoria.id));

    // define como valor inicial selecionado do combobox
    setCategoriasSelecionadas(categoriasSelecionadas);
    
      console.log(response)
    } catch (error) {
      console.log(error)
    } 
  }

  const handleCreateEstablishment = async () => {

    setDisabled(true);
    try {
      const response = await api.post<PostEstablishmentResponse>('/gerente/establishment', {
        nome : nome,
        descricao : descricao,
        cnpj: CNPJ,
        categoria: selectedCategories,
      }, { withCredentials: true });

      setEstabelecimentoId(response.data.id)
     

      setSnackbar({ autoHideDuration: 4000, open: true, message: 'Estabelecimento cadastrado com sucesso!', severity: 'success' });
      setEditMode(false);
      setFirstRegister(false);
      setShowCnpjModal(false);

    } catch (error) {
      setSnackbar({ autoHideDuration: 4000, open: true, message: 'Erro ao criar estabelecimento.', severity: 'warning' });

      console.error('Erro ao criar estabelecimento:', error);

    } finally {
      setDisabled(false);
    }



  }

  const handleEditOrSave = async () => {
    if (editMode) {
      // Salvar alterações (exceto CNPJ)
      setDisabled(true);
      try {
        await api.put('/gerente/establishment/', {
          id : estabelecimentoId,
          nome : nome,
          descricao : descricao,
          categoria: selectedCategories,
        }, { withCredentials: true });

        setSnackbar({ autoHideDuration: 4000, open: true, message: 'Informações salvas com sucesso!', severity: 'success' });
        setEditMode(false);
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
              disabled={!modalButtonEnabled}
              onClick={handleCreateEstablishment}
              sx={{ minWidth: 180 }}
            >

              <Typography sx={{ fontFamily: 'var(--notosans) !important', fontSize: 16 }}>
                {modalButtonEnabled ? 'Cadastrar' : `Aguarde ${modalCountdown}s`}

              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>

          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            disabled={!editMode || disabled}
            required
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            type='text'
            fullWidth
            variant="outlined"
            label="Nome do Estabelecimento" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            required
            value={CNPJ}
            onChange={handleCNPJChange}
            fullWidth
            variant="outlined"
            label="CNPJ"
            type="text"
            inputProps={{ maxLength: 18 }}
            disabled={!firstRegister || disabled}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  <Description />
                </InputAdornment>
            }}
            disabled={!editMode || disabled}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }} >
          <Box>
            <Autocomplete

              multiple
              id="checkboxes-tags-demo"
              options={dados}
              disableCloseOnSelect
              value={categoriasSelecionadas}
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
                      disabled={!editMode || disabled}
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
              disabled={!editMode || disabled}
            />
          </Box>
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
                 
                }}
                onClick={handleOpenCnpjModal}
              >
                <Typography sx={{  fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px', fontWeight: 500 }}>
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