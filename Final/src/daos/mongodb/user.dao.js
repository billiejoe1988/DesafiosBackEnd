import { UserModel } from "./models/user.model.js";

export default class UserDao {
  register = async (user) => {
    try {
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error.errorResponse);
    }
  };

  login = async (email) => {
    try {
      const isLogin = await UserModel.findOne({ email });
      return isLogin;
    } catch (error) {
      throw new Error(error);
    }
  };
  updLastConnection = async (id) => {
    try {
      const isLogin = await UserModel.findByIdAndUpdate(
        id,
        { last_connection: Date.now() },
        { new: true }
      );
      return isLogin;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const resp = await UserModel.findById(id).populate("cart");
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  };
  resetPassword = async (id, newPass) => {
    try {
      const resp = await UserModel.findByIdAndUpdate(
        id,
        { password: newPass },
        { new: true }
      );
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (id, newUserData) => {
    try {
      const resp = await UserModel.findByIdAndUpdate(id, newUserData, {
        new: true,
      });
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  };
  updateProfile = async (id, newUserData) => {
    try {
      const resp = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $set: { documents: newUserData } },
        {
          new: true,
        }
      );
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  };
  getAll = async () => {
    try {
      const allUsers = await UserModel.find();
      return allUsers;
    } catch (error) {
      throw new Error(error);
    }
  };
}
