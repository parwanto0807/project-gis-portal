'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Database, Server, KeySquare, Loader2, Table2, Trash2, Code } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';

export default function DatabaseConnectionPage() {
    const [savedConnections, setSavedConnections] = useState<any[]>([]);
    
    const [credentials, setCredentials] = useState({
        host: '',
        port: '3306',
        user: '',
        password: '',
        database: ''
    });

    const [saveConnection, setSaveConnection] = useState(false);
    const [connectionName, setConnectionName] = useState('');

    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [tables, setTables] = useState<string[]>([]);
    
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [tableDetails, setTableDetails] = useState<{ structure: any[], sampleData: any[] } | null>(null);
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        fetchSavedConnections();
    }, []);

    const fetchSavedConnections = async () => {
        try {
            const res = await api.get('/database/saved');
            if (res.data.success) {
                setSavedConnections(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch saved connections');
        }
    };

    const handleDeleteSaved = async (id: number) => {
        try {
            const res = await api.delete(`/database/saved/${id}`);
            if (res.data.success) {
                toast.success('Connection deleted');
                fetchSavedConnections();
            }
        } catch (error) {
            toast.error('Failed to delete connection');
        }
    };

    const handleConnect = async (e?: React.FormEvent, directCredentials?: any) => {
        if (e) e.preventDefault();
        setLoading(true);
        
        const credsToUse = directCredentials || credentials;

        try {
            const res = await api.post('/database/connect', credsToUse);
            if (res.data.success) {
                setTables(res.data.data.tables);
                setConnected(true);
                toast.success('Successfully connected to database');

                // If this was a new manual connection and user checked "Save"
                if (!directCredentials && saveConnection && connectionName) {
                    await api.post('/database/saved', {
                        name: connectionName,
                        ...credsToUse
                    });
                    toast.success('Connection saved successfully');
                    fetchSavedConnections();
                    setSaveConnection(false);
                    setConnectionName('');
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Connection failed. Check credentials and server reachability.');
            setConnected(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchTableDetails = async (tableName: string) => {
        setSelectedTable(tableName);
        setLoadingTable(true);
        try {
            const res = await api.post('/database/table', { credentials, tableName });
            if (res.data.success) {
                setTableDetails(res.data.data);
            }
        } catch (error: any) {
            toast.error('Failed to fetch table details');
        } finally {
            setLoadingTable(false);
        }
    };

    const handleDisconnect = () => {
        setConnected(false);
        setTables([]);
        setSelectedTable(null);
        setTableDetails(null);
    };

    const copyAsPrismaModel = () => {
        if (!tableDetails?.structure || !selectedTable) return;
        
        // Basic mapping from MySQL types to Prisma Types
        let str = `model ${selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} {\n`;
        
        tableDetails.structure.forEach((row) => {
            const fieldName = row.Field;
            const typeStr = String(row.Type).toLowerCase();
            let prismaType = "String";
            
            if (typeStr.includes('int')) prismaType = 'Int';
            else if (typeStr.includes('decimal') || typeStr.includes('float') || typeStr.includes('double')) prismaType = 'Float';
            else if (typeStr.includes('datetime') || typeStr.includes('timestamp') || typeStr.includes('date')) prismaType = 'DateTime';
            else if (typeStr.includes('tinyint(1)') || typeStr.includes('boolean')) prismaType = 'Boolean';
            else if (typeStr.includes('json')) prismaType = 'Json';

            let mods = [];
            if (row.Key === 'PRI') mods.push('@id');
            if (row.Extra.includes('auto_increment')) mods.push('@default(autoincrement())');
            
            // Handle Nullable
            if (row.Null === 'YES' && !mods.includes('@id')) prismaType += '?';
            
            // Handle Defaults
            if (row.Default) {
                if (String(row.Default).includes('CURRENT_TIMESTAMP')) mods.push('@default(now())');
                else if (row.Default !== 'NULL') {
                    if (prismaType.includes('Int') || prismaType.includes('Float') || prismaType.includes('Boolean')) {
                        mods.push(`@default(${row.Default})`);
                    } else {
                        mods.push(`@default("${row.Default}")`);
                    }
                }
            }
            
            str += `  ${fieldName.padEnd(20)} ${prismaType.padEnd(10)} ${mods.join(' ')}\n`;
        });
        
        str += `\n  @@map("${selectedTable}")\n`;
        str += `}\n`;
        
        navigator.clipboard.writeText(str);
        toast.success('Prisma Schema copied to clipboard!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Database Connection</h1>
                    <p className="text-muted-foreground mt-2">Connect to any remote MySQL database to inspect schema and sample data.</p>
                </div>
            </div>

            {!connected ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Saved Connections */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Saved Connections</h2>
                        {savedConnections.length === 0 ? (
                            <Card className="bg-muted/50 border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground text-sm">
                                    <Database className="w-10 h-10 mb-3 opacity-20" />
                                    No saved connections yet.
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-3">
                                {savedConnections.map((conn) => (
                                    <Card key={conn.id} className="cursor-pointer hover:border-primary transition-colors group">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div 
                                                className="flex-1 flex items-center gap-3"
                                                onClick={() => {
                                                    setCredentials(conn);
                                                    handleConnect(undefined, conn);
                                                }}
                                            >
                                                <div className="bg-primary/10 p-2 rounded-md">
                                                    <Server className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{conn.name}</p>
                                                    <p className="text-xs text-muted-foreground">{conn.user}@{conn.host}:{conn.port}</p>
                                                </div>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSaved(conn.id);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Manual Connection Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Server className="w-5 h-5 text-primary" /> New Connection</CardTitle>
                            <CardDescription>Enter database credentials manually.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleConnect} className="space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-2 col-span-3">
                                        <Label htmlFor="host">Host / IP Address</Label>
                                        <Input id="host" required placeholder="e.g. 192.168.1.100" value={credentials.host} onChange={(e) => setCredentials({ ...credentials, host: e.target.value })} />
                                    </div>
                                    <div className="space-y-2 col-span-1">
                                        <Label htmlFor="port">Port</Label>
                                        <Input id="port" required placeholder="3306" value={credentials.port} onChange={(e) => setCredentials({ ...credentials, port: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="user">Username</Label>
                                        <Input id="user" required placeholder="root" value={credentials.user} onChange={(e) => setCredentials({ ...credentials, user: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="database">Database Name</Label>
                                    <Input id="database" required placeholder="my_database" value={credentials.database} onChange={(e) => setCredentials({ ...credentials, database: e.target.value })} />
                                </div>

                                <div className="pt-2 flex items-center space-x-2">
                                    <Checkbox id="save" checked={saveConnection} onCheckedChange={(c) => setSaveConnection(!!c)} />
                                    <Label htmlFor="save" className="text-sm font-medium leading-none cursor-pointer">
                                        Save this connection for later
                                    </Label>
                                </div>

                                {saveConnection && (
                                    <div className="space-y-2 pl-6 animate-in slide-in-from-top-2">
                                        <Label htmlFor="connName">Connection Name</Label>
                                        <Input id="connName" required placeholder="e.g. Production DB" value={connectionName} onChange={(e) => setConnectionName(e.target.value)} />
                                    </div>
                                )}

                                <Button type="submit" disabled={loading} className="w-full mt-4">
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Connect to Database
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Sidebar Tables */}
                    <Card className="col-span-1 flex flex-col h-full overflow-hidden">
                        <CardHeader className="py-4 border-b">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2"><Database className="w-4 h-4" /> {credentials.database}</CardTitle>
                                <Button variant="ghost" size="sm" onClick={handleDisconnect} className="text-xs h-7 px-2 text-muted-foreground hover:text-destructive">Disconnect</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-0">
                            <div className="divide-y">
                                {tables.map(table => (
                                    <div 
                                        key={table} 
                                        onClick={() => fetchTableDetails(table)}
                                        className={`px-4 py-3 text-sm cursor-pointer hover:bg-muted/50 transition-colors flex items-center gap-2 ${selectedTable === table ? 'bg-primary/10 border-l-2 border-primary text-primary font-medium' : ''}`}
                                    >
                                        <Table2 className="w-4 h-4 opacity-50" />
                                        <span className="truncate">{table}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Content Area */}
                    <Card className="col-span-3 h-full overflow-hidden flex flex-col">
                        {selectedTable ? (
                            <>
                                <CardHeader className="py-4 border-b shrink-0">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        {selectedTable}
                                        {loadingTable && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-2" />}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                                    <Tabs defaultValue="structure" className="flex-1 flex flex-col h-full">
                                        <div className="px-4 py-2 border-b bg-muted/20">
                                            <TabsList>
                                                <TabsTrigger value="structure">Structure</TabsTrigger>
                                                <TabsTrigger value="data">Sample Data (Max 50)</TabsTrigger>
                                            </TabsList>
                                        </div>
                                        
                                        <TabsContent value="structure" className="flex-1 flex flex-col p-0 m-0 overflow-hidden">
                                            <div className="flex justify-end p-2 border-b bg-background">
                                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={copyAsPrismaModel}>
                                                    <Code className="w-3.5 h-3.5" />
                                                    Copy as Prisma Model (PostgreSQL)
                                                </Button>
                                            </div>
                                            <div className="flex-1 overflow-auto">
                                                {tableDetails?.structure && (
                                                    <Table>
                                                        <TableHeader className="bg-muted/30 sticky top-0">
                                                        <TableRow>
                                                            <TableHead>Field</TableHead>
                                                            <TableHead>Type</TableHead>
                                                            <TableHead>Null</TableHead>
                                                            <TableHead>Key</TableHead>
                                                            <TableHead>Default</TableHead>
                                                            <TableHead>Extra</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {tableDetails.structure.map((row, i) => (
                                                            <TableRow key={i}>
                                                                <TableCell className="font-medium text-primary">{row.Field}</TableCell>
                                                                <TableCell>{row.Type}</TableCell>
                                                                <TableCell>{row.Null}</TableCell>
                                                                <TableCell>
                                                                    {row.Key === 'PRI' ? <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center w-max gap-1"><KeySquare className="w-3 h-3"/> PRI</span> : row.Key}
                                                                </TableCell>
                                                                <TableCell className="text-muted-foreground">{row.Default || 'NULL'}</TableCell>
                                                                <TableCell>{row.Extra}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            )}
                                            </div>
                                        </TabsContent>
                                        
                                        <TabsContent value="data" className="flex-1 p-0 m-0 overflow-auto">
                                            {tableDetails?.sampleData && tableDetails.sampleData.length > 0 ? (
                                                <div className="relative w-full">
                                                    <Table>
                                                        <TableHeader className="bg-muted/30 sticky top-0 z-10">
                                                            <TableRow>
                                                                {Object.keys(tableDetails.sampleData[0]).map(col => (
                                                                    <TableHead key={col} className="whitespace-nowrap">{col}</TableHead>
                                                                ))}
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {tableDetails.sampleData.map((row, i) => (
                                                                <TableRow key={i}>
                                                                    {Object.values(row).map((val: any, j) => (
                                                                        <TableCell key={j} className="max-w-[200px] truncate" title={String(val)}>
                                                                            {val === null ? <span className="text-muted-foreground italic">NULL</span> : String(val)}
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    No data available in this table
                                                </div>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                                <Database className="w-12 h-12 mb-4 opacity-20" />
                                <p>Select a table from the sidebar to view its structure and data.</p>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
}
