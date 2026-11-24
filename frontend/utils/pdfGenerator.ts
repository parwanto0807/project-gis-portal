import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import api from '@/lib/axios';

export interface CompanyData {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo?: string;
}

const DEFAULT_COMPANY: CompanyData = {
    name: 'PT. GRAFINDO MITRASEMESTA',
    address: 'Cikarang Industrial Estate Jababeka 1 Block U 8D, U 8C & U 7A, Cikarang Utara, Bekasi Regency, West Java 17530',
    phone: '(021) 8934714',
    email: 'info@grafindo.co.id',
    website: 'www.grafindo.co.id',
    logo: '/logo-md.png'
};

export const fetchActiveCompany = async (): Promise<CompanyData> => {
    try {
        const res = await api.get('/companies/active');
        if (res.data?.success && res.data?.data) {
            return {
                ...DEFAULT_COMPANY,
                ...res.data.data,
                name: res.data.data.name || DEFAULT_COMPANY.name,
                address: res.data.data.address || DEFAULT_COMPANY.address,
            };
        }
    } catch (e) {
        console.warn('Fallback to default company profile for PDF:', e);
    }
    return DEFAULT_COMPANY;
};

const getBaseBackendUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001';
};

export const resolveFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    const normalized = url.startsWith('/suggestions/')
        ? url.replace('/suggestions/', '/uploads/suggestions/')
        : url;
    return `${getBaseBackendUrl()}${normalized.startsWith('/') ? '' : '/'}${normalized}`;
};

const loadImageAsDataUrl = (url: string): Promise<{ dataUrl: string; width: number; height: number } | null> => {
    return new Promise((resolve) => {
        if (!url) return resolve(null);
        const img = new window.Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width || 800;
                canvas.height = img.naturalHeight || img.height || 600;
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(null);
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                resolve({ dataUrl, width: canvas.width, height: canvas.height });
            } catch {
                resolve(null);
            }
        };
        img.onerror = () => resolve(null);
        img.src = url;
    });
};

const loadPngLogoAsDataUrl = (url: string): Promise<{ dataUrl: string; width: number; height: number } | null> => {
    return new Promise((resolve) => {
        if (!url) return resolve(null);
        const img = new window.Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width || 300;
                canvas.height = img.naturalHeight || img.height || 300;
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(null);
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                resolve({ dataUrl, width: canvas.width, height: canvas.height });
            } catch {
                resolve(null);
            }
        };
        img.onerror = () => resolve(null);
        img.src = url;
    });
};

const formatDateID = (dateStr?: string | Date) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const formatPrintTimestamp = () => {
    const d = new Date();
    const datePart = formatDateID(d);
    const timePart = d.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit' }).replace(/\./g, ':');
    return `${datePart}, ${timePart} WIB`;
};

/**
 * Draws the official company letterhead (Logo + Company Name + Address + Contact + Divider)
 * Returns the next Y coordinate (in mm).
 */
export const drawCompanyLetterhead = async (
    doc: jsPDF,
    company: CompanyData,
    docCode?: string
): Promise<number> => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    // Top accent bar
    doc.setFillColor(30, 58, 138); // Indigo/Navy 900
    doc.rect(margin, 8, contentWidth, 1.5, 'F');

    let textStartX = margin;
    const headerTopY = 12;

    // Load company logo
    const logoUrl = company.logo || '/logo-md.png';
    const logoImg = (await loadPngLogoAsDataUrl(logoUrl)) || (await loadPngLogoAsDataUrl('/logo-md.png'));
    if (logoImg) {
        const logoH = 15;
        const logoW = Math.min(28, (logoImg.width / logoImg.height) * logoH);
        doc.addImage(logoImg.dataUrl, 'PNG', margin, headerTopY, logoW, logoH);
        textStartX = margin + logoW + 4;
    }

    // Company Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text((company.name || DEFAULT_COMPANY.name).toUpperCase(), textStartX, headerTopY + 5);

    // Company Address (wrapped if long)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const maxAddrWidth = pageWidth - textStartX - margin - (docCode ? 45 : 5);
    const addrLines = doc.splitTextToSize(company.address || DEFAULT_COMPANY.address, maxAddrWidth);
    doc.text(addrLines.slice(0, 2), textStartX, headerTopY + 9.5);

    // Contact Line
    const contactParts = [
        company.phone ? `Telp: ${company.phone}` : '',
        company.email ? `Email: ${company.email}` : '',
        company.website ? `Web: ${company.website}` : ''
    ].filter(Boolean).join('   |   ');

    const contactY = headerTopY + 9.5 + (Math.min(addrLines.length, 2) * 3.5);
    if (contactParts) {
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(contactParts, textStartX, contactY);
    }

    // Right side document code box + print timestamp
    if (docCode) {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.3);
        doc.roundedRect(pageWidth - margin - 44, headerTopY, 44, 14, 1.5, 1.5, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text('NO. DOKUMEN / FORM', pageWidth - margin - 22, headerTopY + 4.5, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 58, 138);
        doc.text(docCode, pageWidth - margin - 22, headerTopY + 10.5, { align: 'center' });
    }

    // Double Divider Line
    const lineY = Math.max(headerTopY + 17.5, contactY + 3);
    doc.setDrawColor(30, 58, 138);
    doc.setLineWidth(0.7);
    doc.line(margin, lineY, pageWidth - margin, lineY);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.25);
    doc.line(margin, lineY + 1, pageWidth - margin, lineY + 1);

    return lineY + 6;
};

