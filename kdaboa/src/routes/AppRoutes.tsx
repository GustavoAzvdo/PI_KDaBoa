// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Forms/Login/Login'
import Signin from '../components/Forms/Signin/Signin'
import RecuperarSenha from '../components/Forms/RecuperarSenha/RecuperarSenha'
import AlterarSenha from '../components/Forms/AlterarSenha/AlterarSenha'
import SendEmail from '../components/SendEmail/SendEmail'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../pages/Home/Home'
import SearchEvent from '../pages/SearchEvent/SearchEvent'
import Profile from '../pages/Profile/Profile'
import ViewEvent from '../pages/ViewEvent/ViewEvent'

const AppRoutes = () => (

  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    <Route path="/alterar-senha" element={<AlterarSenha />} />
    <Route path="/email-enviado" element={<SendEmail />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<SearchEvent />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/view-event" element={<ViewEvent />} /> 
  
  </Routes>
)

export default AppRoutes