import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {

  constructor(model){
    this.model = model;
    }

  async register(user){
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email });
            if(!existUser){
              if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                return await UserModel.create({
                  ...user,
                  // password: createHash(password),
                  password,
                  role: 'admin'
              });
              } 
                return await UserModel.create({
                    ...user,
                    // password: createHash(password),
                    password
                });
              } else return false;
            } catch (error) {
              console.log(error)
              throw new Error(error)
            }
          }

   async login(user){
    try {
              const { email, password } = user;
              const userExist = await this.getByEmail(email); 
              if(userExist){
                // const passValid = isValidPassword(password, userExist)
                // console.log('PASS', passValid);
                // if(!passValid) return false
                // else return userExist
                return userExist
              } return false
            } catch (error) {
              console.log(error)
              throw new Error(error)
       }
    }

  async getByEmail(email){
    try {
              const userExist = await UserModel.findOne({email}); 
              // console.log(userExist);
              if(userExist) return userExist
              else return false
            } catch (error) {
              console.log(error)
              throw new Error(error)
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
