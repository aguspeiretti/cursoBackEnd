import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("--mode <mode>", "modo developer", "dev");
program.parse();

dotenv.config({
  path: program.opts().mode === "prod" ? "./.env.prod" : "./.env.dev",
});

export default {
  app: {
    PORT: process.env.PORT || 8080,
  },
  mongo: {
    URL: process.env.MONGO_URL,
  },

  mode: {
    mode: process.env.MODE,
  },
};
