import jwt from 'jsonwebtoken';
import UserService from '../services/user.services.js';
const userService = new UserService();
import 'dotenv/config'
import { createResponse } from '../utils.js';

/**
 * Middleware que verifica si el token es válido a través del header "Authorization"
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(403).json({ msg: "Unhautorized" });
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const user = await userService.getById(decode.userId);
    if (!user) res.status(404).json({ msg: "User not found" });
    
    //actualizar token
    const now = Math.floor(Date.now() / 1000); 
    const tokenExp = decode.exp; 
    const timeUntilExp = tokenExp - now; 

    if (timeUntilExp <= 300) {
      const newToken = userService.generateToken(user, "5m");
      console.log(">>>>>>SE REFRESCÓ EL TOKEN");
      res.set(`Authorization`, `Bearer ${newToken}`); 
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};


