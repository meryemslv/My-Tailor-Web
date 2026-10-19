import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import TailorPanel from './pages/TailorPanel';
import './App.css';
import logo from "./logo.png";

function App() {
  return (
    <Router>
      <div>
        {/* Üst Menü (Navbar) */}
        <nav className = "flex bg-mkrem w-full h-[80px] border-b-2 border-mbrown" /*style={{ background: '#f6e3c2', padding: '1rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}*/>
          <Link to="/" className="h-full" ><img src= {logo} className="h-full w-auto"/> </Link>
          <div className="ml-auto flex items-center gap-10 text-mbrown font-semibold pr-6">
          <Link to="/" /*style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}*/>Ana Sayfa</Link>
          <Link to="/marketplace" /*style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}*/>Ürünleri Keşfet</Link>
          <Link to="/tailor-panel"/* style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}*/>Müşteri/Terzi Paneli</Link>
          </div>
        </nav>

        {/* Sayfa Rotaları: Hangi URL'de hangi bileşenin gösterileceğini ayarlar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/tailor-panel" element={<TailorPanel />} />
        </Routes>
      </div>
    </Router>

    
  );
}

export default App;