import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class TableUtil {
  static async exportTableToExcel(tableId: string, name?: string): Promise<void> {
    const timeSpan = new Date().toISOString();
    const prefix = name || 'ExportResult';
    const fileName = `${prefix}-${timeSpan}.xlsx`;

    // Get table element
    const table: HTMLTableElement | null = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
      console.error(`Table with id "${tableId}" not found.`);
      return;
    }

    // Create workbook & worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(prefix);

    // Extract rows from HTML table
    for (let row of Array.from(table.rows)) {
      const rowData: (string | number | boolean | Date)[] = [];
      for (let cell of Array.from(row.cells)) {
        let value = cell.innerText.trim();

        if (!isNaN(Number(value)) && value !== '') {
          rowData.push(Number(value));
        } else if (/^\d{4}-\d{2}-\d{2}/.test(value) && !isNaN(Date.parse(value))) {
          rowData.push(new Date(value));
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
          rowData.push(value.toLowerCase() === 'true');
        } else {
          rowData.push(value);
        }
      }
      worksheet.addRow(rowData);
    }

    // ✅ Auto adjust column widths safely
    if (worksheet.columns) {
      worksheet.columns.forEach((col: any) => {
        if (!col) return; // safeguard

        let maxLength = 10; // minimum width
        col.eachCell({ includeEmpty: true }, (cell: any) => {
          const cellValue = cell.value ? cell.value.toString() : '';
          if (cellValue.length > maxLength) {
            maxLength = cellValue.length;
          }
        });

        col.width = maxLength + 2; // add padding
      });
    }

    // Apply status-based styling for delay cells
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        const text = cell.value?.toString().trim();
        if (text === 'Delayed') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFC7CE' },
          };
          cell.font = { color: { argb: 'FF9C0006' }, bold: true };
        } else if (text === 'Slight Delay') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFEB9C' },
          };
          cell.font = { color: { argb: 'FF9C6500' }, bold: true };
        } else if (text === 'Ontime' || text === 'On Time') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFC6EFCE' },
          };
          cell.font = { color: { argb: 'FF006100' }, bold: true };
        }
      });
    });

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();
    fs.saveAs(new Blob([buffer]), fileName);
  }

  static exportTableToPdf(tableId: string, name?: string): void {
    const prefix = name || 'ExportResult';
    const fileName = `${prefix}-${new Date().toISOString()}.pdf`;
    const doc = new jsPDF({
      unit: 'pt',
      format: [288, 288],
    });

    // Add table from HTML
    autoTable(doc, {
      html: `#${tableId}`,
      styles: { fontSize: 8 }, // adjust for small page
      margin: { top: 20, left: 10, right: 10, bottom: 10 },
    });
    doc.save(fileName);
  }
}

// static exportTableToPdf(tableId: string, name?: string): void {
//   const prefix = name || 'ExportResult';
//   const fileName = `${prefix}-${new Date().toISOString()}.pdf`;

//   const doc = new jsPDF();
//   autoTable(doc, { html: `#${tableId}` });
//   doc.save(fileName);
// }
