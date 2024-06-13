const mongoose = require('mongoose');
const secretSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  secret: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const Secret = mongoose.model('Secret', secretSchema);
module.exports = Secret;