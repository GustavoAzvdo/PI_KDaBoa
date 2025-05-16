// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Forms/Login/Login'
import Signin from '../components/Forms/Signin/Signin'
import RecuperarSenha from '../components/Forms/RecuperarSenha/RecuperarSenha'
import AlterarSenha from '../components/Forms/AlterarSenha/AlterarSenha'
import SendEmail from '../components/SendEmail/SendEmail'
import ScreenDash from '../components/ScreenDash/ScreenDash'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    <Route path="/alterar-senha" element={<AlterarSenha />} />
    <Route path="/email-enviado" element={<SendEmail />} />
    <Route path="/dashboard" element={<ScreenDash />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

export default AppRoutes