/**
 * Draws a section header bar
 */
const drawSectionHeader = (doc: jsPDF, title: string, y: number, color: [number, number, number] = [30, 58, 138]): number => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(margin, y, contentWidth, 6.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 3, y + 4.5);

    return y + 9.5;
};

/**
 * Draws a photo gallery grid (up to 3 images per row) with captions and borders
 */
const drawPhotoGrid = async (
    doc: jsPDF,
    urls: string[],
    label: string,
    startY: number,
    company: CompanyData,
    docCode?: string
): Promise<number> => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    let currentY = startY;

    if (currentY + 55 > pageHeight - 25) {
        doc.addPage();
        currentY = await drawCompanyLetterhead(doc, company, docCode);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(label, margin, currentY);
    currentY += 3;

    if (!urls || urls.length === 0) {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, currentY, contentWidth, 22, 1.5, 1.5, 'FD');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text('Tidak ada lampiran foto dokumentasi', pageWidth / 2, currentY + 12, { align: 'center' });
        return currentY + 26;
    }

    const cols = Math.min(3, urls.length);
    const gap = 4;
    const boxW = (contentWidth - gap * (cols - 1)) / cols;
    const boxH = cols === 1 ? 58 : cols === 2 ? 48 : 42;

    const loadedImages = await Promise.all(
        urls.map((u) => loadImageAsDataUrl(resolveFullImageUrl(u)))
    );

    for (let i = 0; i < loadedImages.length; i += cols) {
        if (currentY + boxH + 10 > pageHeight - 22) {
            doc.addPage();
            currentY = await drawCompanyLetterhead(doc, company, docCode);
        }

        for (let c = 0; c < cols && i + c < loadedImages.length; c++) {
            const imgData = loadedImages[i + c];
            const x = margin + c * (boxW + gap);

            // Outer frame
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.3);
            doc.roundedRect(x, currentY, boxW, boxH, 1.5, 1.5, 'FD');

            if (imgData) {
                const pad = 2;
                const availW = boxW - pad * 2;
                const availH = boxH - pad * 2 - 4;
                const ratio = Math.min(availW / imgData.width, availH / imgData.height);
                const drawW = imgData.width * ratio;
                const drawH = imgData.height * ratio;
                const drawX = x + (boxW - drawW) / 2;
                const drawY = currentY + pad + (availH - drawH) / 2;

                doc.addImage(imgData.dataUrl, 'JPEG', drawX, drawY, drawW, drawH);
            } else {
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(7);
                doc.setTextColor(148, 163, 184);
                doc.text('Foto tidak dapat dimuat', x + boxW / 2, currentY + boxH / 2, { align: 'center' });
            }

            // Caption badge at bottom of box
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(6.5);
            doc.setTextColor(100, 116, 139);
            doc.text(`Foto #${i + c + 1}`, x + boxW / 2, currentY + boxH - 1.5, { align: 'center' });
        }

        currentY += boxH + 4;
    }

    return currentY + 2;
};

/**
 * Draws a professional 3-column signature block at the bottom of the report
 */
