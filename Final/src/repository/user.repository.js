import UserDaoMongo from "../daos/mongodb/user.dao.js";
import { UserLiteDTO, UserDTO } from "../dto/user.dto.js";
const userDao = new UserDaoMongo();

export default class UserRepository {
  constructor() {
    this.dao = userDao;
  }

  async getUserById(id) {
    try {
      const user = await this.dao.getById(id);
      return new UserDTO(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll() {
    try {
      const users = await this.dao.getAll();
      let allDtoUsers = [];
      users.forEach((element) => {
        const liteUser = new UserLiteDTO(element);
        allDtoUsers.push(liteUser);
      });
      return allDtoUsers;
    } catch (error) {
      throw new Error(error);
    }
  }
}
