import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Login from "./login"; // Ensure this file exists
import Dashboard from "./Dashboard"; // Ensure this file exists
import "./App.css";

const SOCKET_URL = "http://localhost:5000"; // Socket server URL
const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] }); // Ensures stable connection

function App() {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    socket.on("realTimeData", (newData) => {
      console.log("Received Data:", newData);
      setData(newData);
      setLastUpdated(new Date().toLocaleTimeString());
    });

    return () => {
      socket.off("realTimeData");
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard data={data} lastUpdated={lastUpdated} />} />
      </Routes>
    </Router>
  );
}

export default App;
