import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { OrderSettingsDto } from 'src/dto/orderSettings.dto';
import { ProductSettingsDto } from 'src/dto/productSettings.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getOrderSettings() {
    const orderSettings = await this.prisma.orderSettings.findMany();

    return orderSettings;
  }

  async addOrderSettings(dto: OrderSettingsDto) {
    try {
      const currentOrders = await this.getOrderSettings();

      if (currentOrders.length !== 0) {
        await this.deleteOrderSettings();
      }

      const newOrderSettings = await this.prisma.orderSettings.create({
        data: {
          orderNum: dto.orderNum,
          productCount: dto.productCount,
          subject: dto?.subject,
        },
      });

      return newOrderSettings;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrderSettings() {
    try {
      await this.prisma.orderSettings.deleteMany({});
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('order setting does not exist');
      }
      throw error;
    }
  }

  async getProductSettings() {
    const productSettings = await this.prisma.productSettings.findMany();

    return productSettings;
  }

  async addProductSettings(dto: ProductSettingsDto) {
    try {
      const currentProducts = await this.getProductSettings();

      if (currentProducts.length !== 0) {
        await this.deleteProductSettings();
      }

      const newProductSettings = await this.prisma.productSettings.create({
        data: {
          productCount: dto.productCount,
          subject: dto?.subject,
        },
      });

      return newProductSettings;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductSettings() {
    try {
      await this.prisma.productSettings.deleteMany({});
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('product setting does not exist');
      }
      throw error;
    }
  }
}
