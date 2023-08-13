export default class restoreTokenDTO {
  static getForm = (user) => {
    return {
      email: user.email,
    };
  };
}
