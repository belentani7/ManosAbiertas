'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Plus, X } from 'lucide-react';
import * as XLSX from 'xlsx';

interface CellData {
  [key: string]: string | number;
}

export function MiniExcel() {
  const [rows, setRows] = useState<CellData[]>([
    { col1: 'Nombre', col2: 'Horas', col3: 'Tarifa/h', col4: 'Total' },
    { col1: 'Juan', col2: 8, col3: 15, col4: '=col2*col3' },
    { col1: 'María', col2: 6, col3: 18, col4: '=col2*col3' },
  ]);

  const [headers] = useState(['col1', 'col2', 'col3', 'col4']);

  const updateCell = (rowIdx: number, colKey: string, value: string | number) => {
    const newRows = [...rows];
    newRows[rowIdx] = { ...newRows[rowIdx], [colKey]: value };
    setRows(newRows);
  };

  const calculateFormula = (rowIdx: number, colKey: string): string | number => {
    const cell = rows[rowIdx][colKey];
    if (typeof cell === 'string' && cell.startsWith('=')) {
      const formula = cell.substring(1);
      // Simple formula eval: =col2*col3
      try {
        const match = formula.match(/(\w+)\s*([+\-*/])\s*(\w+)/);
        if (match) {
          const [, left, op, right] = match;
          const leftVal = Number(rows[rowIdx][left]) || 0;
          const rightVal = Number(rows[rowIdx][right]) || 0;
          switch (op) {
            case '+': return leftVal + rightVal;
            case '-': return leftVal - rightVal;
            case '*': return leftVal * rightVal;
            case '/': return rightVal !== 0 ? leftVal / rightVal : 0;
          }
        }
      } catch {
        return cell;
      }
    }
    return cell;
  };

  const addRow = () => {
    setRows([
      ...rows,
      { col1: '', col2: '', col3: '', col4: '' },
    ]);
  };

  const removeRow = (idx: number) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      rows.map((row) => ({
        ...row,
        col4: calculateFormula(rows.indexOf(row), 'col4'),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, 'mi-tabla.xlsx');
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>📊 Mini Excel</span>
          <Button
            size="sm"
            variant="outline"
            onClick={exportToExcel}
            className="gap-2"
          >
            <Download size={16} />
            Descargar XLSX
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Edita tablas, usa fórmulas (ej: =col2*col3) y exporta
        </p>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-border hover:bg-muted/30">
                {headers.map((colKey) => (
                  <td
                    key={`${rowIdx}-${colKey}`}
                    className="border-r border-border p-2"
                  >
                    {rowIdx === 0 ? (
                      // Header row
                      <input
                        type="text"
                        value={row[colKey] || ''}
                        onChange={(e) =>
                          updateCell(rowIdx, colKey, e.target.value)
                        }
                        className="w-full px-2 py-1 bg-muted/50 font-semibold rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      // Data cell
                      <input
                        type={colKey.includes('col1') ? 'text' : 'number'}
                        value={
                          typeof row[colKey] === 'string' &&
                          row[colKey].startsWith('=')
                            ? calculateFormula(rowIdx, colKey)
                            : row[colKey] || ''
                        }
                        onChange={(e) =>
                          updateCell(rowIdx, colKey, e.target.value)
                        }
                        placeholder={
                          colKey === 'col4' ? '=col2*col3' : 'Valor'
                        }
                        className="w-full px-2 py-1 bg-white dark:bg-slate-800 rounded border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </td>
                ))}
                <td className="p-2">
                  {rowIdx > 0 && (
                    <button
                      onClick={() => removeRow(rowIdx)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button
          size="sm"
          variant="outline"
          onClick={addRow}
          className="mt-4 gap-2"
        >
          <Plus size={16} />
          Agregar fila
        </Button>
      </CardContent>
    </Card>
  );
}
