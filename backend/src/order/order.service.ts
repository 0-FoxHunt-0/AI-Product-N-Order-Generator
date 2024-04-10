import { ForbiddenException, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    const orders = await this.prisma.order.findMany({
      include: {
        products: true,
      },
    });

    return orders;
  }

  async findOrderWithProducts(orderSKU: string) {
    try {
      const order = this.prisma.order.findUnique({
        where: { SKU: orderSKU },
        include: { products: true },
      });

      return order;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('tag does not exist');
      }
      throw error;
    }
  }

  async deleteOrder(orderSKU: string) {
    try {
      await this.prisma.order.delete({
        where: { SKU: orderSKU },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('tag does not exist');
      }
      throw error;
    }
  }

  async addOrder(productSKUs: string[]) {
    try {
      // Fetch the existing products
      const products: Product[] = await Promise.all(
        productSKUs.map(async (productSKU: string) => {
          const products = await this.prisma.product.findUnique({
            where: { SKU: productSKU },
          });

          return products;
        }),
      );

      // Create a new order
      const order = await this.prisma.order.create({
        data: {
          products: {
            connect: products.map((product) => ({ SKU: product.SKU })),
          },
        },
        include: {
          products: true,
        },
      });

      return order;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('tag does not exist');
      }
      throw error;
    }
  }
}
