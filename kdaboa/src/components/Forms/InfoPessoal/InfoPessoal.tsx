import { Box, Button, Grid, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Divider, Link } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRef, useState } from 'react'
import { InsertPhoto } from '@mui/icons-material'
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
            const reader = new FileReader()
            reader.onload = () => {
                const imageDataUrl = reader.result as string
                console.log(imageDataUrl)
                setImageUrl(imageDataUrl)
            }
            reader.readAsDataURL(file)
            setSnackbarOpen(true);
            setSnackbarMessage('Foto adicionada com sucesso');
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
        setSnackbarMessage('Foto removida com sucesso');
        setSnackbarSeverity('success');
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };



    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8, sm: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
                <Box
                    onClick={handleBoxClick}
                    sx={{
                        pl: { xs: 0, sm: 0, md: 0 },
                        backgroundColor: '#f5f5f5',
                        width: 120,
                        height: 120,
                        border: '2px dashed #888',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: imageUrl ? 'default' : 'pointer',
                        flexDirection: 'column',
                        transition: 'border-color 0.2s',
                        overflow: 'hidden',
                        '&:hover': {
                            borderColor: 'var(--roxo, #673ab7)',
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
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Foto escolhida"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    ) : (
                        <>
                            <IconButton color="primary" component="span">
                                <InsertPhoto fontSize="large" sx={{ color: '#999999' }}/>
                            </IconButton>
                        </>
                    )}
                </Box>
                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color={imageUrl ? "primary" : "primary"}
                        startIcon={imageUrl ? <DeleteIcon /> : <AddAPhotoIcon />}
                        onClick={handleButtonClick}
                        sx={{
                            backgroundColor: imageUrl ? "#d32f2f" : "var(--roxo)",
                            '&:hover': {
                                backgroundColor: imageUrl ? "#b71c1c" : "var(--roxo)",
                            }
                        }}
                    >
                        <Typography sx={{ fontFamily: "'Noto Sans', sans-serif !important", fontSize: '16px' }}>
                            {imageUrl ? "Remover foto" : "Adicionar foto"}
                        </Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 12 ,sm: 12 }} sx={{mt: 2}}>
                <Divider/>
            </Grid>
            <Grid size={{ xs: 12, md: 4, sm: 12 }}>
                <Box>
                    <TextField type='text' fullWidth label="Nome" variant="outlined"/>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4, sm: 12 }}>
                <Box>
                    <TextField disabled type='email' fullWidth label="E-mail" variant="outlined"/>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4, sm: 12 }}>
                <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}>
                    <Link href="/recuperar-senha" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, fontFamily: "'Noto Sans', sans-serif !important", fontSize: '20px' }}>Alterar senha</Link>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained"
                        sx={{
                            width: { xs: '100%', sm: '100%', md: '20%' }
                        }}
                    >
                        <Typography sx={{ fontFamily: "'Noto Sans', sans-serif !important", fontSize: '18px' }}>Salvar</Typography>
                    </Button>
                </Box>
            </Grid>
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} >
                <DialogTitle sx={{fontFamily: "'Noto Sans', sans-serif !important", fontSize: '20px'}}>Remover foto</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontFamily: "'Noto Sans', sans-serif !important", fontSize: '18px'}}>
                        Tem certeza que deseja remover a foto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}  sx={{fontFamily: "'Noto Sans', sans-serif !important", fontSize: '16px'}}>
                        Cancelar
                    </Button>
                    <Button onClick={handleRemovePhoto}  sx={{fontFamily: "'Noto Sans', sans-serif !important", fontSize: '16px'}}>
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
        </Grid>
    )
}

export default InfoPessoal