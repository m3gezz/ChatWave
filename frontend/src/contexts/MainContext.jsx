import React, { useState } from "react";
import { useContext, createContext } from "react";

const Context = createContext({
  user: {},
  token: null,
  handleUser: () => {},
  handleToken: () => {},
});

export default function MainContext({ children }) {
  const parsedUser = localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER"))
    : {};

  const [user, setUser] = useState(parsedUser);
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
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

  return (
    <Context.Provider value={{ user, token, handleUser, handleToken }}>
      {children}
    </Context.Provider>
  );
}

export const useMainContext = () => useContext(Context);
