var express = require('express');
var router = express.Router();
var Expo = require('exponent-server-sdk');
// Create a new Expo SDK client
let expo = new Expo();

/* GET users listing. */
router.post('/notification-many', (req, res, next) => {
  const { token, title, description } = req.query;
  let messages = [];

  for (let pushToken of token) {
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExponentPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: 'default',
      body: 'This is a test notification',
      data: {
        title,
      description}
    });
  }
  sendPushToBatch(messages, res);
});

var sendPushToBatch = (messages, res) => {
  let chunks = expo.chunkPushNotifications(messages);

  const promises = chunks.map(items => {
    expo.sendPushNotificationsAsync(items);
  });

  Promise.all(promises)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

module.exports = router;
