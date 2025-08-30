import { User } from 'src/auth/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;
	@Column({ nullable: true })
	description?: string;

	@Column()
	done: boolean;
	@Column({ nullable: true })
	doneAt?: Date;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	user: User;

	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
