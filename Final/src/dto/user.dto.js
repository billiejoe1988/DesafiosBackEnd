export class UserDTO {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.cart = user.cart;
    this.last_connection = user.last_connection;
    this.documents = user.documents;
    this.status = user.status;
    this._id = user._id;
    this.inactive = user.inactive;
  }
}
export class UserLiteDTO {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.last_connection = user.last_connection;
  }
}
