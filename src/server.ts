import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./db/connect.js";

const app = createApp();

const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`API running on http://localhost:${env.PORT}`);
  });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

