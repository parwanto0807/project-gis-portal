import {
    LayoutDashboard,
    ShoppingBag,
    Truck,
    Package,
    Layers,
    Building2,
    TrendingUp,
    DollarSign,
    FileText,
    BarChart2,
    Settings,
    Users,
    UserCog,
    ShieldCheck,
    ClipboardCheck,
    Database,
    LucideIcon
} from "lucide-react";
import { AppModule, Action, Role } from "@/types/rbac";

interface Submenu {
    href: string;
    label: string;
    active?: boolean;
    icon?: LucideIcon;
    action?: Action;
    disabled?: boolean;
    module?: AppModule;
}

interface MenuItem {
    label: string;
    href?: string;
    active?: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
    module?: AppModule;
    action?: Action;
    disabled?: boolean;
}

export interface MenuGroup {
    groupLabel: string;
    menus: MenuItem[];
}

// Helper to check active state
function isActive(path: string, pathname: string) {
    return pathname === path || pathname.startsWith(path + "/");
}

export function getMenuList(pathname: string, user: any): MenuGroup[] {
    if (!user) return [];

    // Define the master structure inspired by the previous AdminSidebar
    const masterMenu: { groupLabel: string; items: MenuItem[] }[] = [
        {
            groupLabel: "Overview",
            items: [
                {
                    label: "Dashboard",
                    href: "/admin/dashboard",
                    icon: LayoutDashboard,
                    module: AppModule.DASHBOARD,
                    submenus: []
                },
            ]
        },
        {
            groupLabel: "Talent & Culture",
            items: [
                {
                    label: "HR Management",
                    icon: Users,
                    module: AppModule.HR,
                    submenus: [
                        { label: "Gis Discipline", href: "/admin/hr/discipline", icon: ClipboardCheck, module: AppModule.HR_DISCIPLINE },
                        { label: "Employees", href: "/admin/hr/employees", icon: Users, disabled: true, module: AppModule.HR_EMPLOYEES },
                    ]
                }
            ]
        },
        {
            groupLabel: "Audit & Compliance",
            items: [
                {
                    label: "Audit Internal",
                    icon: ShieldCheck,
                    module: AppModule.AUDIT_TEMUAN,
                    submenus: [
                        { label: "Temuan Peduli Bersinergi", href: "/admin/audit/temuan", icon: ShieldCheck, module: AppModule.AUDIT_TEMUAN },
                    ]
                }
            ]
        },
        {
            groupLabel: "Master Data",
            items: [
                {
                    label: "Products Hub",
                    icon: Package,
                    module: AppModule.INVENTORY,
                    submenus: [
                        { label: "Products & SKUs", href: "/admin/products", icon: Package },
                    ]
                }
            ]
        },
        {
            groupLabel: "Administration",
            items: [
                {
                    label: "Settings",
                    icon: Settings,
                    module: AppModule.SETTINGS,
                    submenus: [
                        { label: "Profile", href: "/admin/settings/profile", icon: UserCog },
                        { label: "User Management", href: "/admin/users", icon: Users },
                        { label: "Database Connection", href: "/admin/settings/database", icon: Database },
                        { label: "Backup & Restore", href: "/admin/settings/backup", icon: Database },
                        // { label: "Roles & Permissions", href: "/settings/roles", icon: UserCog },
                        // { label: "Audit Logs", href: "/settings/audit", icon: ShieldCheck },
                    ]
                }
            ]
        }
    ];

    // Filter based on permissions
    const filteredGroups = masterMenu.map(group => {
        const filteredItems = group.items.filter(item => {
            // Super Admin bypass
            if (user.role === Role.SUPER_ADMIN) return true;

            // If no module is assigned, it's public/common (unless logic changes)
            // But typically we want to restrict. Assuming Dashboard is allowed for all OR checked.
            if (!item.module) return true;

            // Staff bypass for specific menus
            if (user.role?.toUpperCase() === 'STAFF') {
                const allowedPaths = ['/admin/audit/temuan', '/admin/settings/profile'];
                // Only keep submenus that match allowedPaths
                item.submenus = item.submenus.filter(sub => allowedPaths.includes(sub.href));
                if (item.submenus.length === 0 && !allowedPaths.includes(item.href || '')) {
                    return false; // Hide this item entirely
                }
                return true;
            }

            // Check permissions for parent item
            let permission = user.permissions?.find((p: any) => p.module === item.module);
            
            // If parent requires permission and doesn't have it, hide entire group
            if (item.module && !permission) return false;

            // Filter submenus based on specific module permissions
            const filteredSubmenus = item.submenus.filter((sub: any) => {
                if (!sub.module) return true; // if no specific module on submenu, allow (relies on parent)
                
                const subPermission = user.permissions?.find((p: any) => p.module === sub.module);
                if (!subPermission) return false;
                
                if (sub.action && !subPermission.actions.includes(sub.action)) return false;
                
                return true;
            });

            // If it had submenus initially, but all were filtered out due to lack of sub-permissions, hide the parent too (unless it has a direct href)
            if (item.submenus.length > 0 && filteredSubmenus.length === 0 && !item.href) {
                return false;
            }

            item.submenus = filteredSubmenus;

            // Check action if specified for parent
            if (item.action && permission && !permission.actions.includes(item.action)) return false;

            return true;
        }).map(item => ({
            ...item,
            active: item.href ? isActive(item.href, pathname) : false, // Active state for parent
            submenus: item.submenus.map(sub => ({
                ...sub,
                active: isActive(sub.href, pathname)
            }))
        }));

        return {
            groupLabel: group.groupLabel,
            menus: filteredItems
        };
    }).filter(group => group.menus.length > 0); // Remove empty groups

    return filteredGroups;
}
