import React, { useState, useEffect } from "react";

// Adjust these to the actual paths of your uploaded icons
import goldIcon from "./icons/gold-icon.png";
import silverIcon from "./icons/silver-icon.png";
import platinumIcon from "./icons/platinum-icon.png";
import palladiumIcon from "./icons/palladium-icon.png";

const MetalPricesBanner = () => {
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

  // Updated banner style with reduced padding, gap, and font size
  const bannerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",           // reduced gap between items
    padding: "0.25rem 0.5rem", // reduced padding
    backgroundColor: "#f4efe8",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",       // smaller text
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
  };

  // Each metal “item” styling with reduced gap
  const metalItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem"
  };

  // Reduced circle icon styling
  const iconStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    objectFit: "cover"
  };

  // Optional styling for the metal name
  const metalNameStyle = {
    fontWeight: "bold",
    textTransform: "uppercase"
  };

  // Optional styling for the price
  const priceStyle = {
    fontWeight: "normal"
  };

  // Example red/green daily change placeholders
  const changeStyleNegative = { color: "red" };
  const changeStylePositive = { color: "green" };

  return (
    <div style={bannerStyle}>
      {error && <span>Error: {error}</span>}
      {!error && !prices && <span>Loading metal prices...</span>}
      {!error && prices && (
        <>
          {/* GOLD */}
          <div style={metalItemStyle}>
            <img src={goldIcon} alt="Gold icon" style={iconStyle} />
            <span style={metalNameStyle}>Gold</span>
            <span style={priceStyle}>${prices.USDXAU?.toFixed(2)}</span>
            <span style={changeStyleNegative}>-22.67 (-0.77%)</span>
          </div>

          {/* SILVER */}
          <div style={metalItemStyle}>
            <img src={silverIcon} alt="Silver icon" style={iconStyle} />
            <span style={metalNameStyle}>Silver</span>
            <span style={priceStyle}>${prices.USDXAG?.toFixed(2)}</span>
            <span style={changeStyleNegative}>-0.32 (-1.00%)</span>
          </div>

          {/* PLATINUM */}
          <div style={metalItemStyle}>
            <img src={platinumIcon} alt="Platinum icon" style={iconStyle} />
            <span style={metalNameStyle}>Platinum</span>
            <span style={priceStyle}>${prices.USDXPT?.toFixed(2)}</span>
            <span style={changeStylePositive}>+0.70 (+0.07%)</span>
          </div>

          {/* PALLADIUM */}
          <div style={metalItemStyle}>
            <img src={palladiumIcon} alt="Palladium icon" style={iconStyle} />
            <span style={metalNameStyle}>Palladium</span>
            <span style={priceStyle}>${prices.USDXPD?.toFixed(2)}</span>
            <span style={changeStylePositive}>+1.50 (+0.16%)</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MetalPricesBanner;
