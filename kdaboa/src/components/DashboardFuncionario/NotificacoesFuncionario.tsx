import React, { useState } from 'react';
import {
    Box, IconButton, Badge, Tooltip, Menu, MenuItem,
    Typography, ListItemText, ListItemIcon, Divider, Stack, Button
} from '@mui/material';
import {
    Notifications,
    Visibility,
    CheckCircle,
    Info,
    Campaign,
    Warning,
    Error,
    Delete,
    DeleteSweep
} from '@mui/icons-material';
import { Account } from '@toolpad/core/Account';


type NotificationType = 'aprovado' | 'rejeitado' | 'alterado';

interface NotificationItem {
    id: number;
    type: NotificationType;
    title: string;
    desc: string;
    time: string;
    read: boolean; 
}


const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        type: 'aprovado',
        title: 'Evento "L7 me espera!" ',
        desc: 'O evento foi aprovado pelo gerente e está agora visível para os usuários.',
        time: '5 min atrás',
        read: false
    },
    {
        id: 2,
        type: 'rejeitado',
        title: 'O evento "Rock in Rio" foi rejeitado',
        desc: 'O evento não atendeu aos requisitos necessários dados pelo gerente.',
        time: '2 horas atrás',
        read: false
    },
    {
        id: 3,
        type: 'alterado',
        title: 'Alteração no "Festa Junina"',
        desc: 'O evento foi modificado pelo gerente.',
        time: '1 dia atrás',
        read: false
    }
];

export function NotificacoesFuncionários() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    
    const handleMarkAsRead = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, read: true } : item
            )
        );
    };

    
    const handleDelete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

   
    const handleClearAll = () => {
        setNotifications([]);
    };


    const getIconByType = (type: NotificationType) => {
        switch (type) {
            case 'rejeitado':
                return <Error fontSize="small" color="error" />;
            case 'aprovado':
                return <CheckCircle fontSize="small" color="success" />;
            case 'alterado':
                return <Warning fontSize="small" color="warning" />;
            default:
                return <Info fontSize="small" color="info" />;
        }
    };

    // marca as que nao foram lidas
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Notificações">
                <IconButton
                    onClick={handleClick}
                    color="inherit"
                >
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
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
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
                            <Button
                            variant='outlined'
                                size="small"
                                endIcon={<DeleteSweep />}
                                color="error"
                                onClick={handleClearAll}
                                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                            >
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
                            sx={{
                                py: 2,
                                px: 2,
                                whiteSpace: 'normal',
                                alignItems: 'flex-start',
                                borderBottom: '1px solid #f0f0f0',
                                cursor: 'default',
                              
                                backgroundColor: item.read ? 'inherit' : 'var(--roxoMuitoFracoDashboard)',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: item.read ? '#f9f9f9' : 'var(--roxoFracoDashboard)'
                                }
                            }}
                        >
                            {/* icone */}
                            <ListItemIcon sx={{ minWidth: 35, mx: 1, display: 'flex', alignSelf: 'center' }}>
                                {getIconByType(item.type)}
                            </ListItemIcon>

                            {/* conteudinho */}
                            <ListItemText
                                sx={{ mr: 1, flex: 1 }}
                                primary={
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 'bold',
                                            lineHeight: 1.2,
                                            textDecoration: item.read ? 'line-through' : 'none', 
                                            color: item.read ? 'text.disabled' : 'text.primary',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                }
                                secondary={
                                    <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                                        <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-word', fontSize: '0.85rem', color: item.read ? 'text.disabled' : 'text.primary' }}>
                                            {item.desc}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {item.time}
                                        </Typography>
                                    </Box>
                                }
                            />

                            {/* Área de Ações */}
                            <Stack direction="row" spacing={0} alignItems="center" sx={{ alignSelf: 'center' }}>
                                {/* zoio - Marca como lida */}
                                <Tooltip title={item.read ? "Visto" : "Marcar como vista"}>
                                    <span>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMarkAsRead(item.id, e)}
                                            disabled={item.read}
                                            color="inherit"
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                    </span>
                                </Tooltip>

                                {/* lixeira - Deleta */}
                                <Tooltip title="Excluir notificação">
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleDelete(item.id, e)}
                                        color="error"
                                    >
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