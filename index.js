const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);

  // Extracting the desired information from the first notification item in the payload
  // Ensure to handle cases where the data structure might be different or missing
  const data = req.body[0];
  if (data) {
    console.log('Webhook Notification Details:');
    console.log(`Reason: ${data.reason}`);
    console.log(`Subject Type: ${data.subject.type}`);
    console.log(`Subject Title: ${data.subject.title}`);
    console.log(`Subject URL: ${data.subject.url}`);
    console.log(`Repository Name: ${data.repository.name}`);
    console.log(`Repository Full Name: ${data.repository.full_name}`);
  } else {
    console.log('No data found in webhook payload');
  }

  res.status(200).send('Webhook received');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
