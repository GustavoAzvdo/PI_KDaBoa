

import { Box, Grid, TextField, Autocomplete, Checkbox, InputAdornment, Link } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { dados } from '../../categorys/dados'
import { SearchOutlined } from '@mui/icons-material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './Search.css'


import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />


dayjs.locale('pt-br')




interface SearchProps {
  onCategoryChange?: (categories: string[]) => void;
  onTextChange?: (text: string) => void; // Callback para enviar as categorias selecionadas
  onDateChange?: (date: string) => void; // Callback opcional para enviar a data selecionada
  showScreen?: boolean
}

const Search = ({ onCategoryChange, onTextChange, onDateChange, showScreen = false }: SearchProps) => {
  const { searchText, categories, idCategory, date, setSearchText, setCategories, setIdCategory, setDate } = useSearch();
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [searchText, setSearchText] = useState<string>('')
  // const [selectedDate, setSelectedDate] = useState<any>(null);
  console.log(searchText, categories, date)

  const handleCategoryChange = (_event: any, value: any) => {
    const newCategories = value.map((item: any) => item.title);
    setIdCategory(value.map((item: any) => String(item.id)))
    setCategories(newCategories);
    if (onCategoryChange) {
      onCategoryChange(newCategories);
    }
  };

  const handleSearchTextChange = (value: string) => {
    const selectedText = value.toLowerCase();
    setSearchText(selectedText);
    if (onTextChange) {
      onTextChange(selectedText);
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    const formattedDate = newValue && newValue.isValid() ? newValue.format('DD/MM/YYYY') : '';
    setDate(formattedDate);
    if (onDateChange) {
      onDateChange(formattedDate);
    }
  };
  useEffect(() => {
    handleCategoryChange(null, categories)
    handleDateChange(date ? dayjs(date, 'DD/MM/YYYY') : null)
    handleSearchTextChange(searchText)
  }, [])


  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 12, md: 12 }} >
        <Grid container spacing={2} className='grid-form' justifyContent={'center'} sx={{ paddingY: 2 }} >

          {/* Campo da esquerda */}
          <Grid size={{ xs: 10, md: 6, lg: 5 }}>
            <Box component='form' className='form-left-search'>
              <TextField

                onChange={(e) => handleSearchTextChange(e.target.value)}
                value={searchText}

                fullWidth
                id="outlined-basic"
                label="Pesquisar eventos ou estabelecimentos"
                variant="outlined"
                InputProps={{
                  endAdornment: showScreen ? (
                    <InputAdornment position="end" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Link
                    
                        component={RouterLink}
                        to="/search"
                        state={{
                          searchText: searchText,
                          categories: idCategory,
                          date: date,
                        }}
                        sx={{ padding: 0, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <SearchOutlined cursor='pointer'
                          className='icons'
                        />
                      </Link>
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end" >
                      <SearchOutlined cursor='pointer'
                        className='icons'
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Grid>

          {/* Campo do meio */}


          {/* Campo da direita */}
          <Grid size={{ xs: 10, md: 3, lg: 3 }}>
            <Box component='form' className='form-right-search'>
              <Autocomplete
                className='txtCategorys'
                multiple
                id="checkboxes-tags-demo"
                options={dados}
                disableCloseOnSelect

                value={dados.filter(option => categories.includes(option.title))}

                onChange={handleCategoryChange}
                noOptionsText="Nenhuma categoria encontrada"


                getOptionLabel={(option) => option.title}
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
          <Grid size={{ xs: 10, md: 3, lg: 3 }} sx={{ marginTop: '-8px' }}>
            <Box
              className="form-middle-search"


              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                paddingY: 1,
                margin: 0,
                width: '100%',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                  label="Data do evento"
                  format="DD/MM/YYYY"
                  sx={{ pb: 0 }}
                  value={date && dayjs(date, 'DD/MM/YYYY').isValid() ? dayjs(date, 'DD/MM/YYYY') : null}
                  onChange={handleDateChange}

                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        fontFamily: "'Noto Sans', sans-serif !important",
                        '& .MuiOutlinedInput-root': {
                          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6C15D5 !impotant', // Define a borda roxa
                            borderWidth: '2px', // Ajusta a espessura da borda
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#6C15D5', // Define o rótulo roxo
                        },
                      },
                    },
                  }}
                />

              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}



export default Search;
