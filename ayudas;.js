const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/data', (req, res) => {
  const data = req.body;
  console.log(data);
  res.send('Data received!');
});

app.listen(3000);