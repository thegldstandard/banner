import React from "react";
import Prices from "./components/Prices"; // import the Prices component

function App() {
  return (
    <div>
      {/* Render the Prices banner at the top */}
      <Prices />

      {/* The rest of your application content goes here */}
      <div style={{ marginTop: "60px" }}>
        {/* 60px top margin so that your page content
            doesn't hide behind the fixed Prices banner */}
        <h1>Welcome to My Website</h1>
        <p>Here’s some other content on the page...</p>
      </div>
    </div>
  );
}

export default App;
