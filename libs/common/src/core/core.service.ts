import { responseError } from '@app/helper/misc.helper';
import { APP, RECORD_EVENT } from '@app/utils/constants';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export abstract class CoreService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly client: ClientProxy,
    private readonly config: ConfigService,
  ) {}

  private readonly app = this.config.get<string>(APP);
  private readonly logger = new Logger(this.app);

  ack(context: RmqContext, name: string) {
    this.logger.log(`${name} on ${this.app} acknowledged`);
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }

  async makeTransaction({
    session: ses,
    action,
    payload,
    request,
    response,
    method,
  }: Core.MakeTransaction) {
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
