import HttpError from './HttpError';

export default class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message, 'Forbidden');
  }
}