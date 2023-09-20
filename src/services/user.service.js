export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }
  getUsersService = (params) => {
    return this.dao.getUsers(params);
  };
  getUsersByService = (id) => {
    return this.dao.getUsersBy(id);
  };
  createUserService = (user) => {
    return this.dao.createUser(user);
  };
  updateUsersService = (id, user) => {
    return this.dao.updateUsers(id, user);
  };
  updateOneService = (param, elem) => {
    console.log(param, elem);
    return this.dao.updateOne(param, elem);
  };
  deleteUsersService = (id) => {
    return this.dao.deleteUsers(id);
  };
}
