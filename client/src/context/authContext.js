import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [newUser, setUser] = useState('');

  async function getLoggedIn() {

    const response = await axios.get("/api/check");
    if (!response.data.token) {
      setLoggedIn(false);
      setUser('');
    } else {
      setLoggedIn(true);
      setUser(response.data);
    }

  }

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, newUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };