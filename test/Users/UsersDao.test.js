import mongoose from "mongoose";
import Assert from "assert";
import UserDao from "../../src/dao/mongo/managers/users.js";

mongoose.connect(
  "mongodb+srv://aguspeiretti:123@agusdb.7mmevwy.mongodb.net/pruebas?retryWrites=true&w=majority"
);

const assert = Assert.strict;

describe("Users Dao testing", () => {
  before(function () {
    this.usersDao = new UserDao();
  });

  beforeEach(function () {
    this.timeout(10000);
    mongoose.connection.collections.users.drop();
  });

  it("El dao debe devolver usuarios en array", async function () {
    this.timeout(10000);
    const restult = await this.usersDao.getUsers();
    console.log(typeof restult);
    assert.strictEqual(Array.isArray(restult), true);
  });

  it("el usuario debe insertar correctamente los usuarios", async function () {
    this.timeout(10000);
    const mockUser = {
      first_name: "agus",
      last_name: "peiretti",
      email: "agu@agu.com",
      password: "123",
    };
    const restult = await this.usersDao.createUsers(mockUser);
    assert.ok(restult._id);
  });
  it("El dao debe obtener un solo usuarios por email y devolverlo  en objeto", async function () {
    this.timeout(10000);
    const user = await this.usersDao.getUsersBy({ email: "agu@agu.com" });
    console.log(user);
    assert.strictEqual(typeof user, "object");
  });
});
