export class AppError extends Error {
  status: number;
  errors?: string[];

  constructor(message: string, status: number = 500, errors?: string[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
