import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
	constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

	async create(userId: string, title: string, description?: string): Promise<Task> {
		let task = new Task();
		task.title = title;
		task.description = description;
		task.done = false;
		task.user = { id: userId } as User;
		task = await this.taskRepository.save(task);
		return task;
	}

	findAll(userId: string): Promise<Task[]> {
		return this.taskRepository.find({ where: { user: { id: userId } }, order: { done: 'desc', createdAt: 'desc' } });
	}

	async update(userId: string, id: string, done: boolean): Promise<Task | null> {
		let task = await this.findOne(userId, id);
		if (!task) throw new NotFoundException('Task not found');

		if (done && !task.done) task.doneAt = new Date();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		else if (!done && (task.done || task.doneAt)) task.doneAt = null as any;
		task.done = done;

		task = await this.taskRepository.save(task);

		return task;
	}

	async remove(userId: string, id: string): Promise<Task | null> {
		const task = await this.findOne(userId, id);
		if (!task) throw new NotFoundException('Task not found');

		await this.taskRepository.delete(task);
		return task;
	}

	private findOne(userId: string, id: string): Promise<Task | null> {
		return this.taskRepository.findOne({ where: { id, user: { id: userId } } });
	}
}
