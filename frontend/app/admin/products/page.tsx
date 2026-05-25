'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Package,
    Layers,
    Warehouse,
    Scale,
    Tag,
    Search,
    Plus,
    Trash2,
    Edit2,
    Eye,
    Loader2,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Boxes,
    AlertTriangle,
    PlusCircle,
    Home
} from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';
import Link from 'next/link';

type ProductSku = {
    id?: string | number;
    sku: string;
    part: string;
    sat?: string;
    warna: string;
    lebar: string;
    panjang: string;
    ukuran: string;
    hargaJual: number;
    hargaBeli: number;
    harga: number;
    item: number;
    balance: number;
    stawal: number;
    stakhir: number;
    tipe: string;
    rak: string;
    lokasi: string;
    gambar: string;
    set: string;
    noSales: string;
    sales: string;
    statusBarang: string;
    hargaInv: number;
    gudang: string;
    overStock: number;
    limitStock: number;
    gudangId: string;
    satuanId: string;
    typeProductId: string;
    jenisProductId: string;
    gudangRelation?: {
        namaGudang: string;
    };
    satuan?: {
        satuan: string;
    };
};

type Product = {
    id?: string | number;
    namaBarang: string;
    namaPanggilan: string;
    customer: string;
    keperluan: string;
    supplier: string;
    mtUang: string;
    payment: string;
    material: string;
    icon: string;
    kategori: string;
    skus: ProductSku[];
};

type MasterEntryCommon = {
    id: string | number;
    keterangan?: string;
    oldId?: string;
};

type Satuan = MasterEntryCommon & {
    satuan: string;
};

type TypeProduct = MasterEntryCommon & {
    typebarang: string;
};

type JenisProduct = MasterEntryCommon & {
    namajenis: string;
};

type Gudang = MasterEntryCommon & {
    namaGudang: string;
};

