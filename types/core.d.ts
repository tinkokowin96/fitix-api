enum EApp {
  Admin = 'Admin',
}

type CoreModuleConfigs = {
  app: EApp;
  useCookie?: boolean;
  mongo?: boolean;
  rmq?: boolean;
  grpc?: boolean;
};
