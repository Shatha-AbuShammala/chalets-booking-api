import { Router } from "express";
import { UserModel } from "../modules/users/user.model.js";
import { ok } from "../utils/http.js";

export const debugRouter = Router();

debugRouter.get("/debug/users-count", async (req, res) => {
  const count = await UserModel.countDocuments();
  res.json(ok({ count }));
});
