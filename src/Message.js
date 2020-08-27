import React, { forwardRef } from "react";
import "./Message.css";
import { CardContent, Card, Typography } from "@material-ui/core";
import { useStateValue } from "./StateProvider";

// const Message = forwardRef(
//   ({ message, username, userEmail, timestamp }, ref) => {
const Message = ({ message, username, userEmail, timestamp }) => {
  const [{ user }] = useStateValue();
  const isUser = user?.email === userEmail;

  return (
    <div
      className={`message ${(isUser && "message__user") || "message__guest"}`}
    >
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography
            varient="h5"
            component="h2"
            className="message_main_content"
          >
            <b>{!isUser && `${username || "Unknown User"} : `}</b>
            {message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default Message;
