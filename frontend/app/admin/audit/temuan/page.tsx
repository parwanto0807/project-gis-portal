'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { TemuanForm } from '@/components/temuan/TemuanForm';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Temuan Peduli Bersinergi</h1>
                    <p className="text-muted-foreground mt-2">Daftar temuan audit internal dari berbagai area gedung.</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <PlusCircle className="w-4 h-4" /> Tambah Temuan
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Temuan</CardTitle>
                    <CardDescription>Menampilkan semua temuan yang telah diinput.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Tanggal & Jam</TableHead>
                                    <TableHead>Area / Tempat</TableHead>
                                    <TableHead>Kategori 4M</TableHead>
                                    <TableHead>Deskripsi Temuan</TableHead>
                                    <TableHead>Diinput Oleh</TableHead>
                                    <TableHead>Foto</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">Memuat data...</TableCell>
                                    </TableRow>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">Belum ada data temuan peduli bersinergi.</TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {new Date(item.tanggal).toLocaleDateString('id-ID')}<br/>
                                                <span className="text-xs text-muted-foreground">{item.jam}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{item.area}</span><br/>
                                                <span className="text-xs text-muted-foreground">{item.tempatTemuan}</span>
                                            </TableCell>
                                            <TableCell>{formatKategori(item.kategori4M)}</TableCell>
                                            <TableCell className="max-w-[200px] truncate" title={item.temuan}>
                                                {item.temuan}
                                            </TableCell>
                                            <TableCell>
                                                {item.user ? `${item.user.firstName} ${item.user.lastName}` : item.diInputOleh}
                                            </TableCell>
                                            <TableCell>
                                                {item.fotoUrls && item.fotoUrls.length > 0 ? (
                                                    <Button variant="ghost" size="sm" onClick={() => viewPhotos(item.fotoUrls)} className="gap-2 text-primary">
                                                        <ImageIcon className="w-4 h-4" /> {item.fotoUrls.length} Foto
                                                    </Button>
                                                ) : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                                        <Edit className="w-4 h-4 text-blue-500" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
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
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">Preview Foto Temuan</DialogTitle>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {previewImages.map((url, i) => (
                            <div key={i} className="relative aspect-video rounded-md overflow-hidden bg-muted">
                                <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5001'}${url}`} alt={`Foto ${i+1}`} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
