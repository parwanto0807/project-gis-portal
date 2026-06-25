'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { ArrowLeft, Save, Search, User as UserIcon, Camera } from 'lucide-react';
import Link from 'next/link';

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

const parseUrls = (urls: any): string[] => {
    if (!urls) return [];
    if (Array.isArray(urls)) return urls;
    if (typeof urls === 'string') {
        try {
            const parsed = JSON.parse(urls);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {
            return [urls];
        }
    }
    return [];
};

const formatImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '').replace('/api', '') || 'http://localhost:5008';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function EditSuggestionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
    
    // Photo State
    const [fotoKondisi, setFotoKondisi] = useState<string[]>([]);
    
    // Form State
    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().slice(0, 10),
        periode: '',
        namaKaryawan: '',
        nik: '',
        departemen: '',
        areaProses: '',
        areaTemuan: '',
        focusDefect: '',
        
        judulIde: '',
        kondisiSaatIni: '',
        akarMasalah: '',
        usulanImprovement: ''
    });

    useEffect(() => {
        // Auto calculate periode based on tanggal
        const d = new Date(formData.tanggal);
        if (!isNaN(d.getTime())) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
            const periodeStr = `${months[d.getMonth()]} ${d.getFullYear()}`;
            if (formData.periode !== periodeStr) {
                setFormData(prev => ({ ...prev, periode: periodeStr }));
            }
        }
    }, [formData.tanggal]);

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const res = await api.get(`/suggestions/${id}`);
                if (res.data.success) {
                    const data = res.data.data;
                    setFormData({
                        tanggal: data.tanggal ? new Date(data.tanggal).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
                        periode: data.periode || '',
                        namaKaryawan: data.namaKaryawan || '',
                        nik: data.nik || '',
                        departemen: data.departemen || '',
                        areaProses: data.areaProses || '',
                        areaTemuan: data.areaTemuan || '',
                        focusDefect: data.focusDefect || '',
                        judulIde: data.judulIde || '',
                        kondisiSaatIni: data.kondisiSaatIni || '',
                        akarMasalah: data.akarMasalah || '',
                        usulanImprovement: data.usulanImprovement || ''
                    });
                    if (data.fotoKondisiUrls) {
                        setExistingPhotos(parseUrls(data.fotoKondisiUrls));
                    }
                }
            } catch (error) {
                toast.error('Gagal mengambil data suggestion');
            }
        };
        if (id) fetchSuggestion();
    }, [id]);

    useEffect(() => {
        // Fetch employees
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/discipline-reports/employees/master', {
                    params: { search: searchTerm, limit: 100 }
                });
                if (res.data.success) {
                    setEmployees(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        };
        
        const timeoutId = setTimeout(() => {
            if (searchTerm.length > 0 || employees.length === 0) {
                fetchEmployees();
            }
        }, 500);
        
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleSelectEmployee = (emp: any) => {
        setFormData(prev => ({
            ...prev,
            namaKaryawan: emp.NAMA,
            nik: emp.NIK || '',
            departemen: emp.mstdept?.CNM_DEPT || emp.KD_DEPT || ''
        }));
        setSearchTerm(emp.NAMA);
        setShowDropdown(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setFotoKondisi(prev => [...prev, event.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    
    const removePhoto = (index: number) => {
        setFotoKondisi(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const payload = {
                ...formData,
                fotoKondisiBase64: fotoKondisi.length > 0 ? fotoKondisi : undefined
            };

            const res = await api.put(`/suggestions/${id}`, payload);
            if (res.data.success) {
                toast.success('Ide Improvement berhasil diperbarui');
                router.push('/admin/suggestions');
            }
        } catch (error) {
            toast.error('Gagal menyimpan Ide Improvement. Pastikan Backend & Prisma telah sinkron.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/admin/suggestions">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-full">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Form Suggestion</h1>
                    <p className="text-xs text-slate-500">Program PEDULI BERSINERGI - Disiplin & Turunkan NG Ratio</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Header Information */}
                <Card className="overflow-hidden pt-0 gap-0">
                    <CardHeader className="bg-indigo-50 border-b py-4">
                        <CardTitle className="text-sm font-bold text-indigo-700">Informasi Dasar</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Tanggal</Label>
                                <Input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} required className="h-9" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Periode (Otomatis)</Label>
                                <Input type="text" name="periode" value={formData.periode} readOnly className="h-9 bg-slate-50 text-slate-500 font-medium cursor-not-allowed" />
                            </div>
                            
                            <div className="space-y-2 relative">
                                <Label className="text-xs font-semibold">Cari Nama Karyawan</Label>
                                <div className="relative">
                                    <Input 
                                        type="text" 
                                        placeholder="Ketik nama karyawan..." 
                                        value={searchTerm} 
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setShowDropdown(true);
                                            // Reset if empty
                                            if(!e.target.value) {
                                                setFormData(prev => ({...prev, namaKaryawan: '', nik: '', departemen: ''}));
                                            }
                                        }} 
                                        onFocus={() => setShowDropdown(true)}
                                        className="h-9 pl-8" 
                                    />
                                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                                {showDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                                        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {employees.length === 0 ? (
                                                <div className="p-3 text-xs text-slate-500 text-center">Data tidak ditemukan</div>
                                            ) : (
                                                employees.map((emp) => (
                                                    <div 
                                                        key={emp.EMPL_ID} 
                                                        className="px-3 py-2 hover:bg-indigo-50 cursor-pointer flex flex-col border-b border-slate-100 last:border-0"
                                                        onClick={() => handleSelectEmployee(emp)}
                                                    >
                                                        <span className="text-xs font-bold text-slate-800">{emp.NAMA}</span>
                                                        <span className="text-[10px] text-slate-500">{emp.NIK || '-'} &bull; {emp.mstdept?.CNM_DEPT || emp.KD_DEPT || 'Dept Unknown'}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </>
                                )}
                                {/* Hidden inputs to ensure they are submitted and validated if required */}
                                <input type="hidden" name="namaKaryawan" value={formData.namaKaryawan} required />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">NIK</Label>
                                <Input type="text" name="nik" value={formData.nik} onChange={handleChange} required className="h-9 bg-slate-50" readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Departemen</Label>
                                <Input type="text" name="departemen" value={formData.departemen} onChange={handleChange} required className="h-9 bg-slate-50" readOnly />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Area (Gedung)</Label>
                                <Select value={formData.areaProses} onValueChange={(val) => setFormData({ ...formData, areaProses: val, areaTemuan: '' })}>
                                    <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9">
                                        <SelectValue placeholder="Pilih Area Gedung" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Area Temuan / Proses</Label>
                                <Select value={formData.areaTemuan} onValueChange={(val) => setFormData({ ...formData, areaTemuan: val })} disabled={!formData.areaProses}>
                                    <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9">
                                        <SelectValue placeholder="Pilih Area Temuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formData.areaProses && (TEMPAT_TEMUAN as any)[formData.areaProses]?.map((t: string) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Focus Defect</Label>
                                <Input type="text" name="focusDefect" value={formData.focusDefect} onChange={handleChange} className="h-9" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <Card className="overflow-hidden pt-0 gap-0">
                    <CardHeader className="bg-blue-600 border-b py-4">
                        <CardTitle className="text-sm font-bold text-white">Detail Ide Improvement</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold">Judul Ide Improvement <span className="text-red-500">*</span></Label>
                            <Input type="text" name="judulIde" value={formData.judulIde} onChange={handleChange} required className="h-10" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold">Kondisi Saat Ini / Masalah yang Terjadi <span className="text-red-500">*</span></Label>
                            <Textarea name="kondisiSaatIni" value={formData.kondisiSaatIni} onChange={handleChange} required className="min-h-[100px]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold">Foto Lampiran Kondisi (Opsional)</Label>
                            
                            <Label htmlFor="foto-kondisi" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera className="w-8 h-8 text-slate-400 mb-2" />
                                    <p className="text-sm font-semibold text-slate-600">Ketuk untuk Ambil Foto</p>
                                    <p className="text-xs text-slate-500">(Bisa pilih lebih dari 1 foto)</p>
                                </div>
                                <input id="foto-kondisi" type="file" multiple accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
                            </Label>

                            {/* Display existing photos */}
                            {existingPhotos.length > 0 && fotoKondisi.length === 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    {existingPhotos.map((url, i) => (
                                        <div key={i} className="relative rounded-md overflow-hidden border border-slate-200 group">
                                            <a href={formatImageUrl(url)} target="_blank" rel="noreferrer">
                                                <img src={formatImageUrl(url)} alt={`Kondisi ${i}`} className="w-full h-24 object-cover hover:opacity-80 transition-opacity" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Display newly selected photos */}
                            {fotoKondisi.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    {fotoKondisi.map((src, i) => (
                                        <div key={i} className="relative group rounded-md overflow-hidden border border-slate-200">
                                            <img src={src} alt={`Preview ${i}`} className="w-full h-24 object-cover" />
                                            <button 
                                                type="button" 
                                                onClick={() => removePhoto(i)} 
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold">Akar Masalah / Penyebab Utama <span className="text-red-500">*</span></Label>
                            <Textarea name="akarMasalah" value={formData.akarMasalah} onChange={handleChange} required className="min-h-[100px]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold">Usulan Improvement <span className="text-red-500">*</span></Label>
                            <Textarea name="usulanImprovement" value={formData.usulanImprovement} onChange={handleChange} required className="min-h-[120px]" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <Link href="/admin/suggestions" className="w-full sm:w-auto">
                        <Button type="button" variant="outline" className="w-full">Batal</Button>
                    </Link>
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 gap-2">
                        {loading ? 'Menyimpan...' : <><Save className="w-4 h-4" /> Update Suggestion</>}
                    </Button>
                </div>

            </form>
        </div>
    );
}
