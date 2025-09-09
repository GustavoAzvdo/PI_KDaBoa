import { Box, CircularProgress } from '@mui/material';
import { useLoading } from '../../context/LoadingContext';

export const GlobalLoading = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={80} sx={{color: '#6c15d5'}}/>
    </Box>
  );
};
