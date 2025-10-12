// DEPOIS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // MUDANÇA 1
import NavbarEvent from "../../components/NavbarEvent/NavbarEvent";
import InfoEvent from "../../components/InfoEvent/InfoEvent";
import Footer from "../../components/Footer/Footer";
import api from '../../api/api';

const ViewEvent = () => {
  const { eventId } = useParams(); // MUDANÇA 2: Pega o ID da URL
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true); // MUDANÇA 3: Controle de loading

  useEffect(() => {
    document.title = "Evento";
    window.scrollTo(0, 0);

    if (!eventId) return; // Se não tiver ID, não faz nada

    const pegaEvento = async () => {
      try {
        const response = await api.get(`/event/${eventId}`); // MUDANÇA 4: Usa o eventId
        setEvento(response.data); // Salva apenas os dados
      } catch (error) {
        console.log('nao deu certo', error);
      } finally {
        setLoading(false); // Termina o carregamento
      }
    };

    pegaEvento();
  }, [eventId]); // MUDANÇA 5: Dependência correta

  // MUDANÇA 6: Proteção contra quebra do sistema
  if (loading) {
    return <div>Carregando...</div>; // Ou um componente de Spinner
  }

  if (!evento) {
    return <div>Evento não encontrado.</div>;
  }

  return (
    <>
      {/* MUDANÇA 7: Passa o objeto completo, é mais eficiente */}
      <NavbarEvent evento={evento} />
      <InfoEvent evento={evento} />
      <Footer />
    </>
  );
};

export default ViewEvent;