export default function ProductsPage() {
    const [activeMainTab, setActiveMainTab] = useState('products');

    // Auxiliary Master Lists
    const [satuans, setSatuans] = useState<Satuan[]>([]);
    const [types, setTypes] = useState<TypeProduct[]>([]);
    const [jenisList, setJenisList] = useState<JenisProduct[]>([]);
    const [gudangs, setGudangs] = useState<Gudang[]>([]);

    // Product Catalog State
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10
    });
    const [search, setSearch] = useState('');
    const [kategoriFilter, setKategoriFilter] = useState('');
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Selected Product for Details
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Analytics Stats State
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalSkus: 0,
        outOfStock: 0,
        totalAssetValue: 0
    });

    // Create / Edit Product Dialog state
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const blankProduct: Product = {
        namaBarang: '',
        namaPanggilan: '',
        customer: '',
        keperluan: '',
        supplier: '',
        mtUang: 'IDR',
        payment: '',
        material: '',
        icon: '',
        kategori: '',
        skus: []
    };
    const blankSku: ProductSku = {
        // match ProductSku model fields (subset used in UI)
        id: undefined,
        sku: '',
        part: '',
        sat: '',
        warna: '',
        lebar: '',
        panjang: '',
        ukuran: '',
        hargaJual: 0,
        hargaBeli: 0,
        harga: 0,
        item: 0,
        balance: 0,
        stawal: 0,
        stakhir: 0,
        tipe: '',
        rak: '',
        lokasi: '',
        gambar: '',
        set: '',
        noSales: '',
        sales: '',
        statusBarang: '',
        hargaInv: 0,
        gudang: 'KGD-01',
        overStock: 0,
        limitStock: 0,
        gudangId: '',
        satuanId: '',
        typeProductId: '',
        jenisProductId: ''
    };
    const [newProduct, setNewProduct] = useState<Product>(blankProduct);

    const resetProductForm = () => {
        setNewProduct(blankProduct);
        setTempSku(blankSku);
        setIsEditMode(false);
        setEditingProductId(null);
    };

    const openCreateDialog = () => {
        resetProductForm();
        setIsCreateOpen(true);
    };

    const openEditDialog = (prod: Product) => {
        setIsEditMode(true);
        setEditingProductId(prod.id ? String(prod.id) : null);
        setNewProduct({
            namaBarang: prod.namaBarang || '',
            namaPanggilan: prod.namaPanggilan || '',
            customer: prod.customer || '',
            keperluan: prod.keperluan || '',
            supplier: prod.supplier || '',
            mtUang: prod.mtUang || 'IDR',
            payment: prod.payment || '',
            material: prod.material || '',
            icon: prod.icon || '',
            kategori: prod.kategori || '',
            skus: prod.skus?.map((sku: ProductSku) => ({
                ...blankSku,
                ...sku,
                satuanId: sku.satuanId !== undefined ? String(sku.satuanId) : '',
                gudangId: sku.gudangId || '',
                typeProductId: sku.typeProductId || '',
                jenisProductId: sku.jenisProductId || ''
            })) || []
        });
        setTempSku(blankSku);
        setIsCreateOpen(true);
    };

    // Temp sku addition state
    const [tempSku, setTempSku] = useState(blankSku);

    // Generic Modal Creation State for Master Data
    const [activeMasterTab, setActiveMasterTab] = useState('satuans');
    const [masterForm, setMasterForm] = useState({
        satuan: '',  // Satuan
        typebarang: '', // Type
        namajenis: '', // Jenis
        namaGudang: '', // Gudang
        keterangan: '',
        oldId: ''
    });

    useEffect(() => {
        fetchProducts();
        fetchMasterAttributes();
    }, [pagination.currentPage, search, kategoriFilter]);

    // Recalculate stats when products change
    useEffect(() => {
        if (products.length > 0) {
            calculateStats();
        }
    }, [products]);

    const calculateStats = () => {
        let variantCount = 0;
        let oosCount = 0;
        let assetVal = 0;

        products.forEach(p => {
            if (p.skus) {
                p.skus.forEach((sku) => {
                    variantCount++;
                    if (sku.balance <= 0) oosCount++;
                    assetVal += (sku.balance * sku.hargaBeli);
                });
            }
        });

        setStats({
            totalProducts: pagination.totalItems || products.length,
            totalSkus: variantCount,
            outOfStock: oosCount,
            totalAssetValue: assetVal
        });
    };

    const fetchMasterAttributes = async () => {
        try {
            const [rSat, rType, rJenis, rGudang] = await Promise.all([
                api.get('/products/attributes/satuan'),
                api.get('/products/attributes/types'),
                api.get('/products/attributes/jenis'),
                api.get('/products/attributes/gudang')
            ]);
            setSatuans(rSat.data.data);
            setTypes(rType.data.data);
            setJenisList(rJenis.data.data);
            setGudangs(rGudang.data.data);
        } catch (error) {
            console.error('Failed to load attributes');
        }
    };

    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const res = await api.get('/products', {
                params: {
                    page: pagination.currentPage,
                    limit: pagination.pageSize,
                    search,
                    kategori: kategoriFilter
                }
            });
            if (res.data.success) {
                setProducts(res.data.data);
                setPagination(prev => ({
                    ...prev,
                    totalItems: res.data.pagination.totalItems,
                    totalPages: res.data.pagination.totalPages
                }));
            }
        } catch (error) {
            toast.error('Failed to load product catalog');
        } finally {
            setLoadingProducts(false);
        }
    };

    const validateProductForm = () => {
        if (!newProduct.namaBarang?.trim()) {
            toast.error('Nama Barang wajib diisi.');
            return false;
        }
        if (!newProduct.kategori?.trim()) {
            toast.error('Kategori produk wajib diisi.');
            return false;
        }
        if (!newProduct.customer?.trim()) {
            toast.error('Customer wajib diisi.');
            return false;
        }
        if (!newProduct.supplier?.trim()) {
            toast.error('Supplier wajib diisi.');
            return false;
        }
        if (!newProduct.skus || newProduct.skus.length === 0) {
            toast.error('Tambahkan minimal satu variant SKU sebelum menyimpan.');
            return false;
        }
        return true;
    };

    const handleCreateProduct = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateProductForm()) {
            return;
        }

        try {
            if (isEditMode && editingProductId) {
                const res = await api.put(`/products/${editingProductId}`, newProduct);
                if (res.data.success) {
                    toast.success('Product updated successfully');
                    setIsCreateOpen(false);
                    resetProductForm();
                    fetchProducts();
                }
            } else {
                const res = await api.post('/products', newProduct);
                if (res.data.success) {
                    toast.success('Product and SKUs created successfully');
                    setIsCreateOpen(false);
                    resetProductForm();
                    fetchProducts();
                }
            }
        } catch (error) {
            toast.error(isEditMode ? 'Failed to update product' : 'Failed to create product');
        }
    };

    const handleAddSkuToTempList = () => {
        if (!tempSku.sku || !tempSku.part) {
            toast.error('SKU Code and Part Number are required');
            return;
        }
        setNewProduct((prev) => ({
            ...prev,
            skus: [...prev.skus, { ...tempSku }]
        }));
        // Reset tempSku to blankSku shape
        setTempSku(blankSku);
        toast.success('Variant SKU added to draft list');
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product? All of its variants (SKUs) will be permanently deleted.')) return;
        try {
            const res = await api.delete(`/products/${id}`);
            if (res.data.success) {
                toast.success('Product deleted successfully');
                fetchProducts();
            }
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleAddMasterData = async (e: FormEvent) => {
        e.preventDefault();
        let endpoint = '';
        const payload: Record<string, string | undefined> = { keterangan: masterForm.keterangan, oldId: masterForm.oldId };

        if (activeMasterTab === 'satuans') {
            endpoint = '/products/attributes/satuan';
            payload.satuan = masterForm.satuan;
        } else if (activeMasterTab === 'types') {
            endpoint = '/products/attributes/types';
            payload.typebarang = masterForm.typebarang;
        } else if (activeMasterTab === 'jenis') {
            endpoint = '/products/attributes/jenis';
            payload.namajenis = masterForm.namajenis;
        } else if (activeMasterTab === 'gudangs') {
            endpoint = '/products/attributes/gudang';
            payload.namaGudang = masterForm.namaGudang;
        }

        try {
            const res = await api.post(endpoint, payload);
            if (res.data.success) {
                toast.success(`${activeMasterTab.toUpperCase()} master entry added`);
                setMasterForm({
                    satuan: '',
                    typebarang: '',
                    namajenis: '',
                    namaGudang: '',
                    keterangan: '',
                    oldId: ''
                });
                fetchMasterAttributes();
            }
        } catch (error) {
            toast.error('Failed to save master entry');
        }
    };

    const handleDeleteMasterData = async (type: string, id: string | number) => {
        if (!confirm(`Are you sure you want to delete this entry?`)) return;
        let endpoint = '';
        if (type === 'satuan') endpoint = `/products/attributes/satuan/${id}`;
        else if (type === 'type') endpoint = `/products/attributes/types/${id}`;
        else if (type === 'jenis') endpoint = `/products/attributes/jenis/${id}`;
        else if (type === 'gudang') endpoint = `/products/attributes/gudang/${id}`;

        try {
            const res = await api.delete(endpoint);
            if (res.data.success) {
                toast.success('Deleted successfully');
                fetchMasterAttributes();
            }
        } catch (error) {
            toast.error('Deletion failed. Ensure it is not currently referenced by any active product variants.');
        }
    };

    const handleViewDetail = (prod: Product) => {
        setSelectedProduct(prod);
        setIsDetailOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 text-[11px] font-medium text-muted-foreground">
                    <li className="inline-flex items-center">
                        <Link href="/admin/dashboard" className="inline-flex items-center hover:text-primary transition-colors gap-1">
                            <Home className="w-3 h-3 text-muted-foreground" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-3.5 h-3.5 mx-1" />
                            <span className="hover:text-primary transition-colors cursor-pointer">Master Data</span>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <ChevronRight className="w-3.5 h-3.5 mx-1" />
                            <span className="text-foreground font-semibold">Products & SKUs</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Top Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products Hub</h1>
                    <p className="text-muted-foreground mt-2">Manage parent products, normalized SKU variants, and inventory attributes.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={openCreateDialog} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Main Section Tabs */}
            <Tabs defaultValue="products" value={activeMainTab} onValueChange={setActiveMainTab} className="space-y-6">
                <TabsList className="bg-muted/60 p-1">
                    <TabsTrigger value="products" className="flex items-center gap-2"><Package className="w-4 h-4" /> Product & SKUs</TabsTrigger>
                    <TabsTrigger value="attributes" className="flex items-center gap-2"><Layers className="w-4 h-4" /> Master Attributes</TabsTrigger>
                </TabsList>

                {/* TAB 1: PRODUCT CATALOG & SKUs */}
                <TabsContent value="products" className="space-y-6">
                    {/* Analytics Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <Card className="bg-gradient-to-br from-indigo-500/10 via-background to-background">
                            <CardHeader className="py-3 px-4">
                                <CardDescription className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">Total Products</CardDescription>
                                <CardTitle className="text-2xl font-bold flex items-center justify-between">
                                    {stats.totalProducts} <Boxes className="w-5 h-5 text-indigo-500 opacity-60" />
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="bg-gradient-to-br from-blue-500/10 via-background to-background">
                            <CardHeader className="py-3 px-4">
                                <CardDescription className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">Total SKU Variants</CardDescription>
                                <CardTitle className="text-2xl font-bold flex items-center justify-between">
                                    {stats.totalSkus} <Tag className="w-5 h-5 text-blue-500 opacity-60" />
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="bg-gradient-to-br from-amber-500/10 via-background to-background">
                            <CardHeader className="py-3 px-4">
                                <CardDescription className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Out of Stock SKUs</CardDescription>
                                <CardTitle className="text-2xl font-bold flex items-center justify-between text-amber-500">
                                    {stats.outOfStock} <AlertTriangle className="w-5 h-5 text-amber-500 opacity-80" />
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="bg-gradient-to-br from-emerald-500/10 via-background to-background">
                            <CardHeader className="py-2 px-4">
                                <CardDescription className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">Inventory Value (Assets)</CardDescription>
                                <CardTitle className="text-xl font-bold flex items-center justify-between">
                                    Rp {stats.totalAssetValue.toLocaleString('id-ID')} <DollarSign className="w-5 h-5 text-emerald-500 opacity-60" />
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Table Filters & Toolbar */}
                    <Card>
                        <CardContent className="py-1 flex flex-col md:flex-row gap-2 items-center justify-between">
                            <div className="relative flex-1 max-w-md w-full">
                                <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by product name, client, or supplier..."
                                    className="pl-9 h-8"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Input
                                    placeholder="Filter Category"
                                    className="h-8 w-full md:w-[160px]"
                                    value={kategoriFilter}
                                    onChange={(e) => setKategoriFilter(e.target.value)}
                                />
                                <Button variant="outline" size="sm" onClick={() => { setSearch(''); setKategoriFilter(''); }} className="h-8 px-3">
                                    Reset
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Grid / Table */}
                    <Card className="overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/40">
                                <TableRow>
                                    <TableHead className="w-[30%]">Product Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="text-center">Variants (SKU)</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loadingProducts ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" /> Loading products catalogue...
                                        </TableCell>
                                    </TableRow>
                                ) : products.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                            <Package className="w-10 h-10 mx-auto mb-2 opacity-20" /> No products matches found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    products.map((prod) => (
                                        <TableRow key={prod.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleViewDetail(prod)}>
                                            <TableCell className="font-semibold text-primary">
                                                <div>
                                                    <p>{prod.namaBarang}</p>
                                                    {prod.namaPanggilan && <span className="text-xs font-normal text-muted-foreground">({prod.namaPanggilan})</span>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{prod.kategori || 'N/A'}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">{prod.supplier || 'N/A'}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{prod.customer || 'N/A'}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold border-indigo-200">
                                                    {prod.skus?.length || 0}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleViewDetail(prod)}>
                                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(prod)}>
                                                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteProduct(String(prod.id))}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Bar */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-between items-center p-4 border-t bg-muted/20">
                                <span className="text-xs text-muted-foreground">Showing page {pagination.currentPage} of {pagination.totalPages}</span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pagination.currentPage === 1}
                                        onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage - 1 }))}
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage + 1 }))}
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </TabsContent>

                {/* TAB 2: MASTER ATTRIBUTES MANAGER */}
                <TabsContent value="attributes">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {/* Attributes Left Selector Panel */}
                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Attribute Category</CardTitle>
                                <CardDescription>Select an attribute group to manage its master list.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant={activeMasterTab === 'satuans' ? 'default' : 'ghost'}
                                    className="w-full justify-start gap-2"
                                    onClick={() => setActiveMasterTab('satuans')}
                                >
                                    <Scale className="w-4 h-4" /> Units (Satuan)
                                </Button>
                                <Button
                                    variant={activeMasterTab === 'types' ? 'default' : 'ghost'}
                                    className="w-full justify-start gap-2"
                                    onClick={() => setActiveMasterTab('types')}
                                >
                                    <Tag className="w-4 h-4" /> Product Types (TypeProduct)
                                </Button>
                                <Button
                                    variant={activeMasterTab === 'jenis' ? 'default' : 'ghost'}
                                    className="w-full justify-start gap-2"
                                    onClick={() => setActiveMasterTab('jenis')}
                                >
                                    <Layers className="w-4 h-4" /> Categories (jenisProduct)
                                </Button>
                                <Button
                                    variant={activeMasterTab === 'gudangs' ? 'default' : 'ghost'}
                                    className="w-full justify-start gap-2"
                                    onClick={() => setActiveMasterTab('gudangs')}
                                >
                                    <Warehouse className="w-4 h-4" /> Warehouses (Gudang)
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Attribute List & Creator (Right Panels) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Fast Master Creator Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Add Master Entry: {activeMasterTab.toUpperCase()}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleAddMasterData} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                        {activeMasterTab === 'satuans' && (
                                            <div className="space-y-2">
                                                <Label>Unit (Satuan)</Label>
                                                <Input required placeholder="e.g. Roll or Kg" value={masterForm.satuan} onChange={(e) => setMasterForm({ ...masterForm, satuan: e.target.value })} />
                                            </div>
                                        )}
                                        {activeMasterTab === 'types' && (
                                            <div className="space-y-2">
                                                <Label>Type Name</Label>
                                                <Input required placeholder="e.g. Besi Hollow" value={masterForm.typebarang} onChange={(e) => setMasterForm({ ...masterForm, typebarang: e.target.value })} />
                                            </div>
                                        )}
                                        {activeMasterTab === 'jenis' && (
                                            <div className="space-y-2">
                                                <Label>Category (Jenis)</Label>
                                                <Input required placeholder="e.g. Plat Lembaran" value={masterForm.namajenis} onChange={(e) => setMasterForm({ ...masterForm, namajenis: e.target.value })} />
                                            </div>
                                        )}
                                        {activeMasterTab === 'gudangs' && (
                                            <div className="space-y-2">
                                                <Label>Warehouse Name</Label>
                                                <Input required placeholder="e.g. Gudang A-01" value={masterForm.namaGudang} onChange={(e) => setMasterForm({ ...masterForm, namaGudang: e.target.value })} />
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Label>Description (Optional)</Label>
                                            <Input placeholder="Description details..." value={masterForm.keterangan} onChange={(e) => setMasterForm({ ...masterForm, keterangan: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Old ID (Legacy)</Label>
                                            <Input placeholder="Optional old DB ID link" value={masterForm.oldId} onChange={(e) => setMasterForm({ ...masterForm, oldId: e.target.value })} />
                                        </div>

                                        <Button type="submit" className="md:col-span-2 w-full flex justify-center items-center gap-2">
                                            <PlusCircle className="w-4 h-4" /> Save Attribute Entry
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Master Entries List */}
                            <Card>
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow>
                                            <TableHead>Name / Code</TableHead>
                                            <TableHead>Keterangan</TableHead>
                                            <TableHead>Legacy ID</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {activeMasterTab === 'satuans' && satuans.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="font-semibold text-primary">{s.satuan}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground">{s.keterangan || '-'}</TableCell>
                                                <TableCell className="text-xs">{s.oldId || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteMasterData('satuan', s.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {activeMasterTab === 'types' && types.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="font-semibold text-primary">{s.typebarang}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground">{s.keterangan || '-'}</TableCell>
                                                <TableCell className="text-xs">{s.oldId || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteMasterData('type', s.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {activeMasterTab === 'jenis' && jenisList.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="font-semibold text-primary">{s.namajenis}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground">{s.keterangan || '-'}</TableCell>
                                                <TableCell className="text-xs">{s.oldId || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteMasterData('jenis', s.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {activeMasterTab === 'gudangs' && gudangs.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="font-semibold text-primary">{s.namaGudang}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground">{s.keterangan || '-'}</TableCell>
                                                <TableCell className="text-xs">{s.oldId || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteMasterData('gudang', s.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* 1. SLIDE-OUT DETAIL PANEL SHEET (PARENT PRODUCT + NESTED SKU TABLE) */}
            <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <SheetContent className="w-full sm:max-w-4xl overflow-y-auto bg-background border-l glass">
                    {selectedProduct && (
                        <div className="space-y-6">
                            <SheetHeader className="border-b pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <SheetTitle className="text-2xl font-bold text-primary">{selectedProduct.namaBarang}</SheetTitle>
                                        {selectedProduct.namaPanggilan && (
                                            <SheetDescription className="text-sm font-medium">Alias: {selectedProduct.namaPanggilan}</SheetDescription>
                                        )}
                                    </div>
                                    <Badge variant="default" className="text-xs font-bold px-3 py-1">Category: {selectedProduct.kategori || 'General'}</Badge>
                                </div>
                            </SheetHeader>

                            {/* Product Info Fields Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/30 border border-muted/50 text-xs">
                                <div>
                                    <p className="text-muted-foreground uppercase font-bold text-[10px]">Client Customer</p>
                                    <p className="font-semibold mt-1 text-sm">{selectedProduct.customer || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground uppercase font-bold text-[10px]">Supplier Factory</p>
                                    <p className="font-semibold mt-1 text-sm">{selectedProduct.supplier || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground uppercase font-bold text-[10px]">Currency</p>
                                    <p className="font-semibold mt-1 text-sm">{selectedProduct.mtUang || 'IDR'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground uppercase font-bold text-[10px]">Payment Term</p>
                                    <p className="font-semibold mt-1 text-sm">{selectedProduct.payment || '-'}</p>
                                </div>
                            </div>

                            {/* Variants (SKU) Section */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h3 className="text-lg font-bold flex items-center gap-2"><Boxes className="w-5 h-5 text-primary" /> Active SKU Variants</h3>
                                </div>

                                <Table className="border border-muted/50 rounded-lg overflow-hidden">
                                    <TableHeader className="bg-muted/40 text-xs">
                                        <TableRow>
                                            <TableHead>SKU / Part Code</TableHead>
                                            <TableHead>Attributes (Color/Dim)</TableHead>
                                            <TableHead>Warehouse</TableHead>
                                            <TableHead className="text-right">Price (Beli / Jual)</TableHead>
                                            <TableHead className="text-center">Stock Balance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="text-xs">
                                        {selectedProduct.skus?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                                    No variants found. Add a variant SKU to start inventory logs.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            selectedProduct.skus.map((sku) => (
                                                <TableRow key={sku.id} className="hover:bg-muted/20">
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-semibold text-primary">{sku.sku}</p>
                                                            <span className="text-[10px] text-muted-foreground">Part: {sku.part}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{sku.warna || 'No Color'}</p>
                                                            {(sku.lebar || sku.panjang) && (
                                                                <span className="text-[10px] text-muted-foreground">Dim: {sku.lebar}x{sku.panjang} {sku.ukuran}</span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{sku.gudangRelation?.namaGudang || sku.gudang || 'KGD-01'}</p>
                                                            {sku.rak && <span className="text-[10px] text-muted-foreground">Rak: {sku.rak} | Loc: {sku.lokasi}</span>}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div>
                                                            <p className="font-semibold text-emerald-600">Rp {sku.hargaJual.toLocaleString()}</p>
                                                            <span className="text-[10px] text-muted-foreground">Cost: Rp {sku.hargaBeli.toLocaleString()}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge variant={sku.balance <= 0 ? 'destructive' : (sku.balance < 10 ? 'outline' : 'secondary')} className="font-bold">
                                                            {sku.balance} {sku.satuan?.satuan || sku.sat || 'Pcs'}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* 2. ADD PRODUCT DIALOG (WITH SKU INLINE DRAFT BUILDER) */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogContent className="w-full max-w-[580px] md:max-w-[620px] max-h-[88vh] overflow-y-auto" onInteractOutside={(event) => event.preventDefault()}>
                        <DialogHeader className="space-y-1 mb-2">
                            <DialogTitle className="text-sm">{isEditMode ? 'Edit Product & SKUs' : 'Add New Product & SKUs'}</DialogTitle>
                            <DialogDescription className="text-[10px] leading-4">{isEditMode ? 'Update product details and SKU draft variants.' : 'Define product attributes and add variant SKU drafts.'}</DialogDescription>
                        </DialogHeader>
                        <div className="px-2 md:px-3 text-sm space-y-2">
                        <Tabs defaultValue="general" className="w-full mt-2">
                        <TabsList className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            <TabsTrigger value="general" className="text-[13px]">1. General Information</TabsTrigger>
                            <TabsTrigger value="skus" className="text-[13px]">2. SKU Variants Setup</TabsTrigger>
                        </TabsList>

                        {/* GENERAL TAB */}
                        <TabsContent value="general" className="space-y-2 pt-3 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label className="text-sm">Product Name *</Label>
                                    <Input className="h-8 text-sm" required placeholder="e.g. Besi Hollow 4x4" value={newProduct.namaBarang} onChange={(e) => setNewProduct({ ...newProduct, namaBarang: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm">Nickname/Alias</Label>
                                    <Input className="h-8 text-sm" placeholder="e.g. Hollow Hitam" value={newProduct.namaPanggilan} onChange={(e) => setNewProduct({ ...newProduct, namaPanggilan: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label className="text-sm">Category *</Label>
                                    <Input className="h-8 text-sm" placeholder="e.g. Besi / Plat" value={newProduct.kategori} onChange={(e) => setNewProduct({ ...newProduct, kategori: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm">Material</Label>
                                    <Input className="h-8 text-sm" placeholder="e.g. Steel / Carbon" value={newProduct.material} onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label className="text-sm">Client Customer *</Label>
                                    <Input className="h-8 text-sm" placeholder="e.g. PT Maju Jaya" value={newProduct.customer} onChange={(e) => setNewProduct({ ...newProduct, customer: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm">Supplier Factory *</Label>
                                    <Input className="h-8 text-sm" placeholder="e.g. PT Steel Asia" value={newProduct.supplier} onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <Label className="text-sm">Currency</Label>
                                    <Select value={newProduct.mtUang} onValueChange={(val) => setNewProduct({ ...newProduct, mtUang: val })}>
                                        <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select Currency" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IDR">IDR (Rupiah)</SelectItem>
                                            <SelectItem value="USD">USD (Dollar)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-sm">Payment Term</Label>
                                    <Input className="h-8 text-sm" placeholder="e.g. COD / 30 Days" value={newProduct.payment} onChange={(e) => setNewProduct({ ...newProduct, payment: e.target.value })} />
                                </div>
                            </div>
                        </TabsContent>

                        {/* SKUs TAB (VARIANTS BUILDER) */}
                        <TabsContent value="skus" className="space-y-2 pt-3 text-sm">
                            {/* Inline SKU Creator Form */}
                            <div className="p-2 rounded-xl border border-muted/40 bg-muted/15 space-y-2">
                                <h4 className="text-sm font-semibold flex items-center gap-2"><PlusCircle className="w-4 h-4 text-primary" /> Variant Fields</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">SKU Code</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. H4X4-BLK" value={tempSku.sku} onChange={(e) => setTempSku({ ...tempSku, sku: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Part Number</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. P-0012" value={tempSku.part} onChange={(e) => setTempSku({ ...tempSku, part: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Color (Warna)</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. Hitam" value={tempSku.warna} onChange={(e) => setTempSku({ ...tempSku, warna: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Width (Lebar)</Label>
                                        <Input className="h-8 text-sm" placeholder="40" value={tempSku.lebar} onChange={(e) => setTempSku({ ...tempSku, lebar: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Length (Panjang)</Label>
                                        <Input className="h-8 text-sm" placeholder="100" value={tempSku.panjang} onChange={(e) => setTempSku({ ...tempSku, panjang: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Initial Balance</Label>
                                        <Input className="h-8 text-sm" type="number" placeholder="50" value={tempSku.balance} onChange={(e) => setTempSku({ ...tempSku, balance: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Harga Beli (Cost)</Label>
                                        <Input className="h-8 text-sm" type="number" placeholder="10000" value={tempSku.hargaBeli} onChange={(e) => setTempSku({ ...tempSku, hargaBeli: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Harga Jual (Price)</Label>
                                        <Input className="h-8 text-sm" type="number" placeholder="15000" value={tempSku.hargaJual} onChange={(e) => setTempSku({ ...tempSku, hargaJual: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Warehouse (Gudang)</Label>
                                        <Select value={tempSku.gudangId} onValueChange={(val) => setTempSku({ ...tempSku, gudangId: val })}>
                                            <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select Warehouse" /></SelectTrigger>
                                            <SelectContent>
                                                {gudangs.map(g => (
                                                    <SelectItem key={g.id} value={String(g.id)}>{g.namaGudang}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Unit (Satuan)</Label>
                                        <Select value={String(tempSku.satuanId)} onValueChange={(val) => setTempSku({ ...tempSku, satuanId: val })}>
                                            <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select Unit" /></SelectTrigger>
                                            <SelectContent>
                                                {satuans.map(s => (
                                                    <SelectItem key={s.id} value={String(s.id)}>{s.satuan}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Product Type</Label>
                                        <Select value={tempSku.typeProductId} onValueChange={(val) => setTempSku({ ...tempSku, typeProductId: val })}>
                                            <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select Type" /></SelectTrigger>
                                            <SelectContent>
                                                {types.map(t => (
                                                    <SelectItem key={t.id} value={String(t.id)}>{t.typebarang}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Size (Ukuran)</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. L / M" value={tempSku.ukuran} onChange={(e) => setTempSku({ ...tempSku, ukuran: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Type (Tipe)</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. Standard" value={tempSku.tipe} onChange={(e) => setTempSku({ ...tempSku, tipe: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Rack (Rak)</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. R1" value={tempSku.rak} onChange={(e) => setTempSku({ ...tempSku, rak: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Location</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. A1-02" value={tempSku.lokasi} onChange={(e) => setTempSku({ ...tempSku, lokasi: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Over Stock</Label>
                                        <Input className="h-8 text-sm" type="number" value={tempSku.overStock} onChange={(e) => setTempSku({ ...tempSku, overStock: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Limit Stock</Label>
                                        <Input className="h-8 text-sm" type="number" value={tempSku.limitStock} onChange={(e) => setTempSku({ ...tempSku, limitStock: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Status</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. Active" value={tempSku.statusBarang} onChange={(e) => setTempSku({ ...tempSku, statusBarang: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">No Sales</Label>
                                        <Input className="h-8 text-sm" placeholder="e.g. NS-001" value={tempSku.noSales} onChange={(e) => setTempSku({ ...tempSku, noSales: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Image URL</Label>
                                        <Input className="h-8 text-sm" placeholder="Image URL" value={tempSku.gambar} onChange={(e) => setTempSku({ ...tempSku, gambar: e.target.value })} />
                                    </div>
                                </div>

                                <Button type="button" variant="secondary" size="sm" onClick={handleAddSkuToTempList} className="w-full flex items-center justify-center gap-2 mt-2">
                                    <Plus className="w-3.5 h-3.5" /> Append Variant to Draft
                                </Button>
                            </div>

                            {/* Draft SKU List */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variants in Draft ({newProduct.skus.length})</h4>
                                {newProduct.skus.length === 0 ? (
                                    <p className="text-xs text-muted-foreground italic pl-2">No variants created yet. Please define at least one variant SKU above.</p>
                                ) : (
                                    <Table className="border border-muted/50 rounded-lg overflow-hidden">
                                        <TableHeader className="bg-muted/10 text-xs">
                                            <TableRow>
                                                <TableHead>SKU</TableHead>
                                                <TableHead>Part</TableHead>
                                                <TableHead>Color</TableHead>
                                                <TableHead>Stok</TableHead>
                                                <TableHead className="text-right">Price</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="text-xs">
                                            {newProduct.skus.map((sku, i: number) => (
                                                <TableRow key={i}>
                                                    <TableCell className="font-semibold text-primary">{sku.sku}</TableCell>
                                                    <TableCell>{sku.part}</TableCell>
                                                    <TableCell>{sku.warna || '-'}</TableCell>
                                                    <TableCell><Badge variant="secondary">{sku.balance}</Badge></TableCell>
                                                    <TableCell className="text-right font-semibold">Rp {sku.hargaJual.toLocaleString()}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive h-7 w-7"
                                                            onClick={() => setNewProduct((prev) => ({
                                                                ...prev,
                                                                skus: prev.skus.filter((_, idx: number) => idx !== i)
                                                            }))}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                    </div>

                    <DialogFooter className="mt-2 border-t pt-2 gap-2 justify-end">
                        <Button variant="outline" size="sm" className="min-w-[90px]" onClick={() => { setIsCreateOpen(false); resetProductForm(); }}>Cancel</Button>
                        <Button size="sm" className="min-w-[100px]" disabled={!newProduct.namaBarang.trim() || !newProduct.kategori.trim() || !newProduct.customer.trim() || !newProduct.supplier.trim() || newProduct.skus.length === 0} onClick={handleCreateProduct}>{isEditMode ? 'Save' : 'Create'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
