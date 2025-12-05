"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import "./BrazilMap.css"

// Interface para os dados do estabelecimento
interface Establishment {
  id: string
  name: string
  city: string
  state: string
  stateCode: string
  coordinates: { x: number; y: number }
}

// Coordenadas aproximadas dos centroides dos estados (em % do SVG)
const stateCentroids: Record<string, { x: number; y: number; name: string }> = {
  AC: { x: 138, y: 360, name: "Acre" },
  AM: { x: 173, y: 285, name: "Amazonas" },
  RR: { x: 210, y: 145, name: "Roraima" },
  PA: { x: 275, y: 250, name: "Pará" },
  AP: { x: 280, y: 165, name: "Amapá" },
  RO: { x: 230, y: 390, name: "Rondônia" },
  MT: { x: 310, y: 420, name: "Mato Grosso" },
  TO: { x: 335, y: 365, name: "Tocantins" },
  MA: { x: 365, y: 255, name: "Maranhão" },
  PI: { x: 375, y: 310, name: "Piauí" },
  CE: { x: 430, y: 270, name: "Ceará" },
  RN: { x: 470, y: 275, name: "Rio Grande do Norte" },
  PB: { x: 470, y: 305, name: "Paraíba" },
  PE: { x: 460, y: 325, name: "Pernambuco" },
  AL: { x: 485, y: 350, name: "Alagoas" },
  SE: { x: 495, y: 345, name: "Sergipe" },
  BA: { x: 460, y: 385, name: "Bahia" },
  MG: { x: 485, y: 520, name: "Minas Gerais" },
  ES: { x: 550, y: 560, name: "Espírito Santo" },
  RJ: { x: 525, y: 600, name: "Rio de Janeiro" },
  SP: { x: 500, y: 620, name: "São Paulo" },
  PR: { x: 485, y: 690, name: "Paraná" },
  SC: { x: 500, y: 735, name: "Santa Catarina" },
  RS: { x: 480, y: 805, name: "Rio Grande do Sul" },
  GO: { x: 400, y: 480, name: "Goiás" },
  DF: { x: 390, y: 485, name: "Distrito Federal" },
  MS: { x: 390, y: 590, name: "Mato Grosso do Sul" },
}

