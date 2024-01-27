import { Repository } from '@app/core/repository';
import { AppAuth } from '@app/schema/app_auth.schema';
import { APP, APP_AUTH_MODEL } from '@app/utils/constants';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { Request, Response } from 'express';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    @Inject(APP_AUTH_MODEL)
    private readonly appAuthModel: Repository<AppAuth>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    let isValid = true;
    const app = this.config.get<string>(APP);
    const { userName, password } = await this.appAuthModel.findOne({
      filter: { app },
    });
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic')) isValid = true;
    if (isValid) {
      const [usr, pass] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString('ascii')
        .split(':');
      if (userName === usr && (await compare(pass, password))) next();
      else isValid = false;
    }
    if (!isValid)
      res
        .status(401)
        .setHeader('WWW-Authenticate', `Basic realm=${app}`)
        .send('Authentication Required...');
  }
}
