import 'express';

declare global {
  type ObjectId = import('mongoose').ObjectId;
}

declare module 'express' {
  interface Request {
    appPath: EPath;
    id;
  }
}
