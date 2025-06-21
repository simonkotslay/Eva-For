import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import LayOut from "./Components/LayOut/LayOut";
import Question from "./pages/Questions/Question";
import Landing from "./pages/Landing/Landing";
import About from "./pages/About/About";
import Answer from "./pages/Answer/Answer";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response.data);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line
  }, []);

  const isLoggedIn = !!user?.userid;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/login");
  };

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          element={
            <LayOut isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          }
        >
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer/:questionId" element={<Answer />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