// Coordenadas dos estados no SVG real do Brasil
const stateSVGPaths: Record<string, string> = {
  AC: "M 130,340 L 125,350 L 120,360 L 125,370 L 135,375 L 145,370 L 150,360 L 145,350 Z",
  AM: "M 160,250 L 140,260 L 130,280 L 135,300 L 150,320 L 180,330 L 210,320 L 230,300 L 230,270 L 210,250 Z",
  RR: "M 200,100 L 190,120 L 185,140 L 195,160 L 215,165 L 235,160 L 240,140 L 230,120 Z",
  PA: "M 240,200 L 220,220 L 220,250 L 240,280 L 270,290 L 310,280 L 340,260 L 340,230 L 320,210 Z",
  AP: "M 270,130 L 260,150 L 265,170 L 280,180 L 295,175 L 300,160 L 295,140 Z",
  TO: "M 320,320 L 310,340 L 310,370 L 320,400 L 340,410 L 360,400 L 365,370 L 360,340 Z",
  MA: "M 340,210 L 330,230 L 335,260 L 355,280 L 380,285 L 400,275 L 405,250 L 395,220 Z",
  PI: "M 360,280 L 355,305 L 360,330 L 380,340 L 395,335 L 400,310 L 395,285 Z",
  CE: "M 405,240 L 400,265 L 410,280 L 430,285 L 450,280 L 455,265 L 450,245 Z",
  RN: "M 455,255 L 450,270 L 455,285 L 470,290 L 485,285 L 490,270 L 485,260 Z",
  PB: "M 460,285 L 455,300 L 460,310 L 475,315 L 485,310 L 485,295 Z",
  PE: "M 450,290 L 440,310 L 445,330 L 465,340 L 480,335 L 485,320 L 480,305 Z",
  AL: "M 475,330 L 470,345 L 475,360 L 490,365 L 500,360 L 500,345 Z",
  SE: "M 485,325 L 480,340 L 485,350 L 495,352 L 502,347 L 500,335 Z",
  BA: "M 430,310 L 410,340 L 410,390 L 425,430 L 450,450 L 480,450 L 495,430 L 500,390 L 490,350 L 470,320 Z",
  MG: "M 450,460 L 430,490 L 430,530 L 450,565 L 485,580 L 520,575 L 540,555 L 540,520 L 525,490 L 500,470 Z",
  ES: "M 540,540 L 535,555 L 540,570 L 555,575 L 565,565 L 565,550 Z",
  RJ: "M 515,575 L 505,590 L 510,605 L 530,610 L 545,600 L 545,585 Z",
  SP: "M 470,580 L 450,605 L 455,630 L 475,650 L 505,655 L 530,645 L 540,625 L 535,600 L 515,585 Z",
  PR: "M 460,650 L 445,670 L 450,695 L 475,710 L 505,710 L 525,695 L 525,675 Z",
  SC: "M 480,715 L 470,730 L 475,745 L 495,755 L 520,750 L 530,735 L 525,720 Z",
  RS: "M 450,750 L 435,780 L 440,820 L 465,850 L 495,855 L 520,840 L 525,810 L 515,775 L 495,760 Z",
  MS: "M 370,520 L 355,555 L 360,600 L 380,635 L 410,650 L 440,645 L 455,620 L 455,580 L 440,545 Z",
  MT: "M 280,330 L 260,360 L 260,410 L 275,460 L 305,500 L 345,515 L 375,510 L 390,480 L 390,430 L 370,380 L 340,350 Z",
  GO: "M 360,420 L 350,450 L 355,490 L 380,520 L 415,530 L 440,520 L 445,490 L 435,455 L 410,430 Z",
  DF: "M 385,475 L 380,485 L 385,495 L 395,497 L 400,490 L 398,480 Z",
  RO: "M 210,350 L 200,370 L 205,400 L 225,420 L 245,420 L 260,405 L 260,380 Z",
}

// Função para gerar dados fictícios
const generateMockData = (): Establishment[] => {
  const establishments: Establishment[] = []
  let id = 1

  // São Paulo - 19 estabelecimentos
  const spCities = ["São Paulo", "Campinas", "Santos", "Ribeirão Preto", "Sorocaba"]
  for (let i = 0; i < 19; i++) {
    establishments.push({
      id: `est-${id++}`,
      name: `KDABOA ${spCities[i % spCities.length]} ${Math.floor(i / spCities.length) + 1}`,
      city: spCities[i % spCities.length],
      state: "São Paulo",
      stateCode: "SP",
      coordinates: {
        x: 57 + (Math.random() - 0.5) * 4,
        y: 78 + (Math.random() - 0.5) * 4,
      },
    })
  }

  // Rio de Janeiro - 5 estabelecimentos
  const rjCities = ["Rio de Janeiro", "Niterói", "Petrópolis"]
  for (let i = 0; i < 5; i++) {
    establishments.push({
      id: `est-${id++}`,
      name: `KDABOA ${rjCities[i % rjCities.length]} ${Math.floor(i / rjCities.length) + 1}`,
      city: rjCities[i % rjCities.length],
      state: "Rio de Janeiro",
      stateCode: "RJ",
      coordinates: {
        x: 65 + (Math.random() - 0.5) * 3,
        y: 77 + (Math.random() - 0.5) * 3,
      },
    })
  }

  // Outros estados - 100 estabelecimentos distribuídos
  const otherStates = Object.keys(stateCentroids).filter((code) => code !== "SP" && code !== "RJ")

  for (let i = 0; i < 100; i++) {
    const stateCode = otherStates[i % otherStates.length]
    const stateInfo = stateCentroids[stateCode]

    establishments.push({
      id: `est-${id++}`,
      name: `KDABOA ${stateInfo.name} ${Math.floor(i / otherStates.length) + 1}`,
      city: `Cidade ${Math.floor(Math.random() * 50) + 1}`,
      state: stateInfo.name,
      stateCode: stateCode,
      coordinates: {
        x: stateInfo.x + (Math.random() - 0.5) * 5,
        y: stateInfo.y + (Math.random() - 0.5) * 5,
      },
    })
  }

  return establishments
}

