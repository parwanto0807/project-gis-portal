'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, CalendarClock, Tags, FileText, Camera, UploadCloud, CheckCircle, Mic } from 'lucide-react';
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
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg flex items-center gap-2">
                        {initialData ? 'Improve Temuan Peduli' : 'Tambah Temuan Peduli'}
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
                            <div className="flex items-center justify-between">
                                <Label className="flex items-center gap-1.5 text-xs text-slate-600">
                                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                                    Deskripsi Rinci
                                </Label>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleSpeechRecognition('temuan')}
                                    className={`h-7 px-2.5 text-[10px] font-semibold gap-1.5 rounded-md transition-colors shadow-sm ${isListening ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 ring-2 ring-rose-200 ring-offset-1' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700'}`}
                                    title="Gunakan suara untuk mengetik (Dictation)"
                                >
                                    {isListening ? (
                                        <><Mic className="w-3.5 h-3.5 animate-pulse text-rose-600" /> Mendengarkan...</>
                                    ) : (
                                        <><Mic className="w-3.5 h-3.5" /> Dictation</>
                                    )}
                                </Button>
                            </div>
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

                    {/* SECTION 4: TINDAK LANJUT & PERBAIKAN (Only shown when editing/improving) */}
                    {initialData && (
                        <div className="space-y-3 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Tindak Lanjut & Perbaikan</span>
                            </div>
                            
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-600">Status Perbaikan</Label>
                                <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                                    <SelectTrigger className="bg-white h-8 text-xs">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="OPEN">Open</SelectItem>
                                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                        <SelectItem value="CLOSED">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5 pt-1">
                                <div className="flex items-center justify-between">
                                    <Label className="flex items-center gap-1.5 text-xs text-slate-600">
                                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                                        Tindakan Perbaikan
                                    </Label>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleSpeechRecognition('perbaikan')}
                                        className={`h-7 px-2.5 text-[10px] font-semibold gap-1.5 rounded-md transition-colors shadow-sm ${isListeningPerbaikan ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200 ring-2 ring-rose-200 ring-offset-1' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700'}`}
                                        title="Gunakan suara untuk mengetik (Dictation)"
                                    >
                                        {isListeningPerbaikan ? (
                                            <><Mic className="w-3.5 h-3.5 animate-pulse text-rose-600" /> Mendengarkan...</>
                                        ) : (
                                            <><Mic className="w-3.5 h-3.5" /> Dictation</>
                                        )}
                                    </Button>
                                </div>
                                <Textarea 
                                    className="bg-white resize-none text-xs min-h-[80px]"
                                    placeholder="Jelaskan tindakan perbaikan yang telah dilakukan..." 
                                    value={formData.tindakanPerbaikan}
                                    onChange={e => setFormData({ ...formData, tindakanPerbaikan: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-slate-600">Dokumentasi Foto Perbaikan</Label>
                                <div className="relative">
                                    <Input type="file" multiple accept="image/*" onChange={handleFotoPerbaikanChange} className="bg-white pl-8 cursor-pointer h-8 text-xs pt-1.5" />
                                    <UploadCloud className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                
                                {fotoPerbaikanPreviews.length > 0 && (
                                    <div className="p-2.5 border border-slate-200 rounded-md bg-white mt-2">
                                        <Label className="text-[10px] text-slate-500 mb-1.5 block uppercase tracking-wider">Foto Perbaikan yang akan diupload:</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {fotoPerbaikanPreviews.map((src, idx) => (
                                                <div key={idx} className="w-16 h-16 border border-slate-200 rounded-md overflow-hidden relative bg-slate-100 shadow-sm group">
                                                    <img src={src} alt={`Preview Perbaikan ${idx}`} className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {initialData?.fotoPerbaikanUrls && initialData.fotoPerbaikanUrls.length > 0 && (
                                    <div className="text-[10px] text-amber-600 mt-2 p-2 bg-amber-50 rounded-md border border-amber-200 font-medium">
                                        * Data ini sudah memiliki {initialData.fotoPerbaikanUrls.length} foto perbaikan sebelumnya. Upload file baru akan menambah ke daftar foto perbaikan.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <DialogFooter className="mt-4 pt-2">
                        <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={() => onOpenChange(false)}>Batal</Button>
                        <Button type="submit" size="sm" className="h-8 text-xs px-6" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
