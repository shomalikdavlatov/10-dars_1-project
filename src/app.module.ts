import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import PrismaModule from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
