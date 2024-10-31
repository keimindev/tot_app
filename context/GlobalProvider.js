import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [section, setSection] = useState("");
  const [goalTime, setGoalTime] = useState(30);
  const [username, setUsername] = useState("")

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
          setGoalTime(res.goalTime)
          setUsername(res.username)
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        section, 
        setSection,
        goalTime, 
        setGoalTime,
        username, 
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;