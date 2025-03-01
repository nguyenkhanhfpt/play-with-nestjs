import { Module } from '@nestjs/common';
import { AppController } from '@app.controller';
import { AppService } from '@app.service';
import { UsersModule } from '@modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import databaseConfig from '@config/database.config';
import appConfig from '@config/app.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '@guards';
import { QueueModule } from '@modules/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    UsersModule,
    AuthModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
  ],
})
export class AppModule {}
