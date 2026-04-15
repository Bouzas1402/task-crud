import { NextResponse } from 'next/server';

export type ApiResponse<T = unknown> = {
  message: string;
  data?: T;
  errors?: string[];
  timestamp: number;
};

const success = <T>(data?: T, message: string = 'Success', status: number = 200) => {
  return NextResponse.json<ApiResponse<T>>(
    {
      message,
      ...(data !== undefined && { data }),
      timestamp: Date.now()
    },
    { status }
  );
};

const created = <T>(
  data: T | undefined = undefined,
  message: string = 'Resource created successfully'
) => {
  return success<T>(data, message, 201);
};

const error = (
  message: string = 'Internal server error',
  status: number = 500,
  errors?: string[]
) => {
  return NextResponse.json<ApiResponse<null>>(
    {
      message,
      ...(errors && { errors }),
      timestamp: Date.now()
    },
    { status }
  );
};

const badRequest = (message: string = 'Bad request', errors: string[] | undefined = undefined) => {
  return error(message, 400, errors);
};

const notFound = (message: string = 'Resource not found') => {
  return error(message, 404);
};

const forbidden = (message: string = 'Forbidden') => {
  return error(message, 403);
};

export const ApiResponse = {
  success,
  created,
  error,
  badRequest,
  notFound,
  forbidden
};
