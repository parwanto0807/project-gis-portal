import { prisma } from '../services/prismaService.js';
import { StatusCodes } from 'http-status-codes';

// ==========================================
// PRODUCT (PARENT) CRUD
// ==========================================

// GET /api/v1/products - Fetch products with pagination & search
export const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { search, kategori } = req.query;

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { namaBarang: { contains: search, mode: 'insensitive' } },
                        { namaPanggilan: { contains: search, mode: 'insensitive' } },
                        { customer: { contains: search, mode: 'insensitive' } },
                        { supplier: { contains: search, mode: 'insensitive' } }
                    ]
                } : {},
                kategori ? { kategori: { contains: kategori, mode: 'insensitive' } } : {}
            ]
        };

        const [products, totalItems] = await Promise.all([
            prisma.product.findMany({
                where: whereClause,
                include: {
                    skus: {
                        include: {
                            satuan: { select: { satuan: true } },
                            gudangRelation: { select: { namaGudang: true } }
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.product.count({ where: whereClause })
        ]);

        res.status(StatusCodes.OK).json({
            success: true,
            data: products,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
                pageSize: limit
            }
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/products/:id - Fetch single product with nested SKUs & master relations
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                skus: {
                    include: {
                        satuan: true,
                        typeProduct: true,
                        jenisProduct: true,
                        gudangRelation: true
                    }
                }
            }
        });

        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

const normalizeSkuPayload = (sku) => ({
    sku: sku.sku,
    part: sku.part,
    sat: sku.sat || undefined,
    warna: sku.warna || undefined,
    lebar: sku.lebar || undefined,
    panjang: sku.panjang || undefined,
    jenis: sku.jenis || undefined,
    namaset: sku.namaset || undefined,
    harga: sku.harga ?? 0,
    item: sku.item ?? 0,
    balance: sku.balance ?? 0,
    stawal: sku.stawal ?? 0,
    stakhir: sku.stakhir ?? 0,
    tipe: sku.tipe || undefined,
    rak: sku.rak || undefined,
    lokasi: sku.lokasi || undefined,
    hargaJual: sku.hargaJual ?? 0,
    hargaBeli: sku.hargaBeli ?? 0,
    hargaProd: sku.hargaProd ?? 0,
    disc: sku.disc ?? 0,
    ppn: sku.ppn ?? 0,
    ppnSo: sku.ppnSo ?? 0,
    ukuran: sku.ukuran || undefined,
    gambar: sku.gambar || undefined,
    set: sku.set || undefined,
    noSales: sku.noSales || undefined,
    sales: sku.sales || undefined,
    statusBarang: sku.statusBarang || undefined,
    hargaInv: sku.hargaInv ?? 0,
    gudang: sku.gudang || undefined,
    overStock: sku.overStock ?? 0,
    limitStock: sku.limitStock ?? 0,
    satuanId: sku.satuanId ? Number(sku.satuanId) : undefined,
    typeProductId: sku.typeProductId || undefined,
    jenisProductId: sku.jenisProductId || undefined,
    gudangId: sku.gudangId || undefined
});

// POST /api/v1/products - Create a new product (and optionally nested SKUs)
export const createProduct = async (req, res, next) => {
    try {
        console.log('CREATE_PRODUCT_BODY', JSON.stringify(req.body).slice(0, 1000));
        const {
            namaBarang,
            namaPanggilan,
            customer,
            keperluan,
            supplier,
            mtUang,
            payment,
            material,
            icon,
            kategori,
            skus
        } = req.body;

        const newProduct = await prisma.product.create({
            data: {
                namaBarang,
                namaPanggilan,
                customer,
                keperluan,
                supplier,
                mtUang,
                payment,
                material,
                icon,
                kategori,
                skus: skus && skus.length > 0 ? {
                    create: skus.map(normalizeSkuPayload)
                } : undefined
            },
            include: { skus: true }
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            data: newProduct,
            message: 'Product created successfully'
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/v1/products/:id - Update product master info
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            namaBarang,
            namaPanggilan,
            customer,
            keperluan,
            supplier,
            mtUang,
            payment,
            material,
            icon,
            kategori,
            skus
        } = req.body;

        const productUpdate = prisma.product.update({
            where: { id },
            data: {
                namaBarang,
                namaPanggilan,
                customer,
                keperluan,
                supplier,
                mtUang,
                payment,
                material,
                icon,
                kategori
            }
        });

        if (Array.isArray(skus)) {
            const updates = [];
            const creates = [];

            for (const sku of skus) {
                const skuData = normalizeSkuPayload(sku);
                if (sku.id) {
                    updates.push(
                        prisma.productSku.update({
                            where: { id: sku.id },
                            data: skuData
                        })
                    );
                } else {
                    creates.push(
                        prisma.productSku.create({
                            data: {
                                ...skuData,
                                productId: id
                            }
                        })
                    );
                }
            }

            await prisma.$transaction([productUpdate, ...updates, ...creates]);
            const updatedProduct = await prisma.product.findUnique({
                where: { id },
                include: {
                    skus: {
                        include: {
                            satuan: true,
                            typeProduct: true,
                            jenisProduct: true,
                            gudangRelation: true
                        }
                    }
                }
            });

            res.status(StatusCodes.OK).json({
                success: true,
                data: updatedProduct,
                message: 'Product updated successfully'
            });
            return;
        }

        const updatedProduct = await productUpdate;

        res.status(StatusCodes.OK).json({
            success: true,
            data: updatedProduct,
            message: 'Product updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/v1/products/:id - Delete product (cascades to all associated SKUs)
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.product.delete({
            where: { id }
        });

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Product and all associated variants (SKUs) deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};


// ==========================================
// PRODUCT SKU (VARIANT) CRUD
// ==========================================

// POST /api/v1/products/:productId/skus - Add a new SKU variant to a product
export const addSkuToProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const skuData = normalizeSkuPayload(req.body);

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Parent product not found'
            });
        }

        const newSku = await prisma.productSku.create({
            data: {
                ...skuData,
                productId
            }
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            data: newSku,
            message: 'SKU variant added successfully'
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/v1/products/skus/:skuId - Update a specific SKU variant
export const updateSku = async (req, res, next) => {
    try {
        const { skuId } = req.params;
        const skuData = normalizeSkuPayload(req.body);

        const updatedSku = await prisma.productSku.update({
            where: { id: skuId },
            data: skuData
        });

        res.status(StatusCodes.OK).json({
            success: true,
            data: updatedSku,
            message: 'SKU variant updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/v1/products/skus/:skuId - Delete a specific SKU variant
export const deleteSku = async (req, res, next) => {
    try {
        const { skuId } = req.params;

        await prisma.productSku.delete({
            where: { id: skuId }
        });

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'SKU variant deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};


// ==========================================
// MASTER DATA (AUXILIARY ATTRIBUTES) CRUD
// ==========================================

// --- SATUAN (UNITS) ---
export const getSatuans = async (req, res, next) => {
    try {
        const data = await prisma.satuan.findMany({ orderBy: { satuan: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { next(error); }
};
export const createSatuan = async (req, res, next) => {
    try {
        const { satuan, keterangan, oldId } = req.body;
        const data = await prisma.satuan.create({ data: { satuan, keterangan, oldId } });
        res.status(StatusCodes.CREATED).json({ success: true, data, message: 'Satuan created' });
    } catch (error) { next(error); }
};
export const deleteSatuan = async (req, res, next) => {
    try {
        await prisma.satuan.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ success: true, message: 'Satuan deleted' });
    } catch (error) { next(error); }
};

// --- TYPE PRODUCT ---
export const getTypes = async (req, res, next) => {
    try {
        const data = await prisma.typeProduct.findMany({ orderBy: { typebarang: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { next(error); }
};
export const createType = async (req, res, next) => {
    try {
        const { typebarang, keterangan, oldId } = req.body;
        const data = await prisma.typeProduct.create({ data: { typebarang, keterangan, oldId } });
        res.status(StatusCodes.CREATED).json({ success: true, data, message: 'Type created' });
    } catch (error) { next(error); }
};
export const deleteType = async (req, res, next) => {
    try {
        await prisma.typeProduct.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: 'Type deleted' });
    } catch (error) { next(error); }
};

// --- JENIS PRODUCT ---
export const getJenis = async (req, res, next) => {
    try {
        const data = await prisma.jenisProduct.findMany({ orderBy: { namajenis: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { next(error); }
};
export const createJenis = async (req, res, next) => {
    try {
        const { namajenis, keterangan, oldId } = req.body;
        const data = await prisma.jenisProduct.create({ data: { namajenis, keterangan, oldId } });
        res.status(StatusCodes.CREATED).json({ success: true, data, message: 'Jenis created' });
    } catch (error) { next(error); }
};
export const deleteJenis = async (req, res, next) => {
    try {
        await prisma.jenisProduct.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: 'Jenis deleted' });
    } catch (error) { next(error); }
};

// --- GUDANG (WAREHOUSE) ---
export const getGudangs = async (req, res, next) => {
    try {
        const data = await prisma.gudang.findMany({ orderBy: { namaGudang: 'asc' } });
        res.json({ success: true, data });
    } catch (error) { next(error); }
};
export const createGudang = async (req, res, next) => {
    try {
        const { namaGudang, keterangan, oldId } = req.body;
        const data = await prisma.gudang.create({ data: { namaGudang, keterangan, oldId } });
        res.status(StatusCodes.CREATED).json({ success: true, data, message: 'Gudang created' });
    } catch (error) { next(error); }
};
export const deleteGudang = async (req, res, next) => {
    try {
        await prisma.gudang.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: 'Gudang deleted' });
    } catch (error) { next(error); }
};
