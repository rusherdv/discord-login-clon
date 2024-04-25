import Request from "../helpers/requests";
import background from "/background.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setpassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const handleChangePassword = async () => {
    const doc = await Request(`/forgotpassword/${token}`, { password });
    if (doc) {
      navigate("/");
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center text-white">
      <img
        src={background}
        className="h-screen w-full object-cover object-top max-sm:hidden"
      />
      <div className="bg-[#313338] pb-6 w-3/12 max-lg:w-11/12 2xl:w-[28%] max-sm:w-full max-sm:h-full h-auto rounded-md max-sm:rounded-none shadow absolute flex">
        <div className="w-full h-full flex flex-col items-center max-lg:w-full">
          <div className="flex flex-col items-center mt-9 mb-6">
            <img src="/reset.png" className="w-62 mb-4" />
            <h1 className="ggSans600 text-2xl text-center">
              ¡Te damos la bienvenida de nuevo!
            </h1>
          </div>
          <div className="w-10/12 flex flex-col">
            <div className="flex flex-col mt-4">
              {errors.password === "passwordinvalid" ? (
                <label className="ggSans900 text-xs text-red-400">
                  CONTRASEÑA -{" "}
                  <i className="ggSans400">
                    El inicio de sesión o la contreseña no son válidos.
                  </i>
                </label>
              ) : (
                <label className="ggSans900 text-xs text-[#B0B5BC]">
                  CONTRASEÑA
                </label>
              )}

              <input
                required={true}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                className="text-gray-300 mt-2 bg-[#1E1F22] outline-none p-2 ggSans400 rounded"
                type="password"
              />
            </div>
          </div>
          <div className="mt-5 w-10/12">
            <button
              type="submit"
              onClick={handleChangePassword}
              className="h-11 bg-[#5865F2] w-full rounded-sm ggSans600"
            >
              Reset password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
