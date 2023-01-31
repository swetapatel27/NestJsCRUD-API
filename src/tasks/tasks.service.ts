import { Injectable, NotFoundException } from '@nestjs/common';
import { timeEnd } from 'console';
import { TaskStatus } from './task-status.enum';
// import {v4 as uuid} from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/filter-task.dto';
import { TasksModule } from './tasks.module';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(private tasksRepository:TaskRepository){}


    async getAllTasks(filterTaskDto:filterTaskDto):Promise<Task[]>{
        let tasks =  await this.tasksRepository.getTasks(filterTaskDto);
        return tasks;
    }


    async getTaskById(id:string):Promise<Task>{

        const found = await this.tasksRepository.findOne({ where: { 
            id:id 
          } });
        if(!found)
        {
             throw new NotFoundException(`Task not found with id: ${id}`);
        }
        return found;

    }



    async createTask(createTaskDto:createTaskDto):Promise<Task>{
        const {title,description} = createTaskDto;
        const task = this.tasksRepository.create({
            title,
            description,
            status:TaskStatus.DONE
        })

        await this.tasksRepository.save(task)
        return task;
    }

    

    async deleteTask(id:string){
        return await this.tasksRepository.delete({id:id});
    }

   

    async updateStatusById(id:string,status:TaskStatus):Promise<Task>{

        const task = await this.getTaskById(id);
        task.status = status
        await this.tasksRepository.save(task);
        return task;
    }

}
