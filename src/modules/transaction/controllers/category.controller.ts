import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/guard/jwt-auth.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FindCategoryDto } from '../dto/find-category.dto';
import { CategoryService } from '../service/category.service';

@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiOperation({
    summary: 'create category.',
    description: 'create category.',
  })
  public async create(@Body() payload: CreateCategoryDto) {
    await this.categoryService.create(payload);

    return ['Category created successfully'];
  }

  @Get()
  public async find(@Query() payload: FindCategoryDto) {
    console.log(payload);

    return await this.categoryService.find(payload);
  }

  @Get(':id')
  public async findOne() {}
}
