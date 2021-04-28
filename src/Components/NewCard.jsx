import React from "react";
import PropTypes from "prop-types";

const NewCard = ({ toggleNewCardForm }) => {
  return (
    <button
      onClick={toggleNewCardForm}
      className="bg-gray-100 p-2 mt-2 rounded font-bold text-gray-500 text-sm"
      type="button"
    >
      + Add new card
    </button>
  );
};

NewCard.propTypes = {
  toggleNewCardForm: PropTypes.func.isRequired,
};

export default NewCard;
