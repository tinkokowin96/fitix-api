import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminModule } from './admin/admin.module';
import { SuperAdminModule } from './super_admin/super_admin.module';
import { EmployeeModule } from './employee/employee.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [AdminModule, SuperAdminModule, EmployeeModule, MemberModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
