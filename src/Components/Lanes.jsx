import React, { useEffect, useState, useContext } from "react";
import Lane from "./Lane";
import NewLane from "./NewLane";
import { FirebaseContext } from "../firebase-context";

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

  return (
    <ul className="h-full mt-10 py-8 flex">
      {lanes && lanes.length > 0
        ? lanes.map((lane) => <Lane key={lane.id} lane={lane} />)
        : null}
      <NewLane />
    </ul>
  );
};

export default Lanes;
