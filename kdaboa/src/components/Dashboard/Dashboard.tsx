import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import { AppProvider, Navigation, Router, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import logo from '../../assets/logo.png';
import cdg from '../../assets/cdg.jpg';
import './Dashboard.css'
import { Celebration, Verified, NewReleases, Face, House, Map, Call, Group, Settings , EditCalendar} from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import Endereco from '../Forms/Endereco/Endereco';
import Estabelecimento from '../Forms/Estabelecimento/Estabelecimento';
import CriarEvento from '../Forms/CriarEvento/CriarEvento';

import { User } from './User.props';

const [user, setUser] = React.useState<User | null>(null)

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
        title: 'Criar Evento',
        icon: <EditCalendar />,
      },
      {
        segment: 'postados',
        title: 'Postados',
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
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => {
        setPathname(String(path));
      },
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

React.useEffect(() => {
    axios.get<User>('http://localhost:3000/me', { withCredentials: true })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error('Não autenticado');
      window.location.href = '/login';
    });
}, [])

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  const [session, setSession] = React.useState<Session | null>(() => {
    const saved = localStorage.getItem('session');
    if (saved && saved !== 'undefined') {
      try {
        return JSON.parse(saved);
      } catch {
        // Se der erro no parse, limpa o localStorage
        localStorage.removeItem('session');
        return null;
      }
    }

    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      return {
        user: {
          email: userEmail,
          image: cdg,
        },
      };
    }
    return null;
  });

  // Sempre que o session mudar, salva no localStorage
  React.useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
    } else {
      localStorage.removeItem('session');
    }
  }, [session]);

  const authentication = React.useMemo(() => {
    return {

      signIn: () => {
        const email = window?.prompt('Digite seu e-mail:') || 'user@example.com';
        setSession({
          user: {
            email,
            image: cdg,
          },
        });
        localStorage.setItem('userEmail', email);
        // salva para próximos reloads
      },

      signOut: () => {
        setSession(null);
        router.navigate('/login');
      },
    };
  }, [router]);

  function renderContent(pathname: string) {
    switch (pathname) {
      case '/dashboard':
        return <Skeleton height={400} />;
      case '/dashboard/estabelecimento':
        return (
          <Estabelecimento/>
        );
      case '/dashboard/endereco':
        return (
          <Endereco/>
        );
      case '/dashboard/contato':
        return <Skeleton height={400} />;
      case '/funcionarios':
        return <Skeleton height={400} />;
      case '/eventos/criar_evento':
        return (
          <CriarEvento/>
        );
      case '/eventos/postados':
        return <Skeleton height={400} />;
      case '/eventos/em_analise':
        return <Skeleton height={400} />;
      case '/configuracoes':
        return <Skeleton height={400} />;
      default:
        return <Box>404 - Página não encontrada</Box>;
    }

  }


  return (
    <AppProvider
      session={session}
      authentication={authentication}
      branding={{
        logo: <img src={logo} alt="Logo" />,
        title: 'Area do Gerente',
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {renderContent(router.pathname)}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}