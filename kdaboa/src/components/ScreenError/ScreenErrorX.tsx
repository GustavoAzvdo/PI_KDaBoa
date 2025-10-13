import { Box, Container, Typography, Button, List, ListItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'

import erro from '../../assets/erro.png'

interface ScreenErrorProps {
    errorCode?: string | number;
    errorMessage?: string;
    showHomeButton?: boolean;
    variant?: 'page' | 'event' | 'profile';
    causes?: string[];
}

const ScreenErrorX = ({ 
    errorCode = "404", 
    errorMessage = "Página não encontrada", 
    showHomeButton = true,
    variant = 'page',
    causes = []
}: ScreenErrorProps) => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    // Configurações para evento não disponível
    const eventConfig = {
        title: "Evento não disponível",
        description: "Este evento pode não estar mais disponível.",
        defaultCauses: [
            "O evento ainda não foi publicado;",
            "O evento foi cancelado ou removido;",
            "Problemas de conexão ou filtragem por categoria."
        ]
    };

    // Configurações para perfil não disponível
    const profileConfig = {
        title: "Perfil não encontrado",
        description: "Este perfil pode ter sido removido ou não existe.",
        defaultCauses: [
            "O perfil foi excluído pelo proprietário;",
            "O estabelecimento foi removido da plataforma;",
            "Link inválido ou problemas de conexão."
        ]
    };

    const isEventVariant = variant === 'event';
    const isProfileVariant = variant === 'profile';
    
    let config;
    if (isEventVariant) {
        config = eventConfig;
    } else if (isProfileVariant) {
        config = profileConfig;
    } else {
        config = null;
    }

    const displayCauses = causes.length > 0 ? causes : (config ? config.defaultCauses : []);

    return (
        <Container maxWidth="sm">
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: (isEventVariant || isProfileVariant) ? '60vh' : '100vh',
                textAlign: 'center',
                py: 4,
                gap: 3
            }}>
                {/* Imagem no topo - maior */}
                <Box sx={{ 
                    height: { xs: 150, md: 180 }, 
                    width: { xs: 150, md: 200 }
                }}>
                    <img 
                        src={erro} 
                        alt={isEventVariant ? "sad" : isProfileVariant ? "perfil não encontrado" : `Erro ${errorCode}`}
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                        }} 
                    />
                </Box>

                {/* Código do erro (apenas para variant page) */}
                {!isEventVariant && !isProfileVariant && (
                    <Typography 
                        variant="h1" 
                        sx={{
                            fontFamily: 'var(--notosans)',
                            fontSize: { xs: '3rem', md: '4rem' },
                            fontWeight: 700,
                            color: 'primary.main'
                        }}
                    >
                        {errorCode}
                    </Typography>
                )}

                {/* Título principal */}
                <Typography 
                    variant="h3" 
                    sx={{
                        fontFamily: 'var(--fredoka)',
                        fontWeight: 500,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        color: 'text.primary'
                    }}
                >
                    {config ? config.title : "Ops, algo deu errado!"}
                </Typography>
                
                {/* Descrição */}
                <Typography 
                    variant="body1" 
                    sx={{
                        fontFamily: 'var(--notosans)',
                        fontSize: '1rem',
                        color: 'text.secondary',
                        maxWidth: 400,
                        mx: 'auto'
                    }}
                >
                    {config ? config.description : 
                     `${errorMessage}. A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.`}
                </Typography>

                {/* Lista de possíveis causas */}
               {displayCauses.length > 0 && (
                    <Box>
                        <Typography 
                            variant="h6" 
                            sx={{
                                fontFamily: 'var(--fredoka)',
                                color: 'text.secondary', 
                                fontSize: '22px',
                                mb: 1
                            }}
                        >
                            Possíveis causas:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <List sx={{ 
                                maxWidth: 400, 
                                fontFamily: 'var(--notosans)', 
                                color: 'text.secondary', 
                                fontSize: '18px',
                                py: 0,
                                listStyleType: 'disc',
                                pl: 2
                            }}>
                                {displayCauses.map((cause, index) => (
                                    <ListItem 
                                        key={index} 
                                        sx={{ 
                                            py: 0.5,
                                            display: 'list-item',
                                            listStyleType: 'disc',
                                            listStylePosition: 'inside'
                                        }}
                                    >
                                        {cause}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}


                {/* Botão Home */}
                {showHomeButton && (
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon />}
                        onClick={handleGoHome}
                        sx={{
                            fontFamily: 'var(--notosans)',
                            fontWeight: 500,
                           
                        }}
                    >
                        Voltar para Home
                    </Button>
                )}
            </Box>
        </Container>
    )
}

export default ScreenErrorX