import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppProvider, Navigation, Router, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import logo from '../../assets/logo.png';
import './Dashboard.css'
import { Celebration, Verified, NewReleases, Face, House, Map, Call, Group, Settings, EditCalendar, Collections, Person, Home, ExitToApp } from '@mui/icons-material';
import Endereco from '../Forms/Endereco/Endereco';
import Estabelecimento from '../Forms/Estabelecimento/Estabelecimento';
import CriarEvento from '../Forms/CriarEvento/CriarEvento';
import Contatos from '../Forms/Contatos/Contatos';
import Galeria from '../Forms/Galeria/Galeria';
import InfoPessoal from '../Forms/InfoPessoal/InfoPessoal';
import EventosPostados from '../Forms/EventosPostados/EventosPostados';
import ScreenDash from '../ScreenDash/ScreenDash';
import ScreenError from '../ScreenError/ScreenError';
import { User } from './User.props';
import api from '../../api/api';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import BoasVindasGerente from '../BoasVindas/BoasVindas';
import { useTheme } from '@mui/material/styles';
import CriarFuncionario from '../Forms/CriarFuncionario/CriarFuncionario';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EventosCriados from '../Forms/EventosCriados/EventosCriados';
import { Notificacoes } from './Notificacoes'

// Router atualizado para suportar query params e state (Igual ao do Funcionário)
function useDemoRouter(initialPath: string): any {
  const [pathname, setPathname] = React.useState(initialPath);
  const [routerState, setRouterState] = React.useState<any>(null);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      locationState: routerState,
      navigate: (path: string | URL, state?: any) => {
        setPathname(String(path));

        if (state) {
          setRouterState(state);
        } else {
          setRouterState(null);
        }
      },
    };
  }, [pathname, routerState]);

  return router;
}


export default function DashboardLayoutBasic(props: any) {
  const n = useNavigate()
  const theme = useTheme()
  const [eventoTitle, setEventoTitle] = useState<string>('Criar evento');
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Dashboard'
  })

  const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: 'Opções',
    },
    {
      segment: 'dashboard',
      title: 'Dados pessoais',
      icon: <Face />,
      children: [
        {
          segment: 'inicio',
          title: 'Inicio',
          icon: <Home />,
        },
        {
          segment: 'estabelecimento',
          title: 'Estabelecimento',
          icon: <House />,
        },
        {
          segment: 'endereco',
          title: 'Endereço',
          icon: <Map />,
        },
        {
          segment: 'contato',
          title: 'Contatos',
          icon: <Call />,
        },
        {
          segment: 'galeria',
          title: 'Galeria',
          icon: <Collections />,
        },
        {
          segment: 'info',
          title: 'Informações cadastrais',
          icon: <Person />,
        },
      ],

    },
    {
      segment: 'funcionarios',
      title: 'Funcionários',
      icon: <Group />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Informações',
    },
    {
      segment: 'eventos',
      title: 'Eventos',
      icon: <Celebration />,
      children: [
        {
          segment: 'criar_evento',
          title: eventoTitle,
          icon: <EditCalendar />,
        },
        {
          segment: 'postados',
          title: 'Eventos postados',
          icon: <Verified />,
        },
        {
          segment: 'em_analise',
          title: 'Em análise',
          icon: <NewReleases />,
        },
      ],
    },
    {
      segment: 'configuracoes',
      title: 'Configurações',
      icon: <Settings />,
    },
    {
      kind: 'divider',
    },


    {
      segment: 'home',
      title: 'Voltar à Home',
      icon: <ExitToApp />,
    },
  ];

  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const demoWindow = window ? window() : undefined;


  const [user, setUser] = React.useState<User | null>(null)
  const { logout } = useAuth()
  const [session, setSession] = React.useState<Session | null>(null);


  React.useEffect(() => {
    api.get<User>('/auth/dados', { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setUser(res.data);
        setSession({

          user: {
            email: res.data.email,
            image: res.data.foto

          },
        });
      })
      .catch(_err => {
        console.error('Não autenticado');
        window.location.href = '/';
      });
  }, [])



  const authentication = React.useMemo(() => {
    return {

      signIn: () => {
        const email = window?.prompt('Digite seu e-mail:') || 'user@example.com';
        setSession({
          user: {
            email: user?.email,

          },
        });
        localStorage.setItem('userEmail', email);
        // salva para próximos reloads
      },

      signOut: () => {
        setOpenDialog(true);

      },
    };
  }, [router]);


  function renderContent(pathname: string, router: Router) {
    const cleanPath = pathname.split('?')[0];

    switch (cleanPath) {
      case '/dashboard/inicio':
        return (
          <BoasVindasGerente nome={user?.nome} router={router} />
        );
      case '/dashboard':
        return (
          <BoasVindasGerente nome={user?.nome} router={router} />
        );
      case '/dashboard/info':
        return (
          <InfoPessoal />
        );
      case '/dashboard/estabelecimento':
        return (
          <Estabelecimento />
        );
      case '/dashboard/endereco':
        return (
          <Endereco disabledComponents={false} />
        );
      case '/dashboard/contato':
        return (
          <Contatos />
        );
      case '/dashboard/galeria':
        return (
          <Galeria />
        );
      case '/funcionarios':
        return (
          <CriarFuncionario />
        );
      case '/eventos/criar_evento':
        return (
          <CriarEvento setEventoTitle={setEventoTitle} />
        );
      case '/eventos/postados':
        return (
          <EventosPostados router={router} />
        );
      case '/eventos/em_analise':
        return (
          <EventosCriados />
        );
      case '/configuracoes':
        return (
          <ScreenDash />
        );
      case '/home':
        n('/');
        return null;
      default:
        return (
          <ScreenError />
        );
    }

  }


  return (
    <AppProvider
      session={session}
      authentication={authentication}
      branding={{
        logo: <img src={logo} alt="Logo" style={{ pointerEvents: 'none', cursor: 'none' }} />,
        title: 'Area do Gerente',

      }}

      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={demoWindow}
    >

      <DashboardLayout
        slots={{
          toolbarActions: () => <Notificacoes router={router} />,
        }}
      >
        <PageContainer>
          {renderContent(router.pathname, router)}
        </PageContainer>
      </DashboardLayout>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Deseja realmente sair?</DialogTitle>
        <DialogActions>
          <Button sx={{ color: 'var(--roxoForteDashboard)' }} onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button color="primary"
            variant='contained'
            onClick={() => {
              logout()
              setSession(null);
            }}
            sx={{ backgroundColor: 'var(--roxoForteDashboard)', color: 'white', textDecoration: 'none', '&:hover': { backgroundColor: 'var(--roxoForteDashboard)' } }}
            href="/login"
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </AppProvider>
  );
}