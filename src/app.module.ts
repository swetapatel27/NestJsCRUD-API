import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      username:'postgres',
      password:'1234',
      database:'task-management',
      port:5432,
      autoLoadEntities:true,
      synchronize:true,

    })
  ],
})
export class AppModule {}
