// adminRoutes.js
const express = require('express');
const router = express.Router();
const ActivityFeed= require('../models/Activity'); // Adjust the path according to your project structure


router.post('/', async (req, res) => {
    const { userId, eventId, message } = req.body;

    const activity = new ActivityFeed({
      userId,
      eventId,
      message,
    });
  
    activity.save().then(savedActivity => {
      req.io.emit('addEventActivity', savedActivity);
      console.log("success")
      res.status(200).send({ success: true, activity: savedActivity });
    }).catch(err => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;