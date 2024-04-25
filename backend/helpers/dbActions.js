import connection from "../config/db.js";

const checkUserExist = async (email, username) => {
  let query = "SELECT * FROM users WHERE email = ?";
  let queryParams = [email];

  if (username) {
    query += " OR username = ?";
    queryParams.push(username);
  }

  return new Promise((resolve, reject) => {
    try {
      connection.query(query, queryParams, (err, results) => {
        if (err) {
          console.error("Error al realizar la consulta:", err);
          reject(err);
          return;
        }
        resolve(results[0]);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const checkTokenExist = async token => {
  let query = "SELECT * FROM users WHERE token = ?";
  let queryParams = [token];

  return new Promise((resolve, reject) => {
    try {
      connection.query(query, queryParams, (err, results) => {
        if (err) {
          console.error("Error al realizar la consulta:", err);
          reject(err);
          return;
        }
        resolve(results[0]);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const signUpUserDB = async user => {
  const images = {
    black: "http://localhost:8080/profile-image-black.png",
    blue: "http://localhost:8080/profile-image-blue.png",
    pink: "http://localhost:8080/profile-image-pink.png",
    brown: "http://localhost:8080/profile-image-brown.png",
    gray: "http://localhost:8080/profile-image-gray.png",
    red: "http://localhost:8080/profile-image-red.png",
  };

  const profileimage =
    images[
      Object.keys(images)[
        Math.floor(Math.random() * Object.keys(images).length)
      ]
    ];
  const formattedBirthday = new Date(user.birthday).toISOString().split("T")[0];

  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `INSERT INTO users (email, username, displayname, password, birthday, profileimage) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          user.email,
          user.username,
          user.displayname,
          user.password,
          formattedBirthday,
          profileimage,
        ],
        (err, result) => {
          if (err) {
            console.error("Error al insertar el usuario:", err);
            reject(err);
            return;
          }

          resolve(true);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
};

const createToken = async (user, token) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `UPDATE users SET token = ? WHERE email = ?`,
        [token, user.email],
        (err, result) => {
          if (err) {
            console.error("Error al crear el token:", err);
            reject(err);
            return;
          }
          resolve(true);
        }
      );
    } catch (error) {
      console.error("Error al crear el token:", error);
      reject(error);
    }
  });
};

const deleteToken = async token => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `UPDATE users SET token = NULL WHERE token = ?`,
        [token],
        (err, result) => {
          if (err) {
            console.error("Error al eliminar el token:", err);
            reject(err);
            return;
          }
          resolve(true);
        }
      );
    } catch (error) {
      console.error("Error al eliminar el token:", error);
      reject(error);
    }
  });
};

const changePassword = async (user, password) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `UPDATE users SET password = ? WHERE email = ?`,
        [password, user.email],
        (err, result) => {
          if (err) {
            console.error("Error al cambiar password:", err);
            reject(err);
            return;
          }
          resolve(true);
        }
      );
    } catch (error) {
      console.error("Error al cambiar password:", error);
      reject(error);
    }
  });
};

export {
  checkUserExist,
  signUpUserDB,
  createToken,
  deleteToken,
  changePassword,
  checkTokenExist,
};
