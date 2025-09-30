

import { Box, Grid, TextField, Autocomplete, Checkbox, InputAdornment, Link, Tooltip, Chip } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { dados } from '../../categorys/dados'
import { SearchOutlined } from '@mui/icons-material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './Search.css'

import GoogleMaps from '../CityAutocomplete/GoogleMaps';
import { Link as RouterLink } from 'react-router-dom'
import { useEffect} from 'react';
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

const Search = ({ onTextChange, onDateChange, showScreen = false }: SearchProps) => {
  const { searchText, categories, date, setSearchText, setCategories, setDate } = useSearch();
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [searchText, setSearchText] = useState<string>('')
  // const [selectedDate, setSelectedDate] = useState<any>(null);
  console.log(searchText, categories, date)


  const handleCategoryChange = (_event: any, value: any) => {
    const ids = value.map((item: any) => String(item.id));
    setCategories(ids); // só ids
  };



  const handleSearchTextChange = (value: string) => {
    const selectedText = value.toLowerCase();
    setSearchText(selectedText);

    // se o usuário está digitando algo, removemos a seleção de categoria anterior
    if (selectedText.trim() !== '') {
      setCategories([]); // <<< limpeza importante
    }

    if (onTextChange) onTextChange(selectedText);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    const formattedDate = newValue && newValue.isValid() ? newValue.format('DD/MM/YYYY') : '';
    setDate(formattedDate);

    // se o usuário escolheu uma data, também limpamos categoria
    if (formattedDate) {
      setCategories([]); // <<< limpeza importante
    }

    if (onDateChange) onDateChange(formattedDate);
  };
  useEffect(() => {
    handleCategoryChange(null, categories)
    handleDateChange(date ? dayjs(date, 'DD/MM/YYYY') : null)
    handleSearchTextChange(searchText)
  }, [])

  useEffect(() => {
    if (!showScreen) {
      // se está na tela FilterEvent, já carrega os valores do context
      setSearchText(searchText);
      setCategories(categories);
      setDate(date);
    }
  }, []);



  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>



      {/* nome */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Box className='form-left-search'>
          <TextField

            onChange={(e) => handleSearchTextChange(e.target.value)}
            value={searchText}

            fullWidth
            id="outlined-basic"
            label="Pesquisar eventos"
            variant="outlined"
            InputProps={{
              endAdornment: showScreen ? (
                <InputAdornment position="end" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link

                    component={RouterLink}
                    to="/search"
                    state={{
                      searchText: searchText,
                      categories: categories,
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

      {/* categoria */}
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <Box component='form' className='form-right-search'>
          <Autocomplete
            className='txtCategorys'
            multiple
            id="checkboxes-tags-demo"
            options={dados}
            disableCloseOnSelect
            limitTags={2}
            getLimitTagsText={(more) => (
              <Tooltip
                title={
                  <Box>
                    {dados
                      .filter(option => categories.includes(String(option.id)))
                      .slice(3)
                      .map((option, index) => (
                        <div key={index} style={{ padding: '1px 0' }}>
                          {option.title}
                        </div>
                      ))
                    }
                  </Box>
                }
                arrow
                placement="top"
              >
                <Chip
                  size="small"
                  label={`+${more}`}
                  sx={{
                    backgroundColor: '#6C15D5',
                    color: 'white',
                    fontWeight: '500',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#5a11b8',
                    }
                  }}
                />
              </Tooltip>
            )}
            value={dados.filter(option => categories.includes(String(option.id)))}
            onChange={handleCategoryChange}
            noOptionsText="Nenhuma categoria encontrada"
            getOptionLabel={(option: any) => option.title}
           renderTags={(tagValue, getTagProps) => {
        console.log('TagValue length:', tagValue.length); // Debug
        
        // Renderiza as tags normais (primeiras 3)
        const visibleTags = tagValue.slice(0, 2).map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.id}
            label={option.title}
            size="small"
            sx={{
              backgroundColor: '#f3e8ff',
              color: '#6C15D5',
              fontWeight: '500',
              '& .MuiChip-deleteIcon': {
                color: '#6C15D5',
                '&:hover': {
                  color: '#5a11b8',
                }
              }
            }}
          />
        ));

        // Se tem mais de 3, adiciona o chip customizado
        if (tagValue.length > 2) {
          const moreCount = tagValue.length - 2;
          visibleTags.push(
            <Tooltip
              key="more-tooltip"
              title={
                <Box>
                  {tagValue.slice(2).map((option, index) => (
                    <div key={index} style={{ padding: '2px 0' }}>
                      {option.title}
                    </div>
                  ))}
                </Box>
              }
              arrow
              placement="top"
            >
              <Chip
                size="small"
                label={`+${moreCount}`}
                sx={{
                  backgroundColor: '#6C15D5',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#5a11b8',
                  }
                }}
              />
            </Tooltip>
          );
        }

        return visibleTags;
      }}
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

      {/* cidade */}
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <Box component='form' className='form-right-search'>
          <GoogleMaps />
        </Box>
      </Grid>

      {/* data */}
      <Grid size={{ xs: 12, md: 6, lg: 2 }} sx={{ marginTop: '-8px' }}>
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
              label="Data"
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


  )
}



export default Search;
