import { SetMetadata } from '@nestjs/common';

export type AllowedUser = keyof typeof EUser;
export const Users = (users: AllowedUser[]) => SetMetadata('users', users);
