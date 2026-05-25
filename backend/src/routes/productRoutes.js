import express from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    addSkuToProduct,
    updateSku,
    deleteSku,
    getSatuans, createSatuan, deleteSatuan,
    getTypes, createType, deleteType,
    getJenis, createJenis, deleteJenis,
    getGudangs, createGudang, deleteGudang
} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// In production enable auth middleware; allow open access in local dev for testing
const productAuthEnabled = process.env.NODE_ENV === 'production';
if (productAuthEnabled) {
    router.use(verifyToken);
}

// Product Parent Endpoints
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Nested Product SKU (Variant) Endpoints
router.post('/:productId/skus', addSkuToProduct);
router.put('/skus/:skuId', updateSku);
router.delete('/skus/:skuId', deleteSku);

// Attribute Master Endpoints

router.get('/attributes/satuan', getSatuans);
router.post('/attributes/satuan', createSatuan);
router.delete('/attributes/satuan/:id', deleteSatuan);

router.get('/attributes/types', getTypes);
router.post('/attributes/types', createType);
router.delete('/attributes/types/:id', deleteType);

router.get('/attributes/jenis', getJenis);
router.post('/attributes/jenis', createJenis);
router.delete('/attributes/jenis/:id', deleteJenis);

router.get('/attributes/gudang', getGudangs);
router.post('/attributes/gudang', createGudang);
router.delete('/attributes/gudang/:id', deleteGudang);

export default router;
