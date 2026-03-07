import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(createTaskDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number ,@Request() req) {
    return this.tasksService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto ,@Request() req) {
    return this.tasksService.update(+id, req.user.userId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    return this.tasksService.remove(+id,req.user.userId);
  }
}
