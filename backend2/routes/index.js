var express = require('express');
var router = express.Router();
require("dotenv").config


const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer");
const app = require('../app');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())

app.post("/send_mail", cors(), async(req, res) => {

  let {text} = req.body
  const transport = nodemailer.createTransport({

    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "test@test.com",
    subject: "test email",
    html:  `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px; 
    ">
    <h2>Here is your email!</h2>
    <p>${text}</p>

    <p>All the best, Darwin</p>
     </div>
`


  })


})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
