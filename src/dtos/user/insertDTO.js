export default class UserInsertDTO {
  static getFrom = (user) => {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      cart: cart._id,
      role,
    };
  };
}
