// Role Definitions (Match Backend Enum)
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    STAFF = 'STAFF',
    SUPER_ADMIN = 'SUPER_ADMIN',
    VENDOR = 'VENDOR'
}

// App Modules (Match Backend Enum)
export enum AppModule {
    DASHBOARD = 'DASHBOARD',
    PROCUREMENT = 'PROCUREMENT',
    INVENTORY = 'INVENTORY',
    FINANCE = 'FINANCE',
    SALES = 'SALES',
    HR = 'HR',
    HR_DISCIPLINE = 'HR_DISCIPLINE',
    HR_EMPLOYEES = 'HR_EMPLOYEES',
    AUDIT_TEMUAN = 'AUDIT_TEMUAN',
    SUGGESTIONS = 'SUGGESTIONS',
    SETTINGS = 'SETTINGS',
    VENDOR_PORTAL = 'VENDOR_PORTAL'
}

// Actions (Match Backend Enum)
export enum Action {
    READ = 'READ',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    APPROVE = 'APPROVE',
    EXPORT = 'EXPORT',
    MANAGE = 'MANAGE'
}

// Permission Structure
export interface Permission {
    id: number;
    module: AppModule;
    actions: Action[];
}

// Extended User Type with Permissions
export interface UserWithPermissions {
    id: number;
    email: string;
    role: Role;
    // ... other fields
    permissions: Permission[];
}
