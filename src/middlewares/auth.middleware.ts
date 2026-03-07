import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: { message: "Unauthorized" } 
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ 
      success: false, 
      error: { message: "Unauthorized" } 
    });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: { message: "Forbidden" } 
      });
    }
    next();
  };
};