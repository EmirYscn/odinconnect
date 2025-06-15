import { forwardRef, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
