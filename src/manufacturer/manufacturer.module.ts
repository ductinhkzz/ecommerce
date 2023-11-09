import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerEntity } from './manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
  providers: [ManufacturerService],
  controllers: [ManufacturerController],
})
export class ManufacturerModule {}
