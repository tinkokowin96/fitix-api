import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(
    private readonly reflactor: Reflector,
    @In
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {}
}
