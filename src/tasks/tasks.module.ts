import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { TasksController } from './controller/tasks.controller';
import { Task } from './entities/task.entity';
import { TasksService } from './services/tasks.service';

@Module({
	controllers: [TasksController],
	providers: [TasksService],
	imports: [DatabaseModule.forFeature([Task]), AuthModule],
})
export class TasksModule {}
