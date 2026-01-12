import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Home from "./components/views/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
