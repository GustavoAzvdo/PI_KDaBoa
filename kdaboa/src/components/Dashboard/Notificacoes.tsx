import React, { useState } from 'react';
import {
    Box, IconButton, Badge, Tooltip, Menu, MenuItem,
    Typography, ListItemText, ListItemIcon, Divider, Stack
} from '@mui/material';
import {
    Notifications,
    Visibility, 
    CheckCircle, 
 
    Info, 
    Campaign,
    Warning
} from '@mui/icons-material';
import { Account } from '@toolpad/core/Account';


type NotificationType =  'postado' | 'alterado' | 'info';

interface NotificationItem {
    id: number;
    type: NotificationType;
    title: string;
    desc: string;
    time: string;
}


const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        type: 'postado',
        title: 'Evento "Festa Junina" criado',
        desc: 'O evento foi criado, aguardando aprovação.',
        time: '5 min atrás'
    },
    {
        id: 2,
        type: 'alterado',
        title: 'Alteração no "Rock in Rio"',
        desc: 'O horário do evento foi modificado pelo gerente.',
        time: '2 horas atrás'
    },

];

export function Notificacoes() {
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
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

   
    const getIconByType = (type: NotificationType) => {
        switch (type) {
            case 'postado':
                return <CheckCircle fontSize="small" color="success" />;
            case 'alterado':
                return <Warning fontSize="small" color="warning" />;
            default:
                return <Info fontSize="small" color="info" />;
        }
    };

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Notificações">
                <IconButton
                    onClick={handleClick}
                    color="inherit"
                >
                    <Badge badgeContent={notifications.length} color={'error'} max={10}>
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
                            width: 400, // Um pouco mais largo para caber o botão
                            height: 'auto',
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
                        <Campaign fontSize='small' color='inherit'/>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                        {notifications.length} pendentes
                    </Typography>
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
                            // se quise sumi com a porra da notificacao descomnete a funcao abaixo
                            // onClick={handleClose} 
                            sx={{
                                py: 2,
                                px: 2,
                                whiteSpace: 'normal',
                                alignItems: 'flex-start',
                                borderBottom: '1px solid #f0f0f0',
                                cursor: 'default', 
                                '&:hover': { backgroundColor: '#f9f9f9' }
                            }}
                        >
                            {/* icone */}
                            <ListItemIcon sx={{ minWidth: 35, mx: 1, display: 'flex', alignSelf: 'center' }}>
                                {getIconByType(item.type)}
                            </ListItemIcon>

                            {/* conteudinho */}
                            <ListItemText
                                sx={{ mr: 1 }}
                                primary={
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                        {item.title}
                                    </Typography>
                                }
                                secondary={
                                    <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                                        <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-word' }}>
                                            {item.desc}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {item.time}
                                        </Typography>
                                    </Box>
                                }
                            />

                            {/* zoio */}
                            <Tooltip title="Ver notificação" arrow>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    size="small"
                                    onClick={(e) => handleMarkAsRead(item.id, e)}
                                    sx={{
                                        display: 'inline-flex',
                                        alignSelf: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                    ))
                )}
            </Menu>

            <Divider orientation="vertical" flexItem variant="middle" sx={{ mx: 1 }} />
            <Account />
        </Stack>
    );
}