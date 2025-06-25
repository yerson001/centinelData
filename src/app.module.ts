import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port: 5433,
      username:'root',
      password: 'char5524',
      database: 'my_db',
      autoLoadEntities: true,
      //entities:[__dirname + '/**/*.entity{.ts,.js}']
      synchronize:true
    }),

    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
