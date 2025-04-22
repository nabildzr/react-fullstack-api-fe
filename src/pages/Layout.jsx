import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

const Layout = () => {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }

    console.log(data);
  };

  return (
    <>
      <header>
        <nav>
          <Link to={"/"} className="nav-link">
            Home
          </Link>

          {user ? (
            <div className="space-x-4 flex items-center">
              <h1 className="text-slate-400 text-xs">
                Welcome back, {user.name}
              </h1>

              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
              <Link to={"/login"} className="nav-link">
                login
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
