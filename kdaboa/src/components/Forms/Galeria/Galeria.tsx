import { AttachFile, Check, Close, CloudUpload, Delete, InfoOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import React from 'react'
import api from '../../../api/api'


const dicas = [
    'Formatos permitidos: JPG, JPEG, PNG;',
    'Tamanho máximo: 5MB;',
    'Resolução: 1200 x 500.'

]
const Galeria = () => {
    const [fileName, setFileName] = React.useState<string>('');
    const [fileObj, setFileObj] = React.useState<File | null>(null);
    const [photos, setPhotos] = React.useState<{ name: string; url: string }[]>([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'warning'>('success');

    const [open, setOpen] = React.useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(event.target.files);
        if (file) {
            setFileName(file.name);
            setFileObj(file);
        }
    }

    const handleAddPhoto = () => {
        if (fileObj && photos.length < 4) {
        
            const url = URL.createObjectURL(fileObj);
            setPhotos([...photos, { name: fileObj.name, url }]);
            setSnackbarMessage('Foto adicionada com sucesso!');
            setSnackbarSeverity('success');
        }
    // const handleAddPhoto = async () => {
    //     try {
    //         const response = await api.post('gerente/gallery', { images: fileObj }, { withCredentials: true })
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     const tipoValido = ['image/jpeg', 'image/jpg', 'image/png'].includes(fileObj?.type || '');
    //     if (!tipoValido) {
    //         setSnackbarMessage('Formato inválido. Aceitos: JPG, JPEG, PNG.');
    //         setSnackbarSeverity('warning');
    //         setSnackbarOpen(true);
    //         return;
    //     }

    //     if (fileObj?.size && fileObj.size > 5 * 1024 * 1024) { // 5MB
    //         setSnackbarMessage('O tamanho máximo permitido é 5MB.');
    //         setSnackbarSeverity('warning');
    //         setSnackbarOpen(true);
    //         return;
    //     }

    //     if (!fileObj) {
    //         setSnackbarMessage('Nenhum arquivo selecionado.');
    //         setSnackbarSeverity('warning');
    //         setSnackbarOpen(true);
    //         return;
    //     }

    //     if (photos.length >= 4) {
    //         setSnackbarMessage('Você atingiu o limite máximo de 4 fotos.');
    //         setSnackbarSeverity('warning');
    //         setSnackbarOpen(true);
    //         return;
    //     }

    //     // Validação final antes de adicionar
    //     const img = new Image();
    //     img.onload = function () {


    //         const url = URL.createObjectURL(fileObj);
    //         setPhotos([...photos, { name: fileObj.name, url }]);
    //         setSnackbarMessage('Foto adicionada com sucesso!');
    //         setSnackbarSeverity('success');
    //         setSnackbarOpen(true);
    //         setFileName('');
    //         setFileObj(null);
    //         if (inputRef.current) {
    //             inputRef.current.value = '';
    //         }
    //     };

    //     img.onerror = function () {
    //         setSnackbarMessage('Erro ao processar a imagem. Tente novamente.');
    //         setSnackbarSeverity('warning');
    //         setSnackbarOpen(true);
    //     };

    //     img.src = URL.createObjectURL(fileObj);
    // }

    const handleAddPhoto = async () => {
        if (!fileObj) {
            setSnackbarMessage('Nenhum arquivo selecionado.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('images', fileObj);

        try {
            const response = await api.post('gerente/gallery', formData, {
                withCredentials: true,
                
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
          
            console.log(response);
            const url = URL.createObjectURL(fileObj);
            setPhotos(prev => [...prev, { name: fileObj.name, url }]);
            setSnackbarMessage('Foto adicionada com sucesso!');
            setSnackbarSeverity('success');
            
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            setSnackbarMessage('Erro ao fazer upload da imagem. Tente novamente.');
            setSnackbarSeverity('warning');
        } finally {
            setSnackbarOpen(true);
            setFileName('');
            setFileObj(null);
        }
    }

    const handleRemovePhoto = (index: number) => {
        setPhotos((prev) => {
            URL.revokeObjectURL(prev[index].url);
            URL.revokeObjectURL(prev[index].url);
            setSnackbarMessage('Foto removida com sucesso!');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return prev.filter((_, i) => i !== index);

        })
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
        setSnackbarMessage('Foto removida com sucesso!');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);

    }
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {/* Campo de texto q vai receber o nome da foto */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField

                    disabled
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderStyle: 'dashed',
                                borderWidth: 2,
                            },
                        },
                    }}
                    label="Arquivo selecionado"
                    value={fileName}
                    variant="outlined"
                    fullWidth
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: fileName && (
                            <>
                                <IconButton onClick={() => { setFileName(''); setFileObj(null); if (inputRef.current) inputRef.current.value = ''; }}>
                                    <Close />
                                </IconButton>

                            </>


                        ),
                    }}
                />
            </Grid>
            {/* Botão de adicionar foto */}
            <Grid size={{ xs: 11, sm: 10, md: 3 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                    <Button
                        sx={{
                            width: '100%',
                            height: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'var(--roxo)'
                        }}
                        fullWidth
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<AttachFile />}

                    >
                        <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important' }}>
                            Escolher foto
                        </Typography>
                        <VisuallyHiddenInput
                            type="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                            multiple
                            accept='image/*'
                        />
                    </Button>
                </Box>
            </Grid>

            {/* Dicas de como adicionar uma boa foto */}
            <Grid size={{ xs: 1, sm: 1, md: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    <IconButton color='primary' onClick={() => setOpen(true)}>
                        <InfoOutlined />
                    </IconButton>

                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ borderBottom: '1px solid #eee' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', py: 2 }}>
                    <Button
                        startIcon={<CloudUpload />}
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--roxo)',
                            px: 6,
                            width: {xs: '100%', sm: '100%', md: '30%'},

                        }}
                        onClick={handleAddPhoto}
                        disabled={!fileObj || photos.length >= 4}
                    >
                        <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important', px: 1 }}>
                            Adicionar foto
                        </Typography>
                    </Button>
                </Box>

            </Grid>

            {photos.map((photo, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 6 }} key={idx}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <img
                            src={photo.url}
                            alt={photo.name}
                            style={{ width: '100%', maxHeight: 250, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Button
                                variant="outlined"
                                startIcon={<Delete />}
                                onClick={() => handleRemovePhoto(idx)}
                                sx={{ mt: 1, width: '50%', borderColor: 'var(--roxo)', color: 'var(--roxo)' }}
                            >
                                <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important' }}>
                                    Excluir

                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            ))}
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ fontSize: 22, fontFamily: 'var(--notosans) !important' }}>Dicas de como adicionar uma boa foto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                            <Box>
                                {
                                    dicas.map((value, idx) => (
                                        <ListItem key={idx} sx={{ p: 0 }}>
                                            <ListItemIcon sx={{ p: 0 }}>
                                                <Check color='primary' />
                                            </ListItemIcon>
                                            <ListItemText primary={value} sx={{ p: 0 }} />
                                        </ListItem>
                                    ))
                                }
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="contained" color="primary" sx={{ fontSize: 16 }}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}}

export default Galeria