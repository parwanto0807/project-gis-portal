import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export interface CompanyData {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
}

const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = url;
    });
};

export const generateDisciplineReportPDF = async (company: CompanyData, reports: any[]) => {
    // 1. Initialize jsPDF
    const doc = new jsPDF('landscape', 'pt', 'a4'); // Use landscape for wider tables
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 2. Set Document Properties
    doc.setProperties({
        title: 'Discipline Reports',
        subject: 'Internal HR Audit',
        creator: 'GIS Portal System',
    });

    // 3. Render Header (Letterhead)
    const margin = 40;
    let currentY = margin;

    let textOffsetX = margin;
    let textStartY = currentY;

    try {
        const logo = await loadImage('/logo-md.png');
        // Let's scale logo to height 40px
        const logoHeight = 40;
        const logoWidth = (logo.width / logo.height) * logoHeight;

        doc.addImage(logo, 'PNG', margin, currentY - 5, logoWidth, logoHeight);

        // Indent text next to logo
        textOffsetX = margin + logoWidth + 20;
        textStartY = currentY + 10;

        // Adjust lower boundary tracking
        if (logoHeight > 30) currentY += (logoHeight - 20);
    } catch (e) {
        // Fallback without logo if missing
        console.warn('Could not load logo for PDF', e);
    }

    // Company Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // Tailwind slate-800
    doc.text((company.name || 'COMPANY NAME').toUpperCase(), textOffsetX, textStartY);

    // Address & Contacts
    currentY += 16;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Tailwind slate-500

    const addressText = company.address || 'Company Address Not Set';
    const contactText = [
        company.phone ? `Telp: ${company.phone}` : '',
        company.email ? `Email: ${company.email}` : '',
        company.website ? `Web: ${company.website}` : ''
    ].filter(Boolean).join('  |  ');

    doc.text(addressText, textOffsetX, textStartY + 14);
    if(contactText) {
        doc.text(contactText, textOffsetX, textStartY + 26);
    }

    // Separator Line
    currentY += 15;
    doc.setDrawColor(226, 232, 240); // Tailwind slate-200
    doc.setLineWidth(2);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // 4. Report Title
    currentY += 35;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // Tailwind slate-900
    doc.text('DISCIPLINE MONITOR REPORT', margin, currentY);

    // Timestamp
    currentY += 15;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // Tailwind slate-400
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, margin, currentY);
    doc.text(`Total Records: ${reports.length}`, margin, currentY + 12);

    currentY += 25;

    // 5. Generate Table Data
    const tableCols = [
        'ID / NIK',
        'Personnel',
        'Dept / Position',
        'Incident Details',
        'Action Taken',
        'Date & Status'
    ];

    const tableRows = reports.map((r) => [
        `${r.targetEmployeeId}\n${r.targetEmployee?.NIK || '-'}`,
        r.employeeName || '-',
        `${r.targetEmployee?.mstdept?.CNM_DEPT || 'Unknown'}\n${r.targetEmployee?.mstjab?.CNM_JAB || '-'}`,
        `[${r.type}]\n${r.description || '-'}`,
        r.actionTaken || '-',
        `${format(new Date(r.createdAt), 'dd MMM yyyy')}\n${r.status}`
    ]);

    // 6. Draw Table
    autoTable(doc, {
        startY: currentY,
        head: [tableCols],
        body: tableRows,
        theme: 'striped',
        headStyles: {
            fillColor: [15, 23, 42], // slate-900
            textColor: 255,
            fontSize: 9,
            fontStyle: 'bold',
            halign: 'left',
            valign: 'middle'
        },
        bodyStyles: {
            fontSize: 8,
            textColor: [71, 85, 105], // slate-600
            valign: 'middle',
            cellPadding: 5
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252] // slate-50
        },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 120, fontStyle: 'bold', textColor: [15, 23, 42] },
            2: { cellWidth: 130 },
            3: { cellWidth: 180 },
            4: { cellWidth: 180 },
            5: { cellWidth: 80, fontStyle: 'bold' } 
        },
        willDrawCell: function (data: any) {
            // Optional styling for Status column
            if (data.section === 'body' && data.column.index === 5) {
                const raw = data.cell.raw as string;
                if (raw.includes('RESOLVED')) {
                    doc.setTextColor(5, 150, 105); // emerald-600
                } else if (raw.includes('PENDING')) {
                    doc.setTextColor(217, 119, 6); // amber-600
                } else {
                    doc.setTextColor(225, 29, 72); // rose-600
                }
            }
        },
        margin: { top: margin, right: margin, bottom: margin + 30, left: margin },
        didDrawPage: function (data: any) {
            // Footer with page number
            const str = 'Page ' + (doc as any).internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text(
                str,
                pageWidth / 2,
                pageHeight - 20,
                { align: 'center' }
            );

            // Footer branding
            doc.text(
                'Confidential & Proprietary - HR Department',
                margin,
                pageHeight - 20
            );
        }
    });

    // 7. Preview PDF in New Tab
    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
};
