import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { OrderSettingsDto } from 'src/dto/orderSettings.dto';
import { ProductSettingsDto } from 'src/dto/productSettings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('orders')
  getOrdersSettings() {
    return this.settingsService.getOrderSettings();
  }

  @Post('orders')
  createOrderSettings(@Body() dto: OrderSettingsDto) {
    return this.settingsService.addOrderSettings(dto);
  }

  @Get('products')
  getProductsSettings() {
    return this.settingsService.getProductSettings();
  }

  @Post('products')
  addProductSetting(@Body() dto: ProductSettingsDto) {
    return this.settingsService.addProductSettings(dto);
  }
}
