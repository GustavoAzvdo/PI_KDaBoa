import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const Contatos = () => {
    const [telefone1, setTelefone1] = React.useState<string>('');
    const [telefone2, setTelefone2] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');

    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField 
                    fullWidth 
                    variant="outlined" 
                    label="Telefone 1"
                    value={telefone1}
                    onChange= {(e: React.ChangeEvent<HTMLInputElement>) => setTelefone1(e.target.value)}    
                >
                    
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField 
                    fullWidth  
                    variant="outlined" 
                    label="Telefone 2"
                    value={telefone2}
                    onChange= {(e: React.ChangeEvent<HTMLInputElement>) => setTelefone2(e.target.value)}
                >
                        
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField 
                    fullWidth 
                    variant="outlined" 
                    label="Email"
                    type='email'
                    value={email}
                    onChange= {(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                >

                </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' size='large' sx={{backgroundColor: 'var(--roxo)'}}>
                        <Typography sx={{fontFamily : 'Noto Sans, sans-serif !important', fontSize: '18px'}}>
                            Salvar Contato
                        </Typography>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Contatos