import { format, differenceInDays } from 'date-fns';
import { id } from 'date-fns/locale';

// ─── Type ────────────────────────────────────────────────────────────────────
export type Suggestion = {
    id: number;
    noForm: string;
    tanggal: string;
    periode: string;
    namaKaryawan: string;
    nik: string;
    departemen: string;
    areaProses: string;
    areaTemuan?: string;
    focusDefect: string;
    judulIde: string;
    kondisiSaatIni: string;
    akarMasalah: string;
    usulanImprovement: string;
    ngRatioSebelum?: number;
    ngRatioSesudah?: number;
    impactTurun?: number;
    kategoriApresiasi?: string;
    nominalApresiasi?: number;
    catatan?: string;
    picImplementasi?: string;
    targetSelesai?: string;
    tanggalAktual?: string;
    hasilEvaluasi?: string;
    fotoKondisiUrls?: string[];
    fotoEvaluasiUrls?: string[];
    approvalAtasan?: string;
    tanggalApproval?: string;
    statusApproval: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
};

// ─── KPI ─────────────────────────────────────────────────────────────────────
export const getSuggestionKPI = (data: Suggestion[]) => {
    const total = data.length;
    const pending = data.filter(d => d.statusApproval === 'PENDING').length;
    const approved = data.filter(d => d.statusApproval === 'APPROVED').length;
    const rejected = data.filter(d => d.statusApproval === 'REJECTED').length;
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    const totalApresiasi = data.reduce((acc, d) => acc + (d.nominalApresiasi || 0), 0);
    const avgImpact = (() => {
        const withImpact = data.filter(d => d.impactTurun != null && d.impactTurun !== undefined);
        if (!withImpact.length) return 0;
        const sum = withImpact.reduce((acc, d) => acc + (d.impactTurun || 0), 0);
        return Math.round((sum / withImpact.length) * 10) / 10;
    })();
    return { total, pending, approved, rejected, approvalRate, totalApresiasi, avgImpact };
};

// ─── Trend ───────────────────────────────────────────────────────────────────
export const getSuggestionTrend = (
    data: Suggestion[],
    period: 'Mingguan' | 'Bulanan' | 'Tahunan' = 'Mingguan'
) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let datesToInclude: string[] = [];
    const dateMap: Record<string, number> = {};

    if (period === 'Mingguan' || period === 'Bulanan') {
        const daysToSub = period === 'Mingguan' ? 6 : 29;
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - daysToSub);

        for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
            const key = format(d, 'd MMM', { locale: id });
            datesToInclude.push(key);
            dateMap[key] = 0;
        }

        data.forEach(curr => {
            const dateStr = format(new Date(curr.tanggal), 'd MMM', { locale: id });
            if (dateMap[dateStr] !== undefined) dateMap[dateStr]++;
        });
    } else {
        const startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 11);
        startDate.setDate(1);

        for (let d = new Date(startDate); d <= today; d.setMonth(d.getMonth() + 1)) {
            const key = format(d, 'MMM yyyy', { locale: id });
            datesToInclude.push(key);
            dateMap[key] = 0;
        }

        data.forEach(curr => {
            const monthStr = format(new Date(curr.tanggal), 'MMM yyyy', { locale: id });
            if (dateMap[monthStr] !== undefined) dateMap[monthStr]++;
        });
    }

    return datesToInclude.map(date => ({ date, count: dateMap[date] }));
};

// ─── Status Distribution ─────────────────────────────────────────────────────
export const getStatusDistribution = (data: Suggestion[]) => {
    const counts = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
    data.forEach(d => { counts[d.statusApproval] = (counts[d.statusApproval] || 0) + 1; });
    return [
        { name: 'Pending', value: counts.PENDING, fill: '#F59E0B' },
        { name: 'Approved', value: counts.APPROVED, fill: '#10B981' },
        { name: 'Rejected', value: counts.REJECTED, fill: '#EF4444' },
    ].filter(item => item.value > 0);
};

// ─── Departemen Distribution ─────────────────────────────────────────────────
export const getDepartemenData = (data: Suggestion[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        const dept = curr.departemen || 'Unknown';
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts)
        .map(departemen => ({ departemen, total: counts[departemen] }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
};

// ─── Area Proses Distribution ────────────────────────────────────────────────
export const getAreaProsesData = (data: Suggestion[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        const area = curr.areaProses || 'Unknown';
        acc[area] = (acc[area] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts)
        .map(area => ({ area, total: counts[area] }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
};

// ─── Focus Defect Distribution ───────────────────────────────────────────────
export const getFocusDefectData = (data: Suggestion[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        const defect = curr.focusDefect || 'Lainnya';
        acc[defect] = (acc[defect] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts)
        .map(name => ({ name, value: counts[name] }))
        .sort((a, b) => b.value - a.value);
};

// ─── Top Submitters Leaderboard ──────────────────────────────────────────────
export const getTopSubmitters = (data: Suggestion[]) => {
    const counts = data.reduce((acc: Record<string, { name: string; nik: string; dept: string; total: number; approved: number }>, curr) => {
        const key = curr.nik || curr.namaKaryawan;
        if (!acc[key]) {
            acc[key] = {
                name: curr.namaKaryawan,
                nik: curr.nik,
                dept: curr.departemen,
                total: 0,
                approved: 0,
            };
        }
        acc[key].total += 1;
        if (curr.statusApproval === 'APPROVED') acc[key].approved += 1;
        return acc;
    }, {});

    return Object.values(counts)
        .sort((a, b) => b.total - a.total || b.approved - a.approved)
        .slice(0, 5);
};

// ─── Kategori Apresiasi ──────────────────────────────────────────────────────
const APRESIASI_COLORS: Record<string, string> = {
    'Gold': '#F59E0B',
    'Silver': '#94A3B8',
    'Bronze': '#B45309',
    'Platinum': '#818CF8',
};

export const getApresiasiData = (data: Suggestion[]) => {
    const approved = data.filter(d => d.statusApproval === 'APPROVED' && d.kategoriApresiasi);
    const counts = approved.reduce((acc: Record<string, number>, curr) => {
        const kat = curr.kategoriApresiasi!;
        acc[kat] = (acc[kat] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts)
        .map(name => ({
            name,
            value: counts[name],
            fill: APRESIASI_COLORS[name] || '#6366F1',
        }))
        .sort((a, b) => b.value - a.value);
};

// ─── Pending Lama (> 30 hari) ────────────────────────────────────────────────
export const getPendingLama = (data: Suggestion[], thresholdDays = 30) => {
    const today = new Date();
    return data
        .filter(d => d.statusApproval === 'PENDING')
        .map(d => {
            const aging = differenceInDays(today, new Date(d.tanggal));
            return { ...d, aging };
        })
        .filter(d => d.aging > thresholdDays)
        .sort((a, b) => b.aging - a.aging);
};
