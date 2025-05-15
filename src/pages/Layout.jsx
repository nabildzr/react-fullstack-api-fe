import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

const Layout = () => {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    // const data = await res.json();
    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }

    // console.log(data);
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

              <Link to={"/create"} className="nav-link">
                New Post
              </Link>

              <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
              </form>

              <Link to={"/profile"}>
                <div className="bg-white p-1 rounded-full hover:bg-gray-400 duration-300">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover mx-auto"
                    />  
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <circle cx={12} cy={6} r={4} fill="currentColor"></circle>
                      <path
                        fill="currentColor"
                        d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                      ></path>
                    </svg>
                  )}
                </div>
              </Link>
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
