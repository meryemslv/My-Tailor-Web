const express = require('express');
const cors = require('cors');
require('dotenv').config();
// görsel dosyalarını tutabilmek için
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

//veritabanını içeri aktarıyoruz
const db = require('./config/db');

//rotaları içeri aktarıyoruz

const productRoutes = require('./routes/productRoutes');

const app = express();
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
const PORT = process.env.PORT || 5000;

//Middlewares

app.use(cors());//farklı portlardaki react uygulamasının bağlanmasına izin verir
app.use(express.json());// gelen json verilerini okuyabilmemizi sağlar

//rotalar(API Endpoints)

app.use('/api/products', productRoutes);
app.post('/api/products/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Fotoğraf seçilmedi.'
        });
    }

    res.status(200).json({
        success: true,
        image_url: `/uploads/${req.file.filename}`
    });
});

//test rotası

app.get('/api', (req, res) => {
    res.json({ message: 'Tailor platform API çalışıyor ve react ile konuşmaya hazır!'});
});

//sunucuyu başlatma

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başarıyla çalışıyor...`);
});