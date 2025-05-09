import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, Button } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined, Check, Clear } from '@mui/icons-material';

interface PasswordProps {
    onValidationChange: (isValid: boolean) => void; // Prop para informar o estado de validação
}

const Password: React.FC<PasswordProps> = ({ onValidationChange }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); // Estado para o campo "Confirme sua senha"
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show); // Alterna visibilidade do campo "Confirme sua senha"

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    // Verificação das condições da senha
    const conditions = [
        { label: 'Mínimo 8 caracteres;', valid: password.length >= 8 },
        { label: '1 caractere especial;', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
        { label: '1 caractere numérico;', valid: /\d/.test(password) },
        { label: '1 letra maiúscula;', valid: /[A-Z]/.test(password) },
        { label: '1 letra minúscula.', valid: /[a-z]/.test(password) },
    ];

    // Verifica se todas as condições são válidas e se as senhas coincidem
    const isPasswordValid = conditions.every((condition) => condition.valid);
    const isConfirmPasswordValid = password === confirmPassword;

    // Atualiza o estado de validação no componente pai
    useEffect(() => {
        onValidationChange(isPasswordValid && isConfirmPasswordValid);
    }, [isPasswordValid, isConfirmPasswordValid, onValidationChange]);

    return (
        <>
            <Box>
                <TextField
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    required
                    label="Senha"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    color="inherit"
                                    onClick={handleClickShowPassword}
                                    style={{
                                        minWidth: 0,
                                        padding: 0,
                                    }}
                                >
                                    {showPassword ? (
                                        <VisibilityOffOutlined className="icons" />
                                    ) : (
                                        <VisibilityOutlined className="icons" />
                                    )}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

         
            <Box className="password-checklist" sx={{ paddingLeft: 1 }}>
                {conditions.map((condition, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {condition.valid ? (
                            <Check sx={{ color: '#14ED23' }} />
                        ) : (
                            <Clear sx={{ color: '#FB6565' }} />
                        )}
                        <Typography
                            sx={{
                                color: condition.valid ? '#14ED23' : '#FB6565',
                                fontSize: '14px',
                            }}
                        >
                            {condition.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box>
                <TextField
                    fullWidth
                    margin="normal"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    label="Confirme sua senha"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    color="inherit"
                                    onClick={handleClickShowConfirmPassword} 
                                    style={{
                                        minWidth: 0,
                                        padding: 0,
                                    }}
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOffOutlined className="icons" />
                                    ) : (
                                        <VisibilityOutlined className="icons" />
                                    )}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </>
    );
};

export default Password;