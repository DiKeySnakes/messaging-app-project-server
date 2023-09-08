import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import {
  IsUserAlreadyExistConstraint,
  IsEmailAlreadyExistConstraint,
} from './decorators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersService,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    IsUserAlreadyExistConstraint,
    IsEmailAlreadyExistConstraint,
  ],
})
export class UsersModule {}
