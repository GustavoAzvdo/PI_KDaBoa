import { Box, Typography, Chip,  Grid, Card, CardContent, } from '@mui/material'
import { CheckCircle, Cancel, Schedule, Event, LocationOn, Person } from '@mui/icons-material'
import  { useState } from 'react'
import dayjs from 'dayjs'

interface EventoStatus {
  id_evento: number;
  nome_evento: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  status: 'aprovado' | 'reprovado' | 'em_analise';
  motivo_reprovacao?: string;
  estabelecimento: string;
  endereco: string;
  funcionario: string;
  data_criacao: string;
}

const Confirmacao = () => {
  
  const [eventos] = useState<EventoStatus[]>([
    {
      id_evento: 1,
      nome_evento: "Show de Rock na Praça",
      descricao: "Um evento incrível de rock com bandas locais",
      data_inicio: "2024-12-15T20:00:00",
      data_fim: "2024-12-15T23:00:00", 
      status: "aprovado",
      estabelecimento: "Bar do João",
      endereco: "Rua das Flores, 123 - Centro",
      funcionario: "Maria Silva",
      data_criacao: "2024-12-01T10:30:00"
    },
    {
      id_evento: 2,
      nome_evento: "Festival de Jazz",
      descricao: "Noite especial com grandes nomes do jazz brasileiro",
      data_inicio: "2024-12-20T19:00:00",
      data_fim: "2024-12-20T22:00:00", 
      status: "reprovado",
      motivo_reprovacao: "Documentação incompleta - falta alvará de funcionamento",
      estabelecimento: "Café Cultural",
      endereco: "Av. Paulista, 456 - Bela Vista",
      funcionario: "João Santos",
      data_criacao: "2024-12-02T14:20:00"
    },
    {
      id_evento: 3,
      nome_evento: "Noite de Samba",
      descricao: "Roda de samba com artistas locais",
      data_inicio: "2024-12-25T21:00:00",
      data_fim: "2024-12-26T02:00:00", 
      status: "em_analise",
      estabelecimento: "Boteco da Esquina",
      endereco: "Rua do Samba, 789 - Vila Madalena",
      funcionario: "Ana Costa",
      data_criacao: "2024-12-03T09:15:00"
    },
    {
      id_evento: 4,
      nome_evento: "Noite de Samba",
      descricao: "Roda de samba com artistas locais",
      data_inicio: "2024-12-25T21:00:00",
      data_fim: "2024-12-26T02:00:00", 
      status: "em_analise",
      estabelecimento: "Boteco da Esquina",
      endereco: "Rua do Samba, 789 - Vila Madalena",
      funcionario: "Ana Costa",
      data_criacao: "2024-12-03T09:15:00"
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'aprovado':
        return {
          color: 'success' as const,
          icon: <CheckCircle />,
          label: 'Aprovado',
          bgColor: '#e8f5e8'
        };
      case 'reprovado':
        return {
          color: 'error' as const,
          icon: <Cancel />,
          label: 'Reprovado',
          bgColor: '#ffeaea'
        };
      case 'em_analise':
        return {
          color: 'warning' as const,
          icon: <Schedule />,
          label: 'Em Análise',
          bgColor: '#fff8e1'
        };
      default:
        return {
          color: 'default' as const,
          icon: <Schedule />,
          label: 'Desconhecido',
          bgColor: '#f5f5f5'
        };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      
      <Grid container spacing={3} sx={{fontFamily: 'var(--notosans)'}}>
        {eventos.map((evento) => {
          const statusInfo = getStatusInfo(evento.status);
          
          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={evento.id_evento}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header do card com status */}
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: statusInfo.bgColor,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    #{evento.id_evento}
                  </Typography>
                  <Chip
                    icon={statusInfo.icon}
                    label={statusInfo.label}
                    color={statusInfo.color}
                    size="small"
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Nome do evento */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Event sx={{ mr: 1, color: '#6515d5' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {evento.nome_evento}
                    </Typography>
                  </Box>

                  {/* Descrição */}
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {evento.descricao}
                  </Typography>

                  {/* Data */}
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Data:</strong> {dayjs(evento.data_inicio).format('DD/MM/YYYY HH:mm')}
                  </Typography>

                  {/* Estabelecimento */}
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Local:</strong> {evento.estabelecimento}
                  </Typography>

                  {/* Endereço */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <LocationOn sx={{ mr: 1, color: '#6515d5', fontSize: 16, mt: 0.2 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      {evento.endereco}
                    </Typography>
                  </Box>

                  {/* Funcionário */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 1, color: '#6515d5', fontSize: 16 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      {evento.funcionario}
                    </Typography>
                  </Box>

                  {/* Motivo de reprovação */}
                  {evento.status === 'reprovado' && evento.motivo_reprovacao && (
                    <Box sx={{ 
                      p: 1.5, 
                      backgroundColor: '#ffeaea', 
                      borderRadius: 1,
                      border: '1px solid #ffcdd2',
                      mt: 2
                    }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'error.main', display: 'block' }}>
                        Motivo da Reprovação:
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'error.main' }}>
                        {evento.motivo_reprovacao}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

               
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}

export default Confirmacao