const drawSignatureBlock = async (
    doc: jsPDF,
    startY: number,
    signatures: { role: string; title: string; name?: string; date?: string }[],
    company: CompanyData,
    docCode?: string
) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    let currentY = startY;
    const blockHeight = 42;

    if (currentY + blockHeight > pageHeight - 16) {
        doc.addPage();
        currentY = await drawCompanyLetterhead(doc, company, docCode);
    }

    // Place signature block nicely; if there's plenty of room on page 1, push slightly down for balance
    if (currentY < pageHeight - blockHeight - 28) {
        currentY = Math.max(currentY + 4, pageHeight - blockHeight - 20);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Dicetak pada: ${formatPrintTimestamp()}`, pageWidth - margin, currentY - 2, { align: 'right' });

    const cols = signatures.length;
    const colW = contentWidth / cols;

    // Outer table border
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.35);
    doc.rect(margin, currentY, contentWidth, blockHeight);

    // Header row inside signature block
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, currentY, contentWidth, 9, 'FD');

    for (let i = 0; i < cols; i++) {
        const sig = signatures[i];
        const colX = margin + i * colW;

        if (i > 0) {
            doc.setDrawColor(148, 163, 184);
            doc.line(colX, currentY, colX, currentY + blockHeight);
        }

        // Role & Title in Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(30, 41, 59);
        doc.text(sig.role.toUpperCase(), colX + colW / 2, currentY + 4, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text(sig.title, colX + colW / 2, currentY + 7.5, { align: 'center' });

        // Signature line and name at bottom
        const lineY = currentY + blockHeight - 9;
        doc.setDrawColor(148, 163, 184);
        doc.setLineWidth(0.25);
        doc.line(colX + 8, lineY, colX + colW - 8, lineY);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(15, 23, 42);
        const displayName = sig.name ? `( ${sig.name} )` : '( ........................................ )';
        doc.text(displayName, colX + colW / 2, lineY + 4, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tgl: ${sig.date || '.... / .... / 20....'}`, colX + colW / 2, lineY + 7.5, { align: 'center' });
    }
};

/**
 * Adds standard page numbers & company confidentiality footer across all pages
 */
const applyFooters = (doc: jsPDF, company: CompanyData, docTitle: string) => {
    const pageCount = doc.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;

    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text(
            `${company.name || DEFAULT_COMPANY.name} — ${docTitle} (Dokumen Resmi & Rahasia)`,
            margin,
            pageHeight - 6.5
        );
        doc.text(
            `Halaman ${i} dari ${pageCount}`,
            pageWidth - margin,
            pageHeight - 6.5,
            { align: 'right' }
        );
    }
};

// ═════════════════════════════════════════════════════════════════════════════
// 1. INDIVIDUAL REPORT: TEMUAN PEDULI BERSINERGI (Per Row)
// ═════════════════════════════════════════════════════════════════════════════

