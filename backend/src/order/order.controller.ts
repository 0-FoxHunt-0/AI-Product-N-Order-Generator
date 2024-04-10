import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('product-search/:sku')
  findOrderWithProducts(@Param('sku') sku: string) {
    return this.orderService.findProductsWithOrder(sku);
  }

  @Get('order-search/:sku')
  findOrdersWithProduct(@Param('sku') sku: string) {
    return this.orderService.findOrdersWithProduct(sku);
  }

  @Delete('delete/:sku')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOrder(@Param('sku') sku: string) {
    return this.orderService.deleteOrder(sku);
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  addOrder(@Body() productSKUs: { productSKUs: string[] }) {
    return this.orderService.addOrder(productSKUs.productSKUs);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  updateImageUrl(@Param('sku') sku: string, @Body() dto: OrderDto) {
    return this.orderService.updateOrderImageUrl(sku, dto);
  }
}
