export default class UserDTO {
  constructor(user) {
    (this.name = `${user.firstName} ${user.lastName}`),
      (this.role = user.role),
      (this.id = user._id),
      (this.email = user.email),
      (this.cart = user.cart._id);
  }
}
