/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

const socket = io("http://localhost:5000"); // Connect to backend    

function Dashboard() {
  const [data, setData] = useState([]);
  const [hybridModalOpen, setHybridModalOpen] = useState(false);
  const [regenModalOpen, setRegenModalOpen] = useState(false);
  const [ecoScoreModalOpen, setEcoScoreModalOpen] = useState(false);
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
  const [batteryModalOpen, setBatteryModalOpen] = useState(false);

  const [modeDetails, setModeDetails] = useState("");
  const [regenDetails, setRegenDetails] = useState("");
  const [ecoScoreDetails, setEcoScoreDetails] = useState("");
  const [maintenanceDetails, setMaintenanceDetails] = useState("");
  const [batteryDetails, setBatteryDetails] = useState("");

  useEffect(() => {
    socket.on("realTimeData", (newData) => {
      setData((prevData) => {
        if (prevData.length >= 10) prevData.shift();
        return [...prevData, newData];
      });

      // Hybrid Mode Logic
      if (newData.fuel < 20) {
        setModeDetails(`
          🚀 **Hybrid Mode Activated!**  
          - 🔋 Battery Level: ${newData.battery}%  
          - ⛽ Fuel Level: ${newData.fuel}%  
          - ✅ System switched to **Battery Mode** for efficiency.
        `);
      } else if (newData.battery > 50) {
        setModeDetails(`
          ⚡ **Hybrid Mode Activated!**  
          - 🔋 Battery Level: ${newData.battery}%  
          - ⛽ Fuel Level: ${newData.fuel}%  
          - ✅ System switched to **Fuel Mode** for optimal performance.
        `);
      } else {
        setModeDetails(`
          🔄 **Hybrid Mode Stable**  
          - 🔋 Battery Level: ${newData.battery}%  
          - ⛽ Fuel Level: ${newData.fuel}%  
          - ✅ No mode switch occurred.
        `);
      }

      // Regenerative Braking Details
      setRegenDetails(`
        ⚡ **Regenerative Braking Activated!**  
        - 🔄 Energy Recovered: ${newData.regen}%  
        - 🚗 Contributes to better battery efficiency.
      `);

      // Eco Score Improvement Suggestions
      setEcoScoreDetails(`
        🌱 **Improve Your Eco Score!**  
        - 🚗 Maintain steady acceleration to reduce fuel consumption.  
        - 🛑 Avoid sudden braking to conserve energy.  
        - 🔋 Utilize regenerative braking effectively.  
        - 🌍 Plan optimal routes to minimize fuel usage.  
        - 🏎 Keep your tire pressure optimized for better mileage.  
      `);

      // Predictive Maintenance Details
      setMaintenanceDetails(`
        ⚙ **Predictive Maintenance Alert**  
        - 🔧 Next Service Due in: ${newData.service_due} km  
        - 🔥 Battery Health: ${newData.battery_health}%  
        - 🚗 Engine Efficiency: ${newData.engine_efficiency}%  
        - ✅ AI suggests maintenance for optimal performance.
      `);

      // Smart Battery Management Logic
      if (newData.battery > 90) {
        setBatteryDetails(`
          ⚠️ **Overcharging Warning!**
          - 🔋 Battery Level: ${newData.battery}%
          - ⚠️ Reduce charging to prevent battery degradation.
        `);
      } else if (newData.battery < 20 && newData.speed > 50) {
        setBatteryDetails(`
          ⚠️ **Fast Discharge Warning!**
          - 🔋 Battery Level: ${newData.battery}%
          - 🚗 High-speed driving may drain the battery faster.
        `);
      } else {
        setBatteryDetails(`
          ✅ **Battery Health Stable**
          - 🔋 Battery Level: ${newData.battery}%
          - No warnings detected.
        `);
      }
    });

    return () => {
      socket.off("realTimeData");
    };
  }, []);

  // 🌍 Open Google Maps with Optimized Route
  const openGoogleMaps = () => {
    const url = "https://www.google.com/maps/dir/12.9716,77.5946/13.0827,80.2707";
    window.open(url, "_blank");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>EcodriveAI 🚗⚡</h1>
        <p>Smart AI-based fuel optimization for a greener future.</p>

        <div className="status-container">
          <div className="status-box green">
            <h3>Battery</h3>
            <p>{data.length > 0 ? data[data.length - 1].battery : "Loading..."}% 🔋</p>
          </div>
          <div className="status-box blue">
            <h3>Fuel</h3>
            <p>{data.length > 0 ? data[data.length - 1].fuel : "Loading..."}% ⛽</p>
          </div>
          <div className="status-box red">
            <h3>Emergency</h3>
            <p>No Issues ✅</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-grid">
          <div className="feature-box">
            <h3>Hybrid Mode Auto-Switch 🔄</h3>
            <p>System will switch automatically based on efficiency.</p>
            <button className="feature-btn" onClick={() => setHybridModalOpen(true)}>View Details</button>
          </div>

          <div className="feature-box">
            <h3>Regenerative Braking ⚡</h3>
         
            <p>Energy Recovered: {data.length > 0 ? data[data.length - 1].regen : "Loading..."}%</p>
            <div className="progress-bar">
              <div className="progress green-progress" style={{ width: `${data.length > 0 ? data[data.length - 1].regen : 0}%` }}></div>
            </div>
            <button className="feature-btn" onClick={() => setRegenModalOpen(true)}>View Details</button>
          </div>

          <div className="feature-box">
            <h3>AI Route Optimization 🗺️</h3>
            <p>Optimal Route Suggested for 10% Fuel Savings</p>

            <button className="feature-btn" onClick={openGoogleMaps}>View Route</button>
          </div>

          <div className="feature-box">
            <h3>Eco Score 🌿</h3>
            <p>Your driving efficiency: 85%</p>
            <button className="feature-btn" onClick={() => setEcoScoreModalOpen(true)}>Improve Score</button>
          </div>

          <div className="feature-box">
            <h3>Predictive Maintenance ⚙</h3>
            <p>AI predicts maintenance needs for efficiency</p>
            <button className="feature-btn" onClick={() => setMaintenanceModalOpen(true)}>Check Status</button>
          </div>

          <div className="feature-box">
            <h3>Smart Battery Management 🔋</h3>
            <p>Optimize charge cycle & prevent overcharging</p>
            <button className="feature-btn" onClick={() => setBatteryModalOpen(true)}>Check Battery Health</button>
          </div>
        </div>
        {/* Real-time Energy Consumption Graph */}
        <div className="chart-container">
          <h3>Real-Time Energy Consumption 📊</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="battery" stroke="#00ff00" name="Battery %" />
              <Line type="monotone" dataKey="fuel" stroke="#ffcc00" name="Fuel %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        
      </header>

      {/* Modals */}
      {hybridModalOpen && <Modal title="Hybrid Mode Update" content={modeDetails} onClose={() => setHybridModalOpen(false)} />}
      {regenModalOpen && <Modal title="Regenerative Braking" content={regenDetails} onClose={() => setRegenModalOpen(false)} />}
      {ecoScoreModalOpen && <Modal title="Improve Your Eco Score" content={ecoScoreDetails} onClose={() => setEcoScoreModalOpen(false)} />}
      {maintenanceModalOpen && <Modal title="Predictive Maintenance" content={maintenanceDetails} onClose={() => setMaintenanceModalOpen(false)} />}
      {batteryModalOpen && <Modal title="Battery Health Update" content={batteryDetails} onClose={() => setBatteryModalOpen(false)} />}
    </div>
  );
}

function Modal({ title, content, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }}></p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Dashboard;

