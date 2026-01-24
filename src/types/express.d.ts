import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "customer" | "owner" | "admin";
      };
    }
  }
}

export {};
