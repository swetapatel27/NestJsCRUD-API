import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/filter-task.dto';
import {  TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService:TasksService){

    }

    // @Get()
    // getTasks(@Query() filterDto:filterTaskDto): Task[]{
        
    //     if(Object.keys(filterDto).length){
           
    //         return this.tasksService.getTaskByFilter(filterDto);
    //     }
    //     else{
    //     return this.tasksService.getAllTasks();
    // }
    // }

    @Get()
    getTasks(@Query() filterTaskDto:filterTaskDto):Promise<Task[]>{
        return this.tasksService.getAllTasks(filterTaskDto);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id:string):Task{
    //     console.log(id);
    //     return this.tasksService.getTaskById(id);
    // }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto:createTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }


    // @Post()
    // createTask(@Body() createTaskDto:createTaskDto){
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id:string){
    //     return this.tasksService.deleteTask(id);
    // }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string){
        return this.tasksService.deleteTask(id);
    }

    // @Patch('/:id')
    // updateStatusById(@Param('id') id:string,@Body('status') status:TaskStatus){
    //     return this.tasksService.updateStatusById(id,status);
    // }

    @Patch('/:id')
    updateStatusByID(@Param('id') id:string,@Body('status') status:TaskStatus):Promise<Task>{
        return this.tasksService.updateStatusById(id,status);
    }
   

}
