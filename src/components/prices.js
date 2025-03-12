import React, { useState, useEffect } from "react";
import "./Prices.css";

// IMPORTANT: These imports assume your icons are in src/components/icons
import goldIcon from "./icons/gold-icon.png";
import silverIcon from "./icons/silver-icon.png";
import platinumIcon from "./icons/platinum-icon.png";
import palladiumIcon from "./icons/palladium-icon.png";

const Prices = () => {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.metalpriceapi.com/v1/latest?api_key=98ce31de34ecaadcd00d49d12137a56a&base=USD&symbols=XAU,XAG,XPT,XPD"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPrices(data.rates);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrices();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      {error && <span className="errorMsg">Error: {error}</span>}
      {!error && !prices && <span className="loadingMsg">Loading metal prices...</span>}
      {!error && prices && (
        <>
          {/* GOLD */}
          <div className="metalItem">
            <img src={goldIcon} alt="Gold icon" className="metalIcon" />
            <span className="metalName">Gold</span>
            <span className="price">
              ${prices.USDXAU?.toFixed(2)}
            </span>
            <span className="changeNegative">-22.67 (-0.77%)</span>
          </div>

          {/* SILVER */}
          <div className="metalItem">
            <img src={silverIcon} alt="Silver icon" className="metalIcon" />
            <span className="metalName">Silver</span>
            <span className="price">
              ${prices.USDXAG?.toFixed(2)}
            </span>
            <span className="changeNegative">-0.32 (-1.00%)</span>
          </div>

          {/* PLATINUM */}
          <div className="metalItem">
            <img src={platinumIcon} alt="Platinum icon" className="metalIcon" />
            <span className="metalName">Platinum</span>
            <span className="price">
              ${prices.USDXPT?.toFixed(2)}
            </span>
            <span className="changePositive">+0.70 (+0.07%)</span>
          </div>

          {/* PALLADIUM */}
          <div className="metalItem">
            <img src={palladiumIcon} alt="Palladium icon" className="metalIcon" />
            <span className="metalName">Palladium</span>
            <span className="price">
              ${prices.USDXPD?.toFixed(2)}
            </span>
            <span className="changePositive">+1.50 (+0.16%)</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Prices;
