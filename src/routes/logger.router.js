import { Router } from "express";

const router = Router();

router.get("/loggerTest", (req, res) => {
  req.logger.info("info");
  req.logger.error("error");
  req.logger.debug("debug");

  res.send({ message: "Loggers" });
});

export default router;
