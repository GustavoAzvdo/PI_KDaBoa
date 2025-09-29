import { AttachFile, Check, Close, CloudUpload, Delete, InfoOutlined, Fullscreen } from '@mui/icons-material';
import { Box, Button, Card, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, ListItem, ListItemIcon, ListItemText, TextField, Typography, Fade, Zoom } from '@mui/material'
import { styled } from '@mui/material/styles'
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import React, { useEffect, useState } from 'react'
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
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(event.target.files);
        if (file) {
            setFileName(file.name);
            setFileObj(file);
        }
    }


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
            setLoading(true);
            const response = await api.post('gerente/gallery', formData, {

                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            const url = URL.createObjectURL(fileObj);
            setPhotos(prev => [...prev, { name: fileObj.name, url }]);
            setSnackbarMessage('Foto adicionada com sucesso!');
            setSnackbarSeverity('success');

        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            setSnackbarMessage('Erro ao fazer upload da imagem. Tente novamente.');
            setSnackbarSeverity('warning');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
            setFileName('');
            setFileObj(null);
        }
        handleGetPhotos();
    }

    const handleRemovePhoto = async (index: number) => {
        const nomeImagem = photos[index].name;
        try {
            await api.request({
                method: 'DELETE',
                url: '/gerente/gallery',
                data: { nome: nomeImagem },
                withCredentials: true,
            });

            const novasFotos = [...photos];
            novasFotos.splice(index, 1);
            setPhotos(novasFotos);

            setSnackbarMessage('Foto removida com sucesso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Erro ao remover a foto:', error);
            console.log(nomeImagem)
            setSnackbarMessage('Erro ao remover a foto. Tente novamente.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
        }

        handleGetPhotos();
    };


    const handleGetPhotos = async () => {
        try {
            setLoading(true);

            const response = await api.get<string[]>('/gerente/gallery', { withCredentials: true });
            console.log(response.data)
            const nomes: string[] = response.data.map((caminho: string) => {
                const partes = caminho.split('/');
                return partes[partes.length - 1];
            });
            console.log(nomes)
            const photos = nomes.map((nome: string) => ({
                name: nome,
                url: `http://localhost:3000/gallery/${encodeURIComponent(nome)}`
            }));
            console.log(photos)
            setPhotos(photos);
        } catch (error) {
            console.error("Erro ao buscar fotos:", error);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        handleGetPhotos();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            {/* Header da Galeria */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ pb: 1 }}>
                    Galeria de Fotos
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                    Adicione até 4 fotos para mostrar seu estabelecimento
                </Typography>

                {/* Barra de progresso das fotos */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 3 }}>
                    {[1, 2, 3, 4].map((num) => (
                        <Box
                            key={num}
                            sx={{
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: photos.length >= num ? 'primary.main' : '#c9c9c9',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {photos.length}/4 fotos adicionadas
                </Typography>
            </Box>

            {/* Seção de Upload */}
            <Card elevation={1} sx={{ p: 4, mb: 4 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            disabled
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderStyle: 'dashed',
                                        borderWidth: 2,
                                        borderColor: 'var(--roxo)',
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
                                    <IconButton
                                        onClick={() => {
                                            setFileName('');
                                            setFileObj(null);
                                            if (inputRef.current) inputRef.current.value = '';
                                        }}
                                        sx={{ color: 'var(--roxo)' }}
                                    >
                                        <Close />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
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
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Button
                            startIcon={<CloudUpload />}
                            variant="contained"
                            fullWidth
                            sx={{
                                width: '100%',
                                height: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'var(--roxo)'
                            }}
                            onClick={handleAddPhoto}
                            disabled={!fileObj || photos.length >= 4}
                        >
                              <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important' }}>
                                Adicionar
                            </Typography>
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12, md: 1 }}>
                        <IconButton
                            onClick={() => setOpen(true)}
                            sx={{
                                color: 'var(--roxo)',
                                bgcolor: 'rgba(108, 21, 213, 0.1)',
                                '&:hover': {
                                    bgcolor: 'var(--roxo)',
                                    color: 'white',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <InfoOutlined />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>

            {/* Galeria de Fotos */}
            <Box>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                        <CircularProgress size={60} sx={{ color: 'var(--roxo)' }} />
                    </Box>
                ) : photos.length === 0 ? (
                    <Card elevation={2} sx={{ p: 6, textAlign: 'center', bgcolor: '#f9f9f9' }}>
                        <CloudUpload sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 1, color: '#666' }}>
                            Nenhuma imagem adicionada
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#999' }}>
                            Adicione suas primeiras fotos para começar
                        </Typography>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {photos.map((photo, idx) => (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={idx}>
                                <Fade in timeout={300 * (idx + 1)}>
                                    <Card
                                        elevation={4}
                                        sx={{
                                          
                                            overflow: 'hidden',
                                            position: 'relative',
                                           
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                image={photo.url}
                                                alt={photo.name}
                                                sx={{
                                                    height: 250,
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                            />

                                            {/* Overlay com botões */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                p: 2,
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                                '&:hover': { opacity: 1 }
                                            }}>
                                                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                                                    <IconButton
                                                        onClick={() => setPreviewImage(photo.url)}
                                                        sx={{
                                                            bgcolor: 'rgba(255,255,255,0.9)',
                                                            color: '#333',
                                                            '&:hover': {
                                                                bgcolor: 'white',
                                                                transform: 'scale(1.1)'
                                                            }
                                                        }}
                                                    >
                                                        <Fullscreen />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleRemovePhoto(idx)}
                                                        sx={{
                                                            bgcolor: 'rgba(244, 67, 54, 0.9)',
                                                            color: 'white',
                                                            '&:hover': {
                                                                bgcolor: '#d32f2f',
                                                                transform: 'scale(1.1)'
                                                            }
                                                        }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            {/* Badge de número */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                bgcolor: 'var(--roxo)',
                                                color: 'white',
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {idx + 1}
                                            </Box>
                                        </Box>

                                        {/* Nome da imagem */}
                                        <Box sx={{ p: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    textAlign: 'center',
                                                    fontWeight: '500',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {photo.name}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Modal de Preview da Imagem */}
            <Dialog
                open={!!previewImage}
                onClose={() => setPreviewImage(null)}
                maxWidth="md"
                fullWidth
            >
                <Box sx={{ position: 'relative' }}>
                    <IconButton
                        onClick={() => setPreviewImage(null)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            zIndex: 1,
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                        }}
                    >
                        <Close />
                    </IconButton>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '80vh',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </Box>
            </Dialog>

            {/* Modal de Dicas - mantido igual */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ fontSize: 22, fontFamily: 'var(--notosans) !important' }}>
                    Dicas de como adicionar uma boa foto
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 1 }}>
                            <Box>
                                {dicas.map((value, idx) => (
                                    <ListItem key={idx} sx={{ p: 0 }}>
                                        <ListItemIcon sx={{ p: 0 }}>
                                            <Check sx={{ color: 'var(--roxo)' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={value} sx={{ p: 0 }} />
                                    </ListItem>
                                ))}
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        sx={{ fontSize: 16, bgcolor: 'var(--roxo)' }}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </Box>
    )
}

export default Galeria