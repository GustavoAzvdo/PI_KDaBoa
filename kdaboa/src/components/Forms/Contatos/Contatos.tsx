import { MailOutlineOutlined, PhoneOutlined } from '@mui/icons-material';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import api from '../../../api/api';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';

const Contatos = () => {
  const [telefone1, setTelefone1] = React.useState<string>('');
  const [telefone2, setTelefone2] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [hasContact, setHasContact] = React.useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'warning'>('success');

  // Valida telefone (11 dígitos só números)
  const isPhoneValid = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11;
  };

  // Valida email básico
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Função que checa se o formulário é válido (pra habilitar botão)
  const isFormValid = useMemo(() => {
    // Email precisa ser válido
    if (!isEmailValid(email)) return false;
    // Pelo menos telefone1 válido ou telefone2 válido
    if (!isPhoneValid(telefone1) && !isPhoneValid(telefone2)) return false;
    return true;
  }, [telefone1, telefone2, email]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11); // limita a 11 dígitos
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (m, p1, p2, p3) =>
        p2 ? `(${p1}) ${p2}${p3 ? '-' + p3 : ''}` : `(${p1}`
      );
    } else {
      return digits.replace(/(\d{2})(\d{0,5})(\d{0,4})/, (m, p1, p2, p3) =>
        p2 ? `(${p1}) ${p2}${p3 ? '-' + p3 : ''}` : `(${p1}`
      );
    }
  };

  const handlePhone1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatPhone(value);
    setTelefone1(formattedValue);
  };

  const handlePhone2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatPhone(value);
    setTelefone2(formattedValue);
  };

  const cleanPhone = (phone: string) => phone.replace(/\D/g, '');

  const handlePost = () => {
    api
      .post(
        '/gerente/contact',
        {
          tel_cel_1: cleanPhone(telefone1),
          tel_cel_2: cleanPhone(telefone2),
          email: email,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setSnackbarMessage('Contato salvo com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setIsEditMode(false);
        setHasContact(true);
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage('Erro ao salvar o contato. Tente novamente.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      });
  };

  const handleGetContact = async () => {
    try {
      const response: any = await api.get('/gerente/contact', { withCredentials: true });
      const { tel_cel_1, tel_cel_2, email } = response.data;
      if (tel_cel_1 || tel_cel_2 || email) {
        setHasContact(true);
        setIsEditMode(false);
      } else {
        setHasContact(false);
        setIsEditMode(true); // Se não tem contato, habilita edição direto
      }
      setTelefone1(formatPhone(tel_cel_1 || ''));
      setTelefone2(formatPhone(tel_cel_2 || ''));
      setEmail(email || '');
    } catch (error) {
      console.log(error);
      setHasContact(false);
      setSnackbarMessage('Erro ao carregar o contato. Tente novamente.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      setIsEditMode(true);
    }
  };

  const handlePut = () => {
    api
      .put(
        '/gerente/contact',
        {
          tel_cel_1: cleanPhone(telefone1),
          tel_cel_2: cleanPhone(telefone2),
          email: email,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setSnackbarMessage('Contato atualizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setIsEditMode(false);
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage('Erro ao atualizar o contato.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      });
  };

  useEffect(() => {
    handleGetContact();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          disabled={!isEditMode ? true : false}
          fullWidth
          variant="outlined"
          label="Telefone 1"
          value={telefone1}
          onChange={handlePhone1Change}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PhoneOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          disabled={!isEditMode ? true : false}
          fullWidth
          variant="outlined"
          label="Telefone 2"
          value={telefone2}
          onChange={handlePhone2Change}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PhoneOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          disabled={!isEditMode ? true : false}
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailOutlineOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!hasContact ? (
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: 'var(--roxo)' }}
              onClick={handlePost}
              disabled={!isFormValid}
            >
              <Typography sx={{ fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px' }}>
                Salvar Contato
              </Typography>
            </Button>
          ) : !isEditMode ? (
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: 'var(--roxo)' }}
              onClick={() => setIsEditMode(true)}
            >
              <Typography sx={{ fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px' }}>
                Editar Contato
              </Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: 'var(--roxo)' }}
              onClick={handlePut}
              disabled={!isFormValid}
            >
              <Typography sx={{ fontFamily: 'Noto Sans, sans-serif !important', fontSize: '18px' }}>
                Salvar Edição
              </Typography>
            </Button>
          )}
        </Box>
      </Grid>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Grid>
  );
};

export default Contatos;
