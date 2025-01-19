import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FindCategoryDto } from '../dto/find-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  public async create(data: CreateCategoryDto): Promise<void> {
    try {
      const category = new this.categoryModel(data);
      await category.save();
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException([
        'An error occurred while creating the category',
      ]);
    }
  }

  public async find(data: FindCategoryDto) {
    const limit = +data.total;
    const skip = (+data.page - 1) * limit;

    const category = await this.categoryModel
      .find()
      .limit(limit)
      .skip(skip)
      .exec();

    return category;
  }

  public async validateCategory(categoryIds: string[]): Promise<void> {
    const category = await this.categoryModel.find({ _id: categoryIds }).exec();

    if (category.length === 0) {
      throw new BadRequestException([
        'you must provide at least one category.',
      ]);
    }

    if (category.length !== categoryIds.length) {
      throw new BadRequestException(['Invalid category.']);
    }
  }
}
