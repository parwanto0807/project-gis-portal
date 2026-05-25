'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { generateDisciplineReportPDF } from '@/utils/pdfGenerator';
import HeaderCard from '@/components/ui/header-card';
import { 
    ClipboardCheck, 
    Plus, 
    RefreshCw, 
    Camera, 
    MapPin, 
    User, 
    Clock, 
    Search,
    Filter,
    CheckCircle2,
    Calendar,
    ShieldAlert,
    Building2,
    Hash,
    Info,
    AlertTriangle,
    ArrowUpRight,
    X,
    FileDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function DisciplineReportsPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Resolution state
    const [actionTaken, setActionTaken] = useState('');
    const [improvementPlan, setImprovementPlan] = useState('');
    const [resolveLoading, setResolveLoading] = useState(false);
    
    // Resolution Ext 
    const [resolutionSummary, setResolutionSummary] = useState('');
    const [actionDate, setActionDate] = useState(new Date().toISOString().split('T')[0]);
    const [resolutionPhoto, setResolutionPhoto] = useState<string | null>(null);
    const resolutionFileRef = useRef<HTMLInputElement>(null);
    
    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await api.get('/discipline-reports');
            if (res.data.success) {
                setReports(res.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const severityMap: Record<string, { label: string, color: string, level: number }> = {
        "Sleeping / Tidur": { label: "Critical", color: "bg-rose-500", level: 3 },
        "Playing Phone / Main HP": { label: "Moderate", color: "bg-amber-500", level: 2 },
        "Chatting / Ngobrol": { label: "Low", color: "bg-blue-500", level: 1 },
        "Relaxing / Santai": { label: "Low", color: "bg-blue-500", level: 1 },
        "Late Return / Telat Balik Istirahat": { label: "Moderate", color: "bg-amber-500", level: 2 },
        "Other / Lainnya": { label: "Info", color: "bg-slate-500", level: 0 },
    };

    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const matchesSearch = 
                report.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.type.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'All' || report.type === filterType;
            return matchesSearch && matchesFilter;
        });
    }, [reports, searchTerm, filterType]);

    const handleExportPDF = async () => {
        const loadingToast = toast.loading('Generating PDF...');
        try {
            // Fetch company profile
            const res = await api.get('/companies/active');
            let company = { name: "GIS Portal Error - Missing Company" };
            if (res.data.success) {
                company = res.data.data;
            }
            
            // Pass the current filteredReports
            await generateDisciplineReportPDF(company as any, filteredReports);
            toast.success('PDF successfully generated', { id: loadingToast });
        } catch (error) {
            console.error('PDF Export Error:', error);
            // Fallback generated PDF without backend company headers if API fails
            await generateDisciplineReportPDF({ name: "GIS Portal Admin" } as any, filteredReports);
            toast.success('PDF generated with default headers', { id: loadingToast });
        }
    };

    const handleViewDetail = (report: any) => {
        setSelectedReport(report);
        setActionTaken(report.actionTaken || '');
        setImprovementPlan(report.improvementPlan || '');
        setResolutionSummary(report.resolutionSummary || '');
        setActionDate(report.actionDate ? new Date(report.actionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
        setResolutionPhoto(report.resolutionPhotoUrl ? `${window.location.protocol}//${window.location.hostname}:5001${report.resolutionPhotoUrl.startsWith('/') ? '' : '/'}${report.resolutionPhotoUrl}` : null);
        setIsDialogOpen(true);
    };

    const handleResolutionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResolutionPhoto(reader.result as string);
                toast.success('Resolution proof secured');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResolve = async () => {
        if (!selectedReport || !actionTaken || !improvementPlan) return;
        
        setResolveLoading(true);
        const formData = new FormData();
        formData.append('actionTaken', actionTaken);
        formData.append('improvementPlan', improvementPlan);
        formData.append('resolutionSummary', resolutionSummary);
        formData.append('actionDate', actionDate);

        if (resolutionFileRef.current?.files?.[0]) {
            formData.append('resolutionPhoto', resolutionFileRef.current.files[0]);
        }
        
        try {
            const res = await api.patch(`/discipline-reports/${selectedReport.id}/resolve`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (res.data.success) {
                // Update local state
                setReports(prev => prev.map(r => r.id === selectedReport.id ? res.data.data : r));
                setSelectedReport(res.data.data);
                toast.success('Resolution finalized and logged');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to finalize resolution');
        } finally {
            setResolveLoading(false);
        }
    };

    return (
        <div className="space-y-5 sm:space-y-6 pb-20 -mx-3 sm:mx-0 -mt-2 sm:mt-0">
            {/* Mobile Native App Bar */}
            <div className="sm:hidden flex items-center justify-between bg-zinc-50 border-b border-slate-200/60 pb-3 px-1 sticky top-0 z-50">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Discipline</h1>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Monitor
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleExportPDF} 
                        className="rounded-full bg-white border border-slate-200 shadow-sm h-9 w-9 active:scale-95 transition-all text-slate-600"
                    >
                        <FileDown className="w-4 h-4 text-emerald-600" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={fetchReports} 
                        className="rounded-full bg-white border border-slate-200 shadow-sm h-9 w-9 active:scale-95 transition-all text-slate-600"
                    >
                        <RefreshCw className={loading ? "animate-spin w-4 h-4 text-rose-500" : "w-4 h-4"} />
                    </Button>
                    <Link href="/admin/hr/discipline/new">
                        <Button className="rounded-full bg-slate-900 shadow-md h-9 w-9 p-0 active:scale-95 transition-all outline-none">
                            <Plus className="w-5 h-5 text-white" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Desktop Header Area */}
            <div className="hidden sm:block">
                <HeaderCard
                    title="Discipline Monitor"
                    description="Professional oversight and discipline tracking."
                    icon={<ClipboardCheck className="text-white" />}
                    variant="default"
                    backgroundStyle="gradient"
                    gradientFrom="from-slate-900"
                    gradientTo="to-slate-950"
                    className="w-full shadow-xl"
                    showActionArea={true}
                    actionArea={
                        <div className="flex items-center gap-3">
                            <Button 
                                variant="ghost" 
                                onClick={handleExportPDF} 
                                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/10 rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px]"
                            >
                                <FileDown className="w-4 h-4 mr-2" />
                                Preview PDF
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={fetchReports} 
                                className="bg-white/10 hover:bg-white/20 text-white border-white/10 rounded-xl h-12 w-12"
                            >
                                <RefreshCw className={loading ? "animate-spin w-5 h-5 text-white" : "w-5 h-5"} />
                            </Button>
                            <Link href="/admin/hr/discipline/new">
                                <Button className="bg-white text-slate-950 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl shadow-2xl">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Report
                                </Button>
                            </Link>
                        </div>
                    }
                />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white border-0 shadow-sm rounded-[2rem] p-6 hover:shadow-md transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Reports</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-black text-slate-900">{reports.length}</h4>
                        <Hash className="w-10 h-10 text-slate-100" />
                    </div>
                </Card>
                <Card className="bg-white border-0 shadow-sm rounded-[2rem] p-6 hover:shadow-md transition-all">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Critical Issues</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-black text-rose-600">{reports.filter(r => severityMap[r.type]?.level === 3).length}</h4>
                        <ShieldAlert className="w-10 h-10 text-rose-50" />
                    </div>
                </Card>
                <Card className="bg-white border-0 shadow-sm rounded-[2rem] p-6 hover:shadow-md transition-all">
                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Pending Review</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-black text-amber-600">{reports.filter(r => r.status === 'PENDING').length}</h4>
                        <Clock className="w-10 h-10 text-amber-50" />
                    </div>
                </Card>
                <Card className="bg-white border-0 shadow-sm rounded-[2rem] p-6 hover:shadow-md transition-all">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Resolved</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-black text-emerald-600">{reports.filter(r => r.status === 'RESOLVED').length}</h4>
                        <CheckCircle2 className="w-10 h-10 text-emerald-50" />
                    </div>
                </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-white border-0 shadow-lg lg:shadow-2xl rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden mx-0 xl:mx-0">
                <div className="p-4 sm:p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                    <div className="relative flex-1 w-full lg:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Search employee or type..." 
                            className="pl-11 h-12 lg:h-14 bg-slate-50 border-0 rounded-xl font-bold text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-950 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Horizontal scroll on mobile for filter buttons */}
                    <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 flex bg-slate-50 p-1 rounded-xl scrollbar-hide">
                        {['All', 'Sleeping / Tidur', 'Playing Phone / Main HP', 'Chatting / Ngobrol'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2.5 lg:py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filterType === type 
                                    ? 'bg-white text-slate-950 shadow-sm' 
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {type === 'All' ? 'All' : type.split(' / ')[0]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Cards View */}
                <div className="lg:hidden bg-slate-50/50 p-3 sm:p-4 flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredReports.map((report) => (
                            <motion.div 
                                key={report.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => handleViewDetail(report)}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/60 active:scale-[0.98] transition-transform cursor-pointer flex flex-col gap-3"
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-sm text-slate-700 uppercase border border-slate-100 shrink-0">
                                            {report.employeeName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1.5">
                                                {report.employeeName}
                                                {report.photoUrl && <Camera className="w-3.5 h-3.5 text-rose-500 animate-pulse shrink-0" />}
                                            </h4>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {report.targetEmployeeId}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge className={`
                                        ${report.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-amber-50 text-amber-600 border-amber-100/50'} 
                                        font-black uppercase tracking-wide text-[9px] px-2 py-0.5 border shadow-sm shrink-0 mt-0.5
                                    `}>
                                        {report.status}
                                    </Badge>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${severityMap[report.type]?.color || 'bg-slate-300'} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                                            <span className="font-bold text-slate-700 text-xs">{report.type.split(' / ')[0]}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">"{report.description}"</p>
                                </div>

                                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-1">
                                    <span className="flex items-center gap-1.5 truncate pr-2">
                                        <MapPin className="w-3 h-3 shrink-0" />
                                        <span className="truncate max-w-[120px]">{report.location || "N/A"}</span>
                                    </span>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            {format(new Date(report.createdAt), 'MMM dd')}
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-50">
                                <TableHead className="w-[150px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14 pl-8">Date</TableHead>
                                <TableHead className="w-[250px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14">Personnel</TableHead>
                                <TableHead className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14">Violation</TableHead>
                                <TableHead className="w-[150px] font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14">Location</TableHead>
                                <TableHead className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14">Status / Action</TableHead>
                                <TableHead className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14">Reporter</TableHead>
                                <TableHead className="text-right font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] h-14 pr-8">View</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredReports.map((report) => (
                                    <TableRow key={report.id} className="group hover:bg-slate-50/50 border-slate-50 transition-all cursor-default">
                                        <TableCell className="pl-8 font-bold text-slate-500 text-xs">
                                            {format(new Date(report.createdAt), 'MMM dd, yyyy HH:mm')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                                                        {report.employeeName}
                                                        {report.photoUrl && <Camera className="w-3.5 h-3.5 text-rose-500 animate-pulse" />}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.targetEmployeeId}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${severityMap[report.type]?.color || 'bg-slate-300'} shadow-sm`} />
                                                    <span className="font-bold text-slate-700 text-[13px]">{report.type.split(' / ')[0]}</span>
                                                </div>
                                                <Badge className={`${severityMap[report.type]?.color || 'bg-slate-500'} text-[8px] h-4 font-black uppercase text-white border-0 px-2 flex-shrink-0 scale-90 origin-left`}>
                                                    {severityMap[report.type]?.label || 'General'}
                                                </Badge>
                                                <p className="text-[10px] text-slate-400 font-medium italic line-clamp-1 max-w-[150px]">"{report.description}"</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <MapPin className="w-3.5 h-3.5 opacity-50" />
                                                <span className="text-xs font-bold leading-none">{report.location || "N/A"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                <Badge className={`
                                                    ${report.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'} 
                                                    font-black uppercase tracking-widest text-[9px] px-3 py-1 border w-fit
                                                `}>
                                                    {report.status}
                                                </Badge>
                                                {report.status === 'RESOLVED' && (
                                                    <div className="flex flex-col gap-1">
                                                        {report.actionTaken && (
                                                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 w-fit">
                                                                <ArrowUpRight className="w-3 h-3" />
                                                                {report.actionTaken}
                                                            </span>
                                                        )}
                                                        {report.handledBy && (
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                                                                By: {report.handledBy.firstName}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-600 text-sm whitespace-nowrap">{report.reporter?.firstName} {report.reporter?.lastName}</span>
                                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1 shadow-sm w-fit px-1 bg-slate-50 rounded">Reporter</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button 
                                                variant="ghost" 
                                                className="h-10 px-4 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white rounded-xl transition-all font-black uppercase text-[10px] tracking-widest"
                                                onClick={() => handleViewDetail(report)}
                                            >
                                                View Detail
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Detail Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-5xl rounded-[2.5rem] border-0 shadow-2xl p-0 overflow-hidden bg-white">
                    {selectedReport && (
                        <div className="flex flex-col lg:flex-row w-full h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden">
                            {/* Left: Proof Image */}
                            <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                {selectedReport.photoUrl ? (
                                    <img 
                                        src={`${window.location.protocol}//${window.location.hostname}:5001${selectedReport.photoUrl.startsWith('/') ? '' : '/'}${selectedReport.photoUrl}`} 
                                        alt="Evidence" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-slate-300">
                                        <Camera className="w-16 h-16" />
                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase">No Photographic Proof</span>
                                    </div>
                                )}
                                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                                    <Badge className={`${severityMap[selectedReport.type]?.color || 'bg-slate-500'} text-white font-black uppercase text-[10px] border-0 shadow-xl`}>
                                        {severityMap[selectedReport.type]?.label || 'General'}
                                    </Badge>
                                    <Badge className="bg-white/95 backdrop-blur-md text-slate-900 border-0 shadow-xl font-black uppercase text-[10px]">
                                        {selectedReport.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Right: Details */}
                            <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                                <div className="space-y-6 flex-1">
                                    <div className="flex justify-between items-start">
                                        <DialogHeader className="text-left">
                                            <DialogTitle className="text-3xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                                                {selectedReport.employeeName}
                                            </DialogTitle>
                                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Incident Protocol Log</p>
                                        </DialogHeader>
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-100">
                                            <ShieldAlert className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 pt-4">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                                <Building2 className="w-3 h-3 mr-1.5" /> Department
                                            </Label>
                                            <p className="text-sm font-bold text-slate-800">{selectedReport.location || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                                <Hash className="w-3 h-3 mr-1.5" /> Subject ID
                                            </Label>
                                            <p className="text-sm font-bold text-slate-800">{selectedReport.targetEmployeeId}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                                <Calendar className="w-3 h-3 mr-1.5" /> Timestamp
                                            </Label>
                                            <p className="text-sm font-bold text-slate-800">{format(new Date(selectedReport.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                                <User className="w-3 h-3 mr-1.5" /> Reporter
                                            </Label>
                                            <p className="text-sm font-bold text-slate-800">{selectedReport.reporter?.firstName} {selectedReport.reporter?.lastName}</p>
                                        </div>
                                    </div>

                                    <Separator className="bg-slate-100" />

                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Narrative Evidence</Label>
                                        <div className="bg-slate-50/80 p-6 rounded-[2rem] border border-slate-100 italic relative">
                                            <AlertTriangle className="absolute -left-2 -top-2 w-10 h-10 text-slate-200/50" />
                                            <p className="text-sm font-medium text-slate-600 leading-relaxed relative z-10">
                                                "{selectedReport.description}"
                                            </p>
                                        </div>
                                    </div>

                                    <Separator className="bg-slate-100" />
                                    
                                    {selectedReport.status === 'PENDING' ? (
                                        <div className="space-y-6 pt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Superior Action</h3>
                                            </div>
                                            
                                            <div className="space-y-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Action</Label>
                                                        <select 
                                                            className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold focus:ring-2 focus:ring-slate-950 outline-none appearance-none"
                                                            value={actionTaken}
                                                            onChange={(e) => setActionTaken(e.target.value)}
                                                        >
                                                            <option value="">Select an action...</option>
                                                            <option value="Peringatan Lisan">Peringatan Lisan (Verbal Warning)</option>
                                                            <option value="SP1">Surat Peringatan 1 (SP1)</option>
                                                            <option value="SP2">Surat Peringatan 2 (SP2)</option>
                                                            <option value="SP3">Surat Peringatan 3 (SP3)</option>
                                                            <option value="Pembinaan Internal">Pembinaan Internal</option>
                                                            <option value="Konseling">Konseling Psikologi / HR</option>
                                                            <option value="Skorsing">Skorsing Sementara</option>
                                                            <option value="PHK">Pemutusan Hubungan Kerja (PHK)</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Date</Label>
                                                        <Input 
                                                            type="date" 
                                                            className="h-12 bg-white border-slate-200 rounded-xl font-bold px-4"
                                                            value={actionDate}
                                                            onChange={(e) => setActionDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolution Summary / Resume</Label>
                                                    <textarea 
                                                        className="w-full min-h-[80px] bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-slate-950 outline-none resize-none"
                                                        placeholder="Summary of the results or resume of the action taken..."
                                                        value={resolutionSummary}
                                                        onChange={(e) => setResolutionSummary(e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolution Proof (Photo)</Label>
                                                    <div className="flex items-center gap-4">
                                                        <Button 
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => resolutionFileRef.current?.click()}
                                                            className="h-14 border border-slate-200 rounded-2xl px-6 flex items-center gap-3 font-bold"
                                                        >
                                                            <Camera className="w-4 h-4 text-slate-400" />
                                                            {resolutionPhoto ? 'Change Proof' : 'Upload Proof'}
                                                        </Button>
                                                        {resolutionPhoto && (
                                                            <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-100 shadow-sm relative group">
                                                                <img src={resolutionPhoto} className="w-full h-full object-cover" />
                                                                <button 
                                                                    onClick={() => setResolutionPhoto(null)}
                                                                    className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                                >
                                                                    <X className="w-4 h-4 text-white" />
                                                                </button>
                                                            </div>
                                                        )}
                                                        <input 
                                                            type="file" 
                                                            ref={resolutionFileRef}
                                                            className="hidden" 
                                                            accept="image/*"
                                                            onChange={handleResolutionFileChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Improvement Plan / Notes</Label>
                                                    <textarea 
                                                        className="w-full min-h-[80px] bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-slate-950 outline-none resize-none"
                                                        placeholder="What steps must be taken to prevent recurrence..."
                                                        value={improvementPlan}
                                                        onChange={(e) => setImprovementPlan(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <Button 
                                                className="w-full h-14 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
                                                onClick={handleResolve}
                                                disabled={!actionTaken || !improvementPlan || resolveLoading}
                                            >
                                                {resolveLoading ? 'Processing...' : 'Finalize Resolution'}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6 pt-2">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest">Resolution Finalized</h3>
                                            </div>
                                            
                                            <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 space-y-4">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-700/60">
                                                    <span>Action Taken</span>
                                                    <span>Action Date</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <Badge className="bg-emerald-500 text-white border-0 font-black px-4 py-1.5 rounded-full">{selectedReport.actionTaken}</Badge>
                                                    <span className="text-sm font-bold text-slate-800">
                                                        {selectedReport.actionDate ? format(new Date(selectedReport.actionDate), 'MMM dd, yyyy') : 'N/A'}
                                                    </span>
                                                </div>

                                                {selectedReport.resolutionSummary && (
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black text-emerald-700/60 uppercase tracking-widest">Resolution Summary / Resume</Label>
                                                        <p className="text-sm font-bold text-emerald-900 leading-relaxed bg-white/50 p-4 rounded-2xl border border-emerald-100/50">
                                                            {selectedReport.resolutionSummary}
                                                        </p>
                                                    </div>
                                                )}

                                                {selectedReport.resolutionPhotoUrl && (
                                                    <div className="space-y-2">
                                                        <Label className="text-[10px] font-black text-emerald-700/60 uppercase tracking-widest">Resolution Proof</Label>
                                                        <div className="w-full h-40 rounded-2xl overflow-hidden border border-emerald-100">
                                                            <img 
                                                                src={`${window.location.protocol}//${window.location.hostname}:5001${selectedReport.resolutionPhotoUrl.startsWith('/') ? '' : '/'}${selectedReport.resolutionPhotoUrl}`} 
                                                                className="w-full h-full object-cover" 
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-700/60 pt-2 border-t border-emerald-100/30">
                                                    <span>Improvement Plan</span>
                                                    <span>Handled By</span>
                                                </div>
                                                <div className="flex justify-between items-start gap-4">
                                                    <p className="text-sm font-bold text-slate-700 leading-relaxed italic flex-1">
                                                        "{selectedReport.improvementPlan}"
                                                    </p>
                                                    <span className="text-sm font-bold text-slate-800 whitespace-nowrap pt-1">
                                                        {selectedReport.handledBy?.firstName} {selectedReport.handledBy?.lastName}
                                                    </span>
                                                </div>
                                            </div>

                                            <Button 
                                                variant="outline"
                                                className="w-full h-14 border-2 border-slate-200 text-slate-400 font-black uppercase tracking-[0.2em] rounded-2xl cursor-default"
                                            >
                                                Case Resolved
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
