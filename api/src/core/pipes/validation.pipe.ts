import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
		if (!metatype || !this.toValidate(metatype)) return value;

		const object = plainToInstance<object, unknown>(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			const message = this.getErrorMessage(errors[0]);
			throw new BadRequestException(message);
		}
		return value;
	}

	private getErrorMessage(error: ValidationError): string {
		let message = error.constraints ? Object.values(error.constraints)[0] : 'Validation failed';
		if (message) message = message.charAt(0).toUpperCase() + message.slice(1);
		return message ?? 'Validation failed';
	}

	private toValidate(metatype: Type<any>): boolean {
		const types: any[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
