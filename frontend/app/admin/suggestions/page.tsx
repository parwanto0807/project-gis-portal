'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PlusCircle, Search, Lightbulb, Trash2, Eye, Edit, MapPin, Calendar, User, Tag, Info, Wrench, X, CheckCircle, Camera, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID');
};

const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5001';
};

const formatImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    // Normalize old DB paths: /suggestions/xxx → /uploads/suggestions/xxx
    // New uploads already use /uploads/suggestions/ so this is a no-op for them
    const normalized = url.startsWith('/suggestions/')
        ? url.replace('/suggestions/', '/uploads/suggestions/')
        : url;
    return `${getBaseUrl()}${normalized.startsWith('/') ? '' : '/'}${normalized}`;
};

export default function SuggestionSystemPage() {
    const role = useAuthStore((state) => state.user?.role);
    const isEvaluator = role === 'STAFF' || role === 'ADMIN' || role === 'SUPER_ADMIN';
    const isSuperAdmin = role === 'SUPER_ADMIN';

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [viewDialogData, setViewDialogData] = useState<any>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const ITEMS_PER_PAGE = 10;

    const fetchData = async (currentPage: number, query: string) => {
        try {
            setLoading(true);
            const res = await api.get('/suggestions', {
                params: { page: currentPage, limit: ITEMS_PER_PAGE, search: query },
            });
            if (res.data.success) {
                setData(res.data.data);
                setTotalPages(res.data.meta?.totalPages ?? 1);
                setTotalItems(res.data.meta?.total ?? 0);
            }
        } catch (error) {
            toast.error('Gagal mengambil data suggestion');
        } finally {
            setLoading(false);
        }
    };

    // Fetch when page changes (but not when search changes — search has its own debounce)
    useEffect(() => {
        fetchData(page, searchQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    // Debounced search: reset to page 1 then fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            fetchData(1, searchQuery);
        }, 400);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data Ide Improvement ini?')) {
            try {
                const res = await api.delete(`/suggestions/${id}`);
                if (res.data.success) {
                    toast.success('Data berhasil dihapus');
                    fetchData(page, searchQuery);
                }
            } catch (error) {
                toast.error('Gagal menghapus data');
            }
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Approved</Badge>;
            case 'REJECTED':
                return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">Rejected</Badge>;
            default:
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Pending</Badge>;
        }
    };

    const handlePrintPDF = async () => {
        try {
            toast.info('Memuat semua data untuk cetak PDF...');
            const res = await api.get('/suggestions', { params: { page: 1, limit: 9999 } });
            if (!res.data.success) return;
            const allData: any[] = res.data.data;

            const doc = new jsPDF({ orientation: 'landscape' });
            doc.setFontSize(14);
            doc.text('Laporan Suggestion System (Ide Improvement)', 14, 15);
            doc.setFontSize(10);
            doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 21);
            doc.text(`Total Data: ${allData.length}`, 260, 21, { align: 'right' });

            const tableColumn = ["No", "Tanggal / No Form", "Karyawan / NIK", "Dept / Area", "Judul Ide", "Kondisi & Usulan", "Status"];
            const tableRows: any[] = [];

            allData.forEach((item, index) => {
                const rowData = [
                    index + 1,
                    `${formatDate(item.tanggalIde || item.tanggal)}\n${item.noForm || '-'}`,
                    `${item.namaKaryawan}\nNIK: ${item.nik}`,
                    `${item.departemen || '-'}\n${item.areaTemuan || item.areaProses || '-'}`,
                    item.judulIde || '-',
                    `Kondisi:\n${item.kondisiSaatIni || '-'}\n\nUsulan:\n${item.usulanImprovement || '-'}`,
                    item.statusApproval || 'PENDING'
                ];
                tableRows.push(rowData);
            });

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 25,
                theme: 'grid',
                styles: { fontSize: 7, cellPadding: 1.5, lineColor: [200, 200, 200], lineWidth: 0.1 },
                headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255], fontSize: 7, fontStyle: 'bold', halign: 'center' },
                columnStyles: {
                    0: { cellWidth: 10, halign: 'center' },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 35 },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 40 },
                    5: { cellWidth: 'auto' },
                    6: { cellWidth: 20, halign: 'center' },
                },
                alternateRowStyles: { fillColor: [248, 250, 252] }
            });

            doc.save(`Laporan_Suggestion_System_${new Date().toISOString().split('T')[0]}.pdf`);
            toast.success('PDF berhasil diunduh');
        } catch {
            toast.error('Gagal membuat PDF');
        }
    };

    // Pagination: generate page numbers with ellipsis
    const getPageNumbers = (): (number | '...')[] => {
        const delta = 2;
        const range: (number | '...')[] = [];
        for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
            range.push(i);
        }
        if (page - delta > 2) range.unshift('...');
        if (page + delta < totalPages - 1) range.push('...');
        if (totalPages > 0) range.unshift(1);
        if (totalPages > 1) range.push(totalPages);
        return range;
    };

    const startItem = totalItems === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(page * ITEMS_PER_PAGE, totalItems);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Badge variant="secondary" className="w-fit px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800">
                        <Breadcrumb>
                            <BreadcrumbList className="text-[10px] md:text-xs">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/dashboard" className="text-slate-500">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-slate-900 dark:text-slate-50 font-semibold">Suggestion System</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Badge>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-500" />
                            Suggestion System
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Daftar Ide Improvement dari Program Peduli Bersinergi.</p>
                    </div>
                </div>
                <div className="flex sm:flex-wrap items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handlePrintPDF}
                        disabled={data.length === 0}
                        className="flex-1 sm:flex-none h-9 gap-2 border-slate-200 dark:border-slate-800 font-semibold shadow-sm rounded-lg justify-center hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                        <Printer className="w-4 h-4 text-slate-600 dark:text-slate-400" /> <span className="hidden sm:inline">Cetak PDF</span>
                    </Button>
                    <Link href="/admin/suggestions/create" passHref>
                        <Button size="sm" className="flex-1 sm:flex-none h-9 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm rounded-lg justify-center">
                            <PlusCircle className="w-4 h-4" /> <span>Tambah Ide</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center pb-2 w-full">
                <div className="relative w-full sm:w-[250px] shrink-0">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input
                        placeholder="Cari No Form, Karyawan, Judul..."
                        className="pl-8 h-9 text-xs bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 w-full shadow-sm rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {!loading && totalItems > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 sm:ml-auto shrink-0">
                        Menampilkan{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{startItem}–{endItem}</span>
                        {' '}dari{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{totalItems}</span> data
                    </p>
                )}
            </div>

            <Card className="bg-white dark:bg-slate-950 shadow-md border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <CardContent className="p-0">
                    <div className="hidden md:block overflow-x-auto min-h-[400px]">
                        <Table className="w-full">
                            <TableHeader className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[44px] font-bold text-slate-600 text-xs h-10 py-2 pl-5 text-center">No</TableHead>
                                    <TableHead className="w-[130px] font-bold text-slate-600 text-xs h-10 py-2">No. Form</TableHead>
                                    <TableHead className="font-bold text-slate-600 text-xs h-10 py-2 w-[120px]">Tanggal</TableHead>
                                    <TableHead className="font-bold text-slate-600 text-xs h-10 py-2 w-[180px]">Nama Karyawan</TableHead>
                                    <TableHead className="font-bold text-slate-600 text-xs h-10 py-2">Judul Ide</TableHead>
                                    <TableHead className="font-bold text-slate-600 text-xs h-10 py-2 w-[110px]">Status</TableHead>
                                    <TableHead className="text-right font-bold text-slate-600 text-xs h-10 py-2 pr-5 w-[150px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 text-slate-400 font-medium text-sm">
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 text-slate-400 font-medium text-sm">
                                            Belum ada data suggestion.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((item, index) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                            <TableCell className="py-3 pl-5 text-xs font-semibold text-slate-400 text-center w-[44px]">
                                                {startItem + index}
                                            </TableCell>
                                            <TableCell className="py-3 text-xs font-semibold text-slate-700">{item.noForm}</TableCell>
                                            <TableCell className="py-3 text-xs">{formatDate(item.tanggal)}</TableCell>
                                            <TableCell className="py-3 text-xs font-medium">{item.namaKaryawan}</TableCell>
                                            <TableCell className="py-3 text-xs">{item.judulIde}</TableCell>
                                            <TableCell className="py-3">{getStatusBadge(item.statusApproval)}</TableCell>
                                            <TableCell className="text-right py-3 pr-5">
                                                <div className="flex justify-end gap-1.5">
                                                    {item.statusApproval === 'PENDING' ? (
                                                        <>
                                                            <Link href={`/admin/suggestions/edit/${item.id}`} passHref>
                                                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-bold rounded-md border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                                                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                                </Button>
                                                            </Link>
                                                            <Button variant="outline" size="sm" onClick={() => { setViewDialogData(item); setIsViewOpen(true); }} className="h-7 px-2.5 text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                                                                <Eye className="w-3.5 h-3.5 mr-1" /> View Detail
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        !isEvaluator && (
                                                            <>
                                                                <Button variant="outline" size="sm" disabled className="h-7 px-2.5 text-[10px] font-bold rounded-md opacity-50 cursor-not-allowed">
                                                                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                                </Button>
                                                                <Button variant="outline" size="sm" onClick={() => { setViewDialogData(item); setIsViewOpen(true); }} className="h-7 px-2.5 text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                                                                    <Eye className="w-3.5 h-3.5 mr-1" /> View Detail
                                                                </Button>
                                                            </>
                                                        )
                                                    )}

                                                    {isEvaluator && (
                                                        <Link href={`/admin/suggestions/${item.id}`} passHref>
                                                            {item.statusApproval === 'PENDING' ? (
                                                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                                                                    <Eye className="w-3.5 h-3.5 mr-1" /> Evaluasi
                                                                </Button>
                                                            ) : (
                                                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-[10px] font-bold rounded-md">
                                                                    <Eye className="w-3.5 h-3.5 mr-1" /> Lihat Detail
                                                                </Button>
                                                            )}
                                                        </Link>
                                                    )}

                                                    {isSuperAdmin && (
                                                        <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="h-7 px-2.5 text-[10px] font-bold rounded-md bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">
                                                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="md:hidden flex flex-col gap-4 p-4 bg-slate-50 min-h-[400px]">
                        {loading ? (
                            <div className="text-center py-12 text-slate-400 font-medium text-sm">Memuat data...</div>
                        ) : data.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 font-medium text-sm">Belum ada data suggestion.</div>
                        ) : (
                            data.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-slate-100 flex justify-between items-start gap-2">
                                        <div className="flex gap-3 items-start">
                                            <div className="mt-0.5">{getStatusBadge(item.statusApproval)}</div>
                                            <div>
                                                <h3 className="font-bold text-sm text-slate-900 leading-tight">{item.areaProses || '-'}</h3>
                                                <p className="text-xs font-semibold text-indigo-600 mt-0.5">{item.areaTemuan || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[10px] font-bold text-slate-700">{formatDate(item.tanggal)}</p>
                                            <p className="text-[10px] text-slate-400">{item.noForm}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <Info className="w-3.5 h-3.5 text-slate-400" />
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deskripsi Ide / Judul</h4>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                                <p className="text-xs text-slate-700 font-medium">{item.judulIde}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`grid border-t border-slate-100 divide-x divide-slate-100 bg-slate-50/50 ${isSuperAdmin ? 'grid-cols-4' : isEvaluator ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                        <button onClick={() => { setViewDialogData(item); setIsViewOpen(true); }} className="flex flex-col items-center justify-center gap-1 p-2 hover:bg-emerald-50 text-emerald-600 transition-colors">
                                            <Eye className="w-4 h-4" />
                                            <span className="text-[10px] font-bold">Detail</span>
                                        </button>
                                        {item.statusApproval === 'PENDING' ? (
                                            <Link href={`/admin/suggestions/edit/${item.id}`} className="flex flex-col items-center justify-center gap-1 p-2 hover:bg-indigo-50 text-indigo-600 transition-colors">
                                                <Edit className="w-4 h-4" />
                                                <span className="text-[10px] font-bold">Edit</span>
                                            </Link>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 opacity-50 cursor-not-allowed">
                                                <Edit className="w-4 h-4" />
                                                <span className="text-[10px] font-bold">Edit</span>
                                            </div>
                                        )}
                                        {isEvaluator && (
                                            <Link href={`/admin/suggestions/${item.id}`} className="flex flex-col items-center justify-center gap-1 p-2 hover:bg-blue-50 text-blue-600 transition-colors">
                                                {item.statusApproval === 'PENDING' ? (
                                                    <>
                                                        <Wrench className="w-4 h-4" />
                                                        <span className="text-[10px] font-bold">Evaluasi</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span className="text-[10px] font-bold">Hasil</span>
                                                    </>
                                                )}
                                            </Link>
                                        )}
                                        {isSuperAdmin && (
                                            <button onClick={() => handleDelete(item.id)} className="flex flex-col items-center justify-center gap-1 p-2 hover:bg-rose-50 text-rose-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                                <span className="text-[10px] font-bold">Hapus</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Pagination Bar */}
                    {!loading && totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <p className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1">
                                Halaman <span className="font-semibold text-slate-700 dark:text-slate-300">{page}</span> dari <span className="font-semibold text-slate-700 dark:text-slate-300">{totalPages}</span>
                            </p>
                            <div className="flex items-center gap-1 order-1 sm:order-2">
                                <Button
                                    variant="outline" size="sm"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="h-8 px-3 text-xs font-semibold border-slate-200 dark:border-slate-700 disabled:opacity-40 rounded-lg"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
                                </Button>
                                <div className="flex items-center gap-1">
                                    {getPageNumbers().map((p, i) =>
                                        p === '...' ? (
                                            <span key={`el-${i}`} className="px-1.5 text-xs text-slate-400 select-none">…</span>
                                        ) : (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p as number)}
                                                className={`h-8 min-w-[32px] px-2 rounded-lg text-xs font-semibold transition-colors ${
                                                    page === p
                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        )
                                    )}
                                </div>
                                <Button
                                    variant="outline" size="sm"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="h-8 px-3 text-xs font-semibold border-slate-200 dark:border-slate-700 disabled:opacity-40 rounded-lg"
                                >
                                    Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent showCloseButton={false} className="!max-w-full sm:!max-w-3xl md:!max-w-5xl lg:!max-w-6xl w-[95vw] md:w-[85vw] !p-0 !gap-0 overflow-hidden bg-white border-0 shadow-2xl flex flex-col md:flex-row min-h-[300px] max-h-[90vh]">
                    <DialogTitle className="sr-only">Detail Ide Improvement</DialogTitle>
                    {viewDialogData && (
                        <>
                            <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-100 flex-shrink-0">
                                {viewDialogData.fotoKondisiUrls && viewDialogData.fotoKondisiUrls.length > 0 ? (
                                    <img src={formatImageUrl(viewDialogData.fotoKondisiUrls[0])} alt="Foto Temuan" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <Lightbulb className="w-16 h-16 mb-4 opacity-20" />
                                        <p className="text-sm font-medium">Tidak ada foto lampiran</p>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 z-10">
                                    <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 text-xs border-none shadow-md">{viewDialogData.areaProses}</Badge>
                                </div>
                            </div>
                            <div className="w-full md:w-3/5 overflow-y-auto p-6 md:p-8 bg-white relative">
                                <button onClick={() => setIsViewOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="mb-6 pr-10">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">{viewDialogData.judulIde}</h2>
                                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Detail Ide Improvement &bull; Peduli Bersinergi</p>
                                </div>
                                <div className="border border-slate-200 rounded-xl p-4 mb-6 grid grid-cols-2 gap-y-5 gap-x-4 bg-white shadow-sm">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-1"><MapPin className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wide">Tempat Temuan</span></div>
                                        <p className="text-sm font-semibold text-slate-900">{viewDialogData.areaTemuan}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-1"><Calendar className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wide">Waktu Temuan</span></div>
                                        <p className="text-sm font-semibold text-slate-900">{formatDate(viewDialogData.tanggal)}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-1"><User className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wide">Pelapor</span></div>
                                        <p className="text-sm font-semibold text-slate-900">{viewDialogData.namaKaryawan}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-1"><Tag className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wide">Focus Defect</span></div>
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium border-0">{viewDialogData.focusDefect || '-'}</Badge>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-3"><Info className="w-4 h-4 text-slate-500" /><h3 className="text-xs font-bold text-slate-600 tracking-wide uppercase">Kondisi & Akar Masalah</h3></div>
                                    <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-5 relative overflow-hidden">
                                        <Info className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-32 text-slate-100 opacity-50" />
                                        <div className="relative z-10 space-y-4">
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kondisi Saat Ini:</p><p className="text-sm text-slate-700 font-medium italic whitespace-pre-wrap leading-relaxed">"{viewDialogData.kondisiSaatIni}"</p></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Akar Masalah:</p><p className="text-sm text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">{viewDialogData.akarMasalah}</p></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Usulan Improvement:</p><p className="text-sm text-indigo-700 font-semibold whitespace-pre-wrap leading-relaxed">{viewDialogData.usulanImprovement}</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2"><Wrench className="w-4 h-4 text-slate-500" /><h3 className="text-xs font-bold text-slate-600 tracking-wide uppercase">Tindak Lanjut & Evaluasi</h3></div>
                                        <div>{getStatusBadge(viewDialogData.statusApproval)}</div>
                                    </div>
                                    <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-5 relative overflow-hidden">
                                        {viewDialogData.statusApproval === 'PENDING' ? (
                                            <p className="text-sm text-slate-400 font-medium italic text-center py-4">Belum ada evaluasi atau tindak lanjut.</p>
                                        ) : (
                                            <div className="relative z-10 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kategori Apresiasi:</p><p className="text-sm text-slate-800 font-bold">{viewDialogData.kategoriApresiasi || '-'}</p></div>
                                                    <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Nominal Apresiasi:</p><p className="text-sm text-emerald-600 font-bold">{viewDialogData.nominalApresiasi ? `Rp ${viewDialogData.nominalApresiasi.toLocaleString('id-ID')}` : '-'}</p></div>
                                                </div>
                                                <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Catatan Evaluasi / Target Implementasi:</p><p className="text-sm text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">{viewDialogData.catatanEvaluasi || '-'}</p></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
