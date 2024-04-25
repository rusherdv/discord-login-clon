import jwt from 'jsonwebtoken'
import { decodeJWT } from '../helpers/generarJWT.js'

const checkAuth = async (req,res,next) => {
    if(!req.headers.authorization){
        console.log("No token")
        return res.json({msg: "Token-invalid"})
    }

    const token = req.headers.authorization.split(' ')[1]
    const decoded = await decodeJWT(token)

    if(token && decoded){
        next();
    }
}

export default checkAuth