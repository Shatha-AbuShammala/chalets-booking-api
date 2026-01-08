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

export const ok = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});
