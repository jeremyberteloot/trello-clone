import React, { useState } from "react";
import PropTypes from "prop-types";

const NewCardForm = ({ submitNewCard }) => {
  const [cardContent, setCardContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    submitNewCard(cardContent);
    setCardContent("");
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        autoFocus
        value={cardContent}
        onChange={(event) => setCardContent(event.target.value)}
        className="w-full p-2 mb-2 border-2 border-gray-300 text-gray-700 rounded"
      />

      <button
        type="submit"
        className="rounded p-2 bg-green-500 text-white font-bold"
      >
        Add card
      </button>
    </form>
  );
};

NewCardForm.propTypes = {
  submitNewCard: PropTypes.func.isRequired,
};

export default NewCardForm;
