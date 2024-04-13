import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TagModule } from './tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    TagModule,
    PrismaModule,
    OrderModule,
    SettingsModule,
  ],
})
export class AppModule {}
