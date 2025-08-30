import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';

// Mocks
jest.mock('class-transformer', () => ({ plainToInstance: jest.fn() }));
jest.mock('class-validator', () => ({ validate: jest.fn() }));
class TestDto {
	name!: string;
}

describe('ValidationPipe', () => {
	let pipe: ValidationPipe;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ValidationPipe],
		}).compile();

		pipe = module.get<ValidationPipe>(ValidationPipe);

		jest.clearAllMocks();
	});

	it('should return the original value if metatype is falsy', async () => {
		const metadata: ArgumentMetadata = { type: 'body', metatype: undefined, data: '' };

		const result = await pipe.transform({ name: 'John' }, metadata);

		expect(result).toEqual({ name: 'John' });
		expect(plainToInstance).not.toHaveBeenCalled();
	});

	it('should return the original value if metatype does not need validation', async () => {
		const metadata: ArgumentMetadata = { type: 'body', metatype: String, data: '' };

		const result = await pipe.transform('string value', metadata);

		expect(result).toBe('string value');
		expect(plainToInstance).not.toHaveBeenCalled();
	});

	it('should throw bad request if has validation errors', async () => {
		const metadata: ArgumentMetadata = { type: 'body', metatype: TestDto, data: '' };

		(plainToInstance as jest.Mock).mockReturnValue({ name: '' });

		const mockError: ValidationError = {
			property: 'name',
			constraints: { isNotEmpty: 'name should not be empty' },
			children: [],
		};
		(validate as jest.Mock).mockResolvedValue([mockError]);

		await expect(pipe.transform({ name: '' }, metadata)).rejects.toThrow(
			new BadRequestException('Name should not be empty'),
		);

		expect(plainToInstance).toHaveBeenCalledWith(TestDto, { name: '' });
		expect(validate).toHaveBeenCalled();
	});

	it('should return the original value if does not has validation errors', async () => {
		const metadata: ArgumentMetadata = { type: 'body', metatype: TestDto, data: '' };

		(plainToInstance as jest.Mock).mockReturnValue({ name: 'John' });
		(validate as jest.Mock).mockResolvedValue([]);

		const value = { name: 'John' };
		const result = await pipe.transform(value, metadata);

		expect(result).toBe(value);
		expect(plainToInstance).toHaveBeenCalledWith(TestDto, value);
		expect(validate).toHaveBeenCalled();
	});

	it('should throw default message if no constraints was fonud', async () => {
		const metadata: ArgumentMetadata = { type: 'body', metatype: TestDto, data: '' };

		(plainToInstance as jest.Mock).mockReturnValue({});
		const mockError: ValidationError = {
			property: 'name',
			constraints: undefined,
			children: [],
		};
		(validate as jest.Mock).mockResolvedValue([mockError]);

		await expect(pipe.transform({}, metadata)).rejects.toThrow(new BadRequestException('Validation failed'));
	});
});
