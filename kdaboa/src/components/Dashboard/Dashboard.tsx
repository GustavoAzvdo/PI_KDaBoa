import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

import Grid from '@mui/material/Grid';
import logo from '../../assets/logo.png';
import cdg from '../../assets/cdg.jpg';
import './Dashboard.css'
import { Celebration, Verified, NewReleases, Face, House, Map, Call, Group, Settings } from '@mui/icons-material';
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
    segment: 'reports',
    title: 'Eventos',
    icon: <Celebration />,
    children: [
      {
        segment: 'sales',
        title: 'Postados',
        icon: <Verified />,
      },
      {
        segment: 'traffic',
        title: 'Em análise',
        icon: <NewReleases />,
      },
    ],
  },
  {
    segment: 'integrations',
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
        window.location.href = String(path); // <-- Redireciona de verdade!
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

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'CDG BEER GARDEN',
      email: 'cdg@gmail.com',
      image: cdg,
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'CDG BEER GARDEN',
            email: 'cdg@gmail.com',
            image: cdg,
          },
        });
      },
      signOut: () => {
        setSession(null);
        router.navigate('/login')
      },
    };
  }, []);
   if (!session) {
    return null;
    // Ou, se quiser, retorne <LoginComponent />
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
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}