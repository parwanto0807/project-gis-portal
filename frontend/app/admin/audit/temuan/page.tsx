'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Image as ImageIcon, FileSpreadsheet, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { TemuanForm } from '@/components/temuan/TemuanForm';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const formatDateDDMMM = (dateStr: string | Date) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatPrintDateTime = () => {
    const d = new Date();
    const datePart = formatDateDDMMM(d);
    const timeOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Jakarta', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const timeStr = d.toLocaleTimeString('id-ID', timeOptions).replace(/\./g, ':');
    return `Jakarta, ${datePart} ${timeStr}`;
};

export default function TemuanPeduliPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    // For Image Preview
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/temuan-peduli');
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (error) {
            toast.error('Gagal mengambil data temuan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
        try {
            await api.delete(`/temuan-peduli/${id}`);
            toast.success('Data berhasil dihapus');
            fetchData();
        } catch (error) {
            toast.error('Gagal menghapus data');
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const viewPhotos = (urls: string[]) => {
        setPreviewImages(urls);
        setIsPreviewOpen(true);
    };

    const formatKategori = (cat: any) => {
        if (!cat) return null;
        const arr = Array.isArray(cat) ? cat : [];
        return arr.map((c: string) => <Badge key={c} variant="secondary" className="mr-1">{c}</Badge>);
    };

    const exportToExcel = () => {
        if (data.length === 0) {
            toast.error('Tidak ada data untuk diexport');
            return;
        }

        const exportData = data.map((item, index) => ({
            No: index + 1,
            Tanggal: formatDateDDMMM(item.tanggal),
            Jam: item.jam,
            Area: item.area,
            'Tempat Temuan': item.tempatTemuan,
            'Kategori 4M': Array.isArray(item.kategori4M) ? item.kategori4M.join(', ') : item.kategori4M || '',
            'Deskripsi Temuan': item.temuan,
            'Diinput Oleh': item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh,
            'Jumlah Foto': item.fotoUrls ? item.fotoUrls.length : 0
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Temuan');
        
        const wscols = [
            {wch: 5}, {wch: 15}, {wch: 10}, {wch: 20}, {wch: 20}, {wch: 20}, {wch: 40}, {wch: 20}, {wch: 15}
        ];
        worksheet['!cols'] = wscols;

        XLSX.writeFile(workbook, `Temuan_Audit_${new Date().toISOString().slice(0,10)}.xlsx`);
    };

    const exportToPDF = async () => {
        if (data.length === 0) {
            toast.error('Tidak ada data untuk diexport');
            return;
        }

        const doc = new jsPDF('landscape');
        
        // --- Header with Logo and Company Info ---
        try {
            const logoUrl = '/logo-md.png';
            const img = new window.Image();
            img.src = logoUrl;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 14, 10, 25, (img.height * 25 / img.width));
            }
        } catch (e) {
            console.warn('Failed to load logo for PDF', e);
        }

        const textX = 45; 
        
        // Company Name
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 255);
        doc.setFont("helvetica", "bold");
        doc.text('PT. GRAFINDO MITRASEMESTA', textX, 16);
        
        // Address & Phone
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.setFont("helvetica", "normal");
        doc.text('Cikarang Industrial Estate Jababeka 1 Block U 8D, U 8C & U 7A, Cikarang, Harja Mekar', textX, 22);
        doc.text('Cikarang Utara, Bekasi Regency, West Java 17530 | Telepon: (021) 8934714', textX, 27);
        
        // Separator line
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(14, 32, 283, 32);

        // Report Title
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text('LAPORAN AUDIT INTERNAL - Temuan Peduli Bersinergi', 14, 42);
        
        // --- Data Aggregation ---
        
        // --- Data Aggregation Variables ---
        const totalTemuan = data.length;
        
        const kategoriCount: Record<string, number> = {};
        data.forEach(item => {
            const cats = Array.isArray(item.kategori4M) ? item.kategori4M : (item.kategori4M ? [item.kategori4M] : ['Lainnya']);
            cats.forEach((c: string) => {
                kategoriCount[c] = (kategoriCount[c] || 0) + 1;
            });
        });
        const sortedKategori = Object.entries(kategoriCount).sort((a, b) => b[1] - a[1]);
        
        const areaCount: Record<string, number> = {};
        data.forEach(item => {
            const area = item.area || 'Lainnya';
            areaCount[area] = (areaCount[area] || 0) + 1;
        });
        const sortedArea = Object.entries(areaCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

        // --- Executive Summary ---
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text('Ringkasan Eksekutif', 14, 52);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Total Temuan: ${totalTemuan} kasus`, 14, 60);
        doc.text(`Tanggal Cetak: ${formatPrintDateTime()}`, 14, 66);

        // --- Pie Chart Helper ---
        const colors = [
            [41, 128, 185], // Blue
            [231, 76, 60],  // Red
            [46, 204, 113], // Green
            [241, 196, 15], // Yellow
            [155, 89, 182], // Purple
            [52, 73, 94]    // Dark Blue
        ];

        const drawPieChart = (cx: number, cy: number, radius: number, dataEntries: any[], title: string) => {
            const total = dataEntries.reduce((sum, item) => sum + item[1], 0);
            if (total === 0) return;

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(title, cx - radius, cy - radius - 5);
            doc.setFont("helvetica", "normal");
            
            let currentAngle = -Math.PI / 2;
            let legendY = cy - radius + 2;

            dataEntries.forEach((item, index) => {
                const count = item[1];
                const label = item[0];
                const color = colors[index % colors.length];
                const sliceAngle = (count / total) * 2 * Math.PI;
                
                // Draw pie slice using triangles
                const numSegments = Math.max(5, Math.floor((sliceAngle / (2 * Math.PI)) * 30));
                doc.setFillColor(color[0], color[1], color[2]);
                
                const pts = [[cx, cy]];
                for (let i = 0; i <= numSegments; i++) {
                    const angle = currentAngle + (i / numSegments) * sliceAngle;
                    pts.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
                }
                
                for (let i = 1; i < pts.length - 1; i++) {
                    doc.triangle(pts[0][0], pts[0][1], pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1], 'F');
                }
                
                currentAngle += sliceAngle;
                
                // Draw Legend
                doc.setFillColor(color[0], color[1], color[2]);
                doc.rect(cx + radius + 8, legendY - 3, 4, 4, 'F');
                doc.setTextColor(50);
                doc.setFontSize(9);
                const perc = Math.round((count / total) * 100);
                doc.text(`${label.substring(0, 15)} (${perc}%)`, cx + radius + 15, legendY);
                legendY += 6;
            });
        };

        // Draw Pie Charts
        drawPieChart(110, 67, 15, sortedKategori.slice(0, 5), 'Distribusi 4M:');
        drawPieChart(210, 67, 15, sortedArea.slice(0, 5), 'Top 5 Area:');

        // Line separator before table
        const finalY = 92;
        doc.setDrawColor(200, 200, 200);
        doc.line(14, finalY + 2, 283, finalY + 2);

        // --- Detail Table ---
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text('Rincian Data Temuan', 14, finalY + 10);

        const tableColumn = ["No", "Waktu", "Area/Tempat", "Kategori 4M", "Deskripsi Temuan", "Pelapor"];
        const tableRows: any[] = [];

        data.forEach((item, index) => {
            const itemData = [
                index + 1,
                `${formatDateDDMMM(item.tanggal)}\n${item.jam}`,
                `${item.area}\n${item.tempatTemuan}`,
                Array.isArray(item.kategori4M) ? item.kategori4M.join(', ') : item.kategori4M || '',
                item.temuan,
                item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh,
            ];
            tableRows.push(itemData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: finalY + 15,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 30 },
                2: { cellWidth: 40 },
                3: { cellWidth: 40 },
                4: { cellWidth: 'auto' },
                5: { cellWidth: 30 },
            },
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Temuan Peduli Bersinergi</h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Daftar temuan audit internal dari berbagai area gedung.</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button onClick={exportToExcel} variant="outline" className="gap-2 flex-1 sm:flex-none bg-green-50 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        <FileSpreadsheet className="w-4 h-4" /> Excel
                    </Button>
                    <Button onClick={exportToPDF} variant="outline" className="gap-2 flex-1 sm:flex-none bg-red-50 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                        <FileText className="w-4 h-4" /> PDF
                    </Button>
                    <Button onClick={handleCreate} className="gap-2 w-full sm:w-auto">
                        <PlusCircle className="w-4 h-4" /> Tambah Temuan
                    </Button>
                </div>
            </div>

            <Card className="border-0 sm:border rounded-none sm:rounded-xl shadow-none sm:shadow-sm bg-transparent sm:bg-card -mx-4 sm:mx-0">
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle>Data Temuan</CardTitle>
                    <CardDescription>Menampilkan semua temuan yang telah diinput.</CardDescription>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                    {/* Desktop / Tablet View (Table) */}
                    <div className="hidden md:block rounded-md border overflow-x-auto">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className="text-xs">
                                    <TableHead className="py-2">No</TableHead>
                                    <TableHead className="py-2">Tanggal & Jam</TableHead>
                                    <TableHead className="py-2">Area / Tempat</TableHead>
                                    <TableHead className="py-2">Kategori 4M</TableHead>
                                    <TableHead className="py-2">Deskripsi Temuan</TableHead>
                                    <TableHead className="py-2">Diinput Oleh</TableHead>
                                    <TableHead className="py-2">Foto</TableHead>
                                    <TableHead className="text-right py-2">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-xs">
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">Memuat data...</TableCell>
                                    </TableRow>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">Belum ada data temuan peduli bersinergi.</TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="py-2">{index + 1}</TableCell>
                                            <TableCell className="py-2">
                                                {formatDateDDMMM(item.tanggal)}<br/>
                                                <span className="text-[10px] text-muted-foreground">{item.jam}</span>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <span className="font-medium">{item.area}</span><br/>
                                                <span className="text-[10px] text-muted-foreground">{item.tempatTemuan}</span>
                                            </TableCell>
                                            <TableCell className="py-2">{formatKategori(item.kategori4M)}</TableCell>
                                            <TableCell className="py-2 max-w-[200px] truncate" title={item.temuan}>
                                                {item.temuan}
                                            </TableCell>
                                            <TableCell className="py-2">
                                                {item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh}
                                            </TableCell>
                                            <TableCell className="py-2">
                                                {item.fotoUrls && item.fotoUrls.length > 0 ? (
                                                    <Button variant="ghost" size="sm" onClick={() => viewPhotos(item.fotoUrls)} className="h-7 text-xs gap-1 text-primary">
                                                        <ImageIcon className="w-3 h-3" /> {item.fotoUrls.length} Foto
                                                    </Button>
                                                ) : '-'}
                                            </TableCell>
                                            <TableCell className="text-right py-2">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(item)}>
                                                        <Edit className="w-3 h-3 text-blue-500" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="w-3 h-3 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile View (Cards) */}
                    <div className="block md:hidden space-y-4">
                        {loading ? (
                            <div className="text-center py-10 text-muted-foreground border rounded-md mx-2">Memuat data...</div>
                        ) : data.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground border rounded-md mx-2">Belum ada data temuan.</div>
                        ) : (
                            <div className="divide-y border-y sm:border sm:rounded-md bg-card">
                                {data.map((item, index) => (
                                    <div key={item.id} className="p-4 space-y-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="flex-1">
                                                <Badge variant="outline" className="mb-2 bg-slate-50 dark:bg-slate-900">#{index + 1}</Badge>
                                                <h3 className="font-semibold text-base leading-tight">{item.area}</h3>
                                                <p className="text-sm text-muted-foreground mt-0.5">{item.tempatTemuan}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-sm font-medium">{formatDateDDMMM(item.tanggal)}</div>
                                                <div className="text-xs text-muted-foreground">{item.jam}</div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">Kategori 4M</div>
                                            <div className="flex flex-wrap">{formatKategori(item.kategori4M)}</div>
                                        </div>

                                        <div>
                                            <div className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">Deskripsi</div>
                                            <p className="text-sm text-foreground bg-muted/50 p-2.5 rounded-md leading-relaxed">{item.temuan}</p>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t">
                                            <div className="text-xs">
                                                <span className="text-muted-foreground">Pelapor: </span>
                                                <span className="font-medium">{item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-1">
                                                {item.fotoUrls && item.fotoUrls.length > 0 && (
                                                    <Button variant="outline" size="sm" onClick={() => viewPhotos(item.fotoUrls)} className="h-8 text-xs gap-1.5 text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 mr-2">
                                                        <ImageIcon className="w-3.5 h-3.5" /> Lihat {item.fotoUrls.length} Foto
                                                    </Button>
                                                )}
                                                <Button variant="secondary" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 text-blue-600 dark:text-blue-400">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="secondary" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-red-600 dark:text-red-400">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <TemuanForm 
                open={isFormOpen} 
                onOpenChange={setIsFormOpen} 
                onSuccess={fetchData} 
                initialData={selectedItem} 
            />

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-slate-50 dark:bg-slate-900 border-none shadow-2xl rounded-xl">
                    <div className="p-6 bg-white dark:bg-slate-950 border-b flex items-center justify-between sticky top-0 z-10 shadow-sm">
                        <div>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-primary">
                                <ImageIcon className="w-5 h-5" /> Dokumentasi Temuan
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Terdapat {previewImages.length} foto dokumentasi untuk temuan ini.
                            </p>
                        </div>
                    </div>
                    <div className="p-6 max-h-[75vh] overflow-y-auto">
                        <div className={`grid grid-cols-1 ${previewImages.length > 1 ? 'md:grid-cols-2' : ''} gap-6`}>
                            {previewImages.map((url, i) => (
                                <div key={i} className="flex flex-col bg-white dark:bg-slate-950 p-2 rounded-lg border shadow-sm group">
                                    <div className="relative flex justify-center items-center rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 min-h-[200px]">
                                        <img 
                                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001'}${url}`} 
                                            alt={`Foto ${i+1}`} 
                                            className="max-w-full max-h-[60vh] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium z-10">
                                            Foto {i+1} dari {previewImages.length}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
