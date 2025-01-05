import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FlattenMaps, Model, Require_id } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel
      .exists({
        email: createUserDto.email,
      })
      .exec();

    if (userExists) {
      throw new BadRequestException(['User already exists']);
    }

    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserDto.password, salt);

      const user = new this.userModel({
        ...createUserDto,
        password: hash,
      });
      await user.save();
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException([
        'An error occurred while creating the user',
      ]);
    }
  }

  public async findOne(
    entity: Partial<User>,
  ): Promise<FlattenMaps<Require_id<User>>> {
    const user = await this.userModel.findOne(entity).where(entity).exec();
    return user.toJSON();
  }
}
