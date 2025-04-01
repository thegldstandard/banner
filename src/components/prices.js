import React, { useState, useEffect } from "react";
import "./Prices.css";

// Replace these icon imports with your actual icon paths:
import goldIcon from "./icons/gold-icon.png";
import silverIcon from "./icons/silver-icon.png";
import platinumIcon from "./icons/platinum-icon.png";
import palladiumIcon from "./icons/palladium-icon.png";

const Prices = () => {
  const [prices, setPrices] = useState(null);            // Today’s prices
  const [yesterdayPrices, setYesterdayPrices] = useState(null); // Yesterday’s prices
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Fetch Today’s Latest Prices
        const latestResponse = await fetch(
          "https://api.metalpriceapi.com/v1/latest?api_key=98ce31de34ecaadcd00d49d12137a56a&base=USD&symbols=XAU,XAG,XPT,XPD"
        );
        if (!latestResponse.ok) {
          throw new Error("Error fetching latest prices");
        }
        const latestData = await latestResponse.json();
        setPrices(latestData.rates);

        // 2) Calculate “Yesterday’s” Date String (YYYY-MM-DD)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, "0");
        const day = String(yesterday.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;

        // 3) Fetch Yesterday’s Prices (Requires Historical Data in Your Plan)
        const historicalUrl = `https://api.metalpriceapi.com/v1/${dateStr}?api_key=98ce31de34ecaadcd00d49d12137a56a&base=USD&symbols=XAU,XAG,XPT,XPD`;
        const yesterdayResponse = await fetch(historicalUrl);
        if (!yesterdayResponse.ok) {
          throw new Error("Error fetching yesterday's prices");
        }
        const yesterdayData = await yesterdayResponse.json();
        setYesterdayPrices(yesterdayData.rates);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    // Optional: Auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Helper function: compute difference and percent change
  const getChangeData = (symbolToday, symbolYesterday) => {
    if (!prices || !yesterdayPrices) return null;
    const todayPrice = prices[symbolToday];
    const ydayPrice = yesterdayPrices[symbolYesterday];
    if (!todayPrice || !ydayPrice) return null;

    const difference = todayPrice - ydayPrice;
    const percentChange = (difference / ydayPrice) * 100;
    return { difference, percentChange };
  };

  // Return appropriate class name (for red/green text)
  const getClassName = (difference) => {
    if (difference == null) return "";
    return difference >= 0 ? "changePositive" : "changeNegative";
  };

  // Format text like: “+2.50 (+1.22%)” or “-1.75 (-0.99%)”
  const formatChange = (changeObj) => {
    if (!changeObj) return "...";
    const { difference, percentChange } = changeObj;
    const sign = difference >= 0 ? "+" : "";
    return `${sign}${difference.toFixed(2)} (${sign}${percentChange.toFixed(2)}%)`;
  };

  return (
    <div className="banner">
      {error && <span className="errorMsg">Error: {error}</span>}

      {!error && (!prices || !yesterdayPrices) && (
        <span className="loadingMsg">Loading metal prices...</span>
      )}

      {!error && prices && yesterdayPrices && (
        <>
          {/* GOLD */}
          <div className="metalItem">
            <img src={goldIcon} alt="Gold icon" className="metalIcon" />
            <span className="metalName">Gold</span>
            <span className="price">${prices.USDXAU?.toFixed(2)}</span>
            <span
              className={getClassName(getChangeData("USDXAU", "USDXAU")?.difference)}
            >
              {formatChange(getChangeData("USDXAU", "USDXAU"))}
            </span>
          </div>

          {/* SILVER */}
          <div className="metalItem">
            <img src={silverIcon} alt="Silver icon" className="metalIcon" />
            <span className="metalName">Silver</span>
            <span className="price">${prices.USDXAG?.toFixed(2)}</span>
            <span
              className={getClassName(getChangeData("USDXAG", "USDXAG")?.difference)}
            >
              {formatChange(getChangeData("USDXAG", "USDXAG"))}
            </span>
          </div>

          {/* PLATINUM */}
          <div className="metalItem">
            <img src={platinumIcon} alt="Platinum icon" className="metalIcon" />
            <span className="metalName">Platinum</span>
            <span className="price">${prices.USDXPT?.toFixed(2)}</span>
            <span
              className={getClassName(getChangeData("USDXPT", "USDXPT")?.difference)}
            >
              {formatChange(getChangeData("USDXPT", "USDXPT"))}
            </span>
          </div>

          {/* PALLADIUM */}
          <div className="metalItem">
            <img src={palladiumIcon} alt="Palladium icon" className="metalIcon" />
            <span className="metalName">Palladium</span>
            <span className="price">${prices.USDXPD?.toFixed(2)}</span>
            <span
              className={getClassName(getChangeData("USDXPD", "USDXPD")?.difference)}
            >
              {formatChange(getChangeData("USDXPD", "USDXPD"))}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Prices;
