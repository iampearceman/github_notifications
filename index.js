const express = require('express');
import { Novu } from '@novu/node';

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
    
    triggerNotification()
  } else {
    console.log('No data found in webhook payload');
  }

  res.status(200).send('Webhook received');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const novu = new Novu('2875855f499c71df394ed5b2fefb4c6c');

async function triggerNotification(data) {
  await novu.trigger('untitled-AfEiPb8-E', {
    to: {
        subscriberId: '1234567',
        email: "emil@novu.co"
    },
    payload: {
      // Your data fields here
      reason: data.reason,
      subjectType: data.subject.type,
      subjectTitle: data.subject.title,
      subjectURL: data.subject.url,
      repositoryName: data.repository.name,
      repositoryFullName: data.repository.full_name,
    }
  });
}