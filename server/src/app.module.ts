// src/app.module.ts
import { Module } from '@nestjs/common';
import { CountryInfoModule } from './country-info/country-info.module';

@Module({
  imports: [CountryInfoModule],
})
export class AppModule {}
