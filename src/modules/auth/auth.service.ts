import { UserModel } from "../users/user.model.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";

export const register = async (input: { 
  name: string; 
  email: string; 
  password: string;
  role?: string;
}) => {
  const exists = await UserModel.findOne({ email: input.email });
  if (exists) throw new Error("Email already in use");

  const passwordHash = await hashPassword(input.password);

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    passwordHash,
    role: input.role ?? "customer", // ✅ هاد هو التغيير
  });

  const payload = { sub: String(user._id), role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return { user, accessToken, refreshToken };
};

export const login = async (input: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) throw new Error("Invalid credentials");

  const ok = await comparePassword(input.password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const payload = { sub: String(user._id), role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return { user, accessToken, refreshToken };
};

export const refresh = async (input: { refreshToken: string }) => {
  const payload = verifyRefreshToken(input.refreshToken);

  const user = await UserModel.findById(payload.sub);
  if (!user || !user.refreshTokenHash) throw new Error("Unauthorized");

  const matches = await bcrypt.compare(input.refreshToken, user.refreshTokenHash);
  if (!matches) throw new Error("Unauthorized");

  const newPayload = { sub: String(user._id), role: user.role };
  const accessToken = signAccessToken(newPayload);
  const refreshToken = signRefreshToken(newPayload);

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return { accessToken, refreshToken };
};

export const logout = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } });
};