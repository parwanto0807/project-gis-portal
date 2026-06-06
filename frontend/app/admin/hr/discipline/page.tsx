'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { generateDisciplineReportPDF } from '@/utils/pdfGenerator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-none">Discipline</h1>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Monitor
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleExportPDF} 
                        className="rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm h-9 w-9 active:scale-95 transition-all text-slate-600 dark:text-slate-400"
                    >
                        <FileDown className="w-4 h-4 text-emerald-600" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={fetchReports} 
                        className="rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm h-9 w-9 active:scale-95 transition-all text-slate-600 dark:text-slate-400"
                    >
                        <RefreshCw className={loading ? "animate-spin w-4 h-4 text-rose-500" : "w-4 h-4"} />
                    </Button>
                    <Link href="/admin/hr/discipline/new">
                        <Button className="rounded-full bg-slate-900 dark:bg-slate-100 shadow-md h-9 w-9 p-0 active:scale-95 transition-all outline-none">
                            <Plus className="w-5 h-5 text-white" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Desktop Header Area */}
            <div className="hidden sm:flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1.5">
                    <Badge variant="secondary" className="w-fit px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800">
                        <Breadcrumb>
                            <BreadcrumbList className="text-[10px] md:text-xs">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/hr" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50">HR</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-slate-900 dark:text-slate-50 font-semibold">Discipline Monitor</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Badge>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
                            <ClipboardCheck className="w-5 h-5 text-rose-600" />
                            Discipline Monitor
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Professional oversight and discipline tracking.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleExportPDF} 
                        className="h-8 text-xs px-3 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 font-semibold"
                    >
                        <FileDown className="w-3.5 h-3.5 mr-1.5" />
                        Preview PDF
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={fetchReports} 
                        className="h-8 w-8 text-slate-600 dark:text-slate-400"
                    >
                        <RefreshCw className={loading ? "animate-spin w-3.5 h-3.5" : "w-3.5 h-3.5"} />
                    </Button>
                    <Link href="/admin/hr/discipline/new">
                        <Button size="sm" className="h-8 text-xs px-3 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white font-semibold shadow-sm">
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            New Report
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <Card className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Reports</p>
                            <Hash className="w-4 h-4 text-slate-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{reports.length}</h4>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Critical Issues</p>
                            <ShieldAlert className="w-4 h-4 text-rose-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-rose-600">{reports.filter(r => severityMap[r.type]?.level === 3).length}</h4>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Pending</p>
                            <Clock className="w-4 h-4 text-amber-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-amber-600">{reports.filter(r => r.status === 'PENDING').length}</h4>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Resolved</p>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-emerald-600">{reports.filter(r => r.status === 'RESOLVED').length}</h4>
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input 
                            placeholder="Search employee or type..." 
                            className="pl-8 h-8 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Horizontal scroll on mobile for filter buttons */}
                    <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 flex bg-slate-50 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 scrollbar-hide">
                        {['All', 'Sleeping / Tidur', 'Playing Phone / Main HP', 'Chatting / Ngobrol'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                                    filterType === type 
                                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 shadow-sm border border-slate-200/50' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                {type === 'All' ? 'All' : type.split(' / ')[0]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Cards View */}
                <div className="lg:hidden bg-slate-50/50 dark:bg-slate-900/50 p-3 flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredReports.map((report) => (
                            <motion.div 
                                key={report.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => handleViewDetail(report)}
                                className="bg-white dark:bg-slate-950 rounded-xl p-3 shadow-sm border border-slate-200 dark:border-slate-800 active:scale-[0.98] transition-transform cursor-pointer flex flex-col gap-2"
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase border border-slate-200 dark:border-slate-800 shrink-0">
                                            {report.employeeName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-50 text-xs flex items-center gap-1">
                                                {report.employeeName}
                                                {report.photoUrl && <Camera className="w-3 h-3 text-rose-500 shrink-0" />}
                                            </h4>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">
                                                {report.targetEmployeeId}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge className={`
                                        ${report.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'} 
                                        font-semibold text-[9px] px-1.5 py-0 border shadow-sm shrink-0
                                    `}>
                                        {report.status}
                                    </Badge>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${severityMap[report.type]?.color || 'bg-slate-300'}`} />
                                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-[10px]">{report.type.split(' / ')[0]}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">"{report.description}"</p>
                                </div>

                                <div className="flex justify-between items-center text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100">
                                    <span className="flex items-center gap-1 truncate pr-2">
                                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                                        <span className="truncate max-w-[120px]">{report.location || "N/A"}</span>
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-2.5 h-2.5" />
                                            {format(new Date(report.createdAt), 'MMM dd')}
                                        </span>
                                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[120px] font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 pl-4">Date</TableHead>
                                <TableHead className="w-[200px] font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Personnel</TableHead>
                                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Violation</TableHead>
                                <TableHead className="w-[120px] font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Location</TableHead>
                                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Status / Action</TableHead>
                                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2">Reporter</TableHead>
                                <TableHead className="text-right font-semibold text-slate-500 dark:text-slate-400 text-xs h-9 py-2 pr-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredReports.map((report) => (
                                    <TableRow key={report.id} className="group hover:bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                                        <TableCell className="pl-4 py-2 font-medium text-slate-600 dark:text-slate-400 text-xs">
                                            {format(new Date(report.createdAt), 'MMM dd, yyyy HH:mm')}
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 dark:text-slate-50 text-xs flex items-center gap-1.5">
                                                        {report.employeeName}
                                                        {report.photoUrl && <Camera className="w-3 h-3 text-rose-500" />}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{report.targetEmployeeId}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${severityMap[report.type]?.color || 'bg-slate-300'}`} />
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">{report.type.split(' / ')[0]}</span>
                                                    <Badge variant="outline" className={`text-[8px] h-4 px-1 py-0 border-slate-200 dark:border-slate-800 ${severityMap[report.type]?.color ? severityMap[report.type]?.color.replace('bg-', 'text-').replace('500', '600') : 'text-slate-500 dark:text-slate-400'}`}>
                                                        {severityMap[report.type]?.label || 'General'}
                                                    </Badge>
                                                </div>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">"{report.description}"</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                                <MapPin className="w-3 h-3 text-slate-400" />
                                                <span className="text-xs font-medium">{report.location || "N/A"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <div className="flex flex-col gap-1 items-start">
                                                <Badge className={`
                                                    ${report.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'} 
                                                    font-semibold text-[9px] px-2 py-0 border
                                                `}>
                                                    {report.status}
                                                </Badge>
                                                {report.status === 'RESOLVED' && (
                                                    <div className="flex flex-col">
                                                        {report.actionTaken && (
                                                            <span className="text-[9px] font-semibold text-emerald-700 flex items-center gap-1">
                                                                <ArrowUpRight className="w-2.5 h-2.5" />
                                                                {report.actionTaken}
                                                            </span>
                                                        )}
                                                        {report.handledBy && (
                                                            <span className="text-[9px] text-slate-400 pl-3.5">
                                                                By: {report.handledBy.firstName}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">{report.reporter?.firstName} {report.reporter?.lastName}</span>
                                                <span className="text-[9px] text-slate-500 dark:text-slate-400">Reporter</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-4 py-2">
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                className="h-7 px-2.5 text-[10px] font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-900 dark:text-slate-50"
                                                onClick={() => handleViewDetail(report)}
                                            >
                                                View
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
                <DialogContent className="max-w-[95vw] sm:max-w-3xl rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-0 overflow-hidden bg-white dark:bg-slate-950">
                    {selectedReport && (
                        <div className="flex flex-col sm:flex-row w-full h-full max-h-[85vh] overflow-y-auto sm:overflow-hidden">
                            {/* Left: Proof Image */}
                            <div className="w-full sm:w-2/5 min-h-[200px] sm:min-h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden border-r border-slate-200 dark:border-slate-800">
                                {selectedReport.photoUrl ? (
                                    <img 
                                        src={`${window.location.protocol}//${window.location.hostname}:5001${selectedReport.photoUrl.startsWith('/') ? '' : '/'}${selectedReport.photoUrl}`} 
                                        alt="Evidence" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <Camera className="w-8 h-8" />
                                        <span className="text-[10px] font-semibold tracking-wider uppercase">No Proof Uploaded</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                                    <Badge className={`${severityMap[selectedReport.type]?.color || 'bg-slate-500'} text-white font-semibold uppercase text-[9px] border-0 shadow-sm px-1.5 py-0`}>
                                        {severityMap[selectedReport.type]?.label || 'General'}
                                    </Badge>
                                    <Badge className="bg-white/95 backdrop-blur-md text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800 shadow-sm font-semibold uppercase text-[9px] px-1.5 py-0">
                                        {selectedReport.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Right: Details */}
                            <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col overflow-y-auto">
                                <div className="space-y-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <DialogHeader className="text-left space-y-0.5">
                                            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-tight">
                                                {selectedReport.employeeName}
                                            </DialogTitle>
                                            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Incident Log</p>
                                        </DialogHeader>
                                        <div className="w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-800">
                                            <ShieldAlert className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <Building2 className="w-2.5 h-2.5 mr-1" /> Department
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{selectedReport.location || "N/A"}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <Hash className="w-2.5 h-2.5 mr-1" /> Subject ID
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{selectedReport.targetEmployeeId}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <Calendar className="w-2.5 h-2.5 mr-1" /> Timestamp
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{format(new Date(selectedReport.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <Label className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center">
                                                <User className="w-2.5 h-2.5 mr-1" /> Reporter
                                            </Label>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{selectedReport.reporter?.firstName} {selectedReport.reporter?.lastName}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Narrative</Label>
                                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                                "{selectedReport.description}"
                                            </p>
                                        </div>
                                    </div>

                                    <Separator className="bg-slate-200 dark:bg-slate-800" />
                                    
                                    {selectedReport.status === 'PENDING' ? (
                                        <div className="space-y-4 pt-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-4 bg-slate-900 dark:bg-slate-100 rounded-full" />
                                                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Superior Action</h3>
                                            </div>
                                            
                                            <div className="space-y-3 bg-white dark:bg-slate-950 p-0">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Select Action</Label>
                                                        <select 
                                                            className="w-full h-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 text-xs font-medium focus:ring-1 focus:ring-slate-900 outline-none"
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
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Action Date</Label>
                                                        <Input 
                                                            type="date" 
                                                            className="h-8 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-md text-xs px-2.5"
                                                            value={actionDate}
                                                            onChange={(e) => setActionDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-1.5">
                                                    <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Resolution Summary / Resume</Label>
                                                    <textarea 
                                                        className="w-full min-h-[60px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-2.5 text-xs focus:ring-1 focus:ring-slate-900 outline-none resize-none"
                                                        placeholder="Summary of the results or resume of the action taken..."
                                                        value={resolutionSummary}
                                                        onChange={(e) => setResolutionSummary(e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Resolution Proof (Photo)</Label>
                                                    <div className="flex items-center gap-3">
                                                        <Button 
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => resolutionFileRef.current?.click()}
                                                            className="h-8 border-slate-200 dark:border-slate-800 rounded-md px-3 text-xs flex items-center gap-2"
                                                        >
                                                            <Camera className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                                            {resolutionPhoto ? 'Change Proof' : 'Upload Proof'}
                                                        </Button>
                                                        {resolutionPhoto && (
                                                            <div className="w-12 h-8 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 relative group">
                                                                <img src={resolutionPhoto} className="w-full h-full object-cover" />
                                                                <button 
                                                                    onClick={() => setResolutionPhoto(null)}
                                                                    className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                                >
                                                                    <X className="w-3 h-3 text-white" />
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

                                                <div className="space-y-1.5">
                                                    <Label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Improvement Plan / Notes</Label>
                                                    <textarea 
                                                        className="w-full min-h-[60px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-2.5 text-xs focus:ring-1 focus:ring-slate-900 outline-none resize-none"
                                                        placeholder="What steps must be taken to prevent recurrence..."
                                                        value={improvementPlan}
                                                        onChange={(e) => setImprovementPlan(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <Button 
                                                className="w-full h-9 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider rounded-md transition-all active:scale-95 disabled:opacity-50 mt-2"
                                                onClick={handleResolve}
                                                disabled={!actionTaken || !improvementPlan || resolveLoading}
                                            >
                                                {resolveLoading ? 'Processing...' : 'Finalize Resolution'}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Resolution Details</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Action Implemented</p>
                                                    <p className="text-xs font-bold text-emerald-950">{selectedReport.actionTaken}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Resolution Date</p>
                                                    <p className="text-xs font-bold text-emerald-950">{selectedReport.actionDate ? format(new Date(selectedReport.actionDate), 'MMM dd, yyyy') : "N/A"}</p>
                                                </div>
                                            </div>
                                            
                                            {selectedReport.resolutionSummary && (
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Summary</p>
                                                    <p className="text-xs text-emerald-900 bg-white dark:bg-slate-950 p-2.5 rounded-md border border-emerald-100/50">
                                                        {selectedReport.resolutionSummary}
                                                    </p>
                                                </div>
                                            )}

                                            {selectedReport.resolutionPhotoUrl && (
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Resolution Proof</p>
                                                    <div className="w-full h-32 rounded-md overflow-hidden border border-emerald-100">
                                                        <img 
                                                            src={`${window.location.protocol}//${window.location.hostname}:5001${selectedReport.resolutionPhotoUrl.startsWith('/') ? '' : '/'}${selectedReport.resolutionPhotoUrl}`} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Improvement Plan</p>
                                                <p className="text-xs text-emerald-900 bg-white dark:bg-slate-950 p-2.5 rounded-md border border-emerald-100/50">
                                                    {selectedReport.improvementPlan}
                                                </p>
                                            </div>
                                            
                                            <div className="space-y-1 pt-2 border-t border-emerald-100/50 flex justify-between items-center">
                                                <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Handled By</p>
                                                <p className="text-[10px] font-bold text-emerald-900">
                                                    {selectedReport.handledBy?.firstName} {selectedReport.handledBy?.lastName}
                                                </p>
                                            </div>
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
