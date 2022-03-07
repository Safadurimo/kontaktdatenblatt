const express = require('express')
const app = express()
const port = 8000

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/kontaktdatenblatt.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the kontaktdatenblatt database.');
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
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });

})

app.get('/eigeneKontaktdaten', (req, res) => {
    const sql = `SELECT * FROM marktpartner where id = 1`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows[0])
    });

})

app.get('/nachrichten', (req, res) => {
    const sql = `SELECT * FROM nachrichten`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        rows.forEach(function (element, index) {
            element.nachricht = JSON.parse(element.nachricht);
        }
        )
        res.json(rows)
    });
}
)

app.post('/nachrichten', function (req, res) {
    console.log(req.body);

    const list =
        [
            Math.floor(Date.now()),
            "in",
            req.body.sender,
            req.body.empfaenger,
            JSON.stringify(req.body)
        ]

    // save message
    db.run(`INSERT INTO nachrichten(timestamp,richtung,sender,empfaenger,nachricht) VALUES(?,?,?,?,?)`, list, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });



    // process message
    db.run(`UPDATE marktpartner SET ansprechpartner = ?  where id = ?`, [req.body.ansprechpartner, req.body.sender], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    res.send('Got a POST request');
}
)

app.put('/kontaktdaten', function (req, res) {

    // update contact data on database
    db.run(`UPDATE marktpartner SET ansprechpartner = ?  where id = 1`, [req.body.ansprechpartner], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });


    // send messages to all partners
    const sql = `SELECT * FROM marktpartner`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        rows.forEach(function (element, index) {
            if (element.id != 1) {

                const list =
                    [
                        Math.floor(Date.now()),
                        "out",
                        1,
                        element.id,
                        JSON.stringify(req.body)
                    ]

                // save message
                db.run(`INSERT INTO nachrichten(timestamp,richtung,sender,empfaenger,nachricht) VALUES(?,?,?,?,?)`, list, function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    // get the last insert id
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                });

            }
        }
        );
    });

    res.send('Got a POST request');
}
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})