import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './common/validations';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { DataSourceModule } from './database/datasource.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configSchema,
    }),
    DataSourceModule,
    ProductModule,
    CategoryModule,
    ManufacturerModule,
  ],
})
export class AppModule {}
