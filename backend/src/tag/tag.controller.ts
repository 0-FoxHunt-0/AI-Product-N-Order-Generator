import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from 'src/dto';

@Controller('tags')
export class TagController {
  constructor(private tagsService: TagService) {}

  @Get(':productSKU')
  getTagsForProduct(@Param('productSKU') productSKU: string) {
    return this.tagsService.getTagsForProduct(productSKU);
  }

  @Post('add/:productSKU')
  @HttpCode(HttpStatus.CREATED)
  addTagToProduct(
    @Param('productSKU') productSKU: string,
    @Body() dto: TagDto,
  ) {
    return this.tagsService.addTagToProduct(productSKU, dto);
  }

  @Delete('delete/:sku')
  deleteTag(@Param('sku') sku: string) {
    return this.tagsService.deleteTag(sku);
  }
}
