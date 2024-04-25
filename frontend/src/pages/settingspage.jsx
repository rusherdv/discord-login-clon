import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../helpers/requests";
import { formatChatDate } from "../helpers/parseTimestamp";

const Settingspage = () => {
  const [loading, setloading] = useState(true);
  const [date, setdate] = useState(null);
  const [user, setuser] = useState(null);

  const navigate = useNavigate();
  const handleLogout = async () => {
    document.cookie =
      "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      if (
        !document.cookie.replace(
          /(?:(?:^|.*;\s*)sessionid\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      ) {
        navigate("/login");
        return;
      }

      const usuario = await Request("/getuser", {}, "auth");
      setuser(usuario.decoded.user);
      const fecha = await formatChatDate(usuario.decoded.user.timestamp);
      setdate(fecha);
      setloading(false);
    };

    getData();
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      {loading ? (
        <img src="/discord.gif" className="w-72" alt="" />
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={user.img}
            className="rounded-full object-cover w-24"
            alt=""
          />
          <p className="ggSans400 text-xl mt-1">{user.displayname}</p>
          <p className="ggSans400 mb-1">
            Account created: <span className="ggSans600">{date}</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-700 ggSans600 hover:bg-red-800 transition-all px-6 py-2 rounded-md mt-1"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Settingspage;
