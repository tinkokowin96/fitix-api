import 'express';

declare module 'express' {
  interface Request {
    appPath: EPath;
  }
}
