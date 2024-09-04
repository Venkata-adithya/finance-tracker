const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "must provide user id"],
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: [true, "must provide description"],
  },
  amount: {
    type: Number,
    required: [true, "must provide amount"],
  },
  category: {
    type: String,
    required: [true, "must provide category"],
  },
  paymentMethod: {
    type: String,
    required: [true, "must provide payment method"],
  },
});

module.exports = mongoose.model("Record", RecordSchema);
