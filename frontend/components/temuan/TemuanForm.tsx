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
                    <DialogTitle className="text-lg flex items-center gap-2">
                        {initialData ? 'Edit Temuan Peduli' : 'Tambah Temuan Peduli'}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Mohon isi form di bawah ini dengan data yang valid dan sesuai dengan fakta di lapangan.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 mt-2">
                    
                    {/* SECTION 1: LOKASI & WAKTU */}
                    <div className="space-y-3 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Lokasi & Waktu Temuan</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-600">Area (Gedung)</Label>
                                <Select value={formData.area} onValueChange={(val) => setFormData({ ...formData, area: val, tempatTemuan: '' })}>
                                    <SelectTrigger className="bg-white h-8 text-xs">
                                        <SelectValue placeholder="Pilih Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-600">Tempat Temuan</Label>
                                <Select value={formData.tempatTemuan} onValueChange={(val) => setFormData({ ...formData, tempatTemuan: val })} disabled={!formData.area}>
                                    <SelectTrigger className="bg-white h-8 text-xs">
                                        <SelectValue placeholder="Pilih Tempat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formData.area && (TEMPAT_TEMUAN as any)[formData.area]?.map((t: string) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-600">Tanggal</Label>
                                <div className="relative">
                                    <Input type="date" className="bg-white pl-8 h-8 text-xs" value={formData.tanggal} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} required />
                                    <CalendarClock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-600">Jam</Label>
                                <Input type="time" className="bg-white h-8 text-xs" value={formData.jam} onChange={e => setFormData({ ...formData, jam: e.target.value })} required />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: DETAIL TEMUAN */}
                    <div className="space-y-3 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
                            <Tags className="w-3.5 h-3.5" />
                            <span>Kategori & Deskripsi Temuan</span>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-slate-600">Kategori 4M (Pilih 1 atau lebih)</Label>
                            <div className="flex flex-wrap gap-3 p-2.5 bg-white border border-slate-200 rounded-md">
                                {KATEGORI_4M.map(cat => (
                                    <div key={cat} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={cat} 
                                            checked={formData.kategori4M.includes(cat)}
                                            onCheckedChange={() => handleCheckboxChange(cat)}
                                        />
                                        <label htmlFor={cat} className="text-xs font-medium leading-none cursor-pointer text-slate-700">
                                            {cat}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-1">
                            <Label className="flex items-center gap-1.5 text-xs text-slate-600">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                Deskripsi Rinci
                            </Label>
                            <Textarea 
                                className="bg-white resize-none text-xs min-h-[80px]"
                                placeholder="Jelaskan temuan secara rinci di sini..." 
                                value={formData.temuan}
                                onChange={e => setFormData({ ...formData, temuan: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* SECTION 3: DOKUMENTASI */}
                    <div className="space-y-3 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
                            <Camera className="w-3.5 h-3.5" />
                            <span>Dokumentasi Foto</span>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input type="file" multiple accept="image/*" onChange={handleFileChange} className="bg-white pl-8 cursor-pointer h-8 text-xs pt-1.5" />
                                <UploadCloud className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            
                            
                            {fotoPreviews.length > 0 && (
                                <div className="p-2.5 border border-slate-200 rounded-md bg-white mt-2">
                                    <Label className="text-[10px] text-slate-500 mb-1.5 block uppercase tracking-wider">Foto yang akan diupload:</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {fotoPreviews.map((src, idx) => (
                                            <div key={idx} className="w-16 h-16 border border-slate-200 rounded-md overflow-hidden relative bg-slate-100 shadow-sm group">
                                                <img src={src} alt={`Preview ${idx}`} className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {initialData?.fotoUrls && initialData.fotoUrls.length > 0 && (
                                <div className="text-[10px] text-amber-600 mt-2 p-2 bg-amber-50 rounded-md border border-amber-200 font-medium">
                                    * Data ini sudah memiliki {initialData.fotoUrls.length} foto sebelumnya. Upload file baru akan menambah ke daftar foto.
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-4 pt-2">
                        <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={() => onOpenChange(false)}>Batal</Button>
                        <Button type="submit" size="sm" className="h-8 text-xs px-6" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Temuan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
