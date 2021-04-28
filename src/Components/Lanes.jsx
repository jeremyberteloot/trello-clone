import React, { useEffect, useState, useContext } from "react";
import Lane from "./Lane";
import NewLane from "./NewLane";
import { FirebaseContext } from "../firebase-context";
import { DragDropContext } from "react-beautiful-dnd";

const Lanes = (props) => {
  const firebase = useContext(FirebaseContext);
  const [lanes, setLanes] = useState([]);

  useEffect(() => {
    const lanesRef = firebase.ref().child("lanes");
    lanesRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let lanesToArray = Object.values(snapshot.val());
          lanesToArray = lanesToArray.map((lane) => {
            let cardsToArray = [];
            if (lane.hasOwnProperty("cards")) {
              cardsToArray = Object.values(lane.cards);
            }

            return {
              ...lane,
              cards: cardsToArray,
            };
          });
          setLanes(lanesToArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    lanesRef.on("value", (snapshot) => {
      let lanesToArray = Object.values(snapshot.val());

      lanesToArray = lanesToArray.map((lane) => {
        let cardsToArray = [];
        if (lane.hasOwnProperty("cards")) {
          cardsToArray = Object.values(lane.cards);
        }

        return {
          ...lane,
          cards: cardsToArray,
        };
      });

      setLanes(lanesToArray);
    });
  }, [firebase]);

  const moveCard = async (source, destination, id) => {
    const sourceRef = firebase.ref(`lanes/${source}`);
    const targetRef = firebase.ref(`lanes/${destination}`);
    const cardRef = firebase.ref(`lanes/${source}`).child(`cards/${id}`);
    const cardData = await cardRef.get();

    const card = cardData.val();

    targetRef.child(`cards/${id}`).set({
      ...card,
    });

    sourceRef.child(`cards/${id}`).set(null);
  };

  const handleDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveCard(source.droppableId, destination.droppableId, draggableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ul className="h-full mt-10 py-8 flex">
        {lanes.map((lane) => (
          <Lane key={lane.id} lane={lane} />
        ))}
        <NewLane />
      </ul>
    </DragDropContext>
  );
};

export default Lanes;
