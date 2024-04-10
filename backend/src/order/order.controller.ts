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
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':sku')
  findOrderWithProducts(@Param('sku') sku: string) {
    return this.orderService.findOrderWithProducts(sku);
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
}
