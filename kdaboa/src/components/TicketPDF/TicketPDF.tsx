import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import EventoProps from '../CardEventHome/props/EventoProps'; // Ajuste o caminho se necessário
import logo from '../../assets/logo.png'
// Define os tipos das props
interface TicketData {
  id: string; // ID único para o QR Code
}

interface TicketPDFProps {
  evento: EventoProps;
  ticketData: TicketData[]; // Um array com os dados de cada ingresso
  qrCodes?: string[] | undefined; // Array opcional de QR Codes em Data URL
}

// --- FUNÇÃO HELPER ---
// (Coloquei aqui para ficar mais simples)
function formatarCelular(numero: string | null | undefined): string {
  if (!numero) return '';
  return numero
    .replace(/\D/g, '') // remove tudo que não for dígito
    .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // aplica máscara
}

// --- ESTILOS ATUALIZADOS ---
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#F7F7F7', // Fundo da página
  },
  ticket: {
    border: '1px solid #E0E0E0',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  // --- CABEÇALHO ATUALIZADO ---
  header: {
    flexDirection: 'row',
    padding: 20,
    borderBottom: '1px solid #E0E0E0',
    alignItems: 'flex-start', // Alinha todos os filhos no topo
  },
  eventImage: {
    width: 200, // Aumentado de 80 para 100
    height: 100, // Aumentado de 80 para 100
    borderRadius: 5,
    marginRight: 20,
  },
  headerTextContainer: {
    flex: 1, // Ocupa o espaço restante
    paddingRight: 10, // Espaço para não colar na logo
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  // --- NOVOS ESTILOS PARA A LOGO ---
  brandingContainer: {
    flexDirection: 'row',    // Imagem e texto LADO A LADO
    alignItems: 'center',    // Alinha eles verticalmente
    justifyContent: 'flex-end', // Joga o bloco para a direita
    paddingLeft: 10,         // Espacinho para não colar
    marginBottom: 2,
  },
  kdaboaLogo: {
    width: 25, // Logo menor
    height: 25,
    marginRight: 5, // Espaço entre a logo e o texto
    objectFit: 'contain',
    
  },
  brandingTextContainer: {
    // Novo container para as duas linhas de texto
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha o texto à esquerda (relativo à logo)
  },
  brandingText: {
    fontSize: 7,
    color: '#999',
    // Removemos 'textAlign' e 'display'
  },
  // --- FIM DOS NOVOS ESTILOS ---
  body: {
    flexDirection: 'row',
    padding: 20,
  },
  qrContainer: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  qrCode: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  ticketId: {
    fontSize: 8,
    color: '#777',
    textAlign: 'center',
    wordBreak: 'break-all',
  },
  detailsContainer: {
    width: '60%',
    paddingLeft: 20,
    borderLeft: '1px dashed #CCC',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    color: '#555',
    marginBottom: 10,
    lineHeight: 1.4,
  },
  stub: {
    marginTop: 15,
    padding: 15,
    borderTop: '1px dashed #AAA',
  },
  stubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stubHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  stubText: {
    fontSize: 9,
    color: '#666',
    marginTop: 2,
  }
});


const TicketPDF = ({ evento, ticketData, qrCodes }: TicketPDFProps) => {

  // --- FORMATAÇÃO DE DADOS ---
  const dataInicio = new Date(evento?.data_inicio || '');
  const dataFormatada = dataInicio.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const horaFormatada = dataInicio.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }) + 'h';

  const local = `${evento?.Endereco?.logradouro || ''}, ${evento?.Endereco?.numero || ''} - ${evento?.Endereco?.bairro || ''}`;
  const cidade = `${evento?.Endereco?.cidade || ''}/${evento?.Endereco?.estado || ''}`;

  // URL da imagem do evento.
  // **IMPORTANTE**: O react-pdf PRECISA de uma URL absoluta.

  const imageUrl = `http://localhost:3000/event/image/${evento.foto.split('/').pop()}`;

  return (
    <Document>
      {ticketData.map((ticket, index) => (
        <Page size="A4" style={styles.page} key={ticket.id}>
          <View style={styles.brandingContainer}>
            {/* Esta linha agora usa a logo importada */}
            <Image style={styles.kdaboaLogo} src={logo} />
            <Text style={styles.brandingText}>Gerado por </Text>
            <Text style={styles.brandingText}>KDABOA</Text>
          </View>
          {/* --- O INGRESSO --- */}
          <View style={styles.ticket}>

            {/* === CABEÇALHO === */}
            <View style={styles.header}>
              <Image style={styles.eventImage} src={imageUrl} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.title}>{evento?.nome_evento || 'Nome do Evento'}</Text>
                <Text style={styles.subtitle}>{dataFormatada} às {horaFormatada}</Text>
                <Text style={styles.subtitle}>{local}</Text>
                <Text style={styles.subtitle}>{cidade}</Text>
              </View>

            </View>

            {/* === CORPO === */}
            <View style={styles.body}>
              {/* Coluna do QR Code */}
              <View style={styles.qrContainer}>
                <Image style={styles.qrCode} src={qrCodes?.[index]} />
                <Text style={styles.ticketId}>{ticket.id}</Text>
              </View>

              {/* Coluna de Detalhes */}
              <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Ingresso</Text>
                <Text style={styles.text}>1x Ingresso Padrão</Text>

                <Text style={styles.sectionTitle}>Organizador</Text>
                <Text style={styles.text}>{evento?.Estabelecimento?.nome || 'Estabelecimento'}</Text>

                {/* === INFORMAÇÕES DE CONTATO (NOVO) === */}
                <Text style={styles.sectionTitle}>Contato do Evento</Text>
                <Text style={styles.text}>{evento?.Estabelecimento?.Contato?.email || ''}</Text>
                <Text style={styles.text}>{formatarCelular(evento?.Estabelecimento?.Contato?.tel_cel_1)}</Text>
              </View>
            </View>
          </View>

          {/* === CANHOTO (STUB) === */}
          <View style={styles.stub}>
            <View style={styles.stubRow}>
              <Text style={styles.stubHeader}>{evento?.nome_evento || 'Evento'}</Text>
              <Text style={styles.stubHeader}>Ingresso {index + 1} de {ticketData.length}</Text>
            </View>
            <Text style={styles.stubText}>{dataFormatada} @ {horaFormatada}</Text>
            <Text style={styles.stubText}>{local}</Text>
          </View>

        </Page>
      ))}
    </Document>
  );
};

export default TicketPDF;