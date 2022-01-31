import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
