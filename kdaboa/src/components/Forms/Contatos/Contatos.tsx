import { MailOutlineOutlined, PhoneOutlined, ContactPhoneOutlined, EditOutlined, SaveOutlined } from '@mui/icons-material';
import { Box, Button, Grid, InputAdornment, TextField, Typography, Card, Divider } from '@mui/material';
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
      return digits.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_m, p1, p2, p3) =>
        p2 ? `(${p1}) ${p2}${p3 ? '-' + p3 : ''}` : `(${p1}`
      );
    } else {
      return digits.replace(/(\d{2})(\d{0,5})(\d{0,4})/, (_m, p1, p2, p3) =>
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
    <Box sx={{ p: 3 }}>
      {/* Header da seção */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h4" sx={{ 
            fontFamily: 'var(--notosans)', 
            fontWeight: '500',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <ContactPhoneOutlined sx={{ fontSize: 35, color: 'var(--roxo)' }} />
            Informações de Contato
          </Typography>
          
          {/* Status Badge */}
         
        </Box>
        
        <Typography variant="body1" sx={{ 
          color: 'text.secondary',
          fontFamily: 'var(--notosans)',
          lineHeight: 1.6
        }}>
          {hasContact 
            ? "Gerencie as informações de contato do seu estabelecimento"
            : "Adicione informações de contato para que os clientes possam entrar em contato"
          }
        </Typography>
      </Box>

      {/* Card Principal */}
      <Card elevation={2} sx={{ 
        p: 4, 
     
      }}>
        <Grid container spacing={3}>
          {/* Telefone Principal */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{
                fontFamily: 'var(--notosans)',
                fontWeight: '600',
                color: 'text.secondary',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <PhoneOutlined sx={{ fontSize: 16, color: 'var(--roxo)' }} />
                Telefone Principal *
              </Typography>
            </Box>
            <TextField
              disabled={!isEditMode}
              fullWidth
              variant="outlined"
              label="Telefone 1"
              value={telefone1}
              onChange={handlePhone1Change}
              helperText={telefone1 && !isPhoneValid(telefone1) ? "Telefone deve ter 11 dígitos" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneOutlined sx={{ 
                      color: !isEditMode ? '#ccc' : 'var(--roxo)',
                      transition: 'color 0.2s'
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Telefone Secundário */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{
                fontFamily: 'var(--notosans)',
                fontWeight: '600',
                color: '#555',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <PhoneOutlined sx={{ fontSize: 16, color: 'var(--roxo)' }} />
                Telefone Secundário
              </Typography>
            </Box>
            <TextField
              disabled={!isEditMode}
              fullWidth
              variant="outlined"
              label="Telefone 2"
              placeholder="(Opcional)"
              value={telefone2}
              onChange={handlePhone2Change}
              
              helperText={telefone2 && !isPhoneValid(telefone2) ? "Telefone deve ter 11 dígitos" : ""}
             
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneOutlined sx={{ 
                      color: !isEditMode ? '#ccc' : 'var(--roxo)',
                      transition: 'color 0.2s'
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{
                fontFamily: 'var(--notosans)',
                fontWeight: '600',
                color: '#555',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <MailOutlineOutlined sx={{ fontSize: 16, color: 'var(--roxo)' }} />
                Email *
              </Typography>
            </Box>
            <TextField
              disabled={!isEditMode}
              fullWidth
              variant="outlined"  
              label="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
           
              helperText={email && !isEmailValid(email) ? "Email inválido" : ""}
            
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutlineOutlined sx={{ 
                      color: !isEditMode ? '#ccc' : 'var(--roxo)',
                      transition: 'color 0.2s'
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Divider */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Informações de Validação */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'rgba(103, 58, 183, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(103, 58, 183, 0.1)',
              mb: 3
            }}>
              <Typography variant="body2" sx={{
                fontFamily: 'var(--notosans)',
                color: '#666',
                lineHeight: 1.6
              }}>
                <strong>Campos obrigatórios:</strong> Email válido e pelo menos um telefone com 11 dígitos.
                <br />
                <strong>Formato do telefone:</strong> (XX) XXXXX-XXXX
              </Typography>
            </Box>
          </Grid>

          {/* Botão de Ação */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              pt: 2
            }}>
              {!hasContact ? (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SaveOutlined />}
                  disabled={!isFormValid}
                  onClick={handlePost}
                  sx={{
                    width: { xs: '100%', sm: '100%', md: 'auto' },
                    minWidth: { md: 250 },
                    bgcolor: 'var(--roxoForteDashboard)',
                  
                
                    fontFamily: 'var(--notosans)',
                    fontWeight: '600',
                    fontSize: '16px',
                  
                    
                    '&:disabled': {
                      bgcolor: '#ccc',
                      boxShadow: 'none'
                    },
                    
                  }}
                >
                  Salvar Contato
                </Button>
              ) : !isEditMode ? (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<EditOutlined />}
                  onClick={() => setIsEditMode(true)}
                  sx={{
                    width: { xs: '100%', sm: '100%', md: 'auto' },
                    minWidth: { md: 250 },
                    bgcolor: 'var(--roxoForteDashboard)',
                   
                    
                    fontFamily: 'var(--notosans)',
                    fontWeight: '600',
                    fontSize: '16px',
                    
                  }}
                >
                  Editar Contato
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SaveOutlined />}
                  disabled={!isFormValid}
                  onClick={handlePut}
                  sx={{
                    width: { xs: '100%', sm: '100%', md: 'auto' },
                    minWidth: { md: 250 },
                    bgcolor: 'var(--roxoForteDashboard)',
                   
                 
                    fontFamily: 'var(--notosans)',
                    fontWeight: '600',
                    fontSize: '16px',
            
                  }}
                >
                  Salvar Alterações
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default Contatos;