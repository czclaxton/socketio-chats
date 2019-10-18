import React from "react";

const CTX = React.createContext();

const initState = {
  general: [
    { from: "Tyler", msg: "Hey" },
    { from: "Kayla", msg: "hi" },
    { from: "Jason", msg: "yo" }
  ],
  topic2: [
    { from: "Tyler", msg: "Hey" },
    { from: "Kayla", msg: "hi" },
    { from: "Jason", msg: "yo" }
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

export default function Store(props) {
  const reducerHook = React.useReducer(reducer, initState);
  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
