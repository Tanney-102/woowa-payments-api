module.exports = {
  getCardTypes: () => "SELECT * FROM card_type",
  getCards: () =>
    "SELECT * FROM cards JOIN card_type ON cards.type = card_type.id",
  postCard: (card) => `
    INSERT INTO cards (
      type,
      card_numbers,
      expiration_month,
      expiration_year,
      username,
      secureCode,
      password
    ) VALUES(
      ${card.cardTypeId},
      ${card.cardNumbers.join("")},
      ${card.expirationDate.split("/")[0]},
      ${card.expirationDate.split("/")[1]},
      "${card.username}",
      ${card.secureCode},
      ${card.password}
    );
  `,
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
