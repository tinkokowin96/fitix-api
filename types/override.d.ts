import 'express';
import 'mongoose';

declare module 'express' {
  interface Request {
    appPath: EPath;
  }
}

declare module 'mongoose' {
  interface User {
    type: EUser;
    id: Types.ObjectId;
  }
}
