"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Shield, User, Loader2, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
    id: number;
    email: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role: string;
    status: string;
    createdAt: string;
    picture?: string | null;
}

interface UserTableProps {
    users: User[];
    loading: boolean;
    onDelete?: (id: number) => void;
}

export default function UserTable({ users, loading, onDelete }: UserTableProps) {
    const router = useRouter();

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200';
            case 'ADMIN':
                return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
            case 'MANAGER':
                return 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
        }
    };

    const getStatusBadgeColor = (status: string) => {
        return status === 'ACTIVE'
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200'
            : 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200';
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg bg-white/50 animate-pulse">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50/80 backdrop-blur-sm">
                    <TableRow>
                        <TableHead className="w-[300px]">User Profile</TableHead>
                        <TableHead>Role & Access</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-16 text-slate-500">
                                <div className="flex flex-col items-center justify-center space-y-3">
                                    <div className="p-4 bg-slate-100 rounded-full">
                                        <User className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <p className="text-lg font-medium">No users found</p>
                                    <p className="text-sm">Try adjusting your search or add a new user.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-white shadow-sm">
                                            <AvatarImage
                                                src={
                                                    user.picture
                                                        ? (user.picture.startsWith('http') ? user.picture : `http://localhost:5001/${user.picture.startsWith('/') ? user.picture.slice(1) : user.picture}`)
                                                        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user.email}`
                                                }
                                            />
                                            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                                                {user.firstName?.[0]}{user.lastName?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-sm md:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className="text-[10px] md:text-xs text-slate-500 font-mono mt-0.5">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`px-2.5 py-0.5 shadow-sm transition-colors ${getRoleBadgeColor(user.role)}`}>
                                        <div className="flex items-center gap-1.5">
                                            {user.role === 'SUPER_ADMIN' && <Shield className="h-3 w-3" />}
                                            <span className="capitalize">{user.role?.replace('_', ' ').toLowerCase()}</span>
                                        </div>
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`px-2.5 py-0.5 shadow-sm ${getStatusBadgeColor(user.status)}`}>
                                        <span className="capitalize">{user.status.toLowerCase()}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-500 text-xs md:text-sm">
                                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <TooltipProvider>
                                            <Tooltip delayDuration={300}>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
                                                        onClick={() => router.push(`/admin/users/${user.id}`)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit Details</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit Details</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                                        onClick={() => router.push(`/admin/users/${user.id}`)}
                                                    >
                                                        <Shield className="h-4 w-4" />
                                                        <span className="sr-only">Permissions</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Permissions</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                                        onClick={() => onDelete?.(user.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete User</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Delete User</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
