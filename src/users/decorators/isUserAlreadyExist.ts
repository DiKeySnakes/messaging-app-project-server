import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(userName: any, args: ValidationArguments) {
    const user = await this.userModel.findOne({ username: userName });
    console.log('username: ', user);
    if (user) return false;
    return true;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
