import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
  general: [
    { from: "Tyler", msg: "Hey" },
    { from: "Kayla", msg: "hi" },
    { from: "Jason", msg: "yo" }
  ],
  sports: [
    { from: "Kevin", msg: "sup" },
    { from: "Bryce", msg: "hello" },
    { from: "Megan", msg: "lol" }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "connor";

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}

// Bracket around variable explanation

// const names = ['Luke', 'Eva', 'Phil'];
// const [first] = names;
// console.log(first); === 'Luke'
// const [first, second] = names;
// console.log(first, second); === 'Luke' 'Eva'
