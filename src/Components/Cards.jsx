import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

const Cards = ({ lane, cards }) => {
  return (
    <ul>
      {cards && cards.length > 0
        ? cards.map((card, index) => (
            <Card key={card.id} lane={lane} card={card} index={index} />
          ))
        : null}
    </ul>
  );
};

Cards.propTypes = {
  cards: PropTypes.array,
  lane: PropTypes.object,
};

export default Cards;
