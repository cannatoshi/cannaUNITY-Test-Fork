// frontend/src/apps/wawi/components/common/TableHeader.jsx
import { Paper, Table, TableHead, TableRow, TableCell } from '@mui/material'

/**
 * TableHeader Komponente für den Tabellenkopf
 * 
 * @param {Array} columns - Array mit Spalten-Konfigurationen (label, width, align)
 */
const TableHeader = ({ columns }) => {
  return (
    <Paper elevation={1} sx={{ mb: 1.5, borderRadius: '4px', overflow: 'hidden', width: '100%' /* Explizite volle Breite */ }}>
      <Table size="small" sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ 
            height: '48px',
            bgcolor: 'rgba(0, 0, 0, 0.04)' 
          }}>
            {columns.map((column, index) => (
              <TableCell 
                key={index}
                sx={{ 
                  width: column.width || 'auto', 
                  fontWeight: 'bold', 
                  padding: column.padding || '8px 12px',
                  textAlign: column.align || 'left', 
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle',
                  fontSize: '0.8rem',
                  height: '48px'
                }}
              >{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
  )
}

export default TableHeader