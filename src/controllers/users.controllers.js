import { userService } from "../services/index.js";

const upDateUser = async (req, res) => {
  console.log(req.user);
  const role = req.body;
  console.log(role.type);
  try {
    const userUpdate = await userService.updateOneService(
      { email: req.user.email },

      { $set: { role: role.type } }
    );
    if (!userUpdate) {
      res.send({ status: "success", messages: "reestablecida" });
    }
    res.send({ status: "success", payload: userUpdate });
  } catch (err) {
    console.log(err);
  }
};

export default {
  upDateUser,
};
