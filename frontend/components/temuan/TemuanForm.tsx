'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, CalendarClock, Tags, FileText, Camera, UploadCloud, CheckCircle, Mic, AlertCircle, Wrench, Info } from 'lucide-react';
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
    const [activeTab, setActiveTab] = useState('informasi');
    const [formData, setFormData] = useState({
        area: '',
        tempatTemuan: '',
        tanggal: new Date().toISOString().split('T')[0],
        jam: new Date().toTimeString().substring(0, 5),
        kategori4M: [] as string[],
        temuan: '',
        status: 'OPEN',
        tindakanPerbaikan: ''
    });
    const [fotos, setFotos] = useState<File[]>([]);
    const [fotoPreviews, setFotoPreviews] = useState<string[]>([]);

    const [fotoPerbaikan, setFotoPerbaikan] = useState<File[]>([]);
    const [fotoPerbaikanPreviews, setFotoPerbaikanPreviews] = useState<string[]>([]);
    
    const [isListening, setIsListening] = useState(false);
    const [isListeningPerbaikan, setIsListeningPerbaikan] = useState(false);

    const handleSpeechRecognition = (target: 'temuan' | 'perbaikan') => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error('Browser Anda tidak mendukung fitur Voice Dictation');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            if (target === 'temuan') setIsListening(true);
            else setIsListeningPerbaikan(true);
            toast.info('Silakan mulai bicara...', { duration: 2500 });
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setFormData(prev => ({ 
                ...prev, 
                [target === 'temuan' ? 'temuan' : 'tindakanPerbaikan']: prev[target === 'temuan' ? 'temuan' : 'tindakanPerbaikan'] 
                    ? `${prev[target === 'temuan' ? 'temuan' : 'tindakanPerbaikan']} ${transcript}` 
                    : transcript 
            }));
        };

        recognition.onerror = (event: any) => {
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
                console.error('Speech recognition error', event.error);
                toast.error('Gagal mengenali suara: ' + event.error);
            }
            if (target === 'temuan') setIsListening(false);
            else setIsListeningPerbaikan(false);
        };

        recognition.onend = () => {
            if (target === 'temuan') setIsListening(false);
            else setIsListeningPerbaikan(false);
        };

        recognition.start();
    };

    useEffect(() => {
        const urls = fotos.map(f => URL.createObjectURL(f));
        setFotoPreviews(urls);
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [fotos]);

    useEffect(() => {
        const urls = fotoPerbaikan.map(f => URL.createObjectURL(f));
        setFotoPerbaikanPreviews(urls);
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [fotoPerbaikan]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                area: initialData.area || '',
                tempatTemuan: initialData.tempatTemuan || '',
                tanggal: initialData.tanggal ? new Date(initialData.tanggal).toISOString().split('T')[0] : '',
                jam: initialData.jam || '',
                kategori4M: Array.isArray(initialData.kategori4M) ? initialData.kategori4M : [],
                temuan: initialData.temuan || '',
                status: initialData.status || 'OPEN',
                tindakanPerbaikan: initialData.tindakanPerbaikan || ''
            });
            setActiveTab('informasi');
        } else {
            setFormData({
                area: '',
                tempatTemuan: '',
                tanggal: new Date().toISOString().split('T')[0],
                jam: new Date().toTimeString().substring(0, 5),
                kategori4M: [],
                temuan: '',
                status: 'OPEN',
                tindakanPerbaikan: ''
            });
        }
        setFotos([]);
        setFotoPerbaikan([]);
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

    const handleFotoPerbaikanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFotoPerbaikan(Array.from(e.target.files));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.area || !formData.tempatTemuan || formData.kategori4M.length === 0 || !formData.temuan) {
            toast.error('Silakan lengkapi semua field yang wajib');
            if (activeTab !== 'informasi') setActiveTab('informasi');
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
            
            if (initialData) {
                fd.append('status', formData.status);
                fd.append('tindakanPerbaikan', formData.tindakanPerbaikan);
            }
            
            fotos.forEach(file => {
                fd.append('fotos', file);
            });

            fotoPerbaikan.forEach(file => {
                fd.append('fotoPerbaikan', file);
            });

            if (initialData?.id && initialData?.fotoUrls) {
                fd.append('existingFotos', JSON.stringify(initialData.fotoUrls));
            }

            if (initialData?.id && initialData?.fotoPerbaikanUrls) {
                fd.append('existingFotoPerbaikan', JSON.stringify(initialData.fotoPerbaikanUrls));
            }

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

    const isInformasiLengkap = formData.area && formData.tempatTemuan && formData.kategori4M.length > 0 && formData.temuan;

    // Komponen konten form informasi (digunakan di mode create dan edit)
    const InformasiFormContent = () => (
        <div className="space-y-4">
            {/* LOKASI & WAKTU */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Lokasi & Waktu</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Area (Gedung) <span className="text-rose-500">*</span></Label>
                        <Select value={formData.area} onValueChange={(val) => setFormData({ ...formData, area: val, tempatTemuan: '' })}>
                            <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9">
                                <SelectValue placeholder="Pilih Area Gedung" />
                            </SelectTrigger>
                            <SelectContent>
                                {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tempat Temuan <span className="text-rose-500">*</span></Label>
                        <Select value={formData.tempatTemuan} onValueChange={(val) => setFormData({ ...formData, tempatTemuan: val })} disabled={!formData.area}>
                            <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9">
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
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tanggal <span className="text-rose-500">*</span></Label>
                        <div className="relative">
                            <Input type="date" className="bg-white dark:bg-slate-950 pl-9 border-slate-200 dark:border-slate-800 h-9" value={formData.tanggal} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} required />
                            <CalendarClock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Jam <span className="text-rose-500">*</span></Label>
                        <Input type="time" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9" value={formData.jam} onChange={e => setFormData({ ...formData, jam: e.target.value })} required />
                    </div>
                </div>
            </div>

            {/* DETAIL TEMUAN */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="bg-orange-100 dark:bg-orange-900/50 p-1.5 rounded-lg text-orange-600 dark:text-orange-400">
                        <Tags className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Kategori & Deskripsi</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Kategori 4M (Pilih min. 1) <span className="text-rose-500">*</span></Label>
                        <div className="flex flex-wrap gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                            {KATEGORI_4M.map(cat => (
                                <div key={cat} className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-md border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                    <Checkbox 
                                        id={cat} 
                                        checked={formData.kategori4M.includes(cat)}
                                        onCheckedChange={() => handleCheckboxChange(cat)}
                                        className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                    />
                                    <label htmlFor={cat} className="text-xs font-bold leading-none cursor-pointer text-slate-700 dark:text-slate-300">
                                        {cat}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Deskripsi Rinci Temuan <span className="text-rose-500">*</span>
                            </Label>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSpeechRecognition('temuan')}
                                className={`h-7 px-2.5 text-[10px] font-bold gap-1.5 rounded-full transition-colors shadow-sm ${isListening ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 ring-2 ring-rose-200 ring-offset-1 dark:ring-offset-slate-950' : 'bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}
                                title="Gunakan suara untuk mengetik (Dictation)"
                            >
                                {isListening ? (
                                    <><Mic className="w-3.5 h-3.5 animate-pulse" /> Mendengarkan...</>
                                ) : (
                                    <><Mic className="w-3.5 h-3.5" /> Dictation</>
                                )}
                            </Button>
                        </div>
                        <Textarea 
                            className="bg-white dark:bg-slate-950 resize-none text-sm min-h-[100px] border-slate-200 dark:border-slate-800 shadow-sm focus-visible:ring-indigo-500"
                            placeholder="Jelaskan temuan secara detail. Contoh: Ditemukan kebocoran oli pada mesin press hidrolik nomor 3..." 
                            value={formData.temuan}
                            onChange={e => setFormData({ ...formData, temuan: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* DOKUMENTASI */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Camera className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Dokumentasi Awal</h3>
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <Input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="bg-white dark:bg-slate-950 pl-10 cursor-pointer h-10 text-xs pt-2.5 border-dashed border-2 border-slate-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors" 
                        />
                        <UploadCloud className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-500 transition-colors" />
                    </div>
                    
                    {fotoPreviews.length > 0 && (
                        <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950">
                            <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">Foto yang akan diupload ({fotoPreviews.length}):</Label>
                            <div className="flex flex-wrap gap-3">
                                {fotoPreviews.map((src, idx) => (
                                    <div key={idx} className="w-20 h-20 border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden relative bg-slate-100 dark:bg-slate-800 shadow-sm group">
                                        <img src={src} alt={`Preview ${idx}`} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {initialData?.fotoUrls && initialData.fotoUrls.length > 0 && (
                        <div className="flex gap-2 text-xs text-amber-700 dark:text-amber-500 mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50">
                            <Info className="w-4 h-4 shrink-0" />
                            <p>Data ini sudah memiliki <b>{initialData.fotoUrls.length} foto</b> sebelumnya. Mengupload file baru di sini akan menambah ke daftar foto tersebut.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // Komponen konten form tindak lanjut (Hanya untuk mode Edit/Improve)
    const TindakLanjutFormContent = () => (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
                        <Wrench className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Status & Tindakan Perbaikan</h3>
                </div>
                
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Status Perbaikan</Label>
                        <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                            <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-10 w-full sm:w-[200px] font-semibold">
                                <SelectValue placeholder="Pilih Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="OPEN"><span className="text-rose-600 font-bold">Open</span></SelectItem>
                                <SelectItem value="IN_PROGRESS"><span className="text-amber-600 font-bold">In Progress</span></SelectItem>
                                <SelectItem value="CLOSED"><span className="text-emerald-600 font-bold">Closed</span></SelectItem>
                            </SelectContent>
                        </Select>
                        {formData.status === 'CLOSED' && !formData.tindakanPerbaikan && (
                            <p className="text-[10px] text-amber-600 flex items-center gap-1 mt-1 font-medium"><AlertCircle className="w-3 h-3" /> Status Closed sebaiknya memiliki keterangan tindakan perbaikan.</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Deskripsi Tindakan Perbaikan
                            </Label>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSpeechRecognition('perbaikan')}
                                className={`h-7 px-2.5 text-[10px] font-bold gap-1.5 rounded-full transition-colors shadow-sm ${isListeningPerbaikan ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 ring-2 ring-rose-200 ring-offset-1 dark:ring-offset-slate-950' : 'bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}
                            >
                                {isListeningPerbaikan ? (
                                    <><Mic className="w-3.5 h-3.5 animate-pulse" /> Mendengarkan...</>
                                ) : (
                                    <><Mic className="w-3.5 h-3.5" /> Dictation</>
                                )}
                            </Button>
                        </div>
                        <Textarea 
                            className="bg-white dark:bg-slate-950 resize-none text-sm min-h-[120px] border-slate-200 dark:border-slate-800 shadow-sm focus-visible:ring-indigo-500"
                            placeholder="Jelaskan tindakan perbaikan yang telah dilakukan secara rinci..." 
                            value={formData.tindakanPerbaikan}
                            onChange={e => setFormData({ ...formData, tindakanPerbaikan: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Camera className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Dokumentasi Perbaikan</h3>
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <Input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            onChange={handleFotoPerbaikanChange} 
                            className="bg-white dark:bg-slate-950 pl-10 cursor-pointer h-10 text-xs pt-2.5 border-dashed border-2 border-slate-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors" 
                        />
                        <UploadCloud className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-emerald-500 transition-colors" />
                    </div>
                    
                    {fotoPerbaikanPreviews.length > 0 && (
                        <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950">
                            <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">Foto Perbaikan yang akan diupload ({fotoPerbaikanPreviews.length}):</Label>
                            <div className="flex flex-wrap gap-3">
                                {fotoPerbaikanPreviews.map((src, idx) => (
                                    <div key={idx} className="w-20 h-20 border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden relative bg-slate-100 dark:bg-slate-800 shadow-sm group">
                                        <img src={src} alt={`Preview Perbaikan ${idx}`} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {initialData?.fotoPerbaikanUrls && initialData.fotoPerbaikanUrls.length > 0 && (
                        <div className="flex gap-2 text-xs text-amber-700 dark:text-amber-500 mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50">
                            <Info className="w-4 h-4 shrink-0" />
                            <p>Data ini sudah memiliki <b>{initialData.fotoPerbaikanUrls.length} foto perbaikan</b> sebelumnya. Mengupload file baru di sini akan menambah ke daftar foto tersebut.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] p-0 overflow-hidden flex flex-col bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
                
                {/* Custom Header with Gradient Banner */}
                <div className="relative">
                    <div className={`absolute inset-0 h-24 ${initialData ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gradient-to-r from-indigo-600 to-purple-700'} opacity-100`} />
                    <DialogHeader className="relative z-10 px-6 pt-6 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md border border-white/30 text-white shadow-inner">
                                {initialData ? <Wrench className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                            </div>
                            <div className="text-left">
                                <DialogTitle className="text-xl font-black text-white tracking-tight">
                                    {initialData ? 'Improve Temuan Peduli' : 'Tambah Temuan Baru'}
                                </DialogTitle>
                                <DialogDescription className="text-white/80 text-xs mt-0.5 font-medium">
                                    {initialData ? 'Update status dan dokumentasi tindak lanjut perbaikan.' : 'Catat temuan ketidaksesuaian 4M di area kerja dengan detail.'}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden h-full">
                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/30 dark:bg-slate-950 scrollbar-hide">
                        {initialData ? (
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                                    <TabsTrigger value="informasi" className="rounded-lg text-xs sm:text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm transition-all py-2">
                                        Informasi Temuan
                                    </TabsTrigger>
                                    <TabsTrigger value="tindaklanjut" className="rounded-lg text-xs sm:text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all py-2">
                                        Tindak Lanjut
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="informasi" className="mt-0 outline-none">
                                    {InformasiFormContent()}
                                </TabsContent>
                                <TabsContent value="tindaklanjut" className="mt-0 outline-none">
                                    {TindakLanjutFormContent()}
                                </TabsContent>
                            </Tabs>
                        ) : (
                            InformasiFormContent()
                        )}
                    </div>

                    {/* Fixed Footer */}
                    <div className="px-6 py-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 shrink-0 rounded-b-2xl">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="font-bold border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 h-10 px-6 rounded-xl"
                            onClick={() => onOpenChange(false)}
                        >
                            Batal
                        </Button>
                        
                        {initialData && activeTab === 'informasi' ? (
                            <Button 
                                type="button" 
                                className="font-bold bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-6 rounded-xl shadow-sm"
                                onClick={() => setActiveTab('tindaklanjut')}
                            >
                                Lanjut ke Perbaikan &rarr;
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="font-bold bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-8 rounded-xl shadow-sm gap-2" 
                                disabled={loading || (!initialData && !isInformasiLengkap)}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Menyimpan...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Simpan Data</span>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
