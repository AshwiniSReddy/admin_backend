// adminRoutes.js
const express = require('express');
const router = express.Router();
const ActivityFeed= require('../models/Activity'); // Adjust the path according to your project structure


router.post('/', async (req, res) => {
    const { userId, eventId_test, message } = req.body;
     console.log(req.body,"create alert")
     const eventId=eventId_test;
    const activity = new ActivityFeed({
      userId,
      eventId,
      message,
    });
  
    activity.save().then(savedActivity => {
        req.app.get('io').emit('createAlertActivity', savedActivity);
      res.status(200).send({ success: true, activity: savedActivity });
    }).catch(err => {
        console.log(err)
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;