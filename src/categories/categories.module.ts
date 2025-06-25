import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  controllers:[CategoriesController],
  providers: [CategoriesService,JwtStrategy]
})
export class CategoriesModule { }
