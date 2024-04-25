import { generarJWT, decodeJWT } from "../helpers/generarJWT.js";
import {
  checkUserExist,
  signUpUserDB,
  createToken,
  checkTokenExist,
  deleteToken,
  changePassword,
} from "../helpers/dbActions.js";
import { hashPassword, checkPassword } from "../helpers/saltPassword.js";
import { sendPasswordReset } from "../helpers/enviarEmail.js";

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await decodeJWT(token);
    if (!decoded) {
      res.json({ msg: "Error-decoding-JWT" });
    }
    res.json({ decoded });
  } catch (error) {
    console.log(error);
  }
};

const signUpUser = async (req, res) => {
  try {
    const userExist = await checkUserExist(req.body.email, req.body.username);

    if (userExist) {
      return res.json({ errorCode: "Email-or-username-already-in-use" });
    }

    const user = {
      email: req.body.email,
      username: req.body.username,
      displayname: req.body.name,
      password: await hashPassword(req.body.password),
      birthday: req.body.birthday,
    };

    const registeredUser = await signUpUserDB(user);
    if (registeredUser) {
      res.json({ msg: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

const signinUser = async (req, res) => {
  try {
    const userExist = await checkUserExist(req.body.email);
    if (!userExist) {
      return res.json({ errorCode: "Email-not-registered" });
    }

    const passwordMatches = await checkPassword(
      req.body.password,
      userExist.password
    );
    if (!passwordMatches) {
      return res.json({ errorCode: "Password-not-match" });
    }

    const token = generarJWT({
      id: userExist.id,
      email: userExist.email,
      displayname: userExist.displayname,
      username: userExist.username,
      img: userExist.profileimage,
      frontimg: userExist.frontimage,
      about: userExist.about,
      timestamp: userExist.timestamp,
      state: userExist.state,
    });

    res.json({ token: token });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const userExist = await checkUserExist(req.body.email);
    if (!userExist) {
      return res.json({ errorCode: "Email-not-registered" });
    }
    const token = [...Array(20)]
      .map(i => (~~(Math.random() * 36)).toString(36))
      .join("");

    const tokenset = await createToken(userExist, token);
    if (!tokenset) {
      return res.json({ msg: "Error" });
    }

    const sentEmail = await sendPasswordReset(
      userExist.email,
      userExist.username,
      token
    );
    if (!sentEmail) {
      console.log("Error enviando email");
    }

    res.json({ msg: "Email-sent" });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const userExist = await checkTokenExist(req.params.token);
    if (!userExist) {
      return res.json({ errorCode: "Token-not-found" });
    }

    const passwordchanged = await changePassword(
      userExist,
      await hashPassword(req.body.password)
    );
    if (!passwordchanged) {
      return res.json({ msg: "Error" });
    }
    const deletedToken = await deleteToken(req.params.token);
    if (!deletedToken) {
      return res.json({ msg: "Error" });
    }
    console.log(deletedToken);

    res.json({ msg: "Reseting password" });
  } catch (error) {
    console.log(error);
  }
};

export { getUser, signUpUser, signinUser, forgotPassword, resetPassword };
