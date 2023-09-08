import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsUserAlreadyExist, IsEmailAlreadyExist } from '../decorators';

export class CreateUserDto {
  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'This email $value is already in use. Choose another valid email.',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  refreshToken: string;
}
