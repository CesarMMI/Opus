import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthRequest } from 'src/auth/types/requests/auth.request';
import { TasksService } from '../services/tasks.service';
import { CreateTaskRequest } from '../types/create-task.request';
import { UpdateTaskRequest } from '../types/update-task.request';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	@UseGuards(AuthGuard)
	create(@Body() createTaskDto: CreateTaskRequest, @Request() request: AuthRequest) {
		return this.tasksService.create(request.user.sub, createTaskDto);
	}

	@Get()
	@UseGuards(AuthGuard)
	findAll(@Request() request: AuthRequest) {
		return this.tasksService.findAll(request.user.sub);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskRequest, @Request() request: AuthRequest) {
		return this.tasksService.update(request.user.sub, id, updateTaskDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @Request() request: AuthRequest) {
		return this.tasksService.remove(request.user.sub, id);
	}
}
