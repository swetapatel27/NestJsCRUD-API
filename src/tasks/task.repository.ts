import { Injectable } from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { filterTaskDto } from "./dto/filter-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@Injectable()
export class TaskRepository extends Repository<Task>{

    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
      }
    
      async getTasks(filterTaskDto:filterTaskDto):Promise<Task[]>{
            const {status,search} = filterTaskDto

            const query = this.createQueryBuilder('task')

            if(status){

                 query.andWhere('task.status=:status',{status});

            }
            if(search){
                 query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search:`%${search}%`})
            }

            const tasks = await query.getMany();
            return tasks
      }

    }

