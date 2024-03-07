import jwt from 'jsonwebtoken'
import User from '../users/user.model.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    //verificación de token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer el usuario que corresponde al uid
    const user = await User.findById(uid);
    //verificar que el usuario exista.
    if(!user){
      return res.status(401).json({
        msg: 'User not exists on database'
      })
    }
    //verificar si el uid está habilidato.
    if(!user.state){
      return res.status(401).json({
        msg: 'Invalid token - user with status: false'
      })
    }

    req.user = user;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token not valid",
      });
  }
}