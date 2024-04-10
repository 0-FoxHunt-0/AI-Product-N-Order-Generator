import { ForbiddenException, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { OrderDto } from 'src/dto';
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

  async findProductsWithOrder(orderSKU: string) {
    try {
      const order = this.prisma.orderProduct.findMany({
        where: { orderId: orderSKU },
        select: {
          orderId: true,
          product: true,
        },
      });

      return order;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('order does not exist');
      }
      throw error;
    }
  }

  async findOrdersWithProduct(sku: string) {
    try {
      const orders = this.prisma.orderProduct.findMany({
        where: {
          productId: sku,
        },
        select: {
          order: true,
        },
      });

      return orders;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('order does not exist');
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
          throw new ForbiddenException('order does not exist');
      }
      throw error;
    }
  }

  async addOrder(productSKUs: string[]) {
    try {
      // Fetch the existing products
      const products: Product[] = await Promise.all(
        productSKUs.map(async (productSKU: string) => {
          const product = await this.prisma.product.findUnique({
            where: { SKU: productSKU },
          });

          if (!product)
            throw new ForbiddenException('one or more products does not exist');

          return product;
        }),
      );

      // Find first valid imageUrl from products to set as order imageUrl
      const productWithImageUrl: Product | undefined = products.find(
        (product) => Boolean(product.imageUrl),
      );

      // Create a new order
      const order = await this.prisma.order.create({
        data: {
          imageUrl: productWithImageUrl?.imageUrl,
        },
        include: {
          products: true,
        },
      });

      // Connect the products to the order
      const orderProducts = await Promise.all(
        products.map((product) =>
          this.prisma.orderProduct.create({
            data: {
              orderId: order.SKU,
              productId: product.SKU,
            },
            include: {
              product: true,
              order: true,
            },
          }),
        ),
      );

      return { ...order, products: orderProducts };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('order does not exist');
      }
      throw error;
    }
  }

  async updateOrderImageUrl(sku: string, dto: OrderDto) {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: {
          SKU: sku,
        },
        data: {
          imageUrl: dto.imageUrl,
        },
      });

      return updatedOrder;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('order does not exist');
      }
      throw error;
    }
  }
}
