const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const query = require("./query.js");

const connection = mysql.createConnection(dbconfig);
const app = express();

app.set("port", process.env.PORT || 3001);
app.use(cors());
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

app.get("/cardtypes/:id", (req, res) => {
  connection.query(query.getCardTypes(req.params.id), (error, rows) => {
    if (error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    res.json(rows[0]);
  });
});

app.get("/cards", (req, res) => {
  connection.query(query.getCards(), (error, rows) => {
    if (error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    const cards = rows.map((row) => ({
      id: row.id,
      cardType: {
        id: String(row.cardTypeId),
        name: row.name,
        color: row.color,
      },
      cardNumbers: [
        row.card_numbers.slice(0, 4),
        row.card_numbers.slice(4, 8),
        row.card_numbers.slice(8, 12),
        row.card_numbers.slice(12, 16),
      ],
      expirationDate: {
        month: String(row.expiration_month),
        year: String(row.expiration_year),
      },
      username: row.username,
      secureCode: String(row.secureCode),
      password: [...row.password],
      description: row.description,
    }));

    res.status(200).json(cards);
  });
});

app.post("/cards", (req, res) => {
  connection.query(query.postCard(req.body), (error) => {
    if (error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    res.status(200).json({ success: "success" });
  });
});

app.put("/cards/description", (req, res) => {
  const { id, description } = req.body

  connection.query(query.postCardDescription(id, description), (error) => {
    if(error) {
      console.error(error);

      res.status(500).json({ error: "Unknown Error" });
    }

    res.status(200).json({ success: "success" });

  });
});

app.delete("/cards", (req, res) => {
  connection.query(query.deleteCard(Number(req.query.id)), (error) => {
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
