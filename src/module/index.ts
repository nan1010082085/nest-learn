import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { LogsModule } from './logs/logs.module';
import { MenusModule } from './menus/menus.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';

const modules = [
  UserModule,
  LogsModule,
  RolesModule,
  AuthModule,
  DeviceModule,
  MenusModule,
];

export default modules;
