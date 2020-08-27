import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import "./Chat.css";
import { useParams, useHistory } from "react-router-dom";
import Message from "./Message";
import { useStateValue } from "./StateProvider";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [input, setInput] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  const goBack = () => {
    history.push(`/room`);
  };

  useEffect(() => {
    if (!user) {
      history.push(`/`);
    }

    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      );
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (roomId) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
        userEmail: user.email,
      });

      setInput("");
    }
  };

  // console.log(roomMessages);
  // console.log(user);

  return (
    <div className="chat">
      <div className="chat__head">
        <div className="chat__header">
          <IconButton onClick={goBack}>
            <SkipPreviousIcon className="chat__goBack" />
          </IconButton>
          <h3>{user?.displayName}</h3>
          <img src={user?.photoURL} />
        </div>
      </div>
      <form className="chat__form">
        <FormControl className="chat__formControl">
          <Input
            className="chat__input"
            placeholder="Enter a message...."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton
            className="chat__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <ScrollToBottom>
        <div className="chat__message_container">
          {/* <FlipMove> */}

          {roomMessages.map(({ message, id }) => (
            <Message
              key={id}
              message={message.message}
              username={message.username}
              userEmail={message.userEmail}
              timestamp={message.timestamp}
            />
          ))}

          {/* </FlipMove> */}
        </div>
      </ScrollToBottom>
    </div>
  );
}

export default Chat;
