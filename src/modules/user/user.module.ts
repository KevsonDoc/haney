import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { User, UserSchema } from './entities/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  exports: [UserService, ProfileService],
  providers: [UserService, ProfileService],
  controllers: [UserController, ProfileController],
})
export class UserModule {}
