import React, { useState } from "react";
import { useContext, createContext } from "react";

const Context = createContext({
  user: {},
  token: null,
  conversationId: null,
  conversationObject: {},
  messages: [],
  handleUser: () => {},
  handleToken: () => {},
  handleCurrentConversation: () => {},
  handleConversationObject: () => {},
  handleMessages: () => {},
});

export default function MainContext({ children }) {
  const parsedUser = localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER"))
    : {};

  const parsedConversation = localStorage.getItem("CONVERSATION_OBJECT")
    ? JSON.parse(localStorage.getItem("CONVERSATION_OBJECT"))
    : {};

  const parsedMessages = localStorage.getItem("Messages")
    ? JSON.parse(localStorage.getItem("Messages"))
    : [];

  const [user, setUser] = useState(parsedUser);
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
  const [conversationId, setConversationId] = useState(
    localStorage.getItem("CONVERSATION") || null
  );
  const [conversationObject, setConversationObject] =
    useState(parsedConversation);
  const [messages, setMessages] = useState(parsedMessages);

  const handleUser = (user) => {
    setUser(user);

    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  };

  const handleToken = (token) => {
    setToken(token);

    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
  };

  const handleCurrentConversation = (conversationId) => {
    setConversationId(conversationId);

    if (conversationId) {
      localStorage.setItem("CONVERSATION", conversationId);
    } else {
      localStorage.removeItem("CONVERSATION");
    }
  };

  const handleConversationObject = (conversationObject) => {
    setConversationObject(conversationObject);

    if (conversationObject) {
      localStorage.setItem(
        "CONVERSATION_OBJECT",
        JSON.stringify(conversationObject)
      );
    } else {
      localStorage.removeItem("CONVERSATION_OBJECT");
    }
  };

  const handleMessages = (messages) => {
    setMessages(messages);

    if (conversationObject) {
      localStorage.setItem("MESSAGES", JSON.stringify(conversationObject));
    } else {
      localStorage.removeItem("MESSAGES");
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        token,
        conversationId,
        conversationObject,
        handleUser,
        handleToken,
        handleCurrentConversation,
        handleConversationObject,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useMainContext = () => useContext(Context);
