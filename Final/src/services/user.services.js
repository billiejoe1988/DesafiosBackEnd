//import UserDao from "../daos/mongodb/user.dao.js";
import {
  createHash,
  hasBeenMoreThanXTime,
  isValidPassword,
} from "../utils/utils.js";
import persistence from "../daos/factory.js";
const { userDao, cartDao } = persistence;
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();

export const register = async (userData) => {
  try {
    const { email, password } = userData;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      const cartUser = await cartDao.create();
      const role =
        email === "adminCoder@coder.com"
          ? "admin"
          : userData.role === "premium"
          ? "premium"
          : "user";

      const userHashed = {
        ...userData,
        role,
        password: createHash(password),
        cart: cartUser._id,
      };

      const user = await userDao.register(userHashed);

      if (!user) res.status(404).json({ msj: "Bad request" });
      else return user;
    } else return null;
  } catch (error) {
    throw new Error(error);
  }
};
export const login = async ({ email, password }) => {
  try {
    const userExist = await userDao.login(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist.password);
    if (!passValid) return null;
    const { id } = userExist;
    const updLastConnection = await userDao.updLastConnection(id);
    return updLastConnection;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserById = async (id) => {
  try {
    return await userRepository.getUserById(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const getAll = async () => {
  try {
    return await userRepository.getAll();
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllComplete = async () => {
  try {
    return await userDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};
export const setInactive = async () => {
  try {
    const users = await userDao.getAll();
    if (users.length > 0) {
      for (const user of users) {
        if (
          user.last_connection &&
          hasBeenMoreThanXTime(user.last_connection)
        ) {
          console.log(
            `${user.email}, Han pasado mas de 48hs de la ultima conexion de ${user._id}`
          );
          await userDao.update(user._id, {
            inactive: true,
          });

          inactiveUsers.push(user.email);
        }
      }
    }

    return inactiveUsers;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserByEmail = async (email) => {
  try {
    return await userDao.login(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPassword = async (id, newPass) => {
  try {
    return await userDao.resetPassword(id, newPass);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, newUserData) => {
  try {
    return await userDao.update(id, newUserData);
  } catch (error) {
    throw new Error(error);
  }
};
export const updateProfile = async (id, newUserData) => {
  try {
    return await userDao.updateProfile(id, newUserData);
  } catch (error) {
    throw new Error(error);
  }
};
