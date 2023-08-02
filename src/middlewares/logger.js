import LoggerServices from "../services/logger.service.js";
import config from "../config.js";

const logger = new LoggerServices(config.mode.mode);

const attachLogger = (req, res, next) => {
  req.logger = logger.logger;

  //quiero ver las paticiones x eso agrege http
  //  req.logger.http(`Peticion http: ${req.method} , ${req.url} , ${new Date().toLocaleTimeString()}`)
  next();
};
export default attachLogger;
