import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

function handleError(err) {
  console.warn(err);
}

const Homescreen = ({ setIsAuth, isAuth, navigate, isAdmin }) => {
  let activeStyle = {
    textDecoration: "underline",
  };

  const userLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response is not ok");
    }

    const json = await response.json();

    Cookies.remove("Authorization", `Token ${json.key}`);
    setIsAuth(false);
  };

  return (
    <div className="h-full">
      <nav className="py-2 h-16 flex sm:justify-between justify-end items-center bg-stone-500 fixed top-0 w-full">
        <h1 className="hidden sm:block font-bold text-4xl mx-3 text-pink-800">
          NEWS YAY
        </h1>
        <div className="h-full flex items-center">
          <NavLink
            className="mx-3 text-lg hover:underline hover:text-neutral-700"
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Newsfeed
          </NavLink>
          <NavLink
            className="mx-3 text-lg hover:underline hover:text-neutral-700"
            to="/dashboard"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Dashboard
          </NavLink>
          {isAdmin === "admin" && (
            <NavLink
              className="mx-3 text-lg hover:underline hover:text-neutral-700"
              to="/review"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Review
            </NavLink>
          )}
          <button
            type="button"
            className="mx-2 p-1 bg-pink-800 text-white rounded-md shadow-neutral-600 drop-shadow-md"
            onClick={() => {
              userLogout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Homescreen;
