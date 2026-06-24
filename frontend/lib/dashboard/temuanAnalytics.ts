import { format, differenceInDays } from 'date-fns';
import { id } from 'date-fns/locale';

export type Temuan = {
    id: number;
    area: string; // Gedung
    tempatTemuan: string; // Lokasi detail
    tanggal: string; // ISO string
    kategori4M: string[];
    status: string;
    temuan: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
    };
};

export const getTotalTemuan = (data: Temuan[]) => data.length;

export const getOpenTemuan = (data: Temuan[]) => {
    const openCount = data.filter(d => d.status === 'OPEN').length;
    const percentage = data.length > 0 ? Math.round((openCount / data.length) * 100) : 0;
    return { count: openCount, percentage };
};

export const getCompletionRate = (data: Temuan[]) => {
    if (data.length === 0) return 0;
    const closedCount = data.filter(d => d.status === 'CLOSED').length;
    return Math.round((closedCount / data.length) * 100);
};

export const getAverageAging = (data: Temuan[]) => {
    if (data.length === 0) return 0;
    const today = new Date();
    const totalDays = data.reduce((acc, curr) => {
        const date = new Date(curr.tanggal);
        const diff = differenceInDays(today, date);
        return acc + diff;
    }, 0);
    return Math.round(totalDays / data.length);
};

export const getTrendData = (data: Temuan[], period: 'Mingguan' | 'Bulanan' | 'Tahunan' = 'Mingguan') => {
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
            if (dateMap[dateStr] !== undefined) {
                dateMap[dateStr]++;
            }
        });
    } else if (period === 'Tahunan') {
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
            if (dateMap[monthStr] !== undefined) {
                dateMap[monthStr]++;
            }
        });
    }

    return datesToInclude.map(date => ({
        date,
        count: dateMap[date]
    }));
};

export const getKategori4MData = (data: Temuan[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        curr.kategori4M?.forEach(kat => {
            acc[kat] = (acc[kat] || 0) + 1;
        });
        return acc;
    }, {});

    return Object.keys(counts).map(name => ({
        name,
        value: counts[name]
    })).sort((a, b) => b.value - a.value);
};

export const getGedungData = (data: Temuan[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        const gedung = curr.area || 'Unknown';
        acc[gedung] = (acc[gedung] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts).map(gedung => ({
        gedung,
        total: counts[gedung]
    })).sort((a, b) => b.total - a.total); 
};

export const getAreaData = (data: Temuan[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        const area = curr.tempatTemuan || 'Unknown';
        acc[area] = (acc[area] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts).map(area => ({
        area,
        total: counts[area]
    })).sort((a, b) => b.total - a.total).slice(0, 10);
};

export const getStatusData = (data: Temuan[]) => {
    const counts = data.reduce((acc: Record<string, number>, curr) => {
        const status = curr.status || 'OPEN';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts).map(name => ({
        name: name === 'OPEN' ? 'Open' : name === 'IN_PROGRESS' ? 'In Progress' : 'Closed',
        value: counts[name]
    })).sort((a, b) => {
        // Order: Open, In Progress, Closed
        const order: Record<string, number> = { 'Open': 1, 'In Progress': 2, 'Closed': 3 };
        return order[a.name] - order[b.name];
    });
};

export const getTopReporterData = (data: Temuan[]) => {
    const userCounts = data.reduce((acc: Record<number, any>, curr) => {
        const userId = curr.user?.id;
        if (!userId) return acc;
        
        if (!acc[userId]) {
            acc[userId] = {
                id: userId,
                name: `${curr.user.firstName || ''} ${curr.user.lastName || ''}`.trim() || 'Unknown',
                total: 0,
            };
        }
        acc[userId].total += 1;
        return acc;
    }, {});

    return Object.values(userCounts).map((user: any) => ({
        name: user.name,
        total: user.total,
    })).sort((a, b) => b.total - a.total).slice(0, 5);
};

export const getAgingData = (data: Temuan[]) => {
    const today = new Date();
    const result = {
        '0-7 Hari': 0,
        '8-14 Hari': 0,
        '>14 Hari': 0
    };

    data.forEach(curr => {
        // Calculate aging for active findings
        if (curr.status === 'CLOSED') return;
        
        const date = new Date(curr.tanggal);
        const diff = differenceInDays(today, date);
        
        if (diff <= 7) result['0-7 Hari'] += 1;
        else if (diff <= 14) result['8-14 Hari'] += 1;
        else result['>14 Hari'] += 1;
    });

    return [
        { name: '0-7 Hari', value: result['0-7 Hari'], fill: '#10B981' },
        { name: '8-14 Hari', value: result['8-14 Hari'], fill: '#F59E0B' },
        { name: '>14 Hari', value: result['>14 Hari'], fill: '#EF4444' }
    ].filter(item => item.value > 0);
};

export const getCriticalFindings = (data: Temuan[]) => {
    const today = new Date();
    return data
        .filter(d => d.status !== 'CLOSED')
        .map(d => {
            const aging = differenceInDays(today, new Date(d.tanggal));
            return {
                id: d.id,
                temuan: d.temuan,
                area: d.tempatTemuan,
                gedung: d.area,
                aging,
                status: d.status
            };
        })
        .filter(d => d.aging > 14)
        .sort((a, b) => b.aging - a.aging);
};
