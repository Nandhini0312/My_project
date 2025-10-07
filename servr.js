require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post("/get-route", async (req, res) => {
    const { start, destination } = req.body;

    try {
        const osmUrl = `https://router.project-osrm.org/route/v1/driving/${start};${destination}?overview=full&geometries=geojson`;

        const response = await axios.get(osmUrl);
        const route = response.data.routes[0];
        const distance = (route.distance / 1000).toFixed(2); // Convert meters to KM
        const fuelSavings = (Math.random() * 10 + 5).toFixed(2); // Random savings (5-15%)

        res.json({ route, distance, fuelSavings });
    } catch (error) {
        res.status(500).json({ error: "Route fetching failed" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
