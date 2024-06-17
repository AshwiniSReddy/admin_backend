const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
