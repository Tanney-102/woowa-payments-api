const express = require("express");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/cards", (req, res) => {
  connection.query(
    "SELECT * FROM cards JOIN card_type ON cards.type = card_type.id",
    (error, rows) => {
      if (error) throw error;

      const cards = rows.map((row) => ({
        cardType: {
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

      res.json(cards);
    }
  );
});

app.listen(app.get("port"), () => {
  console.log(`Woowa Payments App is listening on port ${app.get("port")}`);
});
