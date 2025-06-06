import { Snackbar, Alert } from '@mui/material';

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity?: 'success' | 'warning' | 'error' | 'info';
    onClose: () => void;
    autoHideDuration?: number;
}

const CustomSnackbar = ({
    open,
    message,
    severity = 'success',
    onClose,
    autoHideDuration = 4000,
}: CustomSnackbarProps) => (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
            onClose={onClose}
            severity={severity}
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                fontSize: '20px',
                fontFamily: "'Noto Sans', sans-serif",
                '& .MuiAlert-icon': { fontSize: '30px' },
                '& .MuiAlert-action .MuiIconButton-root:hover': {
                    backgroundColor: '#e0e0e0 !important',
                    color: '#222 !important',
                },
            }}
        >
            {message}
        </Alert>
    </Snackbar>
);

export default CustomSnackbar;