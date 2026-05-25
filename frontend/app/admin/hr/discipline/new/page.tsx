'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { CameraCapture } from '@/components/hr/CameraCapture';
import HeaderCard from '@/components/ui/header-card';
import { 
    ClipboardCheck, 
    Camera, 
    ChevronLeft, 
    Send, 
    MapPin, 
    User, 
    AlertCircle,
    X,
    RefreshCw,
    Sparkles,
    ShieldAlert,
    Scan,
    FileText,
    History,
    Search,
    Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function NewDisciplineReportPage() {
    const router = useRouter();
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingEmpl, setFetchingEmpl] = useState(true);
    
    // Form State
    const [targetEmployee, setTargetEmployee] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    
    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchEmployees = async (search = '') => {
        setFetchingEmpl(true);
        try {
            const res = await api.get(`/discipline-reports/employees?search=${search}`);
            if (res.data.success) {
                setEmployees(res.data.data);
            }
        } catch (error) {
            console.error('Fetch employees error:', error);
            toast.error('Failed to load employee list');
        } finally {
            setFetchingEmpl(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Debounce search
    useEffect(() => {
        if (!isPopoverOpen) return;
        const timer = setTimeout(() => {
            fetchEmployees(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, isPopoverOpen]);

    const handleCapture = (imageSrc: string) => {
        setCapturedImage(imageSrc);
        toast.success('Photo evidence secured');
    };

    const removeImage = () => {
        setCapturedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size exceeds 5MB limit');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result as string);
                toast.success('Gallery image secured');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!targetEmployee || !type || !description) {
            toast.error('Please complete all mandatory protocols');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        
        const employee = employees.find(e => e.EMPL_ID === targetEmployee);
        
        formData.append('targetEmployeeId', targetEmployee);
        formData.append('employeeName', employee?.NAMA || 'Unknown');
        formData.append('type', type);
        formData.append('description', description);
        formData.append('location', location);

        if (capturedImage) {
            const res = await fetch(capturedImage);
            const blob = await res.blob();
            formData.append('photo', blob, 'evidence.jpg');
        }

        try {
            const res = await api.post('/discipline-reports', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Incident protocol submitted successfully');
                router.push('/admin/hr/discipline');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Protocol submission failed');
        } finally {
            setLoading(false);
        }
    };

    const behaviorTypes = [
        "Chatting / Ngobrol",
        "Sleeping / Tidur",
        "Relaxing / Santai",
        "Playing Phone / Main HP",
        "Late Return / Telat Balik Istirahat",
        "Other / Lainnya"
    ];

    return (
        <div className="space-y-4 sm:space-y-6 pb-28 w-full max-w-full -mx-3 sm:mx-0 -mt-2 sm:mt-0 sm:px-6 lg:px-10 bg-slate-50/50 min-h-screen">
            {/* Camera Overlay */}
            {showCamera && (
                <CameraCapture 
                    onCapture={handleCapture} 
                    onClose={() => setShowCamera(false)} 
                />
            )}

            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between pt-3 pb-3 sm:pt-0 sm:pb-0 px-1 sm:px-0 bg-white sm:bg-transparent border-b border-slate-100 sm:border-0 sticky top-0 z-50"
            >
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-slate-100 h-9 w-9 sm:h-12 sm:w-12 transition-all active:scale-95 -ml-2 sm:ml-0"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                    </Button>
                    <div className="space-y-0.5">
                        <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">New Protocol</h1>
                        <div className="flex items-center gap-1.5">
                            <Badge className="bg-slate-900 text-[8px] sm:text-[9px] font-semibold tracking-wider px-1.5 py-0 uppercase border-0">Class I</Badge>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate max-w-[150px] sm:max-w-none">Workspace Integrity</span>
                        </div>
                    </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <History className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">v4.2</span>
                </div>
            </motion.div>

            {/* Mobile Alert Box */}
            <div className="px-2 mt-4 sm:hidden">
                <div className="bg-rose-50 border border-rose-100/50 rounded-2xl p-3.5 flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-rose-900 flex items-center gap-1.5">
                            Official Log <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
                        </h2>
                        <p className="text-[11px] text-rose-700/80 mt-0.5 leading-relaxed font-medium">Record incident details accurately. Visual evidence is required.</p>
                    </div>
                </div>
            </div>

            {/* Desktop Header Card */}
            <div className="relative group mx-0 sm:mx-0 hidden sm:block">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <HeaderCard
                    title={<span className="flex items-center gap-2 sm:gap-3 text-xl font-bold">Official Log <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" /></span>}
                    description="Enter all details accurately. High-intensity data capture required."
                    icon={<ShieldAlert className="text-white w-5 h-5" />}
                    variant="elegant"
                    backgroundStyle="pattern"
                    gradientFrom="from-rose-950"
                    gradientTo="to-rose-900"
                    className="shadow-lg border-0 py-8 rounded-3xl"
                />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col xl:grid xl:grid-cols-12 gap-5 sm:gap-8 xl:items-start">
                {/* Evidence Acquisition (Moved to top on mobile) */}
                <div className="w-full xl:col-span-4 xl:col-start-9 xl:row-start-1 space-y-4 sm:space-y-6">
                    <Card className="border-x-0 border-y sm:border shadow-sm sm:shadow-md bg-white rounded-none sm:rounded-2xl overflow-hidden group border-slate-200">
                        <div className="p-3.5 sm:p-6 pb-2.5 sm:pb-4 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
                                    <Camera className="w-4 h-4 mr-2 text-rose-500" />
                                    Image evidence
                                </Label>
                                <Scan className="w-4 h-4 text-slate-300" />
                            </div>
                        </div>
                        
                        <CardContent className="p-3.5 sm:p-6">
                            <div className="relative aspect-[4/3] flex flex-col items-center justify-center bg-slate-50 rounded-xl sm:rounded-2xl border border-dashed border-slate-300 hover:border-rose-400 transition-all duration-300 overflow-hidden shadow-inner uppercase tracking-wider font-bold text-[10px] text-slate-400">
                                {capturedImage ? (
                                    <div className="w-full h-full relative group/img animate-in zoom-in duration-500">
                                        <img src={capturedImage} alt="Evidence" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                            <Button 
                                                variant="destructive" 
                                                size="icon" 
                                                onClick={removeImage}
                                                className="rounded-full w-14 h-14 shadow-xl border-2 border-white/20"
                                            >
                                                <X className="w-6 h-6" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center gap-6 p-4 sm:p-6 w-full">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-105 transition-all duration-500 border border-slate-100">
                                            <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 group-hover:text-rose-500 transition-all duration-500" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-sm font-semibold text-slate-800 tracking-tight normal-case">No Data Captured</p>
                                            <p className="text-[10px] font-medium text-slate-500 leading-normal normal-case max-w-[200px] mx-auto">Visual verification is required for reports.</p>
                                        </div>
                                        <div className="flex flex-row sm:flex-col w-full gap-2 sm:gap-3 mt-1 sm:mt-2">
                                            <Button 
                                                type="button"
                                                onClick={() => setShowCamera(true)}
                                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex-1 sm:w-full h-11 sm:h-12 text-xs font-semibold normal-case shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Camera className="w-4 h-4" />
                                                <span className="hidden sm:inline">Use Camera</span>
                                                <span className="sm:hidden">Camera</span>
                                            </Button>
                                            <Button 
                                                type="button"
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-slate-300 bg-white hover:bg-slate-50 rounded-xl flex-1 sm:w-full h-11 sm:h-12 text-xs font-semibold normal-case text-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                <ImageIcon className="w-4 h-4 text-slate-500" />
                                                <span className="hidden sm:inline">Pick from Gallery</span>
                                                <span className="sm:hidden">Gallery</span>
                                            </Button>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef}
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Protocol Parameters */}
                <div className="w-full xl:col-span-8 xl:col-start-1 xl:row-start-1 xl:row-span-2 space-y-6 sm:space-y-8">
                    <Card className="border-x-0 border-y sm:border shadow-sm sm:shadow-md rounded-none sm:rounded-2xl bg-white overflow-hidden relative border-slate-200">
                        <div className="absolute top-0 right-0 p-4 sm:p-6 hidden sm:block">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                <FileText className="w-4 h-4 text-slate-300" />
                            </div>
                        </div>
                        <CardContent className="p-3.5 sm:p-8 space-y-5 sm:space-y-8">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="employee" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center ml-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 shadow-glow" />
                                        Personnel Identification
                                    </Label>
                                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                role="combobox"
                                                className="w-full h-12 sm:h-14 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all rounded-xl text-sm sm:text-base font-semibold text-slate-800 px-3.5 sm:px-4 justify-between shadow-sm"
                                            >
                                                {targetEmployee ? (
                                                    employees.find(e => e.EMPL_ID === targetEmployee)?.NAMA || "Unknown Employee"
                                                ) : (
                                                    <span className="text-slate-400 font-normal">Select Subject Person...</span>
                                                )}
                                                <RefreshCw className={`w-4 h-4 ml-2 text-slate-400 animate-spin ${fetchingEmpl ? 'opacity-100' : 'opacity-0'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[calc(100vw-28px)] sm:w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border border-slate-200 shadow-xl bg-white overflow-hidden mx-3.5 sm:mx-0" align="start">
                                            <div className="p-2 sm:p-3 bg-slate-50 border-b border-slate-100">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <Input 
                                                        placeholder="Search by name or ID..." 
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className="h-10 pl-9 bg-white border-slate-200 rounded-lg text-sm font-medium focus-visible:ring-rose-500"
                                                    />
                                                </div>
                                            </div>
                                            <ScrollArea className="h-[280px]">
                                                <div className="p-1.5">
                                                    {employees.length === 0 && !fetchingEmpl ? (
                                                        <div className="p-6 text-center text-slate-400 space-y-2">
                                                            <User className="w-6 h-6 mx-auto opacity-20" />
                                                            <p className="text-[10px] font-semibold uppercase tracking-wider">No Protocol Match Found</p>
                                                        </div>
                                                    ) : (
                                                        employees.map((empl) => (
                                                            <button
                                                                key={empl.EMPL_ID}
                                                                type="button"
                                                                onClick={() => {
                                                                    setTargetEmployee(empl.EMPL_ID);
                                                                    setIsPopoverOpen(false);
                                                                }}
                                                                className={`w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-lg transition-all text-left group mb-1 ${
                                                                    targetEmployee === empl.EMPL_ID 
                                                                    ? 'bg-rose-50 text-rose-900' 
                                                                    : 'hover:bg-slate-50'
                                                                }`}
                                                            >
                                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm uppercase shadow-sm border ${
                                                                    targetEmployee === empl.EMPL_ID 
                                                                    ? 'bg-rose-500 text-white border-rose-600' 
                                                                    : 'bg-white text-slate-600 border-slate-200'
                                                                }`}>
                                                                    {empl.NAMA.charAt(0)}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className={`font-semibold text-sm leading-tight ${
                                                                        targetEmployee === empl.EMPL_ID ? 'text-rose-900' : 'text-slate-800'
                                                                    }`}>{empl.NAMA}</span>
                                                                    <span className={`text-[10px] font-medium tracking-wide mt-0.5 ${
                                                                        targetEmployee === empl.EMPL_ID ? 'text-rose-700' : 'text-slate-500'
                                                                    }`}>{empl.NIK} • DEPT: {empl.KD_DEPT}</span>
                                                                </div>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </ScrollArea>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1 sm:pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center ml-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                                            Incident Type
                                        </Label>
                                        <Select value={type} onValueChange={setType}>
                                            <SelectTrigger id="type" className="h-12 sm:h-14 border-slate-200 bg-white hover:bg-slate-50 transition-all rounded-xl text-sm sm:text-base font-semibold text-slate-800 px-3.5 sm:px-4 shadow-sm focus:ring-rose-500">
                                                <SelectValue placeholder="Analyze Category..." />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-100 shadow-xl p-1">
                                                {behaviorTypes.map((t) => (
                                                    <SelectItem key={t} value={t} className="rounded-lg py-2.5 px-3 font-medium text-sm">{t}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center ml-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2" />
                                            Facility Area
                                        </Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input 
                                                id="location" 
                                                placeholder="e.g. Zone Alpha-9"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="h-12 sm:h-14 pl-10 border-slate-200 bg-white hover:bg-slate-50 transition-all rounded-xl text-sm sm:text-base font-semibold text-slate-800 shadow-sm focus-visible:ring-rose-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-1 sm:pt-2">
                                    <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center ml-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2" />
                                        Incident Narrative
                                    </Label>
                                    <Textarea 
                                        id="description" 
                                        placeholder="Provide detailed situational report..."
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="resize-none border-slate-200 bg-white hover:bg-slate-50 transition-all rounded-xl text-sm sm:text-base p-3.5 sm:p-4 font-medium placeholder:text-slate-400 leading-relaxed shadow-sm focus-visible:ring-rose-500"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submit button */}
                <div className="w-full xl:col-span-4 xl:col-start-9 xl:row-start-2 fixed bottom-0 left-0 right-0 p-3.5 sm:p-0 bg-white sm:bg-transparent border-t border-slate-100 sm:border-0 z-40 sm:relative sm:mt-0 xl:mt-0">
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-lg border-0 flex items-center justify-center gap-2.5 transition-all active:scale-95"
                    >
                        {loading ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Protocol
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
