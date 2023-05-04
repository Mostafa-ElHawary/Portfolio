const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const path = require("path")
const http = require("http")

const server = http.Server(app)
app.set("port",3001)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../Component/Contact')));


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'../Component/Contact'))
})


/////////////////////////////////
app.post('/send-email', (req, res) => {
  // Extract the form data from the request body
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'hotmail'
    auth: {
      user: 'alhwarymostafa@gmail.com',
      pass: '',
    },
  });

  // Set up the email details
  const mailOptions = {
    name: name,
    email: email,
    message: message,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});