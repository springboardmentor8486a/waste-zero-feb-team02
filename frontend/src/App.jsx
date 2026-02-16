import { useState } from "react";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

function App() {

  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
        <Login goToSignup={() => setPage("signup")} />
      ) : (
        <Signup goToLogin={() => setPage("login")} />
      )}
    </>
  );
}

export default App;
