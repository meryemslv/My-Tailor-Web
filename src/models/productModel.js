
const db = require('../config/db');

const Product = {
    
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    },

  
    create: async (productData) => {
        const {
            tailor_id,
            title,
            description,
            price,
            image_url
        } = productData;

        const [result] = await db.query(
            `INSERT INTO products
            (tailor_id, title, description, price, image_url)
            VALUES (?, ?, ?, ?, ?)`,
            [tailor_id, title, description, price, image_url]
        );

        return result.insertId;
    },

    
    update: async (productId, productData) => {
        const { title, description, price } = productData;

        const [result] = await db.query(
            `UPDATE products
             SET title = ?, description = ?, price = ?
             WHERE id = ?`,
            [title, description, price, productId]
        );

        return result.affectedRows;
    },

    // Ürün silen fonksiyon
    delete: async (productId) => {
        const [result] = await db.query(
            'DELETE FROM products WHERE id = ?',
            [productId]
        );

        return result.affectedRows;
    }
};

module.exports = Product;
