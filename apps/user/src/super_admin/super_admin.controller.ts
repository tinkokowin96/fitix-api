import { Controller } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}
}
