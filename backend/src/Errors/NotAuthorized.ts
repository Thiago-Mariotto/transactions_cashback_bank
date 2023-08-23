import HttpError from './HttpError';

export default class NotAuthorized extends HttpError {
  constructor(message: string) {
    super(401, message, 'Not authorized');
  }
}