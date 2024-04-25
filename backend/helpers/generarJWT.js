import jwt from 'jsonwebtoken'

const generarJWT = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

const decodeJWT = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}

export {
    generarJWT,
    decodeJWT
}