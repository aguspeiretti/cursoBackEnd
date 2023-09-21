import EErrors from "../constants/EErrors.js";

export default (error, req, res, next) => {
  res.send({ status: "error", error: error.message });
};
