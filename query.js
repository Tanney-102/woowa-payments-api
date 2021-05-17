module.exports = {
  getCardTypes: (id = "") => {
    if (id === undefined || id === "") {
      return "SELECT * FROM card_type";
    } else {
      return `SELECT * FROM card_type WHERE id=${id}`;
    }
  },
  getCards: () =>
    "SELECT *, cards.id AS id, card_type.id AS cardTypeId FROM cards JOIN card_type ON cards.type = card_type.id",
  getLastIdFromCards: () => "SELECT last_insert_id(id) FROM cards",
  postCard: (card) => `
    INSERT INTO cards (
      type,
      card_numbers,
      expiration_month,
      expiration_year,
      username,
      secureCode,
      password,
      description
    ) VALUES(
      ${card.cardType.id},
      ${card.cardNumbers.join("")},
      ${card.expirationDate.month},
      ${card.expirationDate.year},
      "${card.username}",
      ${card.secureCode},
      ${card.password},
      "${card.description}"
    );
  `,
  postCardDescription: (id, description) => `UPDATE cards SET description="${description}" WHERE id=${id}`,
  deleteCard: (id) => `DELETE FROM cards WHERE id=${id}`,
};

// {
//   "cardTypeId": "1",
//   "cardNumbers": ["1234", "1234", "1234", "1234"],
//   "expirationDate": "11/11",
//   "username": "beuccol",
//   "secureCode": "123",
//   "password": "12",
//   "description": "주유카드"
// }
