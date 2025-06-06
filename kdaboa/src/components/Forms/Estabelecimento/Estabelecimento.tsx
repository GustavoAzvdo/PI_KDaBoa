import { Autocomplete, Box, Button, Checkbox, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { Description, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { useState } from 'react';
import { dados } from '../../../categorys/dados';
const MAX_CHARS = 1000;
interface CategoryProps {
  onCategoryChange?: (categories: string[]) => void;

}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const Estabelecimento = ({ onCategoryChange }: CategoryProps) => {
  const [descricao, setDescricao] = React.useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= MAX_CHARS) {
      setDescricao(event.target.value);
    }
  };

  const handleCategoryChange = (_event: any, value: any) => {
    const categories = value.map((item: any) => item.title);
    setSelectedCategories(categories);
    if (onCategoryChange) {
      onCategoryChange(categories);
    }
  };
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <TextField
          type='text'
          fullWidth
          variant="outlined"
          label="Nome do Estabelecimento" />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="CNPJ"
          type="text"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <TextField
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
        />
      </Grid>
      <Grid size={{ xs: 10, sm: 6, md: 6 }} >
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
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1 }}>
          <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--roxo)' }}>
            <Typography sx={{ color: 'white', fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px', fontWeight: 500 }}>
              Cadastrar Estabelecimento
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Estabelecimento