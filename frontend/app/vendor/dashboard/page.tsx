'use client';

import { ArrowUpRight, DollarSign, Package, ShoppingCart, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dummy Dashboard Components
const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] border border-gray-100">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
            </div>
            <div className={cn("rounded-full p-3 bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white")}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={cn("flex items-center font-medium", trend === 'up' ? "text-green-600" : "text-red-600")}>
                {trend === 'up' ? <ArrowUpRight className="mr-1 h-4 w-4" /> : null}
                {change}
            </span>
            <span className="ml-2 text-gray-400">vs last month</span>
        </div>
    </div>
);

export default function VendorDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard Overview</h1>
                <p className="mt-2 text-gray-500">Welcome back, here's what's happening with your orders today.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Active Orders"
                    value="12"
                    change="+2.5%"
                    icon={ShoppingCart}
                    trend="up"
                />
                <StatCard
                    title="Pending Shipment"
                    value="5"
                    change="-4.1%"
                    icon={Package}
                    trend="down"
                />
                <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    change="+12.3%"
                    icon={DollarSign}
                    trend="up"
                />
                <StatCard
                    title="Avg. Lead Time"
                    value="3.2 Days"
                    change="-10%"
                    icon={Clock}
                    trend="up" // actually good that it's down, but visual green
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Orders Table Mockup */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">PO Number</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4].map((i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-4 py-4 font-medium text-blue-600">PO-2024-00{i}</td>
                                        <td className="px-4 py-4">Jan {8 + i}, 2024</td>
                                        <td className="px-4 py-4">$1,200.00</td>
                                        <td className="px-4 py-4">
                                            <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                                Processing
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                        View All Orders
                    </button>
                </div>

                {/* Notifications / Activity */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Activity Feed</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <FileText className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> </FileText>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">New Purchase Order <span className="font-semibold">#PO-00{i}</span> received.</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
