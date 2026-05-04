import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Enterprise MERN Platform Abhinay Singh</h1>
      <p>Backend Status: {message || "Checking..."}</p>
    </div>
  );
}

export default App;
