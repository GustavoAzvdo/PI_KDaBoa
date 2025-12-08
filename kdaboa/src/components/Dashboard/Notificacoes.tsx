import React, { useState, useEffect } from 'react'; 
import {
    Box, IconButton, Badge, Tooltip, Menu, MenuItem,
    Typography, ListItemText, ListItemIcon, Divider, Stack, Button
} from '@mui/material';
import {
    Notifications, Visibility, CheckCircle, Info,
    Campaign, Warning, Error, Delete, DeleteSweep,
    AddCircle, AccessTime 
} from '@mui/icons-material';
import { Account } from '@toolpad/core/Account';
import api from '../../api/api';

type NotificationType = 'aprovado' | 'rejeitado' | 'alterado' | 'criado' | 'deletado' | 'analise' | string;

interface NotificationItem {
    id: number;
    eventId: number; 
    type: NotificationType;
    title: string;
    desc: string;
    time: string;
    read: boolean;
}

interface BackendNotification {
    id_not: number;
    id_usuario: number;
    id_evento: number;
    titulo: string;
    mensagem: string;
    data_envio: string;
    tipo: string;
    lida: boolean; 
}

// Recebe o router do pai (Dashboard)
interface NotificacoesProps {
    router: any; 
}

export function Notificacoes({ router }: NotificacoesProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const open = Boolean(anchorEl);

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diffInSeconds < 60) return 'Agora mesmo';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas atrás`;
        return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
    };

    const fetchNotifications = async () => {
        try {
            const response = await api.get<BackendNotification[]>('/notificacao');
            if (response.data && Array.isArray(response.data)) {
                const data = response.data;
                const formattedNotifications: NotificationItem[] = data.map(item => ({
                    id: item.id_not,
                    eventId: item.id_evento, // Mapeando o ID para usar no clique
                    title: item.titulo,
                    desc: item.mensagem,
                    read: item.lida,
                    type: (item.tipo || '').toLowerCase() as NotificationType,
                    time: formatTimeAgo(item.data_envio)
                }));
                setNotifications(formattedNotifications.reverse());
            } else {
                setNotifications([]);
            }
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();       
        const intervalo = setInterval(fetchNotifications, 30000); 
        return () => clearInterval(intervalo);
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (item: NotificationItem) => {
        handleClose();
        router.navigate('/eventos/eventos_postados', { targetEventId: item.eventId });
    };

    const handleMarkAsRead = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); 
        try {
            await api.put(`/notificacao/${id}`, { lida: true });
            setNotifications((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, read: true } : item
                )
            );
        } catch (error) {
            console.error("Erro ao marcar como lida:", error);
        }
    };

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); 
        try {
            await api.delete(`/notificacao/${id}`);
            setNotifications((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Erro ao excluir notificação:", error);
        }
    };

    const handleClearAll = async () => {
        try {
            await api.delete('/notificacao');
            setNotifications([]);
        }
        catch (error) {
            console.error("Erro ao limpar notificações:", error);
        }
    };

    const getIconByType = (type: string) => {
        switch (type.toLowerCase()) {
            case 'rejeitado': return <Error fontSize="small" color="error" />;
            case 'aprovado': return <CheckCircle fontSize="small" color="success" />;
            case 'alterado': return <Warning fontSize="small" color="warning" />;
            case 'criado': return <AddCircle fontSize="small" color="info" />;
            case 'analise': return <AccessTime fontSize="small" color="primary" />;
            case 'deletado': return <Delete fontSize="small" color="disabled" />;
            default: return <Info fontSize="small" color="info" />;
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Notificações">
                <IconButton onClick={handleClick} color="inherit">
                    <Badge badgeContent={unreadCount} color={'error'} max={10}>
                        <Notifications />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            width: 420,
                            height: 'auto',
                            maxHeight: 500,
                            overflowY: 'auto',
                            '&:before': {
                                content: '""', display: 'block', position: 'absolute',
                                top: 0, right: 14, width: 10, height: 10,
                                bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h6">Notificações</Typography>
                        <Campaign fontSize='small' color='inherit' />
                    </Stack>
                    {notifications.length > 0 && (
                        <Tooltip title="Excluir todas">
                            <Button variant='outlined' size="small" endIcon={<DeleteSweep />} color="error" onClick={handleClearAll} sx={{ textTransform: 'none', fontSize: '0.75rem' }}>
                                Limpar tudo
                            </Button>
                        </Tooltip>
                    )}
                </Box>
                <Divider />
                {notifications.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Tudo limpo! Sem novas notificações.</Typography>
                    </Box>
                ) : (
                    notifications.map((item) => (
                        <MenuItem
                            key={item.id}
                            onClick={ item.read ? undefined : () => handleNotificationClick(item)}
                            sx={{
                                py: 2, px: 2, whiteSpace: 'normal', alignItems: 'flex-start',
                                borderBottom: '1px solid #f0f0f0', cursor: item.read ? 'default' : 'pointer',
                                backgroundColor: item.read ? 'inherit' : 'rgba(100, 100, 255, 0.08)',
                                transition: 'background-color 0.3s',
                                '&:hover': { backgroundColor: item.read ? '#f9f9f9' : 'rgba(100, 100, 255, 0.15)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 35, mx: 1, display: 'flex', alignSelf: 'center' }}>
                                {getIconByType(item.type)}
                            </ListItemIcon>
                            <ListItemText
                                sx={{ mr: 1, flex: 1 }}
                                primary={
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2, textDecoration: item.read ? 'line-through' : 'none', color: item.read ? 'text.disabled' : 'text.primary' }}>
                                        {item.title}
                                    </Typography>
                                }
                                secondary={
                                    <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                                        <Typography variant="body2" sx={{ wordBreak: 'break-word', fontSize: '0.85rem', color: item.read ? 'text.disabled' : 'text.primary' }}>
                                            {item.desc}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {item.time}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <Stack direction="row" spacing={0} alignItems="center" sx={{ alignSelf: 'center' }}>
                                <Tooltip title={item.read ? "Visto" : "Marcar como vista"}>
                                    <span>
                                        <IconButton size="small" onClick={(e) => handleMarkAsRead(item.id, e)} disabled={item.read} color="inherit">
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Excluir notificação">
                                    <IconButton size="small" onClick={(e) => handleDelete(item.id, e)} color="error">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </MenuItem>
                    ))
                )}
            </Menu>
            <Divider orientation="vertical" flexItem variant="middle" sx={{ mx: 1 }} />
            <Account />
        </Stack>
    );
}