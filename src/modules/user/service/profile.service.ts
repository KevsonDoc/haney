import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FlattenMaps, Model, Require_id } from 'mongoose';
import { CreateProfile } from '../dto/create-profile.dto';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async create(userId: string, payload: CreateProfile): Promise<void> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const profile = new this.profileModel(payload);
      await profile.save({ session });
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { profile: profile._id },
      });
      await session.commitTransaction();
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException([
        'An error occurred while creating the user',
      ]);
    }
  }

  public async findOne(
    profileId: string,
  ): Promise<FlattenMaps<Require_id<Profile>>> {
    const profile = await this.profileModel.findById(profileId).exec();

    if (!profile) {
      throw new BadRequestException(['Invalid profile']);
    }

    return profile.toJSON();
  }
}
