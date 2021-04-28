import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import NewCard from "./NewCard";
import NewCardForm from "./NewCardForm";
import Cards from "./Cards";
import { FirebaseContext } from "../firebase-context";

const Lane = ({ lane }) => {
  const firebase = useContext(FirebaseContext);
  const [newCardFormMode, setNewCardFormMode] = useState(false);

  const handleNewCardForm = () => {
    setNewCardFormMode(true);
  };

  const handleSubmitNewCard = (content) => {
    setNewCardFormMode(false);

    const targetLane = firebase.ref(`lanes/${lane.id}`);
    const id = Date.now();
    targetLane.child(`cards/${id}`).set({
      id,
      content,
    });
  };

  const handleDestroyLane = () => {
    firebase.ref(`lanes/${lane.id}`).set(null);
  };

  return (
    <div
      style={{ maxHeight: "calc(100vh - 8rem)" }}
      className="overflow-y-auto overflow-x-hidden flex flex-col flex-shrink-0 w-64 p-4 bg-gray-50 rounded shadow-sm self-start mx-4"
    >
      <div className="text-xs uppercase text-gray-400 font-bold flex items-center justify-between">
        <span>{lane.name}</span>
        <button onClick={handleDestroyLane} className="bg-gray-200 rounded">
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
      <Cards lane={lane} cards={lane.cards} />
      {newCardFormMode ? (
        <NewCardForm submitNewCard={handleSubmitNewCard} />
      ) : (
        <NewCard toggleNewCardForm={handleNewCardForm} />
      )}
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object.isRequired,
};

export default Lane;
