// frontend/src/apps/trackandtrace/components/common/AccordionRow.jsx
import { Box, IconButton, Typography, Collapse } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useEffect } from 'react'
import useAnimationSettings from '@/hooks/useAnimationSettings'

/**
 * AccordionRow Komponente für ausklappbare Tabellenzeilen mit Animation
 *
 * @param {boolean} isExpanded - Ist die Zeile ausgeklappt
 * @param {function} onClick - Handler für Klick auf die Zeile
 * @param {Array} columns - Array mit Spalten-Konfigurationen
 * @param {string} borderColor - Farbe des linken Rands (default: 'success.main')
 * @param {string} expandIconPosition - Position des Expand-Icons ('start' oder 'end')
 * @param {React.ReactNode} children - Inhalt, der beim Ausklappen angezeigt wird
 */
const AccordionRow = ({ 
  isExpanded, 
  onClick, 
  columns,
  borderColor = 'success.main',
  expandIconPosition = 'end',
  children
}) => {
  // Animations-Einstellungen abrufen
  const animSettings = useAnimationSettings('slide', 300, true);
  
  // Lokaler expandierter Zustand für Animation
  const [expanded, setExpanded] = useState(isExpanded);
  
  // Aktualisiere lokalen Zustand, wenn sich isExpanded ändert
  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);
  
  // Berechne Animations-Dauer basierend auf den Einstellungen
  const animationDuration = animSettings.enabled ? 
    Math.min(animSettings.duration / 2, 300) : // Halbiere die globale Dauer, max 300ms
    0; // Keine Animation, wenn Animationen deaktiviert sind

  return (
    <Box
      sx={{ 
        mb: 1.2, 
        overflow: 'hidden', 
        borderRadius: '4px',
        border: expanded ? '1px solid rgba(76, 175, 80, 0.5)' : 'none'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: expanded ? 'rgba(0, 0, 0, 0.04)' : 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          borderLeft: '4px solid',
          borderColor: borderColor,
          cursor: 'pointer',
          height: '48px',
          width: '100%',
        }}
        onClick={onClick}
      >
        {/* Expand Icon am Anfang, wenn expandIconPosition='start' */}
        {expandIconPosition === 'start' && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '36px',
              pl: 0.8,
              flexShrink: 0,
              height: '100%'
            }}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <IconButton size="small">
              <ExpandMoreIcon 
                sx={{ 
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: `transform ${animationDuration}ms ease-in-out`,
                  fontSize: '1.2rem'
                }} 
              />
            </IconButton>
          </Box>
        )}

        {/* Spalten-Inhalte */}
        {columns.map((column, index) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: column.align === 'center'
                ? 'center'
                : column.align === 'right'
                  ? 'flex-end'
                  : 'flex-start',
              width: column.width || 'auto',
              px: 1.5,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: '100%'
            }}
          >
            {column.icon && (
              <column.icon sx={{ color: column.iconColor || 'inherit', fontSize: '0.9rem', mr: 0.8 }} />
            )}
            {typeof column.content === 'string' || typeof column.content === 'number' ? (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: column.bold ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.8rem',
                  color: column.color || 'inherit',
                  lineHeight: 1.4,
                }}
              >
                {column.content}
              </Typography>
            ) : (
              column.content
            )}
          </Box>
        ))}

        {/* Expand Icon am Ende (Standard) */}
        {expandIconPosition === 'end' && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '36px',
              pr: 0.8,
              flexShrink: 0,
              height: '100%'
            }}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <IconButton size="small">
              <ExpandMoreIcon 
                sx={{ 
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: `transform ${animationDuration}ms ease-in-out`,
                  fontSize: '1.2rem'
                }} 
              />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Ausgeklappter Inhalt mit Animation */}
      <Collapse 
        in={expanded} 
        timeout={animationDuration}
        unmountOnExit
      >
        <Box 
          sx={{ 
            width: '100%',
            padding: '14px 20px 20px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

export default AccordionRow