export const generateSingleTemuanPDF = async (item: any, customCompany?: CompanyData) => {
    const company = customCompany || (await fetchActiveCompany());
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    const docCode = `TMN-${String(item.id || 0).padStart(4, '0')}`;
    let currentY = await drawCompanyLetterhead(doc, company, docCode);

    // Document Title Banner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('LAPORAN TEMUAN AUDIT INTERNAL (PEDULI BERSINERGI)', pageWidth / 2, currentY + 2, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Formulir Pemeriksaan, Dokumentasi Ketidaksesuaian 4M & Verifikasi Perbaikan', pageWidth / 2, currentY + 6.5, { align: 'center' });

    currentY += 11;

    // Section A: Informasi Temuan
    currentY = drawSectionHeader(doc, 'A. Identitas & Lokasi Temuan', currentY, [30, 58, 138]);

    const pelapor = item.user ? `${item.user.firstName || ''} ${item.user.lastName || ''}`.trim() : (item.diInputOleh || '-');
    const kategoriStr = Array.isArray(item.kategori4M) ? item.kategori4M.join(', ') : (item.kategori4M || '-');
    const statusStr = item.status || 'OPEN';

    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2.5, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        columnStyles: {
            0: { cellWidth: 32, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            1: { cellWidth: 59 },
            2: { cellWidth: 32, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            3: { cellWidth: 59 },
        },
        body: [
            ['No. Temuan', docCode, 'Status Saat Ini', statusStr],
            ['Tanggal & Jam', `${formatDateID(item.tanggal)}  |  ${item.jam || '-'} WIB`, 'Kategori 4M', kategoriStr],
            ['Area / Gedung', item.area || '-', 'Tempat Spesifik', item.tempatTemuan || '-'],
            ['Dilaporkan Oleh', pelapor, 'Email Pelapor', item.user?.email || '-'],
        ],
        didParseCell: (data) => {
            if (data.section === 'body' && data.row.index === 0 && data.column.index === 3) {
                data.cell.styles.fontStyle = 'bold';
                if (statusStr === 'CLOSED') {
                    data.cell.styles.textColor = [6, 95, 70];
                    data.cell.styles.fillColor = [209, 250, 229];
                } else if (statusStr === 'IN_PROGRESS') {
                    data.cell.styles.textColor = [180, 83, 9];
                    data.cell.styles.fillColor = [254, 243, 199];
                } else {
                    data.cell.styles.textColor = [190, 18, 60];
                    data.cell.styles.fillColor = [255, 228, 230];
                }
            }
        },
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 5;

    // Section B: Rincian Temuan & Tindakan Perbaikan
    currentY = drawSectionHeader(doc, 'B. Rincian Ketidaksesuaian & Tindakan Perbaikan', currentY, [30, 58, 138]);

    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8.5, cellPadding: 3, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        headStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
        columnStyles: {
            0: { cellWidth: 91 },
            1: { cellWidth: 91 },
        },
        head: [['1. Deskripsi Temuan / Ketidaksesuaian (Before)', '2. Tindakan Perbaikan / Tindak Lanjut (After)']],
        body: [[
            item.temuan || 'Tidak ada deskripsi temuan.',
            item.tindakanPerbaikan || 'Belum ada tindakan perbaikan yang dicatat.'
        ]],
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 6;

    // Section C: Dokumentasi Visual (Foto Temuan & Foto Perbaikan)
    currentY = drawSectionHeader(doc, 'C. Bukti Dokumentasi Foto (Before & After)', currentY, [30, 58, 138]);

    const fotoTemuan: string[] = Array.isArray(item.fotoUrls) ? item.fotoUrls : [];
    const fotoPerbaikan: string[] = Array.isArray(item.fotoPerbaikanUrls) ? item.fotoPerbaikanUrls : [];

    currentY = await drawPhotoGrid(doc, fotoTemuan, '1. Foto Dokumentasi Temuan Awal (Before):', currentY, company, docCode);
    currentY = await drawPhotoGrid(doc, fotoPerbaikan, '2. Foto Dokumentasi Hasil Perbaikan (After):', currentY, company, docCode);

    // Section D: Signature Block
    await drawSignatureBlock(
        doc,
        currentY + 2,
        [
            {
                role: 'Dilaporkan Oleh',
                title: 'Pelapor / Auditor Internal',
                name: pelapor !== '-' ? pelapor : undefined,
                date: formatDateID(item.tanggal)
            },
            {
                role: 'Ditindaklanjuti Oleh',
                title: 'PIC Area / Pelaksana Perbaikan',
            },
            {
                role: 'Diverifikasi & Disetujui',
                title: 'Kepala Departemen / Management',
            }
        ],
        company,
        docCode
    );

    applyFooters(doc, company, `Laporan Temuan ${docCode}`);

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
};

// ═════════════════════════════════════════════════════════════════════════════
// 2. INDIVIDUAL REPORT: SUGGESTION SYSTEM / IDE IMPROVEMENT (Per Row)
// ═════════════════════════════════════════════════════════════════════════════

export const generateSingleSuggestionPDF = async (item: any, customCompany?: CompanyData) => {
    const company = customCompany || (await fetchActiveCompany());
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    const docCode = item.noForm || `IMP-${String(item.id || 0).padStart(4, '0')}`;
    let currentY = await drawCompanyLetterhead(doc, company, docCode);

    // Document Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('LAPORAN SUGGESTION SYSTEM (IDE IMPROVEMENT)', pageWidth / 2, currentY + 2, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Program Peduli Bersinergi — Peningkatan Kualitas, Efisiensi & Penurunan NG Ratio', pageWidth / 2, currentY + 6.5, { align: 'center' });

    currentY += 11;

    // Section A: Data Pengusul & Lokasi
    currentY = drawSectionHeader(doc, 'A. Identitas Pengusul & Area Proses', currentY, [67, 56, 202]); // Indigo 700

    const statusStr = item.statusApproval || 'PENDING';
    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2.3, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        columnStyles: {
            0: { cellWidth: 32, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            1: { cellWidth: 59 },
            2: { cellWidth: 32, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            3: { cellWidth: 59 },
        },
        body: [
            ['No. Formulir', docCode, 'Status Approval', statusStr],
            ['Nama Karyawan', item.namaKaryawan || '-', 'NIK Karyawan', item.nik || '-'],
            ['Departemen', item.departemen || '-', 'Tanggal & Periode', `${formatDateID(item.tanggal)} (${item.periode || '-'})`],
            ['Area (Gedung)', item.areaProses || '-', 'Area Temuan', item.areaTemuan || '-'],
            ['Focus Defect', item.focusDefect || '-', 'Judul Ide', item.judulIde || '-'],
        ],
        didParseCell: (data) => {
            if (data.section === 'body' && data.row.index === 0 && data.column.index === 3) {
                data.cell.styles.fontStyle = 'bold';
                if (statusStr === 'APPROVED') {
                    data.cell.styles.textColor = [6, 95, 70];
                    data.cell.styles.fillColor = [209, 250, 229];
                } else if (statusStr === 'REJECTED') {
                    data.cell.styles.textColor = [190, 18, 60];
                    data.cell.styles.fillColor = [255, 228, 230];
                } else {
                    data.cell.styles.textColor = [180, 83, 9];
                    data.cell.styles.fillColor = [254, 243, 199];
                }
            }
        },
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 5;

    // Section B: Analisis Masalah & Usulan Improvement
    currentY = drawSectionHeader(doc, 'B. Analisis Masalah & Rincian Usulan Improvement', currentY, [67, 56, 202]);

    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2.8, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        columnStyles: {
            0: { cellWidth: 38, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            1: { cellWidth: 144 },
        },
        body: [
            ['Judul Ide Improvement', { content: item.judulIde || '-', styles: { fontStyle: 'bold', textColor: [30, 58, 138] } }],
            ['Kondisi Saat Ini (Before)', item.kondisiSaatIni || '-'],
            ['Akar Masalah (Root Cause)', item.akarMasalah || '-'],
            ['Usulan Improvement (After)', item.usulanImprovement || '-'],
        ],
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 5;

    // Section C: Evaluasi Dampak, Implementasi & Apresiasi
    currentY = drawSectionHeader(doc, 'C. Hasil Evaluasi Dampak & Rencana Implementasi', currentY, [13, 148, 136]); // Teal 600

    const nominalStr = item.nominalApresiasi != null
        ? `Rp ${Number(item.nominalApresiasi).toLocaleString('id-ID')}`
        : '-';

    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2.3, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        columnStyles: {
            0: { cellWidth: 34, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            1: { cellWidth: 57 },
            2: { cellWidth: 34, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            3: { cellWidth: 57 },
        },
        body: [
            ['NG Ratio Sebelum', item.ngRatioSebelum != null ? `${item.ngRatioSebelum}%` : '-', 'NG Ratio Sesudah', item.ngRatioSesudah != null ? `${item.ngRatioSesudah}%` : '-'],
            ['Impact Penurunan', item.impactTurun != null ? `${item.impactTurun}%` : '-', 'Kategori & Reward', `${item.kategoriApresiasi || '-'}  (${nominalStr})`],
            ['PIC Implementasi', item.picImplementasi || '-', 'Target Selesai', formatDateID(item.targetSelesai)],
            ['Tanggal Aktual', formatDateID(item.tanggalAktual), 'Tanggal Approval', formatDateID(item.tanggalApproval)],
            ['Hasil Evaluasi Akhir', { content: item.hasilEvaluasi || '-', colSpan: 3 }],
            ['Catatan Evaluator', { content: item.catatan || '-', colSpan: 3 }],
        ],
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 5;

    // Section D: Lampiran Foto Kondisi & Foto Evaluasi
    currentY = drawSectionHeader(doc, 'D. Lampiran Foto Kondisi & Bukti Implementasi', currentY, [67, 56, 202]);

    const fotoKondisi: string[] = Array.isArray(item.fotoKondisiUrls) ? item.fotoKondisiUrls : [];
    const fotoEvaluasi: string[] = Array.isArray(item.fotoEvaluasiUrls) ? item.fotoEvaluasiUrls : [];

    currentY = await drawPhotoGrid(doc, fotoKondisi, '1. Foto Lampiran Kondisi Awal (Dari Karyawan):', currentY, company, docCode);
    currentY = await drawPhotoGrid(doc, fotoEvaluasi, '2. Foto Bukti Hasil Implementasi / Evaluasi:', currentY, company, docCode);

    // Section E: Signature Block
    await drawSignatureBlock(
        doc,
        currentY + 2,
        [
            {
                role: 'Diusulkan Oleh',
                title: 'Karyawan Pengusul',
                name: item.namaKaryawan || undefined,
                date: formatDateID(item.tanggal)
            },
            {
                role: 'Dievaluasi Oleh',
                title: 'Tim Evaluator / PIC Implementasi',
                name: item.picImplementasi ? item.picImplementasi.split(',')[0].trim() : undefined,
                date: item.tanggalAktual ? formatDateID(item.tanggalAktual) : undefined
            },
            {
                role: 'Disetujui Oleh',
                title: 'Komite Peduli Bersinergi / Management',
                date: item.tanggalApproval ? formatDateID(item.tanggalApproval) : undefined
            }
        ],
        company,
        docCode
    );

    applyFooters(doc, company, `Laporan Suggestion ${docCode}`);

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
};

// ═════════════════════════════════════════════════════════════════════════════
// 3. INDIVIDUAL REPORT: DISCIPLINE MONITOR (Per Row)
// ═════════════════════════════════════════════════════════════════════════════

export const generateSingleDisciplinePDF = async (report: any, customCompany?: CompanyData) => {
    const company = customCompany || (await fetchActiveCompany());
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    const docCode = `DSC-${String(report.id || 0).padStart(4, '0')}`;
    let currentY = await drawCompanyLetterhead(doc, company, docCode);

    // Document Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('BERITA ACARA & LAPORAN KEDISIPLINAN KARYAWAN', pageWidth / 2, currentY + 2, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Dokumen Resmi Pencatatan Pelanggaran, Pembinaan & Tindak Lanjut HR / Atasan', pageWidth / 2, currentY + 6.5, { align: 'center' });

    currentY += 11;

    // Section A: Identitas Karyawan & Pelanggaran
    currentY = drawSectionHeader(doc, 'A. Identitas Karyawan & Data Kejadian', currentY, [190, 18, 60]); // Rose 700

    const reporterName = report.reporter ? `${report.reporter.firstName || ''} ${report.reporter.lastName || ''}`.trim() : '-';
    const handlerName = report.handledBy ? `${report.handledBy.firstName || ''} ${report.handledBy.lastName || ''}`.trim() : '-';
    const statusStr = report.status || 'PENDING';

    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2.5, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        columnStyles: {
            0: { cellWidth: 34, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            1: { cellWidth: 57 },
            2: { cellWidth: 34, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            3: { cellWidth: 57 },
        },
        body: [
            ['No. Laporan', docCode, 'Status Penanganan', statusStr],
            ['Nama Karyawan', report.employeeName || '-', 'ID / NIK Karyawan', report.targetEmployeeId || '-'],
            ['Jenis Pelanggaran', report.type || '-', 'Lokasi / Area', report.location || '-'],
            ['Waktu Kejadian', formatDateID(report.createdAt), 'Dilaporkan Oleh', reporterName],
        ],
        didParseCell: (data) => {
            if (data.section === 'body' && data.row.index === 0 && data.column.index === 3) {
                data.cell.styles.fontStyle = 'bold';
                if (statusStr === 'RESOLVED') {
                    data.cell.styles.textColor = [6, 95, 70];
                    data.cell.styles.fillColor = [209, 250, 229];
                } else {
                    data.cell.styles.textColor = [180, 83, 9];
                    data.cell.styles.fillColor = [254, 243, 199];
                }
            }
        },
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 5;

    // Section B: Kronologi & Tindak Lanjut
    currentY = drawSectionHeader(doc, 'B. Kronologi Kejadian & Keputusan Sanksi / Pembinaan', currentY, [190, 18, 60]);

    autoTable(doc, {
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2.8, lineColor: [203, 213, 225], lineWidth: 0.25, textColor: [30, 41, 59] },
        columnStyles: {
            0: { cellWidth: 38, fillColor: [248, 250, 252], fontStyle: 'bold', textColor: [71, 85, 105] },
            1: { cellWidth: 144 },
        },
        body: [
            ['Kronologi / Deskripsi Temuan', report.description || '-'],
            ['Tindakan / Sanksi Diberikan', { content: report.actionTaken || 'Belum ada tindakan', styles: { fontStyle: 'bold' } }],
            ['Tanggal Tindakan & Penangan', `${formatDateID(report.actionDate)}   |   Ditangani Oleh: ${handlerName}`],
            ['Ringkasan Penyelesaian', report.resolutionSummary || '-'],
            ['Rencana Perbaikan (Improvement Plan)', report.improvementPlan || '-'],
        ],
        margin: { left: margin, right: margin },
    });

    currentY = (doc as any).lastAutoTable.finalY + 5;

    // Section C: Bukti Foto
    currentY = drawSectionHeader(doc, 'C. Bukti Dokumentasi Visual (Temuan & Penyelesaian)', currentY, [190, 18, 60]);

    const evidencePhotos = report.photoUrl ? [report.photoUrl] : [];
    const resolutionPhotos = report.resolutionPhotoUrl ? [report.resolutionPhotoUrl] : [];

    currentY = await drawPhotoGrid(doc, evidencePhotos, '1. Foto Bukti Temuan Pelanggaran:', currentY, company, docCode);
    currentY = await drawPhotoGrid(doc, resolutionPhotos, '2. Foto Bukti Tindak Lanjut / Pembinaan:', currentY, company, docCode);

    // Section D: Signature Block
    await drawSignatureBlock(
        doc,
        currentY + 2,
        [
            {
                role: 'Dilaporkan Oleh',
                title: 'Pelapor / Petugas',
                name: reporterName !== '-' ? reporterName : undefined,
                date: formatDateID(report.createdAt)
            },
            {
                role: 'Karyawan Bersangkutan',
                title: 'Pihak yang Dibina',
                name: report.employeeName || undefined,
                date: report.actionDate ? formatDateID(report.actionDate) : undefined
            },
            {
                role: 'Ditindaklanjuti & Disetujui',
                title: 'Atasan / HRD Management',
                name: handlerName !== '-' ? handlerName : undefined,
                date: report.actionDate ? formatDateID(report.actionDate) : undefined
            }
        ],
        company,
        docCode
    );

    applyFooters(doc, company, `Laporan Kedisiplinan ${docCode}`);

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
};

// ═════════════════════════════════════════════════════════════════════════════
// 4. BULK SUMMARY REPORT: DISCIPLINE MONITOR
// ═════════════════════════════════════════════════════════════════════════════

export const generateDisciplineReportPDF = async (companyInput: CompanyData, reports: any[]) => {
    const company = companyInput?.name ? companyInput : (await fetchActiveCompany());
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    let currentY = await drawCompanyLetterhead(doc, company, 'REKAP-DSC');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('LAPORAN REKAPITULASI MONITORING KEDISIPLINAN KARYAWAN', margin, currentY + 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Dicetak pada: ${formatPrintTimestamp()}   |   Total Data: ${reports.length} Laporan`, margin, currentY + 6.5);

    currentY += 10;

    const tableCols = [
        'No',
        'ID / NIK',
        'Nama Karyawan',
        'Lokasi / Area',
        'Jenis & Rincian Pelanggaran',
        'Tindakan / Sanksi',
        'Tanggal & Status'
    ];

    const tableRows = reports.map((r, idx) => [
        idx + 1,
        `${r.targetEmployeeId || '-'}`,
        r.employeeName || '-',
        r.location || '-',
        `[${r.type}]\n${r.description || '-'}`,
        r.actionTaken ? `${r.actionTaken}\n${r.resolutionSummary || ''}` : '-',
        `${format(new Date(r.createdAt), 'dd MMM yyyy')}\n${r.status}`
    ]);

    autoTable(doc, {
        startY: currentY,
        head: [tableCols],
        body: tableRows,
        theme: 'striped',
        headStyles: {
            fillColor: [30, 58, 138],
            textColor: 255,
            fontSize: 8,
            fontStyle: 'bold',
            halign: 'left',
            valign: 'middle'
        },
        bodyStyles: {
            fontSize: 7.5,
            textColor: [51, 65, 85],
            valign: 'middle',
            cellPadding: 2.5
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252]
        },
        columnStyles: {
            0: { cellWidth: 10, halign: 'center' },
            1: { cellWidth: 25 },
            2: { cellWidth: 42, fontStyle: 'bold', textColor: [15, 23, 42] },
            3: { cellWidth: 35 },
            4: { cellWidth: 72 },
            5: { cellWidth: 55 },
            6: { cellWidth: 30, fontStyle: 'bold', halign: 'center' }
        },
        margin: { left: margin, right: margin, bottom: 18 },
    });

    applyFooters(doc, company, 'Rekapitulasi Kedisiplinan');

    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
};
