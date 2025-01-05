import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthenticationDto {
  /**
   * The email of the user.
   * @example "user@example.com"
   */
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  public email: string;

  /**
   * The password of the user.
   * @example "P@ssw0rd"
   */
  @ApiProperty({
    description: 'The password of the user.',
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
