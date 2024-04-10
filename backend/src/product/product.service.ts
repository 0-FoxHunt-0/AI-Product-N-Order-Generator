import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ProductDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const products = await this.prisma.product.findMany({
      where: {
        deleted: false,
      },
    });

    return products;
  }

  async addProduct(dto: ProductDto) {
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          name: dto.name,
          count: dto.count,
          brand: dto.brand,
          price: dto.price,
          providerPrice: dto.providerPrice,
          notes: dto?.notes,
          imageUrl: dto?.imageUrl,
        },
      });

      return createdProduct;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('product already exists');
      }
      throw error;
    }
  }

  async deleteProduct(sku: string) {
    try {
      const existingProduct = await this.prisma.product.findUnique({
        where: {
          SKU: sku,
        },
      });

      if (existingProduct) {
        await this.prisma.product.delete({
          where: {
            SKU: existingProduct.SKU,
          },
        });

        await this.prisma.product.create({
          data: {
            name: existingProduct.name,
            price: existingProduct.price,
            providerPrice: existingProduct.providerPrice,
            brand: existingProduct.brand,
            count: existingProduct.count,
            deleted: true,
            notes: existingProduct?.notes,
            createdAt: existingProduct.createdAt,
          },
        });
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('product does not exist');
        else if (error.code === 'P2002')
          throw new ForbiddenException(
            'product already exists in the deleted section',
          );
      }
      throw error;
    }
  }

  async updateProduct(sku: string, dto: ProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: {
          SKU: sku,
        },
        data: {
          name: dto.name,
          count: dto.count,
          brand: dto.brand,
          price: dto.price,
          notes: dto?.notes,
          providerPrice: dto.providerPrice,
        },
      });

      return updatedProduct;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('product does not exist');
        else if (error.code === 'P2002')
          throw new ForbiddenException(
            'product already exists in the deleted section',
          );
      }
      throw error;
    }
  }

  async restoreProduct(sku: string) {
    try {
      const restoredProduct = await this.prisma.product.update({
        where: {
          SKU: sku,
        },
        data: {
          deleted: false,
        },
      });

      return restoredProduct;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('product does not exist');
      }
      throw error;
    }
  }
}
