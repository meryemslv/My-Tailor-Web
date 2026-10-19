//Anasayfa

import Marketplace from "./Marketplace";
import { useNavigate } from "react-router-dom";
import header from "../header.png";
function Home() {
  // Açıklama: Ziyaretçilerin ilk karşılaştığı karşılama sayfası bileşeni
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative">  
        <header className="w-[1400px] " ><img src={header} className="w-full h-[960px]"/>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-mbrown">
          <button className="bg-white border-2 border-mbrown text-mbrown px-6 py-3 rounded-lg
              hover:bg-mbrown hover:text-white transition duration-300"
              onClick={() => navigate("/marketplace")}>Keşfetmek için tıkla</button> 
        </div>
        </header> 
      
          
      </div>
    </div>

  );
}

export default Home;