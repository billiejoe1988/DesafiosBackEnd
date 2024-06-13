import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {

  constructor(model){
    this.model = model;
    }

  async register(user){
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email });
            if(!existUser) return await this.model.create(user);
            else return null;
        } catch (error) {
            throw new Error(error)
        }
    };

  async login(email, password){
        try {
            return await this.model.findOne({ email, password });
        } catch (error) {
            throw new Error(error)
        }
    };

  async getByEmail(email) {
    try {
      const response = await UserModel.find({ email: email });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await UserModel.findById(id).populate("cart");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(page = 1, limit = 10) {
    try {
      const response = await UserModel.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await UserModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      await UserModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await UserModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
