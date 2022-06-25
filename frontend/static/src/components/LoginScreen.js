import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useOutletContext } from "react-router-dom";

function handleError(err) {
  console.warn(err);
}

const LoginScreen = () => {
  // const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth, navigate, isAdmin, setIsAdmin] = useOutletContext();

  const handleSubmit = async (e) => {
    const data = {
      username: username,
      password: password,
    };

    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Netowrk reponse is not ok");
    }

    const json = await response.json();

    Cookies.set("Authorization", `${json.key}`);
    Cookies.set("isAdmin", `${username}`);
    setIsAuth(true);
    setIsAdmin(username);
    navigate("/");
  };

  const loginView = (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-neutral-500 p-5 rounded-md"
      >
        <input
          className="m-2 p-1 rounded-md"
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="m-2 p-1 rounded-md"
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 p-1 bg-emerald-700 font-bold rounded-md"
        >
          Login
        </button>
      </form>
      <p className="text-white mt-3 font-light text-sm">
        {/* <button type='button' onClick={() => setScreen('register')} className='underline hover:text-blue-500'>Register</button> to become a contributor */}
        <Link to="/register">Register</Link>
      </p>
    </>
  );

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="p-3 my-3 font-bold text-3xl font-serif">NEWS APP</h1>
      {loginView}
      {/* {screen === 'login' && loginView} */}
      {/* {screen === 'register' && <RegisterForm setScreen={setScreen} />} */}
    </div>
  );
};

export default LoginScreen;
