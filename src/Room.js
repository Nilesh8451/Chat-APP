import React, { useState, useEffect } from "react";
import "./Room.css";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Room() {
  const [{ user }] = useStateValue();

  const [input, setInput] = useState("");
  var exist = false;
  const history = useHistory();

  const handleRoomClick = async (e) => {
    e.preventDefault();

    const snapshot = await db.collection("rooms").get();
    snapshot.docs.map((doc) => {
      if (doc.data().roomName === input) {
        exist = true;
        history.push(`/room/${doc.id}`);
        return;
      }
    });

    if (!exist) {
      db.collection("rooms")
        .add({
          roomName: input,
        })
        .then((docRef) => {
          history.push(`/room/${docRef.id}`);
        });
    }
  };

  useEffect(() => {
    if (!user) {
      history.push(`/`);
    }
  }, []);

  return (
    <div className="room">
      <div className="room__container">
        <form>
          <TextField
            id="outlined-basic"
            label="Room Name"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            disabled={!input}
            type="submit"
            onClick={handleRoomClick}
            variant="contained"
          >
            Join Room
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Room;
