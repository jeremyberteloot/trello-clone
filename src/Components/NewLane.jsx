import React, { useState, useContext } from "react";
import { FirebaseContext } from "../firebase-context";

const NewLane = () => {
  const firebase = useContext(FirebaseContext);
  const [ctaMode, setCtaMode] = useState(true);
  const [classList, setClassList] = useState(
    "flex-shrink-0 h-14 w-64 p-4 bg-gray-800 bg-opacity-30 rounded shadow-sm mx-4 text-white font-bold text-center cursor-pointer"
  );
  const [laneName, setLaneName] = useState("");

  const handleNewLane = () => {
    if (!ctaMode) return;

    setCtaMode(false);

    setClassList(
      "flex-shrink-0 min-h-14 w-64 p-2 bg-white rounded shadow-sm text-gray font-bold text-center cursor-pointer self-start"
    );
  };

  const makeNewLane = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const id = Date.now();
    firebase.ref(`/lanes/${id}`).set({
      id,
      name: laneName,
      cards: [],
    });
    setLaneName("");
    setCtaMode(true);
    setClassList(
      "flex-shrink-0 h-14 w-64 p-4 bg-gray-800 bg-opacity-30 rounded shadow-sm mx-4 text-white font-bold text-center cursor-pointer"
    );
  };

  const withCtaMode = <span>+ Add a new lane</span>;

  const withFormMode = (
    <form onSubmit={makeNewLane} className="flex flex-col">
      <input
        type="text"
        autoFocus
        placeholder="Enter a name for your lane..."
        value={laneName}
        onChange={(event) => setLaneName(event.target.value)}
        className="p-2 mb-2 border-2 border-gray-300 text-gray-700 rounded"
      />
      <button
        type="submit"
        className="rounded p-2 bg-green-500 text-white font-bold"
      >
        Add lane
      </button>
    </form>
  );

  const newLaneContent = ctaMode ? withCtaMode : withFormMode;

  return (
    <div onClick={handleNewLane} className={classList}>
      {newLaneContent}
    </div>
  );
};

export default NewLane;
