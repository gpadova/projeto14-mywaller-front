import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import HomeScreen from "./Components/HomeScreen";
import NewEntry from "./Components/NewEntry";
import NewExit from "./Components/NewExit";
import GlobalStyle from "./Components/GlobalStyles";
import UserContext from "./Components/UserContext";

function App() {
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");
  const [idDono, setIdDono] = useState("");

  return (
    <>
      <UserContext.Provider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setToken={setToken}
                  setNome={setNome}
                  setIdDono={setIdDono}
                  idDono={idDono}
                />
              }
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/home"
              element={<HomeScreen token={token} nome={nome} idDono={idDono}/>}
            />
            <Route path="/new-entry" element={<NewEntry token={token} idDono={idDono}/>} />
            <Route path="/new-exit" element={<NewExit token={token} idDono={idDono}/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
