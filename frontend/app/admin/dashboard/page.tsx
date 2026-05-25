'use client';

import {
    Briefcase, TrendingUp, Users, AlertCircle, CheckCircle2, MoreHorizontal
} from 'lucide-react';

const KPICard = ({ title, value, subtext, icon: Icon, color }: any) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-600">
            <span className="font-medium text-green-600">↑ 12%</span>
            <span className="ml-2">{subtext}</span>
        </div>
    </div>
);

export default function AdminDashboard() {
    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Enterprise Overview</h1>
                    <p className="text-sm text-gray-500">Real-time repository of GIS operations.</p>
                </div>
                <div className="flex gap-2">
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-300">
                        Export Report
                    </button>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                        + Identify New Risk
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Total Revenue"
                    value="$1.2M"
                    subtext="vs last quarter"
                    icon={TrendingUp}
                    color="bg-blue-500"
                />
                <KPICard
                    title="Active Projects"
                    value="45"
                    subtext="currently ongoing"
                    icon={Briefcase}
                    color="bg-purple-500"
                />
                <KPICard
                    title="Total Employees"
                    value="128"
                    subtext="across 3 departments"
                    icon={Users}
                    color="bg-orange-500"
                />
                <KPICard
                    title="System Alerts"
                    value="3"
                    subtext="require attention"
                    icon={AlertCircle}
                    color="bg-red-500"
                />
            </div>

            {/* Main Content Area: Charts & Tables */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Main Chart Area (Placeholder) */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Project Performance</h3>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal /></button>
                    </div>
                    <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-100 bg-gray-50">
                        <p className="text-gray-400">Chart Visualization Placeholder</p>
                    </div>
                </div>

                {/* Pending Approvals List */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 font-bold text-gray-900">Pending Approvals</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="mt-1 h-2 w-2 rounded-full bg-yellow-400"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Purchase Request #40{i}</p>
                                    <p className="text-xs text-gray-500">Submitted by Marketing Dept</p>
                                    <div className="mt-2 flex gap-2">
                                        <button className="text-xs font-semibold text-green-600 hover:text-green-700">Approve</button>
                                        <button className="text-xs font-semibold text-red-600 hover:text-red-700">Reject</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
