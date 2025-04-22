import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Layout from "./pages/layout";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
