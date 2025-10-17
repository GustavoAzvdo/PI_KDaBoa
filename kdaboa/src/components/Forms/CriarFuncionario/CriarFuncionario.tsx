import { Box, Button, Grid, TextField, Typography, CircularProgress, Card, Avatar, CardContent, Chip, CardActions, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import { useEffect, useState } from 'react'
import api from '../../../api/api'
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import { Delete,  Key, KeyOff, } from '@mui/icons-material';

interface Funcionario {
    id_usuario: number;
    nome_usuario: string;
    email: string;
    tipo: string;
    status: number;
    foto: string;
    id_estabelecimento: number;
}

const CriarFuncionario = () => {

    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [emailFuncionario, setEmailFuncionario] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // funcionarios

    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [isListLoading, setIsListLoading] = useState(true);
    const [listError, setListError] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [funcionarioParaAlterarStatus, setFuncionarioParaAlterarStatus] = useState<Funcionario | null>(null);
    const [funcionarioParaDeletar, setFuncionarioParaDeletar] = useState<Funcionario | null>(null);

    // custom snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');



    const fetchFuncionarios = async () => {
        setIsListLoading(true);
        setListError(null);
        try {
            const response: any = await api.get('/gerente/employee');
            setFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            setListError("Não foi possível carregar a lista de funcionários.");
        } finally {
            setIsListLoading(false);
        }
    };



    const handleCriarFuncionario = async () => {

        if (!nomeFuncionario.trim()) {
            setSnackbarMessage('Nome do funcionário é obrigatório!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (!emailFuncionario.trim()) {
            setSnackbarMessage('Email do funcionário é obrigatório!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailFuncionario)) {
            setSnackbarMessage('Email inválido!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/auth/employee', {
                nome: nomeFuncionario,
                email: emailFuncionario,
            });

            if (response.status === 200) {

                setNomeFuncionario('');
                setEmailFuncionario('');
                setSnackbarMessage('Funcionário criado com sucesso! Um email de verificação foi enviado.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchFuncionarios();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error;
            if (error.response?.status === 400) {
                setSnackbarMessage('Funcionário já existe ou domínio de email não permitido!');
            } else if (error.response?.status === 500) {
                setSnackbarMessage('Erro interno do servidor!');
            } else {
                setSnackbarMessage(errorMessage || 'Erro ao criar funcionário!');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDeleteModal = (funcionario: Funcionario) => {
        setFuncionarioParaDeletar(funcionario);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteDialogOpen(false);
        setFuncionarioParaDeletar(null);
    };

    const handleConfirmDelete = async () => {
        if (!funcionarioParaDeletar) return;

        try {
            await api.delete(`/gerente/employee/${funcionarioParaDeletar.id_usuario}`);
            setSnackbarMessage('Funcionário excluído com sucesso!');
            setSnackbarSeverity('success');
            fetchFuncionarios(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);
            setSnackbarMessage('Erro ao excluir funcionário. Tente novamente.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            handleCloseDeleteModal();
        }
    };


    const handleOpenStatusModal = (funcionario: Funcionario) => {
        setFuncionarioParaAlterarStatus(funcionario);
        setIsStatusModalOpen(true);
    };

    const handleCloseStatusModal = () => {
        setIsStatusModalOpen(false);
        setFuncionarioParaAlterarStatus(null);
    };

    const handleConfirmStatusChange = async () => {
        if (!funcionarioParaAlterarStatus) return;

        const isAtivando = funcionarioParaAlterarStatus.status !== 1;
        const actionText = isAtivando ? 'ativado' : 'desativado';

        try {
            await api.put(`/gerente/employee/${funcionarioParaAlterarStatus.id_usuario}`);

            setSnackbarMessage(`Funcionário ${actionText} com sucesso!`);
            setSnackbarSeverity('success');
            fetchFuncionarios(); 
        } catch (error) {
            setSnackbarMessage('Erro ao alterar o status do funcionário.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            handleCloseStatusModal();
        }
    };


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

   const pegaStatus = (status: number) => {
        switch (status) {
            case 1:
                return { label: 'Ativo', color: 'success' as const };
            case 2:
                return { label: 'Pendente', color: 'default' as const };
            default:
                return { label: 'Inativo', color: 'warning' as const };
        }
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    return (
        <Box sx={{ fontFamily: 'var(--notosans) !important' }}>
            <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <TextField
                        required
                        id="nome-funcionario"
                        label="Nome do Funcionário"
                        variant="outlined"
                        fullWidth
                        value={nomeFuncionario}
                        onChange={(e) => setNomeFuncionario(e.target.value)}
                        disabled={isLoading}
                       
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <TextField
                        required
                        id="email-funcionario"
                        label="Email do Funcionário"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={emailFuncionario}
                        onChange={(e) => setEmailFuncionario(e.target.value)}
                        disabled={isLoading}
                       
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Button
                        onClick={handleCriarFuncionario}
                        disabled={isLoading || !nomeFuncionario.trim() || !emailFuncionario.includes('@')}
                        fullWidth
                        sx={{
                            mt: 1,
                            fontSize: 19,
                            fontFamily: 'var(--notosans) !important',
                            px: 2,
                            fontWeight: '450',
                            mb: 2,
                            backgroundColor: 'var(--roxo)',
                            '&:disabled': {
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                            }
                        }}
                        variant='contained'
                        endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <BadgeIcon />}
                    >
                        {isLoading ? 'Criando...' : 'Criar Funcionário'}
                    </Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '15px' }}>
                        <PriorityHighRoundedIcon sx={{ color: '#6515d5' }} />
                        <Typography variant='h6' color='text.secondary'>
                            Após o primeiro acesso, o funcionário receberá um e-mail para definir sua própria senha.
                        </Typography>
                    </Box>
                </Grid>

                {isListLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : listError ? (
                    <Typography color="error" textAlign="center">{listError}</Typography>
                ) : (

                    <Grid container spacing={2} sx={{ mt: 2, width: '100%' }}>
                        {funcionarios.map((func) => {
                            const statusInfo = pegaStatus(func.status);
                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={func.id_usuario}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: 'auto' }} elevation={2}>
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                src={func.foto.endsWith('null') ? undefined : func.foto}
                                                alt={func.nome_usuario}
                                                sx={{ width: 60, height: 60, mr: 2 }}
                                            >

                                                {func.nome_usuario.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontFamily: 'var(--notosans)' }}>{func.nome_usuario}</Typography>
                                                <Typography variant="body2" color="text.secondary">{func.email}</Typography>
                                                <Chip
                                                    label={statusInfo ? statusInfo.label : ''}
                                                    color={statusInfo ? statusInfo.color : undefined}
                                                    size="small"
                                                    sx={{ mt: 1 }}
                                                />
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <IconButton
                                                color={func.status === 1 ? "warning" : "success"}
                                                aria-label={func.status === 1 ? "Desativar funcionário" : "Ativar funcionário"}
                                                onClick={() => handleOpenStatusModal(func)}
                                            >
                                                {func.status === 1 ? <KeyOff color='error' /> : <Key />}
                                            </IconButton>
                                            <IconButton color="error" aria-label="excluir" onClick={() => handleOpenDeleteModal(func)}>
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Grid>
            {/* Modal de confirmação de exclusão */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteModal}
            >
                <DialogTitle>
                    {"Confirmar Exclusão"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Você tem certeza que deseja excluir o funcionário
                        <strong> {funcionarioParaDeletar?.nome_usuario}</strong>?
                        Esta ação não pode ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ gap: 2 }}>
                    <Button variant='text' onClick={handleCloseDeleteModal}>Cancelar</Button>
                    <Button endIcon={<Delete />} variant='contained' onClick={handleConfirmDelete} color="error" autoFocus>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Modal update status */}
            <Dialog
                open={isStatusModalOpen}
                onClose={handleCloseStatusModal}
            >
                <DialogTitle>
                    {`Confirmar ${funcionarioParaAlterarStatus?.status === 1 ? 'Desativação' : 'Ativação'}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Você tem certeza que deseja
                        <strong> {funcionarioParaAlterarStatus?.status === 1 ? 'desativar' : 'ativar'} </strong>
                        o funcionário <strong>{funcionarioParaAlterarStatus?.nome_usuario}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStatusModal}>Cancelar</Button>
                    <Button
                        onClick={handleConfirmStatusChange}
                        color={funcionarioParaAlterarStatus?.status === 1 ? 'warning' : 'success'}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            {/* CustomSnackbar para feedback */}
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
            />
        </Box>
    )
}

export default CriarFuncionario

