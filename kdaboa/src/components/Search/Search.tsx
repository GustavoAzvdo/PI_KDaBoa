import { Box, Grid, TextField, Typography, Autocomplete, Checkbox, InputAdornment } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { dados } from '../../categorys/dados'
import {SearchOutlined} from '@mui/icons-material';
import './Search.css'
import { useState } from 'react'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface SearchProps {
  onCategoryChange: (categories: string[]) => void;
  onTextChange: (text: string) => void; // Callback para enviar as categorias selecionadas
}

const Search = ({onCategoryChange, onTextChange}: SearchProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('')

  const handleCategoryChange = (event: any, value: any) => {
    const categories = value.map((item: any) => item.title); // Extrai os títulos das categorias selecionadas
    setSelectedCategories(categories);
    onCategoryChange(categories); 
  };

  const handleSearchTextChange = (value: string) => {
    const selectedText = value.toLowerCase();
    setSearchText(selectedText); // Atualiza o estado local
    onTextChange(selectedText); // Passa o valor atualizado diretamente para o componente pai
  };
  
  return (
    <Grid container spacing={2}>
    

      <Grid size={{xs: 12 , md: 12}}>
        <Grid container spacing={2} className='grid-form' justifyContent={'center'}>
          {/* Campo da esquerda */}
          <Grid size={{xs: 10 , md: 6}}>
            <Box component='form' className='form-left'>
              <TextField
                fullWidth
                value={searchText}
                onChange={(e) => handleSearchTextChange(e.target.value)}
                id="outlined-basic"
                label="Pesquisar eventos, shows, baladas ..."
                variant="outlined"
                InputProps={{endAdornment: <InputAdornment position="end"  onSubmit={() => window.location.reload()}>
                                              <SearchOutlined cursor='pointer' 
                                                              className='icons'
                                                             />
                                            </InputAdornment>}}
              />
            </Box>
          </Grid>

          {/* Campo da direita */}
          <Grid size={{xs: 10 , md: 4}}>
            <Box component='form' className='form-right'>
              <Autocomplete
                className='txtCategorys'
                multiple
                id="checkboxes-tags-demo"
                options={dados}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                onChange={handleCategoryChange}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props
                  return (
                    <li
                      key={key}
                      {...optionProps}
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontSize: '18px',
                        color: '#000',
                        cursor: 'pointer',
                      }}
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
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Search
