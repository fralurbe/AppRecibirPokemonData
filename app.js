const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
});

app.post('/store-data', (req, res) => {
    const data = req.body;
    console.log("received /store-data", JSON.stringify(data));
    const response = { message: 'Data received!', status: 'success' };
    res.json(response);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});