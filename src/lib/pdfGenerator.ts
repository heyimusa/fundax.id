import { formatCurrency } from './utils';

interface CalculatorResult {
  type: 'KPR' | 'Multiguna' | 'TakeOver' | 'Deposito';
  inputs: Record<string, any>;
  results: {
    title: string;
    value: string;
  }[];
  tableData?: {
    headers: string[];
    rows: Array<Array<string | number>>;
  };
}

export const generateCalculatorPDF = async (data: CalculatorResult) => {
  // Dynamic import to avoid build-time resolution issues
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable')
  ]);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFillColor(30, 92, 157); // fundax-blue
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FUNDAX', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Hasil Kalkulator ' + data.type, pageWidth / 2, 30, { align: 'center' });

  yPosition = 50;

  // Input Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Data Input', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const inputEntries = Object.entries(data.inputs);
  inputEntries.forEach(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    doc.text(`${label}: ${value}`, 20, yPosition);
    yPosition += 7;
  });

  yPosition += 10;

  // Results Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Hasil Perhitungan', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  data.results.forEach((result) => {
    doc.setFont('helvetica', 'bold');
    doc.text(result.title + ':', 20, yPosition);
    
    doc.setFont('helvetica', 'normal');
    const valueX = pageWidth - 20 - doc.getTextWidth(result.value);
    doc.text(result.value, valueX, yPosition);
    
    yPosition += 7;
    
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // Table if exists
  if (data.tableData && data.tableData.rows.length > 0) {
    yPosition += 10;
    
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    autoTable(doc, {
      startY: yPosition,
      head: [data.tableData.headers],
      body: data.tableData.rows.map(row => 
        row.map(cell => typeof cell === 'number' ? formatCurrency(cell) : String(cell))
      ),
      theme: 'striped',
      headStyles: {
        fillColor: [30, 92, 157],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      margin: { left: 20, right: 20 }
    });
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Dihasilkan oleh Fundax - www.fundax.id | Halaman ${i} dari ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    
    doc.text(
      'Catatan: Perhitungan ini adalah hasil perkiraan secara umum. Data perhitungan dapat berbeda dengan perhitungan bank.',
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center', maxWidth: pageWidth - 40 }
    );
  }

  // Save PDF
  const fileName = `Fundax_${data.type}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
