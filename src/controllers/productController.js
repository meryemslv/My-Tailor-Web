
const Product = require('../models/productModel');

// Tüm ürünleri getir
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ürünler getirilirken bir hata oluştu',
            error: error.message
        });
    }
};

// Yeni ürün oluştur
exports.createProduct = async (req, res) => {
    try {
        const newProductId = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Ürün başarıyla eklendi',
            productId: newProductId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ürün eklenirken bir hata oluştu',
            error: error.message
        });
    }
};

// Ürün bilgilerini güncelle
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, price } = req.body;

        // Gerekli alanları kontrol et
        if (
            !title?.trim() ||
            !description?.trim() ||
            price === undefined ||
            price === null ||
            price === '' ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'Kategori, açıklama ve geçerli bir fiyat girilmelidir.'
            });
        }

        const affectedRows = await Product.update(productId, {
            title: title.trim(),
            description: description.trim(),
            price: Number(price)
        });

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ürün bulunamadı veya bilgilerde değişiklik yapılmadı.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ürün başarıyla güncellendi.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ürün güncellenirken bir hata oluştu.',
            error: error.message
        });
    }
};

// Ürün sil
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const affectedRows = await Product.delete(productId);

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Silinecek ürün bulunamadı'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ürün başarıyla silindi'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ürün silinirken hata oluştu',
            error: error.message
        });
    }
};
