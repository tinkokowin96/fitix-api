import { responseError } from '@app/helper/misc.helper';
import { APP, RECORD_EVENT } from '@app/utils/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { ClientSession, Connection } from 'mongoose';

type MakeTransactionType = {
  session?: ClientSession;
  action: (session: ClientSession) => Promise<any>;
  request: Request;
  response?: Response;
  payload: any;
  method: ERequestMethod;
};

@Injectable()
export abstract class CoreService {
  @InjectConnection() connection: Connection;
  @Inject(APP) client: ClientProxy;
  constructor() {}

  async makeTransaction({
    session: ses,
    action,
    payload,
    request,
    response,
    method,
  }: MakeTransactionType) {
    const session = ses ?? (await this.connection.startSession());
    try {
      session.startTransaction();

      const res = await action(session);

      if (method !== ERequestMethod.GET)
        this.client.emit(`${RECORD_EVENT}#${request.appPath}`, {
          payload,
          response: res,
          method,
        });

      await session.commitTransaction();
      await session.endSession();

      if (response) response.send(res);
      else return res;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      responseError(response, error);
    }
  }
}
