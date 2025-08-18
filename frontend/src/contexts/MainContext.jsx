import React, { useState } from "react";
import { useContext, createContext } from "react";

const Context = createContext({
  user: {},
  token: null,
  handleUser: () => {},
  handleToken: () => {},
  conversationId: null,
  handleCurrentConversation: () => {},
});

export default function MainContext({ children }) {
  const parsedUser = localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER"))
    : {};

  const lik = { id: 1, username: "amine", email_verified_at: 6 };

  const [user, setUser] = useState(parsedUser);
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
  const [conversationId, setConversationId] = useState(
    localStorage.getItem("CONVERSATION") || null
  );

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

  return (
    <Context.Provider
      value={{
        user,
        token,
        conversationId,
        handleUser,
        handleToken,
        handleCurrentConversation,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useMainContext = () => useContext(Context);
