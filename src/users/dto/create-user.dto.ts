import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsUserAlreadyExist } from '../decorators/isUserAlreadyExist';

export class CreateUserDto {
  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  username: string;

  @IsEmail()
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
