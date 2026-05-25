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
                        { label: "Gis Discipline", href: "/admin/hr/discipline", icon: ClipboardCheck },
                        { label: "Employees", href: "/admin/hr/employees", icon: Users, disabled: true },
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
                        { label: "User Management", href: "/admin/users", icon: Users },
                        { label: "Database Connection", href: "/admin/settings/database", icon: Database },
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

            // Check permissions
            const permission = user.permissions?.find((p: any) => p.module === item.module);
            if (!permission) return false;

            // Check action if specified
            if (item.action && !permission.actions.includes(item.action)) return false;

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
