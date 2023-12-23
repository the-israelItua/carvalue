import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { typeOrmConfig } from './config/typeorm.config';

const cookieSession = require('cookie-session');
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['realeasybadman'] })).forRoutes('*');
  }
}
