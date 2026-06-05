'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, CalendarClock, Tags, FileText, Camera, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';

const AREAS = ['GEDUNG 1 & 3', 'GEDUNG 2'];
const TEMPAT_TEMUAN = {
    'GEDUNG 1 & 3': [
        'Area Resepsionis', 'Area Supervisor', 'Area Design', 'Area Lab', 'Area Mini Produksi',
        'Area Storage New Model', 'Area PE', 'Area Color', 'Area TS', 'Area Expose',
        'Area Parkiran Motor Atas', 'Area TPS/B3', 'Area Parkiran Bawah', 'Area Maintenance',
        'Area Toilet Luar Bawah', 'Area Dome', 'Area Selasar Gedung 1 Bawah', 'Area Full Matic',
        'Area Semi Matic', 'Area Toilet Printing Semi', 'Area Oven', 'Area Premasking Gd. 1',
        'Area Color Mixing Semi', 'Area Inspection', 'Area GSE', 'Area UV Clear',
        'Area Color Matic', 'Area Finance', 'Area Ruang Meeting 1', 'Area Ruang Meeting Kecil'
    ],
    'GEDUNG 2': [
        'Area Parkir Atas', 'Area Incoming', 'Area TPS/B3 Gd. 2', 'Area Cutting Material',
        'Area Material', 'Area Preamsking Gd. 2', 'Area Diescut', 'Area Scorecut',
        'Area Office Atas Gd. 2', 'Area Office Bawah Gd. 2', 'Area QA', 'Area Packing',
        'Area Finish Good AHM', 'Area Finish Good YIMM', 'Area Material Ink',
        'Area Sparepart', 'Area Loading Dalam'
    ]
};
const KATEGORI_4M = ['Man', 'Machine', 'Material', 'Method'];

interface TemuanFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    initialData?: any;
}

export function TemuanForm({ open, onOpenChange, onSuccess, initialData }: TemuanFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        area: '',
        tempatTemuan: '',
        tanggal: new Date().toISOString().split('T')[0],
        jam: new Date().toTimeString().substring(0, 5),
        kategori4M: [] as string[],
        temuan: ''
    });
    const [fotos, setFotos] = useState<File[]>([]);
    const [fotoPreviews, setFotoPreviews] = useState<string[]>([]);

    useEffect(() => {
        const urls = fotos.map(f => URL.createObjectURL(f));
        setFotoPreviews(urls);
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [fotos]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                area: initialData.area || '',
                tempatTemuan: initialData.tempatTemuan || '',
                tanggal: initialData.tanggal ? new Date(initialData.tanggal).toISOString().split('T')[0] : '',
                jam: initialData.jam || '',
                kategori4M: Array.isArray(initialData.kategori4M) ? initialData.kategori4M : [],
                temuan: initialData.temuan || ''
            });
        } else {
            setFormData({
                area: '',
                tempatTemuan: '',
                tanggal: new Date().toISOString().split('T')[0],
                jam: new Date().toTimeString().substring(0, 5),
                kategori4M: [],
                temuan: ''
            });
        }
        setFotos([]);
    }, [initialData, open]);

    const handleCheckboxChange = (cat: string) => {
        setFormData(prev => ({
            ...prev,
            kategori4M: prev.kategori4M.includes(cat)
                ? prev.kategori4M.filter(c => c !== cat)
                : [...prev.kategori4M, cat]
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFotos(Array.from(e.target.files));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.area || !formData.tempatTemuan || formData.kategori4M.length === 0 || !formData.temuan) {
            toast.error('Silakan lengkapi semua field yang wajib');
            return;
        }

        setLoading(true);
        try {
            const fd = new FormData();
            fd.append('area', formData.area);
            fd.append('tempatTemuan', formData.tempatTemuan);
            fd.append('tanggal', formData.tanggal);
            fd.append('jam', formData.jam);
            fd.append('kategori4M', JSON.stringify(formData.kategori4M));
            fd.append('temuan', formData.temuan);
            
            fotos.forEach(file => {
                fd.append('fotos', file);
            });

            if (initialData?.id) {
                await api.put(`/temuan-peduli/${initialData.id}`, fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Data temuan berhasil diperbarui');
            } else {
                await api.post('/temuan-peduli', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Data temuan berhasil disimpan');
            }
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        {initialData ? 'Edit Temuan Peduli' : 'Tambah Temuan Peduli'}
                    </DialogTitle>
                    <DialogDescription>
                        Mohon isi form di bawah ini dengan data yang valid dan sesuai dengan fakta di lapangan.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-6 mt-4">
                    
                    {/* SECTION 1: LOKASI & WAKTU */}
                    <div className="space-y-4 border rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>Lokasi & Waktu Temuan</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Area (Gedung)</Label>
                                <Select value={formData.area} onValueChange={(val) => setFormData({ ...formData, area: val, tempatTemuan: '' })}>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Pilih Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Tempat Temuan</Label>
                                <Select value={formData.tempatTemuan} onValueChange={(val) => setFormData({ ...formData, tempatTemuan: val })} disabled={!formData.area}>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Pilih Tempat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formData.area && (TEMPAT_TEMUAN as any)[formData.area]?.map((t: string) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal</Label>
                                <div className="relative">
                                    <Input type="date" className="bg-background pl-9" value={formData.tanggal} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} required />
                                    <CalendarClock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Jam</Label>
                                <Input type="time" className="bg-background" value={formData.jam} onChange={e => setFormData({ ...formData, jam: e.target.value })} required />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: DETAIL TEMUAN */}
                    <div className="space-y-4 border rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">
                            <Tags className="w-4 h-4" />
                            <span>Kategori & Deskripsi Temuan</span>
                        </div>
                        <div className="space-y-3">
                            <Label>Kategori 4M (Pilih 1 atau lebih)</Label>
                            <div className="flex flex-wrap gap-4 p-3 bg-background border rounded-md">
                                {KATEGORI_4M.map(cat => (
                                    <div key={cat} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={cat} 
                                            checked={formData.kategori4M.includes(cat)}
                                            onCheckedChange={() => handleCheckboxChange(cat)}
                                        />
                                        <label htmlFor={cat} className="text-sm font-medium leading-none cursor-pointer">
                                            {cat}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                Deskripsi Rinci
                            </Label>
                            <Textarea 
                                className="bg-background resize-none"
                                rows={4} 
                                placeholder="Jelaskan temuan secara rinci di sini..." 
                                value={formData.temuan}
                                onChange={e => setFormData({ ...formData, temuan: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* SECTION 3: DOKUMENTASI */}
                    <div className="space-y-4 border rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                            <Camera className="w-4 h-4" />
                            <span>Dokumentasi Foto</span>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input type="file" multiple accept="image/*" onChange={handleFileChange} className="bg-background pl-9 cursor-pointer" />
                                <UploadCloud className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            
                            {fotoPreviews.length > 0 && (
                                <div className="p-3 border rounded-md bg-background mt-3">
                                    <Label className="text-xs text-muted-foreground mb-2 block">Foto yang akan diupload:</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {fotoPreviews.map((src, idx) => (
                                            <div key={idx} className="w-20 h-20 border rounded-md overflow-hidden relative bg-muted shadow-sm group">
                                                <img src={src} alt={`Preview ${idx}`} className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {initialData?.fotoUrls && initialData.fotoUrls.length > 0 && (
                                <div className="text-xs text-amber-600 dark:text-amber-400 mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
                                    * Data ini sudah memiliki {initialData.fotoUrls.length} foto sebelumnya. Upload file baru akan menambah ke daftar foto.
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
