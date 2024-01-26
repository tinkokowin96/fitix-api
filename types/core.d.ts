declare module Core {
  type ClientSession = import('mongoose').ClientSession;
  type Request = import('express').Request;
  type Response = import('express').Response;

  type MakeTransaction = {
    session?: ClientSession;
    action: (session: ClientSession) => Promise<any>;
    request: Request;
    response?: Response;
    payload: any;
    method: ERequestMethod;
  };
}

type CoreModuleConfigs = {
  app: EApp;
  useCookie?: boolean;
  mongo?: boolean;
  rmq?: boolean;
  grpc?: boolean;
};

type User = {
  type: EUser;
  id: ObjectId;
};
