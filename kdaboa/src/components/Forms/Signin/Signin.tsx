import { Box, Typography, TextField, InputAdornment, Button, Link, Snackbar, Alert } from '@mui/material'
import { PersonOutlined,  MailOutline } from '@mui/icons-material';
import logo from '../../../assets/logo.png'
import { useEffect, useState } from 'react';
import './Signin.css'
import Password from '../../Password/Password';
const Signin = () => {
    const [name, setName] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); 
    const [bodyHeight, setBodyHeight] = useState<number>(760); 

    const handleValidationChange = (isPasswordValid: boolean) => {
        const isNameValid = name.length >= 3; 
        setIsFormValid(isNameValid && isPasswordValid); 
    };

    const handleCreateAccount = () => {
        
        setSnackbarOpen(true); 
    };

    const handleCloseSnackbar = (e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false); 
    };
     useEffect(() => {
        if (isFormValid) {
            setBodyHeight(735); 
        } else {
            setBodyHeight(760); 
        }
    }, [isFormValid]);
    return (
        <Box className='container'>
            <Box className="body" sx={{ height: `${bodyHeight}px` }}> {/* Altura dinâmica */}
                <Box className='header'>
                    <img src={logo} alt="logo" style={{ width: 30, height: 30 }} />
                    <Typography className='title'>
                        KDABOA
                    </Typography>
                </Box>
                <Box className='title'>
                    <Typography variant='h5'>
                        Crie sua conta
                    </Typography>
                </Box>
                <Box component='form' className='form'>
                    <Box className='inputs'>
                        <Box>
                            <TextField
                                fullWidth
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                sx={{ color: 'var(--roxoForm) !important' }}
                                margin='normal'
                                id={ name.length > 3 ? 'outlined-basic' : 'outlined-error'}
                                error={name.length < 3}
                                helperText={name.length < 3 ? 'Nome deve ter mais de 3 caracteres!' : ''}
                                type="text" required
                                label="Nome"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <PersonOutlined
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField

                                fullWidth
                                margin='normal'
                                id="outlined-basic"
                                type="email" required
                                label="Email"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <MailOutline
                                            className='icons'
                                        />
                                    </InputAdornment>
                                }}
                            />
                        </Box>

                        <Password onValidationChange={handleValidationChange} />
                    </Box>
                    <Box className='btn'>
                        <Button variant="contained" className='btn-login' disabled={!isFormValid} sx={{ padding: '10px' }} onClick={handleCreateAccount}>
                            <Typography className='btn'>
                                Criar conta
                            </Typography>
                        </Button>

                        <Box className="links-account">
                            <Typography>
                                Já tem uma conta? <Link href="#">Faça login!</Link>
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} 
            >
                <Alert onClose={handleCloseSnackbar} className='alert' severity="success" sx={{
                    width: '100%', fontSize: '20px', '& .MuiAlert-icon': {
                        fontSize: '30px', 
                    },
                }}>
                    Conta criada com sucesso!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Signin