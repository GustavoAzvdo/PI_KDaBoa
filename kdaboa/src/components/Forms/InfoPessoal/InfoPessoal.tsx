import { Box, Button, Grid,  Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField,  Link, Card, Avatar, Fade, Chip } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRef, useState } from 'react'
import { InsertPhoto, PersonOutlined, EmailOutlined, LockOutlined, Save } from '@mui/icons-material'
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar'

const InfoPessoal = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    const handleBoxClick = () => {
        if (!imageUrl) inputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            
            // Validação de tamanho (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setSnackbarOpen(true);
                setSnackbarMessage('Arquivo muito grande! Máximo 5MB');
                setSnackbarSeverity('error');
                return;
            }

            const reader = new FileReader()
            reader.onload = () => {
                const imageDataUrl = reader.result as string
                console.log(imageDataUrl)
                setImageUrl(imageDataUrl)
            }
            reader.readAsDataURL(file)
            setSnackbarOpen(true);
            setSnackbarMessage('Foto adicionada com sucesso!');
            setSnackbarSeverity('success');
        }
    }

    const handleButtonClick = () => {
        if (imageUrl) {
            setModalOpen(true)
        } else {
            inputRef.current?.click()
        }
    }

    const handleRemovePhoto = () => {
        setImageUrl(null)
        setModalOpen(false)
        setSnackbarOpen(true);
        setSnackbarMessage('Foto removida com sucesso!');
        setSnackbarSeverity('success');
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header da seção */}
           

            <Grid container spacing={3}>
                {/* Card da Foto de Perfil */}
                <Grid size={{ xs: 12 }}>
                    <Card elevation={2} sx={{ 
                        p: 3, 
                        
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
                            <PersonOutlined sx={{ color: 'var(--roxo)' }} />
                            Foto do Perfil
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
                                        cursor: imageUrl ? 'default' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: imageUrl ? 'none' : 'scale(1.05)',
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
                                        src={imageUrl || undefined}
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
                                    {imageUrl ? 'Foto do perfil' : 'Adicionar foto do perfil'}
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: 'text.secondary',
                                    mb: 2,
                                    lineHeight: 1.6
                                }}>
                                    {imageUrl 
                                        ? 'Sua foto está ativa e visível para outros usuários.' 
                                        : 'Adicione uma foto para personalizar seu perfil. Formatos aceitos: JPG, PNG (máx. 5MB)'
                                    }
                                </Typography>

                                <Button
                                    variant={imageUrl ? "outlined" : "contained"}
                                    color={imageUrl ? "error" : "primary"}
                                    startIcon={imageUrl ? <DeleteIcon /> : <AddAPhotoIcon />}
                                    onClick={handleButtonClick}
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

                {/* Card das Informações */}
                <Grid size={{ xs: 12 }}>
                    <Card elevation={2} sx={{ 
                        p: 3, 
                    
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
                            <EmailOutlined sx={{ color: 'var(--roxo)' }} />
                            Dados da Conta
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField 
                                    type='text' 
                                    fullWidth 
                                    label="Nome completo" 
                                    variant="outlined"
                                  
                                />
                            </Grid>
                            
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField 
                                    disabled 
                                    type='email' 
                                    fullWidth 
                                    label="E-mail" 
                                    variant="outlined"
                                    helperText="O e-mail não pode ser alterado"
                                   
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ 
                            mt: 3, 
                            p: 2, 
                            bgcolor: 'rgba(103, 58, 183, 0.05)',
                            borderRadius: 2,
                            border: '1px solid rgba(103, 58, 183, 0.1)'
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LockOutlined sx={{ color: 'var(--roxo)', fontSize: 20 }} />
                                    <Typography sx={{ 
                                        fontFamily: 'var(--notosans)', 
                                        fontWeight: '500',
                                        color: '#555'
                                    }}>
                                        Segurança da Conta
                                    </Typography>
                                </Box>
                                
                                <Link 
                                    href="/recuperar-senha" 
                                    sx={{ 
                                        textDecoration: 'none', 
                                        fontFamily: 'var(--notosans)',
                                        fontWeight: '500',
                                        fontSize: '16px',
                                        color: 'var(--roxo)',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    Alterar senha →
                                </Link>
                            </Box>
                        </Box>
                    </Card>
                </Grid>

                {/* Botão Salvar */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        pt: 2
                    }}>
                        <Button 
                            variant="contained"
                            size="large"
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                                minWidth: { sm: 200 },
                                bgcolor: 'var(--roxoForteDashboard)',
                              
                                
                                px: 4,
                                fontFamily: 'var(--notosans)',
                                fontWeight: '600',
                                fontSize: '16px',
                                textTransform: 'none',
                                
                            }}
                            endIcon={<Save/>}
                        >
                            Salvar alterações
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Modal de Confirmação */}
            <Dialog 
                open={modalOpen} 
                onClose={() => setModalOpen(false)}
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
                    Remover foto do perfil
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{
                        fontFamily: 'var(--notosans)', 
                        fontSize: '16px',
                        color: 'text.secondary',
                        lineHeight: 1.6
                    }}>
                        Tem certeza que deseja remover a foto do seu perfil? 
                        Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button  
                        onClick={() => setModalOpen(false)}  
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

            <CustomSnackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Box>
    )
}

export default InfoPessoal