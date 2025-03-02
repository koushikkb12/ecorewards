const express = require("express");
const WasteEntry = require("../models/WasteEntry");
const User = require("../models/User");
const router = express.Router();

// Add waste entry (Only personnel can add)
router.post("/add", async (req, res) => {
  const { personnelId, amount } = req.body;
  
  try {
    const wasteEntry = await WasteEntry.create({ personnel: personnelId, amount });
    await User.findByIdAndUpdate(personnelId, { $inc: { rewards: amount } });
    res.status(201).json(wasteEntry);
  } catch (error) {
    res.status(500).json({ error: "Error adding waste entry" });
  }
});

// Get all waste entries
router.get("/", async (req, res) => {
  try {
    const entries = await WasteEntry.find().populate("personnel", "name");
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching waste entries" });
  }
});

module.exports = router;
