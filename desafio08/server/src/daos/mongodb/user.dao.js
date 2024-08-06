import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {

  constructor(model) {
    this.model = model;
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({ email });
      if (!existUser) {
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
          return await this.model.create({
            ...user,
            role: 'admin'
          });
        } else {
          return await this.model.create(user);
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist && userExist.password === password) {ía
        return userExist;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await this.model.findOne({ email });
      return userExist || false;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await this.model.findById(id).populate("cart");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll(page = 1, limit = 10) {
    try {
      const response = await this.model.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async create(obj) {
    try {
      const response = await this.model.create(obj);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async update(id, obj) {
    try {
      await this.model.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const userDao = new UserDaoMongoDB(UserModel);
