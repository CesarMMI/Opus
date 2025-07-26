import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column()
	public name: string;
	@Column()
	public email: string;
	@Column()
	public password: string;
	@CreateDateColumn()
	public createdAt: Date;
	@UpdateDateColumn()
	public updatedAt: Date;
}
