import type { NextFunction, Request, Response } from "express";
import type { ApiErrorResponse } from "../utils/http.js";

export const notFound = (req: Request, res: Response) => {
  const payload: ApiErrorResponse = {
    success: false,
    error: { message: `Route not found: ${req.method} ${req.originalUrl}` },
  };
  res.status(404).json(payload);
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Error) {
    message = err.message;
  }

  const payload: ApiErrorResponse = {
    success: false,
    error: { message },
  };

  res.status(statusCode).json(payload);
};
