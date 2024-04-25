import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import discordLogo from "/discordLogo.png";
import Request from "../helpers/requests";
import background from "/background.png";
import logoQR from "/logoQR.png";
import qr from "/qr.png";

const Loginpage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const updatedErrors = { email: "", password: "" };

    if (email.trim() === "" || !email.includes("@")) {
      updatedErrors.email = "emailinvalid";
    }

    if (password.trim() === "") {
      updatedErrors.password = "passwordinvalid";
    }

    if (updatedErrors.email || updatedErrors.password) {
      setErrors(updatedErrors);
    } else {
      const doc = await Request("/signinuser", {
        email: email,
        password: password,
      });
      if (doc.token) {
        const cookieDurationDays = 30;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + cookieDurationDays);
        document.cookie = `sessionid=${
          doc.token
        }; expires=${expirationDate.toUTCString()}; path=/`;
        navigate("/settings");
      }
    }
  };

  const handleForgotPassword = async () => {
    const updatedErrors = { email: "", password: "" };

    if (email.trim() === "" || !email.includes("@")) {
      updatedErrors.email = "emailforgotpassword";
    }

    if (updatedErrors.email) {
      setErrors(updatedErrors);
    } else {
      const doc = await Request("/forgotpassword", { email: email });
      if (doc) {
        onOpen();
      }
    }
  };

  useEffect(() => {
    const checkCookies = async () => {
      if (
        document.cookie.replace(
          /(?:(?:^|.*;\s*)sessionid\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      ) {
        navigate("/settings");
      }
    };
    checkCookies();
  }, []);

  return (
    <div className="relative h-screen w-full flex justify-center items-center text-white">
      <img
        src={background}
        className="h-screen w-full object-cover object-top max-sm:hidden"
      />
      <div className="bg-[#313338] pb-6 w-7/12 max-lg:w-11/12 2xl:w-[41%] max-sm:w-full max-sm:h-full h-auto rounded-md max-sm:rounded-none shadow absolute flex">
        <div className="w-[62%] h-full flex flex-col items-center max-lg:w-full">
          <div className="flex flex-col items-center mt-9 mb-6">
            <img src={discordLogo} className="w-32 mb-4 sm:hidden" />
            <h1 className="ggSans600 text-2xl text-center">
              ¡Te damos la bienvenida de nuevo!
            </h1>
            <p className="ggSans400 text-gray-400 mt-1 text-center">
              ¡Nos alegra verte de nuevo!
            </p>
          </div>
          <div className="w-10/12 flex flex-col">
            <div className="flex flex-col">
              {errors.email === "emailforgotpassword" ? (
                <label className="ggSans900 text-xs text-red-400">
                  CORREO ELECTRÓNICO O NÚMERO DE TELEFONO -{" "}
                  <i className="ggSans400">Este campo es obligatorio</i>
                </label>
              ) : errors.email === "emailinvalid" ? (
                <label className="ggSans900 text-xs text-red-400">
                  CORREO ELECTRÓNICO O NÚMERO DE TELEFONO -{" "}
                  <i className="ggSans400">
                    El inicio de sesión o la contreseña no son válidos.
                  </i>
                </label>
              ) : (
                <label className="ggSans900 text-xs text-[#B0B5BC]">
                  CORREO ELECTRÓNICO O NÚMERO DE TELEFONO
                </label>
              )}
              <input
                required={true}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                className="text-gray-300 mt-2 bg-[#1E1F22] outline-none p-2 ggSans400 rounded"
                type="email"
              />
            </div>
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
            <a
              onClick={handleForgotPassword}
              className="hover:underline hover:cursor-pointer text-sm text-[#00A8FC] mt-1 ggSans400"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="mt-5 w-10/12">
            <button
              type="submit"
              onClick={handleLogin}
              className="h-11 bg-[#5865F2] w-full rounded-sm ggSans600"
            >
              Iniciar sesión
            </button>
            <div className="mt-2 text-gray-400 text-sm">
              <span>¿Necesitas una cuenta?</span>
              <a
                className="ml-1 text-[#00A8FC] hover:underline ggSans400"
                href="/register"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
        <div className="w-[38%] h-full max-lg:hidden">
          <div className="relative flex items-center justify-center h-auto mt-10 mb-4">
            <img src={qr} />
            <img src={logoQR} className="absolute w-12" />
          </div>

          <h2 className="ggSans600 text-2xl text-center w-10/12 m-auto">
            Inicia sesión con el código QR
          </h2>
          <div className="text-gray-400 ggSans400 text-center w-10/12 m-auto leading-5 mt-2">
            <p>
              Escanea el código con la{" "}
              <strong>aplicación para dispositivos móviles de Discord</strong>{" "}
              para iniciar sesión de inmediato.
            </p>
          </div>
        </div>
      </div>
      <Modal
        backdrop={"opaque"}
        className="bg-[#313338] rounded-sm"
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        placement={"center"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white ggSans600 text-xl">
                Instrucciones enviadas
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-300 text-sm">
                  Le enviamos instrucciones para cambiar su contraseña a{" "}
                  <span className="ggSans600">{email}</span>, verifique tanto su
                  bandeja de entrada como su carpeta de correo no deseado.
                </p>
              </ModalBody>
              <ModalFooter className="bg-[#2B2D31] mt-2">
                <Button
                  className="bg-[#5865F2] rounded-sm ggSans600 text-white"
                  onPress={onClose}
                >
                  De acuerdo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Loginpage;
