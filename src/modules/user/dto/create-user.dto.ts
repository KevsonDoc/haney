import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

/**
 * Data Transfer Object for creating a user.
 */
/**
 * Data Transfer Object (DTO) for creating a new user.
 * This class is used to validate and transfer user data when creating a new user.
 *
 * @class CreateUserDto
 *
 * @property {string} email - The email of the user. Must be a valid email address.
 * @property {string} name - The name of the user. Must be a non-empty string.
 * @property {string} password - The password of the user. Must meet the strong password criteria.
 *
 * @example
 * const newUser: CreateUserDto = {
 *   email: 'user@example.com',
 *   name: 'John Doe',
 *   password: 'P@ssw0rd'
 * };
 *
 */
export class CreateUserDto {
  /**
   * The email of the user.
   * @example "user@example.com"
   */
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  /**
   * The name of the user.
   * @example "John Doe"
   */
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  /**
   * The password of the user.
   * @example "P@ssw0rd"
   */
  @ApiProperty({
    description: 'The password of the user.',
    example: 'P@ssw0rd',
  })
  @IsStrongPassword({
    minLength: 0,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  public password: string;
}
