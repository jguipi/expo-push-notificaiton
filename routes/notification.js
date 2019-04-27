var express = require('express');
var router = express.Router();
var Expo = require('exponent-server-sdk');
// Create a new Expo SDK client
let expo = new Expo();

/* GET users listing. */
router.post('/notification', (req, res, next) => {
  const { token, title, description, delay } = req.query;
  let isPushToken = Expo.isExponentPushToken(token);
  if (isPushToken) {
    sendPush(token, title, description, res, delay);
  } else {
    res.send('Invalid token');
  }
});

var sendPush = (token, title, description, res, delay) => {
  var delayPushNotification = delay || 0;
  try {
    expo.sendPushNotificationAsync({
      // The push token for the app user you want to send the notification to
      to: token,
      sound: 'default',
      title: title || 'Push notification title',
      body: description || 'Push notification description',
      data: {
        title,
      description}
    });
    res.sendStatus(200);
  } catch(err) {
    res.send('an error heppen ', err);
    res.sendStatus(400);
  }
};

module.exports = router;
