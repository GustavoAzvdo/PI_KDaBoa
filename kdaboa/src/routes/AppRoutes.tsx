import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../components/Forms/Login/Login'
import Signin from '../components/Forms/Signin/Signin'
import RecuperarSenha from '../components/Forms/RecuperarSenha/RecuperarSenha'
import AlterarSenha from '../components/Forms/AlterarSenha/AlterarSenha'
import SendEmail from '../components/SendEmail/SendEmail'
import Dashboard from '../components/Dashboard/Dashboard'
import DashboardFuncionario from '../components/DashboardFuncionario/DashboardFuncionario'
import Home from '../pages/Home/Home'
import SearchEvent from '../pages/SearchEvent/SearchEvent'
import Profile from '../pages/Profile/Profile'
import ViewEvent from '../pages/ViewEvent/ViewEvent'
import ProducerArea from '../pages/Produtor/Produtor'
import { LoadingProvider } from '../context/LoadingContext';
import { GlobalLoading } from '../components/GlobalLoading/GlobalLoading';
import { RouteListener } from '../components/GlobalLoading/RouterListener'
import ScreenErrorX from '../components/ScreenError/ScreenErrorX';

const AppRoutes = () => (

  <AuthProvider>
    <LoadingProvider>
      <GlobalLoading />
      <RouteListener />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/email-enviado" element={<SendEmail />} />
        <Route path="/search" element={<SearchEvent />} />
        <Route path="/view-event/:eventId" element={<ViewEvent />} />
        <Route path='/produtor' element={<ProducerArea />} />

        {/* facilitando a busca de eventos pela rota, apenas pelo id do evento */}
        <Route path="/view-event/:eventId/profile" element={<Profile />} />
        <Route path="/profile/:establishmentId" element={<Profile />} />
        <Route path="/view-event/:eventId/profile" element={<Profile />} />
        {/* gerente */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Gerente']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* funcionario */}
        <Route
          path="/dashboard_func"
          element={
            <ProtectedRoute allowedRoles={['Funcionario']}>
              <DashboardFuncionario />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<ScreenErrorX />} />
      </Routes>
    </LoadingProvider>
  </AuthProvider>
)

export default AppRoutes;