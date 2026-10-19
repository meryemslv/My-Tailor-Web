//Ürünleri keşfet sayfası
import { useState, useEffect } from 'react';

function Marketplace() {
  // Açıklama: Ürün listesini ve arama kelimesini tutacak state'ler
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("Tümü")
  // Açıklama: Sayfa açıldığında backend'den ürünleri çeken fonksiyon
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ürünler yüklenirken hata:', err);
        setLoading(false);
      });
  }, []);

  // Açıklama: Kullanıcının arama çubuğuna yazdığı kelimeye göre ürünleri filtreleme mantığı
  const filteredProducts = products.filter((product) =>
  {
    
    const matchesSearch = product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesKategori = selectedKategori === "Tümü" || product.title === selectedKategori;

    return matchesSearch && matchesKategori;
  }
  );

  return (
    <div className="mt-8 ml-8">
      <h2>🔍 Terzi Pazaryeri - Ürün Keşfet</h2>
    <div className=" flex gap-8 ">
      {/* Filtreleme paneli başlangıç*/}
      <div className="flex flex-col w-[250px] h-[800px] border-3 border-mbrown rounded-md text-mbrown p-4 gap-4">
          <h3 className="font-semibold text-xl">Kategoriler</h3>
            <div className="flex flex-col items-start gap-3">
              <button onClick= {() => setSelectedKategori("Tümü")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Tümü</button>
              <button onClick= {() => setSelectedKategori("Pantolon")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Pantolon</button>
              <button onClick= {() => setSelectedKategori("Etek")}  className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Etek</button>
              <button onClick= {() => setSelectedKategori("Gömlek")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Gömlek</button>
              <button onClick= {() => setSelectedKategori("Elbise")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Elbise</button>
              <button onClick= {() => setSelectedKategori("Çanta")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Çanta</button>
              <button onClick= {() => setSelectedKategori("Eşofman")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Eşofman</button>
              <button onClick= {() => setSelectedKategori("Ceket")} className="flex items start pl-2 border-l-2 border-b-2 border-mbrown w-[80%] transform hover:scale-105 active:scale-100 duration-300">Ceket</button>
            </div>
      </div>  
      {/* Filtrleme paneli bitiş */}

      {/* Listeleme/filtreleme başlangıç */}
      <div className="width-[1000px]">
      
      
      {/* Arama Çubuğu */}
      <input 
        type="text" 
        placeholder="Ürün veya tarz ara (örn: Takım Elbise)..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[1000px] border-3 border-mbrown  rounded-md h-8 text-black placeholder:text-mbrown p-2"
       
      />

      {/* Ürün Listesi */}
      {loading ? (
        <p style={{ marginTop: '2rem' }}>Yükleniyor...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ marginTop: '2rem', color: '#777' }}>Aradığınız kriterlere uygun ürün bulunamadı.</p>
      ) : (
        <div style={{ display: 'flex', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div className="grid grid-cols-3 gap-8">
          {filteredProducts.map((product) => (            
            <div key={product.id} className="flex flex-col items-center justify-end pb-4 border-3 border-mbrown rounded-md h-100 w-68 transform hover:scale-105 duration-300 gap-2"/*style={{ border: '1px solid #5d2f12', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', background: '#ffffff' }}*/>
               {product.image_url && (
                <img
                  src={`http://localhost:5000${product.image_url}`}
                  alt={product.title}
                  className="h-[65%] w-[70%] object-cover border-2 border-black"
                />)}
              <p >{product.description}</p>
              <p>{product.price} ₺</p>
              <button 
                onClick={() => alert(`"${product.title}" için sipariş talebi oluşturuldu!`)}
                className="w-[90%] h-10 bg-white border-2 border-mbrown rounded-md transition hover:bg-mbrown hover:text-white duration-300"
                /*style={{ width: '100%', marginTop: '1rem', padding: '8px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}*/
              >
                Sipariş Ver / İletişime Geç 🛍️
              </button>
            </div>
            
          ))}
        </div>
        </div>
      )}
      </div>
    </div>
    {/* Filtreleme/listeleme bitiş */}
    </div>
  );
}

export default Marketplace;