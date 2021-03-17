const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/emailConfirmation', function (req, res) {
  res.status(200).json({ success: true, message: "Email sent successfully" });
})

module.exports.emailConfirmation = serverless(app);