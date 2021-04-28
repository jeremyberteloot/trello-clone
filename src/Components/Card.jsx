import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FirebaseContext } from "../firebase-context";

const Card = ({ lane, card, index }) => {
  const firebase = useContext(FirebaseContext);

  const handleDestroyCard = () => {
    firebase.ref(`lanes/${lane.id}`).child(`cards/${card.id}`).set(null);
  };

  return (
    <div className="p-2 pr-4 my-2 w-full bg-white rounded shadow-sm text-sm overflow-hidden relative">
      <span>{card.content}</span>

      <button
        onClick={handleDestroyCard}
        className="text-gray-200 absolute right-1 top-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

Card.propTypes = {
  lane: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default Card;
