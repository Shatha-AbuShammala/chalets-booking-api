import type { Response } from "express";

export type ApiResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};

export const ok = <T>(res: Response, data: T) => {
  return res.status(200).json({ success: true, data });
};

export const created = <T>(res: Response, data: T) => {
  return res.status(201).json({ success: true, data });
};

export const notFound = (res: Response, message: string) => {
  return res.status(404).json({ success: false, error: { message } });
};

export const forbidden = (res: Response, message: string) => {
  return res.status(403).json({ success: false, error: { message } });
};

export const badRequest = (res: Response, message: string) => {
  return res.status(400).json({ success: false, error: { message } });
};