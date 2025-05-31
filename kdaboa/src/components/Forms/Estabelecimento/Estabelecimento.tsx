import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import ScreenError from '../../ScreenError/ScreenError'
import { Description } from '@mui/icons-material';

const MAX_CHARS = 1000;

const Estabelecimento = () => {
  const [descricao, setDescricao] = React.useState<string>('');

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= MAX_CHARS) {
      setDescricao(event.target.value);
    }
  };
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={{ xs: 12, md: 7 }}>
        <TextField
          type='text'
          fullWidth
          variant="outlined"
          label="Nome do Estabelecimento" />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="CNPJ"
          type="text"
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
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box sx={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}>
            <Button sx={{width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'var(--roxo)'}}>
              <Typography sx={{color: 'white', fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px', fontWeight: 500}}>
                Cadastrar Estabelecimento
              </Typography>
            </Button>
          </Box>
      </Grid>
    </Grid>
  )
}

export default Estabelecimento