const BrazilMap: React.FC = () => {
  const [establishments] = useState<Establishment[]>(generateMockData())
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  // Agregar estabelecimentos por estado
  const establishmentsByState = establishments.reduce(
    (acc, est) => {
      acc[est.stateCode] = (acc[est.stateCode] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )


  const handleCloseDialog = () => {
    setSelectedEstablishment(null)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.3, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.3, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleStateClick = (stateCode: string) => {
    setSelectedState(stateCode)
  }

  const handleCloseStateDialog = () => {
    setSelectedState(null)
  }

  const selectedStateEstablishments = selectedState
    ? establishments.filter((est) => est.stateCode === selectedState)
    : []

  return (
    <div className="brazil-map-container">
      <Paper elevation={3} className="map-paper">
        <div className="map-header">
          <Typography variant="h5" component="h2" className="map-title">
            Mapa de Estabelecimentos KDABOA
          </Typography>
          <Chip label={`${establishments.length} estabelecimentos`} color="primary" size="small" />
        </div>

        <div className="map-controls">
          <Tooltip title="Aumentar zoom">
            <IconButton onClick={handleZoomIn} size="small" className="control-button">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Diminuir zoom">
            <IconButton onClick={handleZoomOut} size="small" className="control-button">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Resetar visualização">
            <IconButton onClick={handleReset} size="small" className="control-button">
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div
          className="map-viewport"
          ref={mapRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            viewBox="0 0 600 900"
            className="brazil-svg"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {Object.entries(stateSVGPaths).map(([stateCode, path]) => (
              <path
                key={`state-${stateCode}`}
                d={path}
                className="state-path"
                onClick={() => handleStateClick(stateCode)}
              />
            ))}

            {Object.entries(establishmentsByState).map(([stateCode, count]) => {
              const coords = stateCentroids[stateCode]
              if (!coords) return null

              return (
                <g key={`label-${stateCode}`} onClick={() => handleStateClick(stateCode)} className="state-label-group">
                  <text
                    x={coords.x}
                    y={coords.y}
                    className="state-label-number"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {count}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <Box className="map-legend">
          <Typography variant="subtitle2" className="legend-title">
            Legenda
          </Typography>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-state-label">12</div>
              <Typography variant="body2">
                Quantidade de estabelecimentos por estado (clique para ver detalhes)
              </Typography>
            </div>
          </div>
        </Box>
      </Paper>

      {/* Dialog com detalhes do estabelecimento */}
      <Dialog open={!!selectedEstablishment} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedEstablishment && (
          <>
            <DialogTitle className="dialog-title">
              {selectedEstablishment.name}
              <IconButton aria-label="close" onClick={handleCloseDialog} className="dialog-close-button">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Cidade:</strong> {selectedEstablishment.city}
              </DialogContentText>
              <DialogContentText>
                <strong>Estado:</strong> {selectedEstablishment.state} ({selectedEstablishment.stateCode})
              </DialogContentText>
              <DialogContentText className="dialog-footer">Este é um estabelecimento parceiro KDABOA</DialogContentText>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Dialog open={!!selectedState} onClose={handleCloseStateDialog} maxWidth="md" fullWidth>
        {selectedState && (
          <>
            <DialogTitle className="dialog-title">
              Estabelecimentos em {stateCentroids[selectedState]?.name} ({selectedState})
              <IconButton aria-label="close" onClick={handleCloseStateDialog} className="dialog-close-button">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                Total de {selectedStateEstablishments.length} estabelecimento
                {selectedStateEstablishments.length !== 1 ? "s" : ""} usando KDABOA
              </Typography>
              <List className="establishments-list">
                {selectedStateEstablishments.map((est) => (
                  <ListItem key={est.id} className="establishment-list-item">
                    <ListItemText
                      primary={est.name}
                      secondary={`${est.city} - ${est.state}`}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  )
}

export default BrazilMap
