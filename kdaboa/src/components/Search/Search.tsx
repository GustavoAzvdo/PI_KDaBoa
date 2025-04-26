import { Box, Grid, TextField, Typography, Autocomplete, Checkbox, InputAdornment } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import hangloose from '../../assets/hangloose.png'
import { dados } from '../../categorys/dados'
import { SearchOutlined } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './Search.css'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const Search = () => {
  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid size={{ xs: 12, md: 12 }} >
        <Grid container spacing={2} className='grid-form' justifyContent={'center'} sx={{paddingY:2}} >
          {/* Campo da esquerda */}
          <Grid size={{ xs: 10, md: 6, lg: 5 }}>
            <Box component='form' className='form-left'>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Pesquisar eventos ou estabelecimentos"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end" onSubmit={() => window.location.reload()}>
                    <SearchOutlined cursor='pointer'
                      className='icons'
                    />
                  </InputAdornment>
                }}
              />
            </Box>
          </Grid>

          {/* Campo do meio */}


          {/* Campo da direita */}
          <Grid size={{ xs: 10, md: 4, lg: 4 }}>
            <Box component='form' className='form-right'>
              <Autocomplete
                className='txtCategorys'
                multiple
                id="checkboxes-tags-demo"
                options={dados}
                disableCloseOnSelect
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

          <Grid size={{ xs: 10, md: 2, lg: 2 }} sx={{ padding: 0, marginTop: '-8px' }}>
            <Box component='form' className='form-middle'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data do evento"
                  
                  />

                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Search
