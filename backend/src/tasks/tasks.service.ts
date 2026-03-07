import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task)private tasksRepository: Repository<Task>) {}
  
  createTask(createTaskDto: CreateTaskDto,userId:number) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId }
    });
    return this.tasksRepository.save(task);
  }

  async findAll(userId: number) {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(taskId: number,userId: number) {
    return this.tasksRepository.findOne({ where: { id: taskId, user: { id: userId } } });
  }

  async update(taskId: number, userId: number,updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId, user: { id: userId } } });
    if (!task) throw new NotFoundException('Task not found');
    return this.tasksRepository.update(taskId,updateTaskDto);
  }

  async remove(taskId: number, userId: number) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId, user: { id: userId } } });
    if (!task) throw new NotFoundException('Task not found');
    return this.tasksRepository.delete(taskId);
  }
}
