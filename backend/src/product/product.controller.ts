import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from 'src/dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get('deleted-products')
  getAllDeleted() {
    return this.productService.getAllDeleted();
  }

  @Post('/add-product')
  addProduct(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }

  @Delete(':sku')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteProduct(@Param('sku') sku: string) {
    return this.productService.deleteProduct(sku);
  }

  @Put('/update/:sku')
  @HttpCode(HttpStatus.OK)
  updateProduct(@Param('sku') sku: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(sku, dto);
  }

  @Patch('/restore/:sku')
  @HttpCode(HttpStatus.OK)
  restoreProduct(@Param('sku') sku: string) {
    return this.productService.restoreProduct(sku);
  }
}
