const express = require("express");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const query = require("./query.js");

const connection = mysql.createConnection(dbconfig);
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/cardtypes", (req, res) => {
  connection.query(query.getCardTypes(), (error, rows) => {
    if (error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    const cardTypes = rows.map((row) => ({
      id: row.id,
      name: row.name,
      color: row.color,
    }));

    res.status(200).json(cardTypes);
  });
});

app.get("/cards", (req, res) => {
  connection.query(query.getCards(), (error, rows) => {
    if (error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    const cards = rows.map((row) => ({
      cardType: {
        id: row.type,
        name: row.name,
        color: row.color,
      },
      cardNumbers: [
        row.card_numbers.slice(0, 4),
        row.card_numbers.slice(4, 8),
        row.card_numbers.slice(8, 12),
        row.card_numbers.slice(12, 16),
      ],
      expirationDate: `${row.expiration_month}/${row.expiration_year}`,
      username: row.username,
      secureCode: row.secureCode,
      password: row.password,
    }));

    res.status(200).json(cards);
  });
});

app.post("/cards", (req, res) => {
  connection.query(query.postCard(req.body), (error, rows) => {
    if (error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    res.status(200).json({ success: "success" });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Woowa Payments App is listening on port ${app.get("port")}`);
});
