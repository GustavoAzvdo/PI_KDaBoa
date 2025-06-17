import { AttachFile, Close, CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const Galeria = () => {
    const [fileName, setFileName] = React.useState<string>('');
    const [fileObj, setFileObj] = React.useState<File | null>(null);
    const [photos, setPhotos] = React.useState<{ name: string; url: string }[]>([]);
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
            setFileName('');
            setFileObj(null);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }

    const handleRemovePhoto = (index: number) => {
        setPhotos((prev) => {
            URL.revokeObjectURL(prev[index].url);
            return prev.filter((_, i) => i !== index);
        })
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{ borderBottom: '1px solid #eee' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', py: 2 }}>
                    <Button
                        startIcon={<CloudUpload />}
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--roxo)',
                            px: 6,
                           
                        }}
                        onClick={handleAddPhoto}
                        disabled={!fileObj || photos.length >= 4}
                    >
                        <Typography sx={{ fontSize: 18, fontFamily: 'var(--notosans) !important' }}>
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
        </Grid>
    )
}

export default Galeria