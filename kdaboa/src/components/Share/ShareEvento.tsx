"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,

} from "@mui/material"
import {
  Share as ShareIcon,
  WhatsApp as WhatsAppIcon,
  ContentCopy as CopyIcon,
  Close as CloseIcon,
  Event,
} from "@mui/icons-material"
import { useState } from "react"
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar"

interface ShareEventDialogProps {
  open: boolean
  onClose: () => void
  eventUrl: string
  eventTitle: string
  whatsMessage: string
}

export default function ShareEvento({
  open,
  onClose,
  eventUrl,
  eventTitle,
  whatsMessage,
}: ShareEventDialogProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl)
      setSnackbarMessage("URL copiada para a área de transferência!")
      setSnackbarOpen(true)
    } catch {
      setSnackbarMessage("Erro ao copiar URL")
      setSnackbarOpen(true)
    }
  }

  const handleWhatsAppShare = () => {
    console.log("Mensagem enviada pro zap:", whatsMessage);

    const message = whatsMessage
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank")

  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          text: `${whatsMessage}\n🔗 ${eventUrl}`,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setSnackbarMessage("Erro ao compartilhar")
          setSnackbarOpen(true)
        }
      }
    } else {
      setSnackbarMessage("Compartilhamento não suportado neste navegador")
      setSnackbarOpen(true)
    }
  }



  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 3,display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
            <Typography sx={{ fontSize: '22px', fontFamily: 'var(--notosans)' }}>Compartilhar Evento</Typography>
            <Event sx={{color: 'text.secondary'}}/>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ fontFamily: 'var(--notosans)' }}>
          <Box sx={{ py: 1 }}>
            <TextField
              fullWidth
              disabled
              label="URL do Evento"
              value={eventUrl}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyUrl}>
                    <CopyIcon fontSize="small" />
                  </IconButton>
                ),
              }}
              sx={{ fontFamily: 'var(--notosans)' }}
            />
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ pt: 2,fontFamily: 'var(--notosans)' }}>
            Escolha como compartilhar:
          </Typography>

          <Box sx={{ py: 1, display: "flex", gap: 2, flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
            <Button

              variant="outlined"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppShare}
              fullWidth
              sx={{
                color: "#276321",
                borderColor: "#276321",
                "&:hover": { borderColor: "#128C7E" },
                fontFamily: 'var(--notosans)',

              }}
            >
              Compartilhar no WhatsApp
            </Button>

            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={handleWebShare}
              fullWidth
              sx={{
                color: "#6c15d5",
                borderColor: "#6c15d5",
                "&:hover": { borderColor: "#6c15d5" },
                fontFamily: 'var(--notosans)'
              }}
            >
              Compartilhar
            </Button>
          </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} sx={{ borderColor: '#6c16d5', fontFamily: 'var(--notosans)', fontSize: '16px', color: '#6c15d5' }}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={'success'}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  )
}
