import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TagDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getTagsForProduct(productSku: string) {
    const tags = await this.prisma.tag.findMany({
      where: {
        productSKU: productSku,
      },
    });

    return tags;
  }

  async addTagToProduct(productSku: string, dto: TagDto) {
    try {
      const addedTag = await this.prisma.tag.create({
        data: {
          color: dto.color,
          message: dto.message,
          productSKU: productSku,
        },
      });

      return addedTag;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('tag already exists');
      }
      throw error;
    }
  }

  async deleteTag(sku: string) {
    try {
      await this.prisma.tag.delete({
        where: {
          SKU: sku,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new ForbiddenException('tag does not exist');
      }
      throw error;
    }
  }
}
