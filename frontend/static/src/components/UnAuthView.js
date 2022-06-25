import { Link } from "react-router-dom";

const UnAuthView = ({ isAuth, setIsAuth }) => {

  return (
    <div className="h-full">
      <nav className="py-2 h-16 flex justify-between  items-center bg-stone-500 fixed top-0 w-full">
        <Link to="/">
          <h1 className="font-bold font-serif text-4xl mx-3 text-pink-300">Java Jam</h1>
        </Link>
        <div className="h-full flex items-center">
          <Link to="/login" className="mx-3 hover:underline">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default UnAuthView;
