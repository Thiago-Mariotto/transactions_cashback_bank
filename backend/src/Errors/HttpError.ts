export default abstract class HttpError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;
  public inner: Error;

  constructor(statusCode: number, message: string, name: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;
    this.inner = new Error(message);
  }
}