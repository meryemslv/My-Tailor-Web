// Terzi Paneli

import { useState, useEffect } from 'react';

function TailorPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Ürünleri getir
  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ürünleri getirme hatası:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(String(product.price));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Yeni ürün ekle ve fotoğrafını yükle
const handleSubmit = async (e) => {
  e.preventDefault();

  // Mevcut ürünü güncelle
  if (editingId !== null) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            price,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Ürün güncellenemedi.');
      }

      setEditingId(null);
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);

      fetchProducts();
      alert('Ürün başarıyla güncellendi!');
    } catch (err) {
      console.error('Güncelleme hatası:', err);
      alert(err.message || 'Ürün güncellenirken hata oluştu.');
    }

    return;
  }

    if (!image) {
      alert('Lütfen bir ürün fotoğrafı seçiniz.');
      return;
    }

    try {
      // 1. Fotoğrafı backend'e yükle
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch(
        'http://localhost:5000/api/products/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const imageData = await response.json();

      if (!response.ok || !imageData.success) {
        throw new Error(
          imageData.message || 'Fotoğraf yüklenemedi.'
        );
      }

      // 2. Ürün bilgilerini hazırla
      const newProduct = {
        tailor_id: 1,
        title: title,
        description: description,
        price: price,
        image_url: imageData.image_url,
      };

      // 3. Ürünü veritabanına kaydet
      const productResponse = await fetch(
        'http://localhost:5000/api/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        }
      );

      const productData = await productResponse.json();

      if (!productResponse.ok || !productData.success) {
        throw new Error(
          productData.message || 'Ürün kaydedilemedi.'
        );
      }

      // 4. Formu temizle
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);

      const fileInput = document.getElementById('urunResmi');
      if (fileInput) {
        fileInput.value = '';
      }

      // 5. Ürün listesini yenile
      fetchProducts();

      alert('Ürün başarıyla eklendi!');

    } catch (err) {
      console.error('Ürün ekleme hatası:', err);
      alert(err.message || 'Ürün eklenirken bir hata oluştu.');
    }
  };

  // Ürün sil
  const handleDelete = (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      return;
    }

    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchProducts();
        } else {
          alert(data.message || 'Ürün silinemedi.');
        }
      })
      .catch((err) => {
        console.error('Silme hatası:', err);
      });
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h2>🛠️ Terzi Yönetim Paneli (Ürün Ekle / Sil)</h2>

      {/* Yeni Ürün Formu */}
      <div
        style={{
          background: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #ddd',
        }}
      >
        <h3>{editingId !== null ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h3>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="pl-[0.35rem] h-10"
          >
            <option value="">Kategori seçiniz</option>
            <option value="Pantolon">Pantolon</option>
            <option value="Etek">Etek</option>
            <option value="Gömlek">Gömlek</option>
            <option value="Elbise">Elbise</option>
            <option value="Çanta">Çanta</option>
            <option value="Eşofman">Eşofman</option>
            <option value="Ceket">Ceket</option>
          </select>

          <textarea
            placeholder="Ürün Açıklaması"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: '8px' }}
          />

          <input
            type="number"
            placeholder="Fiyat (TL)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            style={{ padding: '8px' }}
          />

          <label
            htmlFor="urunResmi"
            className="flex items-center justify-center border-2 border-mbrown w-full h-10 cursor-pointer"
          >
            {image ? image.name : 'Görsel eklemek için tıklayınız'}

            <input
              type="file"
              id="urunResmi"
              accept="image/*"
              hidden
              onChange={(e) => {
                setImage(e.target.files[0] || null);
              }}
              required
            />
          </label>

          <button
            type="submit"
            style={{
              padding: '10px',
              background: '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {editingId !== null ? 'Değişiklikleri Kaydet' : 'Ürünü Kaydet'}
          </button>
        </form>
      </div>

      {/* Ürün Listesi */}
      <h2>Ürünlerim</h2>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz ürün eklenmedi.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-48">
                <h4>
                  {product.title} - {product.price} ₺
                </h4>
                <p>{product.description}</p>
              </div>

              {product.image_url && (
                <img
                  src={`http://localhost:5000${product.image_url}`}
                  alt={product.title}
                  className="h-24 w-24 object-cover border-2 border-black"
                />
              )}
            </div>
              <button
                type="button"
                onClick={() => handleEdit(product)}
                style={{
                  padding: '6px 12px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Düzenle
              </button>
            <button
              onClick={() => handleDelete(product.id)}
              style={{
                padding: '6px 12px',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Sil
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TailorPanel;