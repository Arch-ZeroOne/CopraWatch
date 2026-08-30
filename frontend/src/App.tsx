import { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";

function App() {
  const [usPrice, setUsPrice] = useState("");
  const [phPrice, setPhPrice] = useState("");

  useEffect(() => {
    const getPrices = async () => {
      const response = await axios.get("http://localhost:3000/");
      const data = response.data;
      setUsPrice(data.us);
      setPhPrice(data.ph);
    };

    getPrices();
  }, []);

  return (
    <>
      <h1>{usPrice}</h1>
      <h1>{phPrice}</h1>
    </>
  );
}

export default App;
