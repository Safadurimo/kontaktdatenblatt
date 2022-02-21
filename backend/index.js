const express = require('express')
const app = express()
const port = 8000

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/kontaktdatenblatt.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the kontaktdatenblatt database.');
});

db.serialize(() => {
    db.each(`SELECT id,
                  name
           FROM marktpartner`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + "\t" + row.name);
    });
});


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/marktpartner', (req, res) => {
    const sql = `SELECT * FROM marktpartner`;
    db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows)
      });

})

app.get('/nachrichten', (req, res) => {
    res.json(
        [
            {
                id: 1,
                richtung: "in",
                sender: 2,
                message: {
                    version: 1,
                    ansprechpartner: "Herr Müller"
                }
            },
            {
                id: 2,
                richtung: "out",
                sender: 1,
                message: {
                    version: 1,
                    ansprechpartner: "Herr Meier"
                }
            }
        ]

    )
})

app.post('/nachrichten', function (req, res) {
    res.send('Got a POST request');
}
)

app.put('/kontaktdaten', function (req, res) {
    res.send('Got a POST request');

}
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})