const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parses JSON payload

app.post('/webhook', (req, res) => {
  console.log('Webhook received!');
  console.log(req.body); // Here you can process the GitHub event data

  // Respond to GitHub that the webhook was successfully received
  res.status(200).send('Event received');
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server listening on port ${port}`));