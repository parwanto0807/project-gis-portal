'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Trash2, DatabaseZap, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';

export default function BackupRestorePage() {
    const [backups, setBackups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);
    const [restoreFile, setRestoreFile] = useState<File | null>(null);

    const fetchBackups = async () => {
        try {
            setLoading(true);
            const res = await api.get('/backups');
            if (res.data.success) {
                setBackups(res.data.data);
            }
        } catch (error) {
            toast.error('Gagal mengambil daftar backup');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBackups();
    }, []);

    const handleCreateBackup = async () => {
        try {
            setIsCreating(true);
            const res = await api.post('/backups');
            if (res.data.success) {
                toast.success('Backup berhasil dibuat');
                fetchBackups();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Gagal membuat backup');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (filename: string) => {
        if (!window.confirm(`Yakin ingin menghapus ${filename}?`)) return;
        try {
            await api.delete(`/backups/${filename}`);
            toast.success('Backup berhasil dihapus');
            fetchBackups();
        } catch (error) {
            toast.error('Gagal menghapus backup');
        }
    };

    const handleRestoreUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!restoreFile) {
            toast.error('Pilih file backup terlebih dahulu');
            return;
        }

        if (!window.confirm('PERINGATAN! Proses ini akan MENIMPA semua isi database lokal saat ini. Lanjutkan?')) return;

        try {
            setIsRestoring(true);
            const fd = new FormData();
            fd.append('file', restoreFile);
            
            const res = await api.post('/backups/restore', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Database berhasil dipulihkan!');
                setRestoreFile(null);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Gagal me-restore database');
        } finally {
            setIsRestoring(false);
        }
    };

    const handleRestoreFromList = async (filename: string) => {
        if (!window.confirm(`PERINGATAN! Restore database dari ${filename}? Semua data terbaru akan HILANG dan digantikan isi file ini.`)) return;

        try {
            setIsRestoring(true);
            const res = await api.post('/backups/restore', { filename });
            if (res.data.success) {
                toast.success('Database berhasil dipulihkan!');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Gagal me-restore database');
        } finally {
            setIsRestoring(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Backup & Restore Database</h1>
                <p className="text-muted-foreground mt-2">Buat cadangan database lokal dan pulihkan kembali jika diperlukan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Buat Backup Baru</CardTitle>
                        <CardDescription>Menjalankan pg_dump untuk mencadangkan database lokal ke server.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleCreateBackup} disabled={isCreating} className="w-full gap-2">
                            <DatabaseZap className="w-4 h-4" /> 
                            {isCreating ? 'Mencadangkan Database...' : 'Backup Database Sekarang'}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Restore dari File Lokal</CardTitle>
                        <CardDescription>Unggah file .dump yang pernah Anda unduh untuk dipulihkan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRestoreUpload} className="space-y-4">
                            <div className="space-y-2">
                                <Label>File Backup (.dump / .sql)</Label>
                                <Input 
                                    type="file" 
                                    onChange={e => setRestoreFile(e.target.files?.[0] || null)}
                                    disabled={isRestoring}
                                />
                            </div>
                            <Button type="submit" variant="destructive" disabled={!restoreFile || isRestoring} className="w-full gap-2">
                                <UploadCloud className="w-4 h-4" />
                                {isRestoring ? 'Memulihkan...' : 'Upload & Restore'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Riwayat Backup di Server</CardTitle>
                    <CardDescription>Daftar backup yang tersimpan di dalam folder server lokal.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama File</TableHead>
                                    <TableHead>Ukuran</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10">Memuat...</TableCell>
                                    </TableRow>
                                ) : backups.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-10">Belum ada backup.</TableCell>
                                    </TableRow>
                                ) : (
                                    backups.map(item => (
                                        <TableRow key={item.filename}>
                                            <TableCell className="font-medium">{item.filename}</TableCell>
                                            <TableCell>{(item.size / 1024).toFixed(2)} KB</TableCell>
                                            <TableCell>{new Date(item.createdAt).toLocaleString('id-ID')}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleRestoreFromList(item.filename)} disabled={isRestoring}>
                                                        Restore
                                                    </Button>
                                                    <Button variant="outline" size="icon" asChild>
                                                        <a href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5001'}/api/v1/backups/download/${item.filename}`} download>
                                                            <Download className="w-4 h-4 text-blue-500" />
                                                        </a>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.filename)}>
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
        </div>
    );
}
