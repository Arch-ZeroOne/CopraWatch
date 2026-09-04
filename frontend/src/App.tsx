import { useEffect, useState } from "react";
import axios from "axios";
import { CircleDollarSign, Leaf, RefreshCw, Waves } from "lucide-react";
import "./App.css";

function App() {
  const [usPrice, setUsPrice] = useState("");
  const [phPrice, setPhPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPrices = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get("http://localhost:3000/");
        setUsPrice(response.data.us);
        setPhPrice(response.data.ph);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPrices();
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="CopraWatch home">
          <span className="brand-mark">
            <Leaf size={16} />
          </span>
          <span>
            Copra<span>Watch</span>
          </span>
        </a>
        <span className="live-status">
          <i /> Live
        </span>
      </header>

      <section className="market-panel" aria-labelledby="market-heading">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Today</p>
            <h1 id="market-heading">Copra prices</h1>
          </div>
          <span className="updated-label">USD / local</span>
        </div>

        <div className="price-list">
          <PriceCard
            label="Dried kernels"
            region="USA"
            value={usPrice}
            accent="sun"
            icon={<CircleDollarSign size={19} />}
            loading={loading}
          />
          <PriceCard
            label="Copra / kopras"
            region="Philippines"
            value={phPrice}
            accent="sea"
            icon={<Waves size={19} />}
            loading={loading}
          />
        </div>

        {error && (
          <div className="error-note" role="alert">
            <span>Market data unavailable</span>
            <RefreshCw size={14} />
          </div>
        )}
        <p className="panel-note">Reference data sourced from Selina Wamucii</p>
      </section>
    </main>
  );
}

type PriceCardProps = {
  label: string;
  region: string;
  value: string;
  accent: "sun" | "sea";
  icon: React.ReactNode;
  loading: boolean;
};

function PriceCard({
  label,
  region,
  value,
  accent,
  icon,
  loading,
}: PriceCardProps) {
  return (
    <article className={`price-card ${accent}`}>
      <div className="card-topline">
        <span className="commodity-icon">{icon}</span>
        <div className="card-label">
          <h2>{label}</h2>
          <span>{region}</span>
        </div>
      </div>
      <div className="card-value">
        {loading ? (
          <div className="price-skeleton" />
        ) : (
          <strong>{value || "--"}</strong>
        )}
      </div>
    </article>
  );
}

export default App;
