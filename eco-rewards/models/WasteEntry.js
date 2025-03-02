const mongoose = require("mongoose");

const WasteEntrySchema = new mongoose.Schema({
  personnel: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WasteEntry", WasteEntrySchema);
