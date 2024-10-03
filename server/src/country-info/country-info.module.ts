import { Module } from '@nestjs/common';
import { CountryController } from './country-info.controller';
import { CountryInfoService } from './country-info.service';

@Module({
  controllers: [CountryController],
  providers: [CountryInfoService],
})
export class CountryInfoModule {}
