'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { AppModule, Action, Permission } from "@/types/rbac";

interface PermissionMatrixProps {
    permissions: Permission[];
    onChange: (permissions: Permission[]) => void;
    readOnly?: boolean;
}

export default function PermissionMatrix({ permissions, onChange, readOnly = false }: PermissionMatrixProps) {
    const modules = Object.values(AppModule);
    const actions = Object.values(Action);

    const isChecked = (module: AppModule, action: Action) => {
        const perm = permissions.find(p => p.module === module);
        return perm?.actions.includes(action) || false;
    };

    const handleToggle = (module: AppModule, action: Action, checked: boolean) => {
        if (readOnly) return;

        let newPermissions = [...permissions];
        let permIndex = newPermissions.findIndex(p => p.module === module);

        if (checked) {
            if (permIndex === -1) {
                // Create new permission entry for module
                newPermissions.push({
                    id: 0, // temp id
                    module,
                    actions: [action]
                });
            } else {
                // Add action to existing module permission
                if (!newPermissions[permIndex].actions.includes(action)) {
                    // Create a new object to trigger reactivity (though deep clone best)
                    const updatedActions = [...newPermissions[permIndex].actions, action];
                    newPermissions[permIndex] = { ...newPermissions[permIndex], actions: updatedActions };
                }
            }
        } else {
            if (permIndex !== -1) {
                // Remove action
                const updatedActions = newPermissions[permIndex].actions.filter(a => a !== action);
                if (updatedActions.length === 0) {
                    // Remove module permission entirely if no actions left
                    newPermissions = newPermissions.filter(p => p.module !== module);
                } else {
                    newPermissions[permIndex] = { ...newPermissions[permIndex], actions: updatedActions };
                }
            }
        }

        onChange(newPermissions);
    };

    const handleToggleRow = (module: AppModule, checked: boolean) => {
        if (readOnly) return;

        let newPermissions = [...permissions];
        // Remove existing
        newPermissions = newPermissions.filter(p => p.module !== module);

        if (checked) {
            // Add all actions
            newPermissions.push({
                id: 0,
                module,
                actions: [...actions]
            });
        }

        onChange(newPermissions);
    }

    return (
        <div className="overflow-x-auto rounded-md border text-sm">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-700">
                    <tr>
                        <th className="p-3 border-b font-semibold min-w-[150px]">Module</th>
                        <th className="p-3 border-b text-center font-semibold w-[60px]">All</th>
                        {actions.map(action => (
                            <th key={action} className="p-3 border-b text-center font-semibold text-xs tracking-wider">
                                {action}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {modules.map(module => (
                        <tr key={module} className="hover:bg-slate-50/50">
                            <td className="p-3 font-medium text-slate-700 w-48">
                                {module.replace('_', ' ')}
                            </td>
                            <td className="p-3 text-center border-l bg-slate-50/30">
                                <Checkbox
                                    checked={permissions.find(p => p.module === module)?.actions.length === actions.length}
                                    onCheckedChange={(c) => handleToggleRow(module, c as boolean)}
                                    disabled={readOnly}
                                />
                            </td>
                            {actions.map(action => (
                                <td key={`${module}-${action}`} className="p-3 text-center">
                                    <Checkbox
                                        checked={isChecked(module, action)}
                                        onCheckedChange={(c) => handleToggle(module, action, c as boolean)}
                                        disabled={readOnly}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
