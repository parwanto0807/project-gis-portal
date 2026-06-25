'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { ArrowLeft, Save, CheckCircle, XCircle, Camera } from 'lucide-react';
import Link from 'next/link';

export default function SuggestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Employee Info (Read Only)
    const [suggestion, setSuggestion] = useState<any>(null);
    
    // Photo State
    const [fotoEvaluasi, setFotoEvaluasi] = useState<string[]>([]);

    // Evaluation Form State
    const [formData, setFormData] = useState({
        ngRatioSebelum: '',
        ngRatioSesudah: '',
        impactTurun: '',
        kategoriApresiasi: '',
        nominalApresiasi: '',
        catatan: '',
        
        picImplementasi: '',
        targetSelesai: '',
        tanggalAktual: '',
        hasilEvaluasi: '',
        statusApproval: ''
    });

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const res = await api.get(`/suggestions/${id}`);
                if (res.data.success) {
                    const data = res.data.data;
                    setSuggestion(data);
                    setFormData({
                        ngRatioSebelum: data.ngRatioSebelum?.toString() || '',
                        ngRatioSesudah: data.ngRatioSesudah?.toString() || '',
                        impactTurun: data.impactTurun?.toString() || '',
                        kategoriApresiasi: data.kategoriApresiasi || '',
                        nominalApresiasi: data.nominalApresiasi?.toString() || '',
                        catatan: data.catatan || '',
                        
                        picImplementasi: data.picImplementasi || '',
                        targetSelesai: data.targetSelesai ? new Date(data.targetSelesai).toISOString().slice(0, 10) : '',
                        tanggalAktual: data.tanggalAktual ? new Date(data.tanggalAktual).toISOString().slice(0, 10) : '',
                        hasilEvaluasi: data.hasilEvaluasi || '',
                        statusApproval: data.statusApproval || 'PENDING'
                    });
                }
            } catch (error) {
                toast.error('Gagal mengambil data suggestion');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestion();
    }, [id]);

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
                    setFotoEvaluasi(prev => [...prev, event.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    
    const removePhoto = (index: number) => {
        setFotoEvaluasi(prev => prev.filter((_, i) => i !== index));
    };

    const handleAction = async (status: string) => {
        try {
            setSaving(true);
            
            const payload = {
                ...formData,
                statusApproval: status,
                ngRatioSebelum: formData.ngRatioSebelum ? parseFloat(formData.ngRatioSebelum) : null,
                ngRatioSesudah: formData.ngRatioSesudah ? parseFloat(formData.ngRatioSesudah) : null,
                impactTurun: formData.impactTurun ? parseFloat(formData.impactTurun) : null,
                nominalApresiasi: formData.nominalApresiasi ? parseFloat(formData.nominalApresiasi) : null,
                tanggalApproval: status !== 'PENDING' ? new Date().toISOString() : null,
                fotoEvaluasiBase64: fotoEvaluasi
            };

            const res = await api.put(`/suggestions/${id}`, payload);
            if (res.data.success) {
                toast.success(`Berhasil! Status diubah menjadi ${status}`);
                router.push('/admin/suggestions');
            }
        } catch (error) {
            toast.error('Gagal memperbarui data');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Memuat data...</div>;
    if (!suggestion) return <div className="p-8 text-center text-red-500">Data tidak ditemukan.</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/suggestions">
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-full">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Evaluasi Suggestion System</h1>
                        <p className="text-xs text-slate-500">Review Ide Improvement: <span className="font-bold text-indigo-600">{suggestion.noForm}</span></p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        suggestion.statusApproval === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                        suggestion.statusApproval === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                        {suggestion.statusApproval}
                    </span>
                </div>
            </div>

            {/* Read-Only Info from Employee */}
            <Card className="overflow-hidden pt-0 gap-0 border-slate-200">
                <CardHeader className="bg-slate-50 border-b py-4">
                    <CardTitle className="text-sm font-bold text-slate-700">Data Ide Improvement (Dari Karyawan)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Label className="text-xs font-semibold text-slate-500">Pengusul</Label>
                            <p className="font-semibold text-sm">{suggestion.namaKaryawan} ({suggestion.nik})</p>
                            <p className="text-xs text-slate-500">{suggestion.departemen}</p>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold text-slate-500">Tanggal / Periode</Label>
                            <p className="font-semibold text-sm">{new Date(suggestion.tanggal).toLocaleDateString('id-ID')}</p>
                            <p className="text-xs text-slate-500">{suggestion.periode}</p>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold text-slate-500">Lokasi / Area</Label>
                            <p className="font-semibold text-sm">{suggestion.areaProses}</p>
                            <p className="text-xs text-slate-500">{suggestion.areaTemuan || '-'}</p>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold text-slate-500">Focus Defect</Label>
                            <p className="font-semibold text-sm">{suggestion.focusDefect || '-'}</p>
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 space-y-4">
                        <div>
                            <Label className="text-xs font-bold text-blue-600">Judul Ide Improvement</Label>
                            <p className="text-sm font-medium p-3 bg-slate-50 rounded-md border border-slate-100 mt-1">{suggestion.judulIde}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-rose-600">Kondisi Saat Ini</Label>
                                <p className="text-sm p-3 bg-slate-50 rounded-md border border-slate-100 mt-1 whitespace-pre-wrap">{suggestion.kondisiSaatIni}</p>
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-orange-600">Akar Masalah</Label>
                                <p className="text-sm p-3 bg-slate-50 rounded-md border border-slate-100 mt-1 whitespace-pre-wrap">{suggestion.akarMasalah}</p>
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-emerald-600">Usulan Improvement</Label>
                            <p className="text-sm p-3 bg-slate-50 rounded-md border border-slate-100 mt-1 whitespace-pre-wrap">{suggestion.usulanImprovement}</p>
                        </div>
                        {suggestion.fotoKondisiUrls && suggestion.fotoKondisiUrls.length > 0 && (
                            <div>
                                <Label className="text-xs font-bold text-indigo-600">Foto / Lampiran dari Karyawan</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-2">
                                    {suggestion.fotoKondisiUrls.map((url: string, i: number) => (
                                        <div key={i} className="relative rounded-md overflow-hidden border border-slate-200">
                                            <a href={url.startsWith('http') ? url : `http://localhost:5008${url}`} target="_blank" rel="noreferrer">
                                                <img src={url.startsWith('http') ? url : `http://localhost:5008${url}`} alt={`Kondisi ${i}`} className="w-full h-24 object-cover hover:opacity-80 transition-opacity" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAction(formData.statusApproval); }}>
                {/* NG Ratio Estimation */}
                <Card className="overflow-hidden pt-0 gap-0 shadow-md border-indigo-100">
                    <CardHeader className="bg-indigo-600 border-b py-4">
                        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">Form Evaluasi: Estimasi Dampak</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">NG Ratio Sebelum (%)</Label>
                                <Input type="number" step="0.01" name="ngRatioSebelum" value={formData.ngRatioSebelum} onChange={handleChange} className="h-9 focus-visible:ring-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-center w-full block">NG Ratio Sesudah<br/><span className="text-[10px] font-normal text-slate-500">(Avg 2 Bln SPK)</span></Label>
                                <Input type="number" step="0.01" name="ngRatioSesudah" value={formData.ngRatioSesudah} onChange={handleChange} className="h-9 focus-visible:ring-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Impact Turun (%)</Label>
                                <Input type="number" step="0.01" name="impactTurun" value={formData.impactTurun} onChange={handleChange} className="h-9 focus-visible:ring-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Kategori Apresiasi</Label>
                                <select 
                                    name="kategoriApresiasi" 
                                    value={formData.kategoriApresiasi} 
                                    onChange={handleChange as any} 
                                    className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
                                >
                                    <option value="">Pilih Kategori...</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Bronze">Bronze</option>
                                </select>
                                <p className="text-[10px] text-slate-500 leading-tight">
                                    Standar: <b>Gold</b> (Major Impact), <b>Silver</b> (Medium Impact), <b>Bronze</b> (Minor Impact).
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Nominal Apresiasi (Rp)</Label>
                                <Input type="number" name="nominalApresiasi" value={formData.nominalApresiasi} onChange={handleChange} className="h-9 focus-visible:ring-indigo-500" placeholder="0" />
                                <p className="text-[10px] text-slate-500 leading-tight">
                                    Acuan: Gold (&gt;250rb), Silver (100-250rb), Bronze (50-100rb).
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <Label className="text-xs font-semibold">Catatan Evaluator</Label>
                            <Input type="text" name="catatan" value={formData.catatan} onChange={handleChange} className="h-9 focus-visible:ring-indigo-500" />
                        </div>
                    </CardContent>
                </Card>

                {/* Implementation Plan */}
                <Card className="overflow-hidden pt-0 gap-0 shadow-md border-teal-100">
                    <CardHeader className="bg-teal-600 border-b py-4">
                        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">Form Evaluasi: Rencana Implementasi</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">PIC Implementasi</Label>
                                <Input type="text" name="picImplementasi" value={formData.picImplementasi} onChange={handleChange as any} className="h-9 focus-visible:ring-teal-500" placeholder="Misal: Benz Kautsar, Ismanto" />
                                <p className="text-[10px] text-slate-500 leading-tight">
                                    Bisa diisi beberapa Karyawan (pisahkan dengan koma).
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Target Selesai</Label>
                                <Input type="date" name="targetSelesai" value={formData.targetSelesai} onChange={handleChange} className="h-9 focus-visible:ring-teal-500" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Tanggal Aktual</Label>
                                <Input type="date" name="tanggalAktual" value={formData.tanggalAktual} onChange={handleChange} className="h-9 focus-visible:ring-teal-500" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold">Hasil Evaluasi Akhir</Label>
                                <Input type="text" name="hasilEvaluasi" value={formData.hasilEvaluasi} onChange={handleChange} className="h-9 focus-visible:ring-teal-500" />
                            </div>
                            
                            <div className="space-y-2 lg:col-span-4">
                                <Label className="text-xs font-semibold">Foto Hasil Implementasi / Bukti (Opsional)</Label>
                                
                                <Label htmlFor="foto-evaluasi" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-teal-50 hover:border-teal-300 cursor-pointer transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Camera className="w-8 h-8 text-slate-400 mb-2" />
                                        <p className="text-sm font-semibold text-slate-600">Ketuk untuk Ambil Foto Bukti</p>
                                        <p className="text-xs text-slate-500">(Bisa pilih lebih dari 1 foto)</p>
                                    </div>
                                    <input id="foto-evaluasi" type="file" multiple accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
                                </Label>
                                
                                {/* Display existing photos if any */}
                                {suggestion?.fotoEvaluasiUrls && suggestion.fotoEvaluasiUrls.length > 0 && fotoEvaluasi.length === 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-4">
                                        {suggestion.fotoEvaluasiUrls.map((url: string, i: number) => (
                                            <div key={`exist-${i}`} className="relative rounded-md overflow-hidden border border-slate-200">
                                                <a href={url.startsWith('http') ? url : `http://localhost:5008${url}`} target="_blank" rel="noreferrer">
                                                    <img src={url.startsWith('http') ? url : `http://localhost:5008${url}`} alt={`Evaluasi ${i}`} className="w-full h-24 object-cover" />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Display newly selected photos */}
                                {fotoEvaluasi.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-4">
                                        {fotoEvaluasi.map((src, i) => (
                                            <div key={`new-${i}`} className="relative group rounded-md overflow-hidden border border-slate-200">
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
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center md:text-left">
                    <div className="text-sm text-slate-500">
                        Pastikan semua evaluasi terisi dengan benar sebelum memberikan Approval.
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <Button 
                            type="button" 
                            variant="outline" 
                            disabled={saving}
                            onClick={() => handleAction('PENDING')}
                        >
                            Simpan Draft
                        </Button>
                        <Button 
                            type="button" 
                            variant="destructive" 
                            disabled={saving} 
                            onClick={() => handleAction('REJECTED')}
                            className="gap-2 bg-red-600 hover:bg-red-700"
                        >
                            <XCircle className="w-4 h-4" /> Reject Ide
                        </Button>
                        <Button 
                            type="button" 
                            disabled={saving} 
                            onClick={() => handleAction('APPROVED')}
                            className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-white"
                        >
                            <CheckCircle className="w-4 h-4" /> Approve & Simpan
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
