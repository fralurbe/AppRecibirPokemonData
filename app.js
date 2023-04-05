const express = require('express');
const mariadb = require('mariadb');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'pokemondata'
});

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function insertData(data){
    pool.getConnection()
        .then(conn => {
        console.log("Connected!");
        // Use the connection to insert data into a table
        conn.query("INSERT INTO pokemones (id, datos) VALUES (?, ?)", [3, data])
            .then(result => {
                console.log(result);
                conn.end();
            })
            .catch(error => {
                console.log(error);
                conn.end();
            });
        })
        .catch(error => {
            console.log("Failed to connect!");
            console.log(error);
        }
    );
}

app.post('/store-data', async (req, res) => {
    const data = req.body;
    console.log("received /store-data", JSON.stringify(data));
    const response = { message: 'Data received!', status: 'success' };
    insertData(data);
    res.json(response);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});