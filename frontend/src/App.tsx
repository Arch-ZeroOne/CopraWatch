import { useState, useEffect } from "react";
import axios from "axios";
import { Vegan } from "lucide-react";
import "./App.css";

function App() {
  const [usPrice, setUsPrice] = useState("");
  const [phPrice, setPhPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPrices = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/");

      const data = response.data;
      setUsPrice(data.us);
      setPhPrice(data.ph);
      setLoading(false);
    };

    getPrices();
  }, []);

  return (
    <div className="bg-blue-800 rounded-4xl w-80 flex items-center gap-3 flex-col font-[Poppins] mr-auto ml-auto mt-3 h-80 justify-center text-white">
      {!loading ? (
        <>
          <div className="bg-blue-500/25 p-8 rounded-xl flex items-center justify-around gap-3">
            <section className="flex items-center gap-2">
              <Vegan />
              <div className="flex-col">
                <p className="font-bold">Dried Kernels</p>
                <p className="text-xs text-gray-500">USA</p>
              </div>
            </section>
            <p className="text-xl font-bold">{usPrice}</p>
          </div>

          <div className="bg-blue-500/25 p-8 rounded-xl flex items-center justify-around gap-3">
            <div className="flex items-center gap-2">
              <Vegan />
              <div className="flex-col">
                <p className="font-bold">Copra/Kopras</p>
                <p className="text-xs text-gray-500">Philippines</p>
              </div>
            </div>
            <p className="text-xl font-bold">{phPrice}</p>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

function Loader() {
  return (
    <>
      <div
        className="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700"
      >
        $
      </div>
    </>
  );
}

export default App;
